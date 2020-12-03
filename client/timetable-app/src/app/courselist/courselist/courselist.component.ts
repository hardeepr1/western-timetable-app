import { Component, OnInit } from '@angular/core';
import {CourseListService} from '../courselist.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  columnsToDisplay = ['name', 'description']
  allColumnsToDisplay = ['name', 'description', 'delete']

  constructor(private courseListService: CourseListService) { }

  ngOnInit(): void {
    this.courseListService.getCourseLists().subscribe(courseLists => {
      this.courseLists = courseLists;
      console.log(courseLists);
    });
  }

  deleteCourseList(event, item): void{
    event.stopPropagation()
    console.log(item);
  }

}
