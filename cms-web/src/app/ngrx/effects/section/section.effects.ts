import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { addSection, addSectionFailure, addSectionSuccess, loadSections, loadSectionsFailure, loadSectionsSuccess, removeSection, removeSectionFailure, removeSectionSuccess } from "../../actions/section/section.actions";
import { Section } from "../../models/section.model";

@Injectable()
export class SectionEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadSections$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSections),
            switchMap(() =>
                from(this.dataService.getArrayAsync<Section>('Section/GetAll?page=1&pageSize=25', Section)).pipe(
                    map((sections) => loadSectionsSuccess({ sections: sections })),
                    catchError((error) => of(loadSectionsFailure({ error })))
                )
            )
        )
    );

    addSection$: CreateEffectMetadata = createEffect(() => 
        this.actions$.pipe(
            ofType(addSection),
            switchMap((action) => 
                from(this.dataService.postAsync<Section>('Section/Add', action.section, Section)).pipe(
                    map((section: any) => addSectionSuccess(section)),
                    catchError((error) => of(addSectionFailure(error)))
                )
            )
        )
    );

    removeSection$: CreateEffectMetadata = createEffect(() => 
        this.actions$.pipe(
            ofType(removeSection),
            switchMap((action) => 
                from(this.dataService.deleteAsync(`Section/Remove?sectionId=${action.sectionId}`)).pipe(
                    map(() => removeSectionSuccess({ sectionId: action.sectionId })),
                    catchError((error) => of(removeSectionFailure(error))))
            )
        )
    );
}
