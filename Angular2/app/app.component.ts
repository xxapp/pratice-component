import { Component } from '@angular/core';

import { ItemComponent } from './item/item.component.ts';

@Component({
    selector: 'my-app',
    template: `<amazing-angular2 [text]="'Hello Wolrd!'">Loading...</amazing-angular2>
            <amazing-angular2 [text]="'Amazing Angular2!'">Loading...</amazing-angular2>
            <amazing-angular2 [text]="'Hello Angular2!'">Loading...</amazing-angular2>`,
    styles: [`
    `],
    directives: [ItemComponent]
})
export class AppComponent {};