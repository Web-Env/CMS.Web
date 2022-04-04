import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { debounceTime, fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SidebarButton } from "src/app/models/view-models/sidebar-button.model";
import { stringSimilarity } from "string-similarity-js";

@Component({
    selector: 'app-sidebar-buttons-container',
    templateUrl: './sidebar-buttons-container.component.html',
    styleUrls: ['./sidebar-buttons-container.component.scss']
})
export class SidebarButtonsContainerComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    searchTermInputSubscription!: Subscription;

    activeSidebarButtonPath!: string;
    deactivateSidebarButtonSubject: Subject<string> = new Subject<string>();

    searchTermEntered: boolean = false;
    searchTerm!: string | undefined;
    searchProcessed: boolean = false;

    sidebarButtons: SidebarButton[] = [];
    buttons: SidebarButton[] = [
        new SidebarButton (
            "Home",
            "home",
            false,
            null
        ),
        new SidebarButton (
            "Announcements",
            "announcements",
            false,
            null
        ),
        new SidebarButton (
            "Meal Plans",
            "meal-plans",
            false,
            [
                new SidebarButton (
                    "Breakfast",
                    "content/meal-plans/breakfast",
                    false,
                    null
                ),
                new SidebarButton (
                    "Lunch",
                    "content/meal-plans/lunch",
                    false,
                    null
                ),
                new SidebarButton (
                    "Dinner",
                    "content/meal-plans/dinner",
                    false,
                    null
                ),
                new SidebarButton (
                    "Snacks & Hydration",
                    "content/meal-plans/snacks-&-hydration",
                    false,
                    null
                )
            ]
        ),
        new SidebarButton (
            "Home Exercises",
            "home-exercises",
            false,
            [
                new SidebarButton (
                    "Stretches At Home",
                    "content/home-exercises/stretches-at-home",
                    false,
                    null
                ),
                new SidebarButton (
                    "Body Weight Training",
                    "content/home-exercises/body-weight-training",
                    false,
                    null
                ),
                new SidebarButton (
                    "Free Weights",
                    "content/home-exercises/free-weights",
                    false,
                    null
                )
            ]
        ),
        new SidebarButton (
            "Gym",
            "gym",
            false,
            [
                new SidebarButton (
                    "What to Bring",
                    "content/gym/what-to-bring",
                    false,
                    null
                ),
                new SidebarButton (
                    "Your Trainer",
                    "content/gym/your-trainer",
                    false,
                    null
                )
            ]
        ),
        new SidebarButton (
            "Admin",
            "admin",
            false,
            [
                new SidebarButton (
                    "Users",
                    "admin/users",
                    false,
                    null
                ),
                new SidebarButton (
                    "Announcements",
                    "admin/announcements",
                    false,
                    null
                ),
                new SidebarButton (
                    "Sections",
                    "admin/sections",
                    false,
                    null
                ),
                new SidebarButton (
                    "Content",
                    "admin/content",
                    false,
                    null
                )
            ]
        )
    ];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.mapButtonsToSidebar();
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

    private mapButtonsToSidebar(): void {
        this.sidebarButtons = [];
        var promise = Promise.resolve();

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
            let button: SidebarButton = Object.assign({}, this.buttons[i]);

            if (button.subButtons != null) {
                let refinedSubButtons = [];

                for (let j = 0; j <= button.subButtons.length - 1; j++) {
                    let subButton: SidebarButton = Object.assign({}, button.subButtons[j]);

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
