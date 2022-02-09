import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
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

    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit(): void {
        let firstName = localStorage.getItem('FirstName');
        let lastName = localStorage.getItem('LastName');
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

        this.router.navigate(['login']);
    }
}
