export class SectionUploadModel {
    title!: string;
    path!: string;

    constructor(
        title: string,
        path: string
    ) {
        this.title = title;
        this.path = path;
    }
}
