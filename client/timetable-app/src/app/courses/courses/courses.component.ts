import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseListService } from 'src/app/courselist/courselist.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesList: any[];
  displayedColumns = ['subject','catalog_nbr', 'addreview'];

  constructor(private courseListService: CourseListService, private router: Router) { }

  ngOnInit(): void {
    this.courseListService.getAllCourses().subscribe(coursesList =>{ 
      this.coursesList = coursesList;
    });
  }

  addReview(event, element): void{
    event.stopPropagation();
    const route = '/reviews/' + element._id;
    this.router.navigate([route],     {  
      state: {
      subject: element.subject,
      catalog_nbr: element.catalog_nbr
    }});
  }

}
