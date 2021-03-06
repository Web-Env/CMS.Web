import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { SidebarButtonViewModel } from "src/app/models/view-models/sidebar-button.model";

import { SidebarButtonsContainerComponent } from './sidebar-buttons-container.component';
import { SidebarReducer } from "src/app/ngrx/reducers/sidebar/sidebar.reducer";
import { HomeComponent } from "src/app/components/home/home.component";

describe('SidebarButtonsContainerComponent', () => {
    let component: SidebarButtonsContainerComponent;
    let fixture: ComponentFixture<SidebarButtonsContainerComponent>;

    const buttons: Array<SidebarButtonViewModel> = [
        new SidebarButtonViewModel (
            'Home',
            'home',
            false,
            null
        ),
        new SidebarButtonViewModel (
            'Announcements',
            'announcements',
            false,
            null
        )
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarButtonsContainerComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes([
                    { path: 'home', component: HomeComponent }
                ]),
                StoreModule.forRoot({
                    sidebarButtons: SidebarReducer
                }),
                ToastrModule.forRoot()
            ],
            providers: [
                AuthService,
                DataService,
                ToastrService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarButtonsContainerComponent);
        component = fixture.componentInstance;

        component.buttons = buttons;

        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
        const searchTerm = 'Test';

        component.searchTermChanged({
            target: {
                value: searchTerm
            }
        });

        expect(component.searchTerm).toBe(searchTerm);
        expect(component.searchTermEntered).toBeTruthy();
    });

    it('#processSearchTerm should return no items if search term doesn\'t match any buttons', () => {
        const searchTerm = 'xyz';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBe(0);
    });

    it('#processSearchTerm should return no items if search term doesn\'t match any buttons', () => {
        const searchTerm = 'xyz';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBe(0);
    });

    it('#processSearchTerm should return items if search term matches any button', () => {
        const searchTerm = 'Home';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('#processSearchTerm should return items if search term matches any sub-button', () => {
        const newButtons = buttons.concat(new SidebarButtonViewModel (
            'Test Sidebar Button 3',
            'test-button-3',
            false,
            [
                new SidebarButtonViewModel(
                    'Test Sidebar Sub-Button 1',
                    'test-sidebar-subbutton-1',
                    false,
                    null
                )
            ]
        ));
        component.buttons = newButtons;
        const searchTerm = 'Sub-butt';
        component.searchTerm = searchTerm;

        (component as any).processSearchTerm(searchTerm);

        expect(component.sidebarButtons.length).toBe(1);
    });

    it('#sidebarButtonClicked should set activeSidebarButtonPath property', () => {
        component.sidebarButtonClicked('home');

        expect(component.activeSidebarButtonPath).toBe('');
    });

    it('#sidebarButtonClicked should call #deactivateSidebar', () => {
        spyOn(component, 'deactivateSidebar').and.callThrough();

        component.activeSidebarButtonPath = 'Test';
        component.sidebarButtonClicked('home');

        expect(component.deactivateSidebar).toHaveBeenCalled();
    });

    it('#clearSearchInput should clear input and call #resetSearch', () => {
        const inputElement = document.querySelector('.sidebar-button-search');
        if (inputElement !== undefined && inputElement !== null) {
            inputElement.innerHTML = 'Test';
            spyOn(component, 'resetSearch').and.callThrough();

            component.clearSearchInput();

            expect(inputElement.innerHTML).toBe('');
            expect(component.resetSearch).toHaveBeenCalled();
        }
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
