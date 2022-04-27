import { User } from "./user.model";

export class Content {
    id: string = '';
    title: string = '';
    path: string = '';
    createdOn!: Date;
    createdBy: User = new User();
}