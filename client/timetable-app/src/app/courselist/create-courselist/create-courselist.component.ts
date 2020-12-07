import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseListService } from '../courselist.service';

@Component({
  selector: 'app-create-courselist',
  templateUrl: './create-courselist.component.html',
  styleUrls: ['./create-courselist.component.css']
})
export class CreateCourselistComponent implements OnInit {
  courseListForm: FormGroup;
  coursesList: any[];
  displayedColumns = ['catalog_nbr','subject', 'selectedcheckbox'];
  selectedCourses: any[] = [];
  editCourseList: boolean = false;
  @ViewChild('courseselect') courseselect;

  constructor(private formBuilder: FormBuilder, private courseListService: CourseListService, private route: ActivatedRoute) {     
    this.courseListForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    description:[''],
    public: [false]})
  }

  ngOnInit(): void {
    this.courseListService.getAllCourses().subscribe(coursesList =>{ 
      this.coursesList = coursesList;
    });

    const courseListId = this.route.snapshot.paramMap.get('courseListId');
    if(courseListId){
      this.editCourseList = true;
      this.courseListService.getCourseList(courseListId).subscribe(courseList =>{
        this.courseListForm.controls['name'].setValue(courseList.name);
        this.courseListForm.controls['description'].setValue(courseList.description);
      })
    }
    
  }

  //TODO :USERNAME SHOULD NOT BE HARDCODED
  //METHOD TO CREATE A COURSELIST
  createCourseList(): void{
    const courseList = {
      name: this.courseListForm.value.name,
      description: this.courseListForm.value.description,
      coursesList: this.selectedCourses,
      public: this.courseListForm.value.public,
      userName: 'hardeepr1'
    }
    this.courseListService.createCourseList(courseList).subscribe(res => alert("Course List Creation success"));
  }

  //METHOD TO UPDATE COURSELIST
  updateCourseList(): void{
    const updatedCourseList = {
      name: this.courseListForm.value.name,
      description: this.courseListForm.value.description,
      coursesList: this.selectedCourses
    }
    const courseListId = this.route.snapshot.paramMap.get('courseListId');
    this.courseListService.updateCourseList(courseListId, updatedCourseList).subscribe(res => alert("Update course list is successfull"));
  }

  checkBoxClickHandler(event: any): void{
    const subject = event.currentTarget.getAttribute('subject');
    const catalog_nbr = event.currentTarget.getAttribute('catalog_nbr');
    this.selectedCourses.push({
      subject: subject,
      catalog_nbr: catalog_nbr,
    });
  }

}
