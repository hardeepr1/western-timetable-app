import { animate, state, style, transition, trigger } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {MatDialog} from '@angular/material/dialog';
import {ValidationDialogComponent} from '../../common/validation-dialog/validation-dialog.component';

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

  subject:String = "";
  courseNumber: String = "";
  keyword: string = "";

  searchByKeywordResult: any[];
  searchByIdResults : any[];

  columnsToDisplay = ['catalog_nbr', 'subject','className', 'ssr_component', 'class_section', 'start_time', 'end_time','campus', 'days'];

  constructor(private courseService: CourseService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  searchByCourseId(): void{
    if(this.subject.length === 0 || this.courseNumber.length === 0){
      this.dialog.open(ValidationDialogComponent, {data: {message: "Either course number or subject is empty"}});
    }else{
      this.courseService.searchByCourseId(this.subject, this.courseNumber).subscribe(results => 
        {
          this.searchByIdResults = results;
          if(results.length === 0){
            this.dialog.open(ValidationDialogComponent, {data: {message: "No results were found for the entered values"}});
          }
          console.log(this.searchByIdResults);
        });
    }
    
}

  searchByKeyWord(): void{
    if(this.keyword.length < 4){
      this.dialog.open(ValidationDialogComponent, {data: {message: "This length of search keyword is less then 4"}});
      return;
    }else{
      this.courseService.searchCoursesByKeyword(this.keyword).subscribe(results => {
        this.searchByKeywordResult = results;
        console.log(this.searchByKeywordResult);
      });
    }
    
  }
}
