export class TableColumn {
    data!: string;
    width!: number;
    dataType: string = 'string';

    constructor(
        data: string,
        width: number,
        dataType: string = 'string'
    ) {
        this.data = data;
        this.width = width;
        this.dataType = dataType;
    }
}
