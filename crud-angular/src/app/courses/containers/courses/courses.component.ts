import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError(`Error on load courses, ${error.message}`)
        return of([])
      })
    )
  }
  
  onError(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  
  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route })
  }
}
