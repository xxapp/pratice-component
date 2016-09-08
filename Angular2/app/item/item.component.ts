import { Component, Input } from '@angular/core';

@Component({
    selector: 'amazing-angular2',
    template: `<input [(ngModel)]="text">
            <button (click)="changeToUpperCase()">Upper Case</button>`,
    styles: [`
        :host {
            display: block;
        }
        :host-context(.theme-light) {
            background: #ccccff;
        }
    `]
})
export class ItemComponent {
    @Input()
    text = 'Hello Wolrd';

    changeToUpperCase() {
        this.text = this.text.toUpperCase();
    }
};