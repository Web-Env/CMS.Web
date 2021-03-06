import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    title: string = 'Member\'s Area';
    sidebarOpened: boolean = false;
    stageOverlayInflated: boolean = false;
    stageOverlayVisible: boolean = false;
}
