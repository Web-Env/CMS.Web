import { SectionDownloadModel } from "./section.model";

export class ContentDownloadModel {
    id: string = '';
    title: string = '';
    path: string = '';
    content: string = '';
    section!: SectionDownloadModel;
    createdOn!: Date;
    createdBy: string = '';
}