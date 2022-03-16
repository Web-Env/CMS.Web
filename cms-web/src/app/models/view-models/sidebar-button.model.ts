export class SidebarButton {
    title!: string;
    path!: string;
    isActive: boolean = false;
    subButtons!: Array<SidebarButton> | null;

    constructor(
        title: string,
        path: string,
        isActive: boolean,
        subButtons: Array<SidebarButton> | null) {
            this.title = title;
            this.path = path;
            this.isActive = isActive;
            this.subButtons = subButtons;
        }
}