import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { debounceTime, fromEvent, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, first, take } from 'rxjs/operators';
import { SidebarButtonViewModel } from "src/app/models/view-models/sidebar-button.model";
import { SidebarButton } from "src/app/ngrx/models/sidebarbutton.model";
import { loadSidebarButtons } from "src/app/ngrx/actions/sidebar/sidebar.actions";
import { AppState } from "src/app/ngrx/app.state";
import { selectAllSidebarButtons } from "src/app/ngrx/selectors/sidebar/sidebar.selectors";
import { stringSimilarity } from "string-similarity-js";

@Component({
    selector: 'app-sidebar-buttons-container',
    templateUrl: './sidebar-buttons-container.component.html',
    styleUrls: ['./sidebar-buttons-container.component.scss']
})
export class SidebarButtonsContainerComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    searchTermInputSubscription!: Subscription;

    url!: string;

    activeSidebarButtonPath!: string;
    deactivateSidebarButtonSubject: Subject<string> = new Subject<string>();

    searchTermEntered: boolean = false;
    searchTerm!: string | undefined;
    searchProcessed: boolean = false;

    sidebarButtonsConfigured: boolean = false;
    sidebarButtons: SidebarButtonViewModel[] = [];
    buttons: SidebarButtonViewModel[] = [];

    sidebarButtons$ = this.store.select(selectAllSidebarButtons);

    constructor(private store: Store<AppState>,
                private router: Router) { }

    ngOnInit(): void {
        this.url = this.router.url.replace('/', '');
        this.activeSidebarButtonPath = this.url;

        this.store.dispatch(loadSidebarButtons());

        this.addDefaultSidebarButtons()

        this.sidebarButtons$.subscribe(sidebarButtons => {
            if (!this.sidebarButtonsConfigured) {
                console.log (sidebarButtons)
                this.configureSidebarButtons(sidebarButtons);
            }
            else {
                console.log (sidebarButtons)
            }
        });
    }

    ngAfterViewInit(): void {
        this.searchTermInputSubscription = fromEvent(this.searchTermInput.nativeElement, 'input')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged())
            .subscribe(() => {
                let searchTerm = this.searchTermInput.nativeElement.value;

                if (searchTerm !== '') {
                    this.processSearchTerm(searchTerm);
                }
            });
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
        let urlSplit = this.url.split('/');
        let urlHasSubButton = urlSplit.length > 1;

        if (sidebarButtons !== null && sidebarButtons.length > 0) {
            this.sidebarButtonsConfigured = true;

            sidebarButtons.forEach((sidebarButton) => {
                if (sidebarButton.subButtons !== undefined && sidebarButton.subButtons.length > 0) {
                    let subButtons = new Array<SidebarButtonViewModel>();

                    //console.log (sidebarButton)
                    sidebarButton.subButtons.forEach(subButton => {
                        subButtons.push(
                            new SidebarButtonViewModel(
                                subButton.title,
                                subButton.path,
                                this.url === subButton.path,
                                null
                            )
                        )
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
                    //console.log (sidebarButton)
                    this.buttons.push(
                        new SidebarButtonViewModel(
                            sidebarButton.title,
                            sidebarButton.path,
                            this.url === sidebarButton.path,
                            null
                        )
                    );
                }
            })

            this.mapButtonsToSidebar();

            window.setTimeout(()=> {

                console.log (this.sidebarButtons)
            }, 5000)
        }
    }

    private mapButtonsToSidebar(): void {
        this.sidebarButtons = [];
        var promise = Promise.resolve();

        console.log (this.buttons)

        this.buttons.forEach((button) => {
            promise = promise.then(() => {
                this.sidebarButtons.push(button);
                return new Promise(function (resolve) {
                    setTimeout(resolve, 75);
                });
            });
        });
    }

    public searchTermChanged(searchInputEvent: any): void {
        let searchTerm = searchInputEvent.target.value;

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
            let button: SidebarButtonViewModel = Object.assign({}, this.buttons[i]);

            if (button.subButtons != null) {
                let refinedSubButtons = [];

                for (let j = 0; j <= button.subButtons.length - 1; j++) {
                    let subButton: SidebarButtonViewModel = Object.assign({}, button.subButtons[j]);

                    var subButtonSearchSimilarity = stringSimilarity(searchTerm, subButton.title);

                    if (subButtonSearchSimilarity >= 0.35) {
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

            var buttonSearchSimilarity = stringSimilarity(searchTerm, button.title);

            if ((searchTerm.length < 3 && buttonSearchSimilarity >= 0.05) || (searchTerm.length >= 3 && buttonSearchSimilarity >= 0.35)) {
                if (button.subButtons != null) {
                    button.isActive = true;
                }

                this.sidebarButtons.push(button);
            }
        }

        this.searchProcessed = true;
    }

    public sidebarButtonClicked(sidebarButtonClickedPath: string): void {
        this.emitActiveSidebarButtonPathToDeactivate();

        this.activeSidebarButtonPath = sidebarButtonClickedPath;

        this.router.navigate([this.activeSidebarButtonPath]);
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
