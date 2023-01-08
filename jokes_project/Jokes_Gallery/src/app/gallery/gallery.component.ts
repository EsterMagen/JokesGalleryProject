import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, FormArray} from "@angular/forms";
import { HttpClient }  from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { JokeDetailsModalComponent } from '../joke-details-modal/joke-details-modal.component';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  public formgroup: FormGroup = new FormGroup({});
  protected unsubscribe$ = new Subject<void>();
  httpMap: any;
  protected suggestedJokesArray: any = {};

  constructor(public formbuilder: FormBuilder, public http: HttpClient, public dialog: MatDialog) { 
    this.httpMap = http; 
  } 

  ngOnInit() {
    this.getMappingData().pipe(takeUntil(this.unsubscribe$)).subscribe((mappings: any) => {
      this.formgroup = this.doPopulateFormGroup(mappings, new FormGroup({}));
    });
  }

  getMappingData() {
    return this.httpMap.get('/assets/jokes-json.json');
  }

  doPopulateFormGroup(mappings: any, formGroup: any): FormGroup {
      if (mappings instanceof Object) {
        Object.keys(mappings).forEach(key => {
          let formValue = mappings[key];
          if (formValue instanceof Array && formValue.length > 0) {
            if (!formGroup.contains(key)) {
              formGroup.addControl(key, new FormArray([new FormGroup({})]));
            }
            formValue.forEach((map, p) => {
              if (formGroup.contains(key)) {
                if (!formGroup.get(key).controls[p]) {
                  formGroup.get(key).push(new FormGroup({}));
                }
                this.doPopulateFormGroup(map, formGroup.get(key).at(p));
              }
            });
          } else if (formValue instanceof Object) {
            if (!formGroup.contains(key)) {
              formGroup.addControl(key, new FormGroup({}));
            }
            if (formGroup.contains(key)) {
              this.doPopulateFormGroup(formValue, formGroup.get(key));
            }
          } else if (typeof formValue === 'string' || typeof formValue === 'boolean' || typeof formValue === 'number' || formValue === null) {
            if (!formGroup.contains(key)) {
              formGroup.addControl(key, new FormControl(formValue));
            }
            if (formValue && formGroup.contains(key)) {
              formGroup.get(key).patchValue(formValue);
            }
          }
        });
      }
    return formGroup;
  }

  openDialog(joke: any): void {
    this.suggestedJokesArray = [];
    for (let i= 0; i< 3;) {
      let num = Math.floor((Math.random() * 100) + 1);
      if (num <=70) {
        if (this.formgroup.value.jokesArray[num].type === joke.type) {
          if (joke.type === 'single')
            this.suggestedJokesArray[i] = this.formgroup.value.jokesArray[num].joke
          if (joke.type === 'twopart')
            this.suggestedJokesArray[i] = this.formgroup.value.jokesArray[num].setup + '\n' + this.formgroup.value.jokesArray[num].delivery
          i++;
        }
      }
    }
    this.dialog.open(JokeDetailsModalComponent, {
      data: {category: joke.category, type: joke.type, joke: joke.joke? joke.joke : joke.setup +'\n'+joke.delivery, id: joke.id, error: joke.error, flags :joke.flags, suggestedJokes: this.suggestedJokesArray},
    });
  }
}
