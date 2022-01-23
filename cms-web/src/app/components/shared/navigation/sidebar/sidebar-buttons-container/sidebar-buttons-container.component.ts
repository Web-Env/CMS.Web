import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar-buttons-container',
    templateUrl: './sidebar-buttons-container.component.html',
    styleUrls: ['./sidebar-buttons-container.component.scss']
})
export class SidebarButtonsContainerComponent implements OnInit {
    sidebarButtons: any[] = [];
    buttons: any[] = [
        {
            title: "Home",
            path: "home",
            subButtons: null
        },
        {
            title: "Announcements",
            path: "announcements",
            subButtons: null
        },
        {
            title: "Meal Plans",
            path: "meal-plans",
            subButtons: [
                {
                    title: "Breakfast",
                    path: "content/meal-plans/breakfast",
                    subButtons: null
                },
                {
                    title: "Lunch",
                    path: "content/meal-plans/lunch",
                    subButtons: null
                },
                {
                    title: "Dinner",
                    path: "content/meal-plans/dinner",
                    subButtons: null
                },
                {
                    title: "Snacks & Hydration",
                    path: "content/meal-plans/snacks-&-hydration",
                    subButtons: null
                }
            ]
        },
        {
            title: "Home Exercises",
            path: "home-exercises",
            subButtons: [
                {
                    title: "Stretches At Home",
                    path: "content/home-exercises/stretches-at-home",
                    subButtons: null
                },
                {
                    title: "Body Weight Training",
                    path: "content/home-exercises/body-weight-training",
                    subButtons: null
                },
                {
                    title: "Free Weights",
                    path: "content/home-exercises/free-weights",
                    subButtons: null
                }
            ]
        },{
            title: "Gym",
            path: "gym",
            subButtons: [
                {
                    title: "What to Bring",
                    path: "content/gym/what-to-bring",
                    subButtons: null
                },
                {
                    title: "Your Trainer",
                    path: "content/gym/your-trainer",
                    subButtons: null
                }
            ]
        }
    ];

    constructor() { }

    ngOnInit(): void {
        var promise = Promise.resolve();
        this.buttons.forEach((button) => {
            promise = promise.then(() => {
                this.sidebarButtons.push(button);
                return new Promise(function (resolve) {
                    setTimeout(resolve, 75);
                });
            });
        });
        promise.finally(() => {
            this.sidebarButtons.push({
                title: "Admin",
                path: "admin",
                subButtons: [
                    {
                        title: "Users",
                        path: "admin/users",
                        subButtons: null
                    },
                    {
                        title: "Announcements",
                        path: "admin/announcements",
                        subButtons: null
                    },
                    {
                        title: "Sections",
                        path: "admin/sections",
                        subButtons: null
                    },
                    {
                        title: "Content",
                        path: "admin/content",
                        subButtons: null
                    }
                ]
            });
        });
    }

}
