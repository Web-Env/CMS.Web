import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from "rxjs";
import { SidebarButtonViewModel } from "src/app/models/view-models/sidebar-button.model";

import { SidebarButtonComponent } from './sidebar-button.component';

describe('SidebarButtonComponent', () => {
    let component: SidebarButtonComponent;
    let fixture: ComponentFixture<SidebarButtonComponent>;

    const buttonTitle: string = "Test Sidebar Button";
    const buttonPath: string = "content/test-button";

    const subButton: SidebarButtonViewModel = new SidebarButtonViewModel (
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
        component.activateSidebarButtonObservable = new BehaviorSubject<string>("");

        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#sidebarButtonClicked should emit sidebarButtonClickedEvent', () => {
        spyOn(component, 'emitSidebarButtonClickedEvent');

        component.sidebarButtonClicked();

        fixture.detectChanges();

        expect(component.emitSidebarButtonClickedEvent).toHaveBeenCalledWith(buttonPath);
    });

    it('#sidebarSubButtonClicked should toggle isActive', () => {
        component.sidebarSubButtonClicked(buttonPath);

        expect(component.isActive).toBeTruthy();
    });

    it('#sidebarSubButtonClicked should toggle isActive if the sidebar button contains sub-buttons', () => {
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

    it('#deactivateButton should set isActive to false', () => {
        component.isActive = true;

        component.deactivateButton();
        
        expect(component.isActive).toBeFalsy();
    });
});
