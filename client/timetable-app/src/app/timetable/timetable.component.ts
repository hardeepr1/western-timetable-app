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
displayedColumns = ['campus', 'class_nbr', 'start_time', 'end_time', 'days'];

constructor(private timetableService: TimetableService, private route: ActivatedRoute) { }

ngOnInit(): void {
  const courseListId = this.route.snapshot.paramMap.get('courseListId');
  this.timetableService.getTimeTables(courseListId).subscribe(courses => {
  this.courses = courses;});
}

}
