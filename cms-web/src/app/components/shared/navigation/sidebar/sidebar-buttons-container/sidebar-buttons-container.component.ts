import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SidebarButton } from "src/app/models/sidebar-button.model";
import { stringSimilarity } from "string-similarity-js";

@Component({
    selector: 'app-sidebar-buttons-container',
    templateUrl: './sidebar-buttons-container.component.html',
    styleUrls: ['./sidebar-buttons-container.component.scss']
})
export class SidebarButtonsContainerComponent implements AfterViewInit, OnInit {
    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    private searchTermInputTimeOutObservable!: Observable<any>;

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

    constructor() { }

    ngOnInit(): void {
        this.mapButtonsToSidebar();
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchTermInput.nativeElement, 'input')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged())
            .subscribe((data: any) => {
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

            var searchSimilarity = stringSimilarity(searchTerm, button.title);

            console.log (`Button: ${button.title} -------- ${searchSimilarity}`)

            if ((searchTerm.length < 3 && searchSimilarity >= 0.05) || (searchTerm.length >= 3 && searchSimilarity >= 0.35)) {
                if (button.subButtons != null) {
                    button.isActive = true;
                }

                this.sidebarButtons.push(button);
            }

            if (button.subButtons != null) {
                let refinedSubButtons = [];

                for (let j = 0; j <= button.subButtons.length - 1; j++) {
                    let subButton: SidebarButton = Object.assign({}, button.subButtons[j]);

                    var searchSimilarity = stringSimilarity(searchTerm, subButton.title);

                    console.log (`Sub-button: ${subButton.title} -------- ${searchSimilarity}`)

                    if (searchSimilarity >= 0.35) {
                        refinedSubButtons.push(subButton);
                    }
                }

                if (refinedSubButtons.length > 0) {
                    button.isActive = true;
                    button.subButtons = refinedSubButtons;

                    this.sidebarButtons.push(button);
                }
            }
        }

        this.searchProcessed = true;
    }

    public clearSearchInput(): void {
        this.searchTermInput.nativeElement.value = '';

        this.resetSearch();
    }

    private resetSearch(): void {
        this.searchTerm = undefined;
        this.searchTermEntered = false;

        this.sidebarButtons = this.buttons;
    }
}
