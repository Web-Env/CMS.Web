import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    menuOpen: boolean = false;

    public menuButtonClicked(menuState: boolean) {
        this.menuOpen = menuState;
    }
}
