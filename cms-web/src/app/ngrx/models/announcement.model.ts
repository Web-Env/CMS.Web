import { User } from "./user.model";

export class Announcement {
    id: string = '';
    title: string = '';
    path: string = '';
    views: number = 0;
    createdOn!: Date;
    createdBy: User = new User();
}
