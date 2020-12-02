import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit {

  subject:String;
  courseNumber: String;
  keyword: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  searchByCourseId(): void{

  }

  searchByKeyWord(): void{
    console.log(this.keyword);
    this.courseService.searchCoursesByKeyword(this.keyword).subscribe(results => console.log(results));
  }
}
