import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { ContentDownloadModel } from "src/app/models/download-models/content.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnDestroy, OnInit {
    isLoading: boolean = true;

    componentInitialised: boolean = false;
    content!: ContentDownloadModel | undefined;
    url!: string;
    contentPath!: string;

    interval: number = 15;
    intervalId!: number;
    trackedTime: number = 0;

    routerPathChangeSubscription!: Subscription;

    constructor(private dataService: DataService,
                private router: Router) {
        this.routerPathChangeSubscription = router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        ).subscribe(() => {
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
        this.contentPath = encodeURIComponent(urlSplit[urlSplit.length - 1]);

        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId)
        }

        const contentModel = await this.dataService.getAsync<ContentDownloadModel>(`Content/Get?contentPath=${this.contentPath}`);
        contentModel.content = `
            <style scoped>
                .content p,
                .content li {
                    font-size: 1.65em;
                    color: #d9d9da;
                }

                .content a {
                    color: #04cad3;

                    cursor: pointer;
                }
                

                .content a:hover {
                    color: #03bac3;
                }

                .content h2,
                .content h3,
                .content h4 {
                    color: #04cad3;
                }

                .content h2 {
                    font-size: 2.5em;
                }

                .content h3 {
                    font-size: 2em;
                }

                .content h4 {
                    font-size: 1.75em;
                }

                .content figcaption {
                    background-color: #292c31;
                    color: #d9d9da;
                }
            </style>
            ${contentModel.content}
        `;

        this.content = contentModel;
        this.isLoading = false;

        this.intervalId = window.setInterval(() => {
            this.recordUserViewTime();
        }, 1000);
    }

    public recordUserViewTime(): void {
        if (document.hasFocus()) {
            this.trackedTime += 1;
            
            if (this.trackedTime === this.interval) {
                this.dataService.postWithoutBodyAsync(`Content/TrackUserTime?contentId=${this.content?.id}&interval=${this.interval}`);

                this.trackedTime = 0;
            }
        }
    }

    ngOnDestroy(): void {
        this.routerPathChangeSubscription.unsubscribe();
        clearInterval(this.intervalId);
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
