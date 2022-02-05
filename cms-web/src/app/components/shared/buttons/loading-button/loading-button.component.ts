import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: [
        './loading-button.component.scss'
    ]
})
export class LoadingButtonComponent {
    @Input() buttonText!: string;
    @Input() isLoading!: boolean;
    @Input() isDisabled!: boolean;
}
