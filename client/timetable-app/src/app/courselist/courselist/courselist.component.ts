import { Component, OnInit } from '@angular/core';
import {CourseListService} from '../courselist.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';

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
  columnsToDisplay = ['name', 'userName', 'lastEditedTime']
  allColumnsToDisplay = ['name', 'userName','lastEditedTime' ,'coursescount','delete', 'timetable', 'edit']

  constructor(private courseListService: CourseListService, private router:Router ) { }

  ngOnInit(): void {
    this.courseListService.getCourseLists().subscribe(courseLists => {
      this.courseLists = courseLists;
      console.log(courseLists);
    });
  }

  deleteCourseList(event, item): void{
    event.stopPropagation();
    console.log(item);
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

}
