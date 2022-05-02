import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "src/app/services/auth/auth.service";

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

    @Output() menuButtonClickedEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        const firstName = localStorage.getItem('FirstName');
        const lastName = localStorage.getItem('LastName');
        this.initializeUserComponent(`${firstName} ${lastName}`);
    }

    private initializeUserComponent(userName: string): void {
        this.userName = userName;
        this.userComponentVisible = true;
    }

    public menuButtonClicked(): void {
        this.sidebarOpened = !this.sidebarOpened;

        this.menuButtonClickedEvent.emit(this.sidebarOpened);
    }

    public userClicked(): void {
        this.userMenuActive = !this.userMenuActive;
    }

    public logOutButtonClicked(): void {
        this.authService.logOut();
    }
}
