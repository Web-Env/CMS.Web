import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { 
    addAnnouncement, 
    addAnnouncementFailure, 
    addAnnouncementSuccess, 
    loadAnnouncements, 
    loadAnnouncementsFailure, 
    loadAnnouncementsSuccess, 
    removeAnnouncement, 
    removeAnnouncementFailure, 
    removeAnnouncementSuccess, 
    updateAnnouncement, 
    updateAnnouncementFailure, 
    updateAnnouncementSuccess } from "../../actions/announcement/announcement.actions";
import { Announcement } from "../../models/announcement.model";

@Injectable()
export class AnnouncementEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadAnnouncements$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAnnouncements),
            switchMap(() =>
                from(this.dataService.getArrayAsync<Announcement>('Announcement/GetAll?page=1&pageSize=150', Announcement)).pipe(
                    map((announcements) => loadAnnouncementsSuccess({ announcements })),
                    catchError((error) => of(loadAnnouncementsFailure({ error })))
                )
            )
        )
    );

    addAnnouncement$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(addAnnouncement),
            switchMap((action) =>
                from(this.dataService.postAsync<Announcement>('Announcement/Add', action.announcement, Announcement)).pipe(
                    map((announcement: Announcement) => addAnnouncementSuccess({ announcement })),
                    catchError((error) => of(addAnnouncementFailure(error)))
                )
            )
        )
    );

    updateAnnouncement$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAnnouncement),
            switchMap((action) =>
                from(this.dataService.putAsync<Announcement>('Announcement/Update', action.announcement, Announcement)).pipe(
                    map((announcement: any) => updateAnnouncementSuccess(announcement)),
                    catchError((error) => of(updateAnnouncementFailure(error)))
                )
            )
        )
    );

    removeAnnouncement$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(removeAnnouncement),
            switchMap((action) =>
                from(this.dataService.deleteAsync(`Announcement/Delete?announcementId=${action.announcementId}`)).pipe(
                    map(() => removeAnnouncementSuccess({ announcementId: action.announcementId })),
                    catchError((error) => of(removeAnnouncementFailure(error)))
                )
            )
        )
    );
}
