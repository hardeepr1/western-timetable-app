import { animate, state, style, transition, trigger } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchCoursesComponent implements OnInit {

  subject:String;
  courseNumber: String;
  keyword: string;

  searchByKeywordResult: any[];
  searchByIdResults : any[];

  columnsToDisplay = ['catalog_nbr', 'subject','className', 'ssr_component', 'class_section', 'start_time', 'end_time','campus', 'days'];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  searchByCourseId(): void{
    this.courseService.searchByCourseId(this.subject, this.courseNumber).subscribe(results => 
      {
        this.searchByIdResults = results;
        console.log(this.searchByIdResults);
      });
}

  searchByKeyWord(): void{
    this.courseService.searchCoursesByKeyword(this.keyword).subscribe(results => {
      this.searchByKeywordResult = results;
      console.log(this.searchByKeywordResult);
    });
  }
}
