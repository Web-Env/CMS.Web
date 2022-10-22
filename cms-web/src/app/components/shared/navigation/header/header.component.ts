import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {
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

        window.addEventListener('click', this.handleWindowClick.bind(this), false);
    }

    private initializeUserComponent(userName: string): void {
        this.userName = userName;
        this.userComponentVisible = true;
    }

    public menuButtonClicked(): void {
        this.sidebarOpened = !this.sidebarOpened;

        this.menuButtonClickedEvent.emit(this.sidebarOpened);
    }

    private handleWindowClick(e: MouseEvent): void {
        var path = e.composedPath() as Element[];
        var pathClassNames = path.map(x => x.className);

        if (pathClassNames.includes('sidebar-container') || pathClassNames.includes('menu-button-container')) {
            return;
        }
        else {
            if (this.sidebarOpened) {
                this.menuButtonClicked();
            }
        }
    }

    public userClicked(): void {
        this.userMenuActive = !this.userMenuActive;
    }

    public logOutButtonClicked(): void {
        this.authService.logOut();
    }

    ngOnDestroy(): void {
        window.removeEventListener('click', this.handleWindowClick, false);
    }
}
