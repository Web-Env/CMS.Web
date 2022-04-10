export class ContentUploadModel {
    title!: string;
    path!: string;
    sectionId!: string;

    constructor(
        title: string,
        path: string
    ) {
        this.title = title;
        this.path = path;
    }
}