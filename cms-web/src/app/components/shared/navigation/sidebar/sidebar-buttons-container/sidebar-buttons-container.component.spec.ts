import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButtonsContainerComponent } from './sidebar-buttons-container.component';

describe('SidebarButtonsContainerComponent', () => {
  let component: SidebarButtonsContainerComponent;
  let fixture: ComponentFixture<SidebarButtonsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarButtonsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarButtonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
