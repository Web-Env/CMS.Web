import { Section } from "./section.model";
import { User } from "./user.model";

export class Content {
    id: string = '';
    title: string = '';
    path: string = '';
    section: Section = new Section();
    createdOn!: Date;
    createdBy: User = new User();
}