import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(
                () => TextInputComponent
            ),
            multi: true
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
    @Input() parentForm!: FormGroup;
    @Input() inputId!: string;
    @Input() inputName!: string;
    @Input() inputTitle!: string;
    @Input() inputType: string = 'text';
    @Input() inputErrorMessage!: string;
    @Input() disabled: boolean = false;

    hasError: boolean = false;
    displayedErrorMessage: string = '';

    changed!: (value: string) => void;
    touched!: () => void;
    isDisabled: boolean = false;

    inputValue: string = '';

    inputActive: boolean = false;
    inputPopulated: boolean = false;

    get formInput(): FormControl {
        return this.parentForm?.get(this.inputName) as FormControl;
    }

    constructor() { }

    ngOnInit(): void {
        if (this.inputErrorMessage === undefined) {
            this.inputErrorMessage = `${this.inputTitle} cannot be empty`;
        }
    }

    public changeInputState(active: boolean): void {
        this.inputActive = active;
        this.inputPopulated = this.inputValue !== '';

        if (!this.inputActive) {
            if (this.formInput.invalid) {
                this.hasError = true;
                this.displayedErrorMessage = this.inputErrorMessage;
            }
            else {
                this.hasError = false;
                this.displayedErrorMessage = '';
            }
        }
    }
    
    public inputChanged(inputChangedEvent: any): void {
        if (inputChangedEvent?.target?.value !== null) {
            this.inputValue = inputChangedEvent.target.value;

            this.changed(this.inputValue);
        }
    }

    public writeValue(value: string): void {
        this.inputValue = value;

        this.inputPopulated = value !== '';
    }

    public registerOnChange(fn: any): void {
        this.changed = fn;
    }
    
    public registerOnTouched(fn: any): void {
        this.touched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }

}
