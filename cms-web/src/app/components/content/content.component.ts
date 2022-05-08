import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { ContentDownloadModel } from "src/app/models/download-models/content.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: [
        './content.component.scss',
        '../../../assets/scss/shared/content.scss'
    ]
})
export class ContentComponent implements OnDestroy, OnInit {
    isLoading: boolean = true;
    isViewingAnnouncement: boolean = false;

    componentInitialised: boolean = false;
    content!: ContentDownloadModel | undefined;
    url!: string;
    contentPath!: string;

    interval: number = 15;
    intervalId!: number;
    trackedTime: number = 0;

    routerPathChangeSubscription!: Subscription;

    constructor(private dataService: DataService,
                private router: Router,
                private datePipe: DatePipe) {
        this.routerPathChangeSubscription = router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                if (this.componentInitialised) {
                    this.getContentAsync();
                }
            }
        );
    }

    ngOnInit(): void {
        this.componentInitialised = true;
        this.getContentAsync();
    }

    public async getContentAsync(): Promise<void> {
        this.content = undefined;
        this.url = this.router.url;
        const urlSplit = this.url.split('/');
        this.isViewingAnnouncement = urlSplit[1] === 'announcement';
        this.contentPath = encodeURIComponent(urlSplit[urlSplit.length - 1]);

        if (this.intervalId !== undefined && !this.isViewingAnnouncement) {
            clearInterval(this.intervalId);
        }

        const endpoint = this.isViewingAnnouncement ? 'Announcement' : 'Content';
        const parameters = this.isViewingAnnouncement ? 'announcementPath' : 'contentPath';
        const url = `${endpoint}/Get?${parameters}=${this.contentPath}`;

        const contentModel = await this.dataService.getAsync<ContentDownloadModel>(url);
        contentModel.content = `
            ${this.isViewingAnnouncement ? 
                `<div class="created-on"><small>${this.datePipe.transform(contentModel.createdOn, 'dd MMMM yyyy hh:mm')}</small></div>` : 
                ''}

            ${contentModel.content}
        `;

        this.content = contentModel;
        this.isLoading = false;

        if (!this.isViewingAnnouncement) {
            this.intervalId = window.setInterval(() => {
                this.recordUserViewTime();
            }, 1000);
        }
    }

    public recordUserViewTime(): void {
        if (document.hasFocus() && !this.isViewingAnnouncement) {
            this.trackedTime += 1;
            
            if (this.trackedTime === this.interval) {
                this.dataService.postWithoutBodyAsync(`Content/ContentTimeTracking/Record?contentId=${this.content?.id}&interval=${this.interval}`);

                this.trackedTime = 0;
            }
        }
    }

    ngOnDestroy(): void {
        this.routerPathChangeSubscription.unsubscribe();

        if (!this.isViewingAnnouncement) {
            clearInterval(this.intervalId);
        }
    }

}

@Pipe({
    name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(v: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(v);
    }
}
