import {NgModule} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TagsEditComponent} from './tags-edit/tags-edit.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';


@NgModule({
  declarations: [TagsEditComponent],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    NgIf,
    MatProgressBar,
  ]
})
export class TagsModule {
}
