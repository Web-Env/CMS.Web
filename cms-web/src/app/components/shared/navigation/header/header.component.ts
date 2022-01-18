import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userComponentVisible: boolean = false;
    userMenuActive: boolean = false;
    userName!: string;
    sidebarOpened: boolean = false;

    constructor() { }

    ngOnInit(): void {
        // this.userDataEventService.userNameEventEmitter.subscribe((userName: string) => {
        //     this.initializeUserComponent(userName);
        // });
        this.initializeUserComponent('John Doe');
    }

    private initializeUserComponent(userName: string): void {
        this.userName = userName;
        this.userComponentVisible = true;
    }

    public menuButtonClicked(): void {
        this.sidebarOpened = !this.sidebarOpened;
    }

    public userClicked(): void {
        this.userMenuActive = !this.userMenuActive;
    }
}
