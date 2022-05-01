import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingButtonComponent } from './loading-button.component';

describe('LoadingButtonComponent', () => {
    let component: LoadingButtonComponent;
    let fixture: ComponentFixture<LoadingButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingButtonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
