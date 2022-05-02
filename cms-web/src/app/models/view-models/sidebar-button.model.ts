export class SidebarButtonViewModel {
    title!: string;
    path!: string;
    isActive: boolean = false;
    subButtons!: Array<SidebarButtonViewModel> | null;

    constructor(
        title: string,
        path: string,
        isActive: boolean,
        subButtons: Array<SidebarButtonViewModel> | null
    ) {
        this.title = title;
        this.path = path;
        this.isActive = isActive;
        this.subButtons = subButtons;
    }
}
