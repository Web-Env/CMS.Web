import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from "rxjs";
import { SidebarButton } from "src/app/models/sidebar-button.model";

import { SidebarButtonComponent } from './sidebar-button.component';

describe('SidebarButtonComponent', () => {
    let component: SidebarButtonComponent;
    let fixture: ComponentFixture<SidebarButtonComponent>;

    let buttonTitle: string = "Test Sidebar Button";
    let buttonPath: string = "content/test-button";

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarButtonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarButtonComponent);
        component = fixture.componentInstance;

        component.title = buttonTitle;
        component.path = buttonPath;
        component.isSubButton = false;
        component.deactivateSidebarButtonObservable = new BehaviorSubject<string>("");

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#sidebarButtonClicked should toggle isActive if the sidebar button contains sub-buttons ', () => {
        component.hasSubButtons = true;
        component.subButtons = [
            new SidebarButton (
                "Test Sidebar Sub-Button",
                "content/test-sub-button",
                false,
                null
            )
        ];

        component.sidebarSubButtonClicked(buttonPath);

        expect(component.isActive).toBeTruthy();
    });
});
