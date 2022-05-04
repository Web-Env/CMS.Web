import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { 
    loadContentTimeTrackingsByUserIdFailure, 
    loadContentTimeTrackingsByUserIdSuccess, 
    LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID } from "../../actions/content-time-tracking/content-time-tracking.actions";
import { ContentTimeTracking } from "../../models/content-time-tracking.model";

@Injectable()
export class ContentTimeTrackingEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadcontentTimeTrackingsByUserId$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID),
            switchMap((action: any) =>
                from(this.dataService.getArrayAsync<ContentTimeTracking>(`Content/ContentTimeTracking/GetAllByUserId?userId=${action.userId}`, ContentTimeTracking)).pipe(
                    map((contentTimeTrackings) => loadContentTimeTrackingsByUserIdSuccess({ contentTimeTrackings: contentTimeTrackings })),
                    catchError((error) => of(loadContentTimeTrackingsByUserIdFailure({ error })))
                )
            )
        )
    );
}
