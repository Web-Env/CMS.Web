export class ContentUploadModel {
    title!: string;
    path!: string;
    sectionId!: string;
    content!: string;

    constructor(
        title: string,
        path: string,
        content: string
    ) {
        this.title = title;
        this.path = path;
        this.content;
    }
}