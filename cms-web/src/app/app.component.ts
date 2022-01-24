import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Member\'s Area';
    sidebarOpened: boolean = false;
    stageOverlayInflated: boolean = false;
    stageOverlayVisible: boolean = false;
}