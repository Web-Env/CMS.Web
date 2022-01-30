import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from "rxjs";
import { SidebarButton } from "src/app/models/sidebar-button.model";

import { SidebarButtonComponent } from './sidebar-button.component';

describe('SidebarButtonComponent', () => {
    let component: SidebarButtonComponent;
    let fixture: ComponentFixture<SidebarButtonComponent>;

    let buttonTitle: string = "Test Sidebar Button";
    let buttonPath: string = "content/test-button";

    let subButton: SidebarButton = new SidebarButton (
        "Test Sidebar Sub-Button",
        "content/test-sub-button",
        false,
        null
    );

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarButtonComponent], 
            imports: [ BrowserAnimationsModule ]
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

    it('#sidebarButtonClicked should toggle isActive', () => {
        component.sidebarSubButtonClicked(buttonPath);

        expect(component.isActive).toBeTruthy();
    });

    it('#sidebarButtonClicked should toggle isActive and emit sidebarButtonClickedEvent', () => {
        spyOn(component, 'emitSidebarButtonClickedEvent');

        component.sidebarButtonClicked();

        fixture.detectChanges();

        expect(component.isActive).toBeTruthy();
        expect(component.emitSidebarButtonClickedEvent).toHaveBeenCalledWith(buttonPath);
    });

    it('#sidebarButtonClicked should toggle isActive if the sidebar button contains sub-buttons', () => {
        component.hasSubButtons = true;
        component.subButtons = [
            subButton
        ];

        component.sidebarSubButtonClicked(buttonPath);

        expect(component.isActive).toBeTruthy();
    });

    it('#sidebarSubButtonClicked should toggle isActive', () => {
        component.hasSubButtons = true;
        component.subButtons = [
            subButton
        ];

        component.sidebarSubButtonClicked(buttonPath);

        expect(component.isActive).toBeTruthy();
    });

    it('#sidebarSubButtonClicked should toggle isActive and emit sidebarButtonClickedEvent', () => {
        spyOn(component, 'emitSidebarButtonClickedEvent');

        component.sidebarSubButtonClicked(buttonPath);

        fixture.detectChanges();

        expect(component.isActive).toBeTruthy();
        expect(component.emitSidebarButtonClickedEvent).toHaveBeenCalledWith(buttonPath);
    });

    it('#activateButton should set isActive to true', () => {
        component.isActive = false;

        component.activateButton();
        
        expect(component.isActive).toBeTruthy();
    });

    it('#activateButton should set isActive to true', () => {
        component.isActive = true;

        component.deactivateButton();
        
        expect(component.isActive).toBeFalsy();
    });
});
