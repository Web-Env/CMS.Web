import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { 
    addContent, 
    addContentFailure, 
    addContentSuccess, 
    loadContents, 
    loadContentsFailure, 
    loadContentsSuccess, 
    removeContent, 
    removeContentFailure, 
    removeContentSuccess, 
    updateContent, 
    updateContentFailure, 
    updateContentSuccess } from "../../actions/content/content.actions";
import { Content } from "../../models/content.model";

@Injectable()
export class ContentEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadContents$: CreateEffectMetadata = createEffect(() =>
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

    addContent$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(addContent),
            switchMap((action) =>
                from(this.dataService.postAsync<Content>('Content/Add', action.content, Content)).pipe(
                    map((content: Content) => addContentSuccess({ content })),
                    catchError((error) => of(addContentFailure(error)))
                )
            )
        )
    );

    updateContent$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(updateContent),
            switchMap((action) =>
                from(this.dataService.putAsync<Content>('Content/Update', action.content, Content)).pipe(
                    map((content: any) => updateContentSuccess(content)),
                    catchError((error) => of(updateContentFailure(error)))
                )
            )
        )
    );

    removeContent$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(removeContent),
            switchMap((action) =>
                from(this.dataService.deleteAsync(`Content/Delete?contentId=${action.contentId}`)).pipe(
                    map(() => removeContentSuccess({ contentId: action.contentId })),
                    catchError((error) => of(removeContentFailure(error)))
                )
            )
        )
    );
}
