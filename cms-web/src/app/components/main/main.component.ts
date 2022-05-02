import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../shared/navigation/header/header.component";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

    menuOpen: boolean = false;

    public menuButtonClicked(menuState: boolean): void {
        this.menuOpen = menuState;
    }

    public handleDeactivateSidebarEvent(): void {
        this.menuOpen = false;

        this.headerComponent.sidebarOpened = false;
    }
}
