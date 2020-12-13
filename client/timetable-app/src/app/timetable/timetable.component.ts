import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimetableService} from './timetable.service';
import {getTermMapping} from '../utils/helper';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
courses:any[];
courseListInfo: any;
displayedColumns = ['catalog_nbr','subject','year','campus', 'class_nbr', 'start_time', 'end_time', 'days'];
termMapping: any;
Object = Object;

constructor(private timetableService: TimetableService, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.termMapping = getTermMapping();
  const courseListId = this.route.snapshot.paramMap.get('courseListId');
  this.timetableService.getTimeTables(courseListId).subscribe(courses => {
    this.courseListInfo = courses.courseListInfo;
    delete courses["courseListInfo"]; 
    
    this.courses = this.sortCourseDetails(courses);
  });
}

sortCourseDetails(courses): any{
  let coursesSorted = Object.keys(courses).sort().reduce((r, k) => (r[k] = courses[k], r), {});
  for (let key of Object.keys(coursesSorted)) {
    let courseList = coursesSorted[key];
    coursesSorted[key] = courseList.sort(this.compareFunction);
  }
  return coursesSorted;
}

compareFunction(courseA, courseB): any{

  var yearComparisonResult = compare(courseA.year, courseB.year);
  var subjectComparisonResult = compare(courseA.subject, courseB.subject);
  var courseCodeComparison = compare(courseA.catalog_nbr, courseB.catalog_nbr);

  if(yearComparisonResult !== 0){
    return yearComparisonResult;
  }
  
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
