import { User } from "./user.model";

export class Section {
    id: string = '';
    title: string = '';
    path: string = '';
    createdOn!: Date;
    createdBy: User = new User();
}
