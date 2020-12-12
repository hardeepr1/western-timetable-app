import { Component, OnInit } from '@angular/core';
import {CourseListService} from '../courselist.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CourselistComponent implements OnInit {

  courseLists:any[];
  columnsToDisplay = ['name', 'userName', 'lastEditedTime','timetable', 'coursescount']
  allColumnsToDisplay = ['name', 'userName','lastEditedTime' ,'coursescount','delete', 'timetable', 'edit']
  

  constructor(private courseListService: CourseListService, private router:Router, private authService: AuthService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.courseListService.getCourseLists().subscribe(courseLists => {
      if(!this.isLoggedIn){
        this.courseLists = courseLists.filter(courselist => courselist.public).slice(0, 10);
      }else{
        //filter with public and created by user
        this.courseLists = courseLists;
      }
      this.courseLists.sort(this.comparator);
      console.log(courseLists);
    });
  }

  comparator(courseListA, courseListB): any{

    var lastEditComparisonResult = compareDates(courseListA.lastEditedTime, courseListB.lastEditedTime);

    if(lastEditComparisonResult !== 0){
        return lastEditComparisonResult;
    }

    return 0;
  }

  deleteCourseList(event, item): void{
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this courselist  database?')) {
      this.courseListService.deleteCourseList(item).subscribe(response => {
        this.courseLists = this.courseLists.filter(courselist => courselist._id !== item);
        this.dialog.open(SuccessDialogComponent, {data: {successMessage: response.successMessage}});
      });
    } else {
      console.log('Thing was not saved to the database.');
    } 
  }

  //here we will write code to move to next view
  showTimeTable(coursesListID): void{
    const route = '/timetable/' + coursesListID;
    console.log(route);
    this.router.navigate([route]);
  }

  editCourseList(event, coursesListID): void{
    event.stopPropagation();
    const route = '/createcourselist/' + coursesListID;
    this.router.navigate([route]);
  }

  get isLoggedIn(): boolean {
    return this.authService.userLoggedIn();
  }

}


function compareDates(a: Date,b: Date) {
  
  if(a < b){
    return 1;
  }

  if(a > b){
    return -1;
  }

  return 0;
}
