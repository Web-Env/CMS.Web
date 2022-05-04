import { Content } from "./content.model";
import { User } from "./user.model";

export class ContentTimeTracking {
    id: string = '';
    contentId: string = '';
    content: Content = new Content();
    totalTime: string = '';
    lastSeen!: Date;
}
