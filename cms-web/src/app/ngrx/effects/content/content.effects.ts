import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { addContent, addContentFailure, addContentSuccess, loadContents, loadContentsFailure, loadContentsSuccess } from "../../actions/content/content.actions";
import { Content } from "../../models/content.model";

@Injectable()
export class ContentEffects {
    constructor(private actions$: Actions,
        private dataService: DataService) { }

    loadContents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContents),
            switchMap(() =>
                from(this.dataService.getArrayAsync<Content>('Content/GetAll?page=1&pageSize=25', Content)).pipe(
                    map((contents) => loadContentsSuccess({ contents: contents })),
                    catchError((error) => of(loadContentsFailure({ error })))
                )
            )
        )
    );

    addContent$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addContent),
            switchMap((action) => 
                from(this.dataService.postAsync<Content>('Content/Add', action.content, Content)).pipe(
                    map((content: any) => addContentSuccess(content)),
                    catchError((error) => of(addContentFailure(error)))
                )
            )
        )
    );
}
