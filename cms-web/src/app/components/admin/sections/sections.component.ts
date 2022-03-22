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
        this.store.dispatch(loadSections());
    }

    createNewSection(): void {
        const section = new Section();
        section.title = "5659864";
        section.path = "asasfasf";
    }
}
