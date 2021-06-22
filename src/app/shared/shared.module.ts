import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzCardModule} from "ng-zorro-antd/card";



@NgModule({
  declarations: [
    SearchAutocompleteComponent
  ],
  exports: [
    SearchAutocompleteComponent
  ],
    imports: [
        CommonModule,
        NzAutocompleteModule,
        NzInputModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule,
        NzButtonModule,
        NzAvatarModule,
        NzSpinModule,
        NzCardModule
    ]
})
export class SharedModule { }
