import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Output() deactivateSidebarEvent: EventEmitter<boolean> = new EventEmitter();
    
    userName!: string;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        const firstName = localStorage.getItem('FirstName');
        const lastName = localStorage.getItem('LastName');

        this.userName = `${firstName} ${lastName}`;
    }

    public logOutButtonClicked(): void {
        this.authService.logOut();
    }

    public handleDeactivateSidebarEvent(): void {
        this.deactivateSidebarEvent.emit();
    }

}
