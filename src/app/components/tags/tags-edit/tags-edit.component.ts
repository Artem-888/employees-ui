import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {BaseComponent} from '../../../shared/base-component/base-component.component';
import {catchError, EMPTY, finalize, takeUntil} from 'rxjs';
import {Tag} from '../../../interfaces/tag';

@Component({
  selector: 'app-tags-edit',
  templateUrl: './tags-edit.component.html',
})
export class TagsEditComponent extends BaseComponent implements OnInit {
  tagsForm!: FormGroup;
  tagControl = new FormControl({ value: '', disabled: false }, Validators.required);
  loadingForm: boolean = false;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.tagService.getTags().pipe(
      catchError((err) => {
        this.showErrorNotification(err.error.message);
        this.tagControl.reset();
        return EMPTY;
      }),
      finalize(() => {
        this.loading$.next(false);
      }),
      takeUntil(this.destroy)
    ).subscribe(tags => {
      this.tagService.tags.next(tags);
      this.initializeForm(tags);
    });
  }

  initializeForm(tags: Tag[]) {
    const tagControls = tags.map(tag => new FormControl({name: tag.name, id: tag._id}));
    this.tagsForm = this.fb.group({
      tags: this.fb.array(tagControls),
    });
  }

  get tags() {
    return (this.tagsForm.get('tags') as FormArray);
  }

  addTag() {
    if (this.tagControl.valid) {
      const newTag = this.tagControl.value;
      this.loadingForm = true;
      this.tagControl.disable();
      this.tagService.createTag(newTag).pipe(
        catchError((err) => {
          this.showErrorNotification(err.error.message);
          this.tagControl.reset();
          return EMPTY;
        }),
        finalize(() => {
          this.loadingForm = false;
          this.tagControl.enable();
          this.tagControl.reset();
        }),
        takeUntil(this.destroy)
      ).subscribe(tags => {
        this.tagService.tags.next(tags);
        this.showInfoNotification('Tag added successfully.');
        this.tags.push(new FormControl({name: newTag, id: null}));
      });
    }
  }

  removeTag(index: number) {
    const tagId = this.tags.at(index).value.id;
    this.tags.removeAt(index);

    if (tagId) {
      this.loadingForm = true;
      this.tagControl.disable();
      this.tagService.deleteTag(tagId).pipe(
        catchError((err) => {
          this.showErrorNotification(err.error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.tagControl.enable();
          this.loadingForm = false
        }),
        takeUntil(this.destroy)
      ).subscribe(tags => {
        this.tagService.tags.next(tags);
        this.showInfoNotification('The tag was successfully removed.');
      });
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
}
