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
    }

}
