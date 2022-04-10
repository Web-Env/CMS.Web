import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { loadSidebarButtons, loadSidebarButtonsFailure, loadSidebarButtonsSuccess } from "../../actions/sidebar/sidebar.actions";
import { SidebarButton } from "../../models/sidebarbutton.model";

@Injectable()
export class SidebarEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadSidebarButtons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSidebarButtons),
            switchMap(() =>
                from(this.dataService.getArrayAsync<SidebarButton>('Sidebar/GetSidebarButtons', SidebarButton)).pipe(
                    map((sidebarButtons) => loadSidebarButtonsSuccess({ sidebarButtons: sidebarButtons })),
                    catchError((error) => of(loadSidebarButtonsFailure({ error })))
                )
            )
        )
    );
}
