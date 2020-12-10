import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimetableService} from './timetable.service';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
courses:any[];
displayedColumns = ['catalog_nbr','subject','campus', 'class_nbr', 'start_time', 'end_time', 'days'];
Object = Object;

constructor(private timetableService: TimetableService, private route: ActivatedRoute) { }

ngOnInit(): void {
  const courseListId = this.route.snapshot.paramMap.get('courseListId');
  this.timetableService.getTimeTables(courseListId).subscribe(courses => {
    this.sortCourseDetails(courses);
    this.courses = courses;
  });
}

sortCourseDetails(courses): any[]{
  for (let key of Object.keys(courses)) {
    let courseList = courses[key];
    courses[key] = courseList.sort(this.compareFunction);
  }
  return courses;
}

compareFunction(courseA, courseB): any{

  var subjectComparisonResult = compare(courseA.subject, courseB.subject);
  var courseCodeComparison = compare(courseA.catalog_nbr, courseB.catalog_nbr);

  if(subjectComparisonResult !== 0){
      return subjectComparisonResult;
  }

  if(courseCodeComparison !== 0){
    return courseCodeComparison;
  }

  return 0;
}

}

function compare(a: number | string, b: number | string) {
  //return a < b ? -1 : a > b? 1 : 0;
  if(a < b){
    return -1;
  }

  if(a > b){
    return 1;
  }

  return 0;
}
