import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadContentTimeTrackingsByUserId, LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_SUCCESS } from "src/app/ngrx/actions/content-time-tracking/content-time-tracking.actions";
import { loadUserById, LOAD_USER_BY_ID_SUCCESS } from "src/app/ngrx/actions/user/user.actions";
import { AppState } from "src/app/ngrx/app.state";
import { ContentTimeTracking } from "src/app/ngrx/models/content-time-tracking.model";
import { User } from "src/app/ngrx/models/user.model";
import { UrlHelperService } from "src/app/services/url-helper.service";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnDestroy, OnInit {
    userIsLoading: boolean = true;
    isContentTimeTrackingLoaded: boolean = false;

    disabledUserForm!: FormGroup;

    user!: User;
    contentTimeTrackings!: Array<TableRow>;
    headers: Array<TableColumn> = [
        new TableColumn(
            'Content',
            80
        ),
        new TableColumn(
            'Time Spent',
            20,
            'number'
        )
    ];

    loadDataSubscription!: Subscription;

    constructor(private store: Store<AppState>,
                private actions$: ActionsSubject,
                private activatedRoute: ActivatedRoute,
                private urlHelperService: UrlHelperService) {}

    ngOnInit(): void {
        var routeParams = this.activatedRoute.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) &&
            this.urlHelperService.isRouteParamValid(routeParams['userId'])) {

            this.store.dispatch(new loadUserById(routeParams['userId']));
            this.store.dispatch(new loadContentTimeTrackingsByUserId(routeParams['userId']));

            this.loadDataSubscription = this.actions$.pipe(ofType(LOAD_USER_BY_ID_SUCCESS, LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_SUCCESS)).subscribe((data: any) => {
                if (data !== undefined && data.type !== undefined) {
                    if (data.type === LOAD_USER_BY_ID_SUCCESS) {
                        this.user = data.user;

                        this.buildForm();

                        this.userIsLoading = false;
                    }
                    else if (data.type === LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_SUCCESS) {

                        const contentTimeTrackingRows = new Array<TableRow>();

                        if (data.contentTimeTrackings !== null) {
                            data.contentTimeTrackings.forEach((contentTimeTracking: ContentTimeTracking) => {
                                contentTimeTrackingRows.push(
                                    this.mapContentTimeTrackingToTableRow(contentTimeTracking)
                                );
                            });
                        }

                        this.contentTimeTrackings = contentTimeTrackingRows;
                        this.isContentTimeTrackingLoaded = true;
                    }
                }
            });
        }
    }

    public buildForm(): void {
        this.disabledUserForm = new FormGroup({
            firstName: new FormControl(
                this.user.firstName
            ),
            lastName: new FormControl(
                this.user.lastName
            ),
            email: new FormControl(
                this.user.email
            ),
            isAdmin: new FormControl(
                this.user.isAdmin
            )
        });
    }

    private mapContentTimeTrackingToTableRow(contentTimeTracking: ContentTimeTracking): TableRow {
        return new TableRow(
            contentTimeTracking.id,
            [
                new TableColumn(
                    contentTimeTracking.content.title,
                    80
                ),
                new TableColumn(
                    new Date(parseInt(contentTimeTracking.totalTime) * 1000).toISOString().substr(11, 8),
                    20,
                    'number'
                )
            ]
        );
    }

    ngOnDestroy(): void {
        this.loadDataSubscription?.unsubscribe();
    }

}
