import { Component } from '@angular/core';

import { EmulatorComponent } from '../emulator/emulator.component.ts';
import { DataContainerComponent} from '../dataContainer/dataContainer.component.ts'

@Component({
    selector: 'my-app',
    template: `
        <div class="first"><emulator></emulator></div>
        <div class="second"><data-container></data-container></div>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            align-items: stretch;
            height: 700px;
            background: #cccccc;
            padding: 10px;
            border-radius: 4px;
        }

        .first {
            width: 300px;
            background: #007acc;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .second {
            flex-grow: 1;
            margin-left: 10px;
        }
    `],
    directives: [EmulatorComponent, DataContainerComponent]
})
export class AppComponent {};