import { Content } from "./content.model";
import { User } from "./user.model";

export class Section {
    id: string = '';
    title: string = '';
    path: string = '';
    contents: Content[] = [];
    createdOn!: Date;
    createdBy: User = new User();
}
