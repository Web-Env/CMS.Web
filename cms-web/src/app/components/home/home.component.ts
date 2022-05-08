import { Component, OnInit } from '@angular/core';
import { ContentDownloadModel } from "src/app/models/download-models/content.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isLoading: boolean = true;

    componentInitialised: boolean = false;
    content!: ContentDownloadModel | undefined;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.getContentAsync();
    }

    public async getContentAsync(): Promise<void> {
        this.content = undefined;

        const contentModel = await this.dataService.getAsync<ContentDownloadModel>(`Content/Get`);

        this.content = contentModel;
        this.isLoading = false;
    }

}
