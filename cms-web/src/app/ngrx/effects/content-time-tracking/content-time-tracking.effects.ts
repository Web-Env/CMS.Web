import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { loadContentTimeTrackings, loadContentTimeTrackingsFailure, loadContentTimeTrackingsSuccess } from "../../actions/content-time-tracking/content-time-tracking.actions";
import { ContentTimeTracking } from "../../models/content-time-tracking.model";

@Injectable()
export class ContentTimeTrackingEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadcontentTimeTrackings$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContentTimeTrackings),
            switchMap(() =>
                from(this.dataService.getArrayAsync<ContentTimeTracking>('Content/ContentTimeTracking/GetAll', ContentTimeTracking)).pipe(
                    map((contentTimeTrackings) => loadContentTimeTrackingsSuccess({ contentTimeTrackings: contentTimeTrackings })),
                    catchError((error) => of(loadContentTimeTrackingsFailure({ error })))
                )
            )
        )
    );
}
