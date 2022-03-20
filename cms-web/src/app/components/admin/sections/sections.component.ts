import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { addSection, loadSections } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { selectAllSections } from "src/app/ngrx/selectors/section.selectors";

@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
    sections$ = this.store.select(selectAllSections);

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        console.log("Add")
        const section = new Section();
        section.title = "Test";
        section.path = "test";
        this.store.dispatch(loadSections());
        this.store.dispatch(addSection(section));
        console.log("Added")
    }

    createNewSection(): void {
        const section = new Section();
        section.title = "Test";
        section.path = "test";
        this.store.dispatch(addSection(section));
    }
}
