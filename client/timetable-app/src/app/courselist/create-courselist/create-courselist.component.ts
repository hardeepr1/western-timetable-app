import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseListService } from '../courselist.service';

@Component({
  selector: 'app-create-courselist',
  templateUrl: './create-courselist.component.html',
  styleUrls: ['./create-courselist.component.css']
})
export class CreateCourselistComponent implements OnInit {
  courseListForm: FormGroup;
  coursesList: any[];
  displayedColumns = ['catalog_nbr','subject'];

  constructor(private formBuilder: FormBuilder, private courseListService: CourseListService) {     
    this.courseListForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    description:['']})
  }

  ngOnInit(): void {
    this.courseListService.getAllCourses().subscribe(coursesList =>{ 
      console.log(coursesList);
      this.coursesList = coursesList;
    });
  }

  //for time being we are just creating an empty course list with name 
  createCourseList(): void{
    const courseList = {
      name: this.courseListForm.value.name,
      description: this.courseListForm.value.description
    }
    this.courseListService.createCourseList(courseList).subscribe(res => alert("Course List Creation success"));
  }
}
