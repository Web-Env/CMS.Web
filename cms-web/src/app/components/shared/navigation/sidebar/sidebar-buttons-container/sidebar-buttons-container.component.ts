import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { ActionsSubject, Store } from "@ngrx/store";
import { debounceTime, fromEvent, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { SidebarButtonViewModel } from "src/app/models/view-models/sidebar-button.model";
import { SidebarButton } from "src/app/ngrx/models/sidebarbutton.model";
import { loadSidebarButtons, LOAD_SIDEBARBUTTONS_SUCCESS } from "src/app/ngrx/actions/sidebar/sidebar.actions";
import { AppState } from "src/app/ngrx/app.state";
import { stringSimilarity } from "string-similarity-js";
import { ofType } from "@ngrx/effects";
import { EventsService } from "src/app/services/events.service";

@Component({
    selector: 'app-sidebar-buttons-container',
    templateUrl: './sidebar-buttons-container.component.html',
    styleUrls: ['./sidebar-buttons-container.component.scss']
})
export class SidebarButtonsContainerComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    searchTermInputSubscription!: Subscription;
    loadSidebarButtonsSuccessSubscription!: Subscription;
    contentAddedSubscription!: Subscription;
    routerPathChangeSubscription!: Subscription;

    @Output() deactivateSidebarEvent: EventEmitter<boolean> = new EventEmitter();

    isLoading: boolean = true;
    url!: string;

    activeSidebarButtonPath!: string;
    activateSidebarButtonSubject: Subject<string> = new Subject<string>();
    deactivateSidebarButtonSubject: Subject<string> = new Subject<string>();

    searchTermEntered: boolean = false;
    searchTerm!: string | undefined;
    searchProcessed: boolean = false;

    sidebarButtonsConfigured: boolean = false;
    sidebarButtons: SidebarButtonViewModel[] = [];
    buttons: SidebarButtonViewModel[] = [];

    constructor(private eventsService: EventsService,
                private store: Store<AppState>,
                private router: Router,
                private actions$: ActionsSubject) { }

    ngOnInit(): void {
        this.url = this.router.url.replace('content/', '');
        this.url = this.url.replace('/', '');
        this.activeSidebarButtonPath = this.url;

        this.routerPathChangeSubscription = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.emitActiveSidebarButtonPathToDeactivate();

                this.url = this.router.url.replace('content/', '');
                this.url = this.url.replace('/', '');
                this.activeSidebarButtonPath = this.url;

                this.emitSidebarButtonPathToActivate();
            }
        );

        this.store.dispatch(loadSidebarButtons());

        this.addDefaultSidebarButtons();

        this.loadSidebarButtonsSuccessSubscription = this.actions$
            .pipe(ofType(LOAD_SIDEBARBUTTONS_SUCCESS)).subscribe((sidebarButtons: any) => {
                if (!this.sidebarButtonsConfigured && sidebarButtons != null && sidebarButtons.sidebarButtons != null) {
                    this.configureSidebarButtons(sidebarButtons.sidebarButtons);

                    this.isLoading = false;
                }
            }
        );

        this.contentAddedSubscription = this.eventsService.refreshSidebarEvent.subscribe(() => {
            this.refreshSidebarButtons();
        });
    }

    ngAfterViewInit(): void {
        this.searchTermInputSubscription = fromEvent(this.searchTermInput.nativeElement, 'input')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged())
            .subscribe(() => {
                const searchTerm = this.searchTermInput.nativeElement.value;

                if (searchTerm !== '') {
                    this.processSearchTerm(searchTerm);
                }
            });
    }

    private refreshSidebarButtons(): void {
        this.isLoading = true;
        this.buttons = [];
        this.sidebarButtons = [];
        this.sidebarButtonsConfigured = false;

        this.addDefaultSidebarButtons();

        this.store.dispatch(loadSidebarButtons());
    }

    private addDefaultSidebarButtons(): void {
        this.buttons.push(
            new SidebarButtonViewModel (
                "Home",
                '',
                this.url === '',
                null
            ),
            new SidebarButtonViewModel (
                "Announcements",
                'announcements',
                this.url === 'announcements',
                null
            )
        );
    }

    private configureSidebarButtons(sidebarButtons: SidebarButton[]): void {
        const urlSplit = this.url.split('/');

        if (sidebarButtons !== null && sidebarButtons.length > 0) {
            this.sidebarButtonsConfigured = true;

            sidebarButtons.forEach((sidebarButton) => {
                if (sidebarButton.subButtons !== undefined && sidebarButton.subButtons.length > 0) {
                    const subButtons = new Array<SidebarButtonViewModel>();

                    sidebarButton.subButtons.forEach(subButton => {
                        subButtons.push(
                            new SidebarButtonViewModel(
                                subButton.title,
                                (sidebarButton.path !== 'admin' ? 'content/' : '') + subButton.path,
                                this.url === subButton.path,
                                null
                            )
                        );
                    });

                    this.buttons.push(
                        new SidebarButtonViewModel(
                            sidebarButton.title,
                            sidebarButton.path,
                            urlSplit[0] === sidebarButton.path,
                            subButtons
                        )
                    );
                }
                else {
                    this.buttons.push(
                        new SidebarButtonViewModel(
                            sidebarButton.title,
                            'content/' + sidebarButton.path,
                            this.url === sidebarButton.path,
                            null
                        )
                    );
                }
            })

            this.mapButtonsToSidebar();
        }
    }

    private mapButtonsToSidebar(): void {
        this.sidebarButtons = [];
        var promise = Promise.resolve();

        this.buttons.forEach((button) => {
            promise = promise.then(() => {
                this.sidebarButtons.push(button);
                return new Promise((resolve) => {
                    setTimeout(resolve, 75);
                });
            });
        });
    }

    public searchTermChanged(searchInputEvent: any): void {
        const searchTerm = searchInputEvent.target.value;

        if (searchTerm === '') {
            this.resetSearch();
        }
        else {
            this.searchTermEntered = true;
            this.searchTerm = searchTerm;
        }
    }

    private processSearchTerm(searchTerm: string): void {
        this.searchProcessed = false;
        this.sidebarButtons = [];

        for (let i = 0; i <= this.buttons.length - 1; i++) {
            const button: SidebarButtonViewModel = Object.assign({}, this.buttons[i]);

            if (button.subButtons != null) {
                const refinedSubButtons = [];

                for (let j = 0; j <= button.subButtons.length - 1; j++) {
                    const subButton: SidebarButtonViewModel = Object.assign({}, button.subButtons[j]);

                    const subButtonSearchSimilarity = stringSimilarity(searchTerm, subButton.title);

                    if (subButtonSearchSimilarity >= 0.25) {
                        refinedSubButtons.push(subButton);
                    }
                }

                if (refinedSubButtons.length > 0) {
                    button.isActive = true;
                    button.subButtons = refinedSubButtons;

                    this.sidebarButtons.push(button);
                    continue;
                }
            }

            const buttonSearchSimilarity = stringSimilarity(searchTerm, button.title);

            if ((searchTerm.length < 3 && buttonSearchSimilarity >= 0.05) || (searchTerm.length >= 3 && buttonSearchSimilarity >= 0.25)) {
                if (button.subButtons != null) {
                    button.isActive = true;
                }

                this.sidebarButtons.push(button);
            }
        }

        this.searchProcessed = true;
    }

    public sidebarButtonClicked(sidebarButtonClickedPath: string): void {
        this.deactivateSidebarEvent.emit();

        this.router.navigate([sidebarButtonClickedPath]);
    }

    public emitSidebarButtonPathToActivate(): void {
        this.activateSidebarButtonSubject.next(this.activeSidebarButtonPath);
    }

    public emitActiveSidebarButtonPathToDeactivate(): void {
        this.deactivateSidebarButtonSubject.next(this.activeSidebarButtonPath);
    }

    public clearSearchInput(): void {
        this.searchTermInput.nativeElement.value = '';

        this.resetSearch();
    }

    public resetSearch(): void {
        this.searchTerm = undefined;
        this.searchTermEntered = false;

        this.sidebarButtons = this.buttons;
    }
    
    ngOnDestroy(): void {
        this.searchTermInputSubscription.unsubscribe();
    }
}
