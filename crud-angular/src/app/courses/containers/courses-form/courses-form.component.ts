import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {
  form = this.formBuilder.group({
    name:  [''],
    category: [''],
  })

  constructor(
    private formBuilder: NonNullableFormBuilder, 
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location 
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.location.back()
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      _ => this.OnSuccess(),
      error => this.OnError(error)
    )
  }

  OnSuccess(): void {
    this._snackBar.open('New course successfully saved', '', {
      duration: 2000
    })  

    this.onCancel()
  }

  OnError(error: Error): void {
    this._snackBar.open(error.message, '', {
      duration: 2000
    })
  }
}
