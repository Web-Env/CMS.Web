import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ContentDownloadModel } from "src/app/models/download-models/content.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    content!: ContentDownloadModel
    url!: string;
    contentPath!: string;

    constructor(private dataService: DataService,
                private router: Router) {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                }

    async ngOnInit(): Promise<void> {
        this.url = this.router.url;
        let urlSplit = this.url.split('/');
        this.contentPath = encodeURIComponent(urlSplit[urlSplit.length - 1]);
        console.log (this.contentPath)

        this.content = await this.dataService.getAsync<ContentDownloadModel>(`Content/Get?contentPath=${this.contentPath}`);
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
