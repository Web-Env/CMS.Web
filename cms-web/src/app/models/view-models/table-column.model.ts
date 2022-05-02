export class TableColumn {
    data!: string;
    width!: number;

    constructor(
        data: string,
        width: number
    ) {
        this.data = data;
        this.width = width;
    }
}
