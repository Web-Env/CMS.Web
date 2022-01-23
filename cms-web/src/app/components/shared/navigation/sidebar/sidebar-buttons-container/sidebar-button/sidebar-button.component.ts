import { Component, Input, OnInit } from '@angular/core';
// import { SidebarButtonEventService } from "src/app/services/events/sidebar-button.events.service";
// import { RoutingService } from "src/app/services/routing.service";
import { FadeIn } from "src/assets/animations/FadeIn";

@Component({
    selector: 'app-sidebar-button',
    templateUrl: './sidebar-button.component.html',
    styleUrls: ['./sidebar-button.component.scss'],
    animations: [
        FadeIn
    ]
})
export class SidebarButtonComponent implements OnInit{
    @Input() title!: string;
    @Input() path!: string;
    @Input() subButtons: any;
    @Input() isSubButton!: boolean;

    isActive: boolean = false;
    isVisible: boolean = false;

    hasSubButtons: boolean = false;

    lastButtonClicked!: string;

    constructor(//private sidebarButtonEventService: SidebarButtonEventService,
                //private routingService: RoutingService
                ) { }

    ngOnInit(): void {
        this.hasSubButtons = this.subButtons != null;
        // this.sidebarButtonEventService.sidebarButtonClickResultEventEmitter.subscribe((path) => {
        //     this.siderbarButtonEventHandler(path);
        // });
        // this.sidebarButtonEventService.sidebarSubButtonClickResultEventEmitter.subscribe((path) => {
        //     this.siderbarSubButtonEventHandler(path);
        // });

        // this.sidebarButtonEventService.sidebarButtonClickEventEmitter.subscribe((path) => {
        //     this.lastButtonClicked = path;
        // });
    }

    public buttonClicked(): void {
        if (this.hasSubButtons) {
            //this.sidebarButtonEventService.emitSidebarButtonClick(this.path);
            this.isActive = !this.isActive;
        }
        else {
            if (!this.isActive) {
                this.isActive = true;
            }
        }
    }

    private siderbarButtonEventHandler(paths: string[]) {
        if (paths.includes(this.path)) {
            this.isActive = true;
        }
        else {
            this.isActive = false;
        }
    }

    private siderbarSubButtonEventHandler(paths: string[]) {
        if (paths.includes(this.path)) {
            this.isActive = true;
            //this.routingService.navigateTo(this.path);
        }
        else {
            this.isActive = false;
        }
    }
}
