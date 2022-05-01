import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { FadeIn } from "src/assets/animations/FadeIn";

@Component({
    selector: 'app-sidebar-button',
    templateUrl: './sidebar-button.component.html',
    styleUrls: ['./sidebar-button.component.scss'],
    animations: [
        FadeIn
    ]
})
export class SidebarButtonComponent implements OnDestroy, OnInit {
    @Input() title!: string;
    @Input() path!: string;
    @Input() subButtons: any;
    @Input() isSubButton!: boolean;
    @Input() isActive: boolean = false;
    @Input() deactivateSidebarButtonObservable!: Observable<string>;
    deactivateSidebarButtonSubscription!: Subscription;

    @Output() sidebarButtonClickedEventEmitter: EventEmitter<string> = new EventEmitter();
    
    hasSubButtons: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.hasSubButtons = this.subButtons != null;

        this.deactivateSidebarButtonSubscription = this.deactivateSidebarButtonObservable.subscribe((deactivatedSidebarButtonPath: string) => {
            if (this.isActive && this.path.replace('content/', '') === deactivatedSidebarButtonPath) {
                this.deactivateButton();
            }
        });
    }

    public sidebarButtonClicked(): void {
        if (this.hasSubButtons) {
            this.isActive = !this.isActive;
        }
        else {
            if (!this.isActive) {
                this.activateButton();

                this.emitSidebarButtonClickedEvent(this.path);
            }
        }
    }

    public sidebarSubButtonClicked(path: string): void {
        if (!this.isActive) {
            this.activateButton();
        }

        this.emitSidebarButtonClickedEvent(path);
    }

    public emitSidebarButtonClickedEvent(path: string): void {
        this.sidebarButtonClickedEventEmitter.emit(path);
    }

    public activateButton(): void {
        this.isActive = true;
    }

    public deactivateButton(): void {
        this.isActive = false;
    }

    ngOnDestroy(): void {
        this.deactivateSidebarButtonSubscription.unsubscribe();
    }
}
