import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { loadSections, loadSectionsFailure, loadSectionsSuccess } from "../../actions/section/section.actions";
import { AppState } from "../../app.state";
import { Section } from "../../models/section.model";

@Injectable()
export class SectionEffects {
    constructor(private actions$: Actions,
        private store: Store<AppState>,
        private dataService: DataService) { }

    loadSections$ = createEffect(() =>
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
}
