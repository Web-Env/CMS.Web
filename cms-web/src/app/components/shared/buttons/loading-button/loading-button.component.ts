import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: [
        './loading-button.component.scss'
    ]
})
export class LoadingButtonComponent {
    @Input() buttonText!: string;
    @Input() buttonType: string = 'button';
    @Input() isLoading!: boolean;
    @Input() isDisabled!: boolean;
    @Input() useNegativeColour: boolean = false;
}
