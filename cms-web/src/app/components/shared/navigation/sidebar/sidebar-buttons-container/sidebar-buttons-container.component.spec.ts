import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButton } from "src/app/models/sidebar-button.model";

import { SidebarButtonsContainerComponent } from './sidebar-buttons-container.component';

describe('SidebarButtonsContainerComponent', () => {
    let component: SidebarButtonsContainerComponent;
    let fixture: ComponentFixture<SidebarButtonsContainerComponent>;

    let buttons: Array<SidebarButton> = [
        new SidebarButton (
            'Home',
            'home',
            false,
            null
        ),
        new SidebarButton (
            'Announcements',
            'announcements',
            false,
            null
        )
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarButtonsContainerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarButtonsContainerComponent);
        component = fixture.componentInstance;

        component.buttons = buttons;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#mapButtonsToSidebar should push all elements from the buttons array to the sidebarButtons array', () => {
        (component as any).mapButtonsToSidebar();

        //Timeout to allow promise resolution
        window.setTimeout(() => {
            expect(component.sidebarButtons).toEqual(component.buttons);
        }, 150);
        
    });

    it('#searchTermChanged should call #resetSearch if search term is empty string', () => {
        component.searchTerm = 'Test';
        
        spyOn(component, 'resetSearch').and.callThrough();

        component.searchTermChanged({
            target: {
                value: ''
            }
        });

        fixture.detectChanges();

        expect(component.resetSearch).toHaveBeenCalled();
        expect(component.searchTerm).toBeUndefined();
        expect(component.searchTermEntered).toBeFalsy();
        expect(component.sidebarButtons).toEqual(component.buttons);
    });

    it('#searchTermChanged should set searchTermEntered and searchTerm properties', () => {
        let searchTerm = 'Test';

        component.searchTermChanged({
            target: {
                value: searchTerm
            }
        });

        expect(component.searchTerm).toBe(searchTerm);
        expect(component.searchTermEntered).toBeTruthy();
    });

    it('#processSearchTerm should return no items if search term doesn\'t match any buttons', () => {
        let searchTerm = 'xyz';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBe(0);
    });

    it('#processSearchTerm should return no items if search term doesn\'t match any buttons', () => {
        let searchTerm = 'xyz';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBe(0);
    });

    it('#processSearchTerm should return items if search term matches any button', () => {
        let searchTerm = 'Home';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('#processSearchTerm should return items if search term matches any sub-button', () => {
        var newButtons = buttons.concat(new SidebarButton (
            'Test Sidebar Button 3',
            'test-button-3',
            false,
            [
                new SidebarButton(
                    'Test Sidebar Sub-Button 1',
                    'test-sidebar-subbutton-1',
                    false,
                    null
                )
            ]
        ));
        component.buttons = newButtons;
        let searchTerm = 'Sub-butt';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBe(1);
    });

    it('#sidebarButtonClicked should set activeSidebarButtonPath property', () => {
        component.sidebarButtonClicked('home');

        expect(component.activeSidebarButtonPath).toBe('home');
    });

    it('#sidebarButtonClicked should call #emitActiveSidebarButtonPath', () => {
        spyOn(component, 'emitActiveSidebarButtonPathToDeactivate').and.callThrough();

        component.activeSidebarButtonPath = 'Test';
        component.sidebarButtonClicked('home');

        expect(component.emitActiveSidebarButtonPathToDeactivate).toHaveBeenCalled();
    });

    it('#clearSearchInput should clear input and call #resetSearch', () => {
        let inputElement = document.querySelector('.sidebar-button-search');
        inputElement!.innerHTML = 'Test';
        spyOn(component, 'resetSearch').and.callThrough();

        component.clearSearchInput();

        expect(inputElement!.innerHTML).toBe('');
        expect(component.resetSearch).toHaveBeenCalled();
    });

    it('#clearSearchInput should clear input and call #resetSearch', () => {
        component.searchTerm = 'Test';
        component.searchTermEntered = true;

        component.resetSearch();

        expect(component.searchTerm).toBeUndefined();
        expect(component.searchTermEntered).toBeFalsy();
        window.setTimeout(() => {
            expect(component.sidebarButtons).toEqual(component.buttons);
        }, 150);
    });
});
