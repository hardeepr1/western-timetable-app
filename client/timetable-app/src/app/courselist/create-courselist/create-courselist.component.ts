import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseListService } from '../courselist.service';

import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../common/success-dialog/success-dialog.component';
import {InfoDialogComponent} from '../../common/info-dialog/info-dialog.component';
import {ValidationDialogComponent} from '../../common/validation-dialog/validation-dialog.component';

import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-create-courselist',
  templateUrl: './create-courselist.component.html',
  styleUrls: ['./create-courselist.component.css']
})
export class CreateCourselistComponent implements OnInit {
  courseListForm: FormGroup;
  coursesList: any[];
  displayedColumns = ['catalog_nbr','subject', 'selectedcheckbox','year'];
  selectedCourses: any[] = [];
  editCourseList: boolean = false;
  @ViewChild('courseselect') courseselect;

  constructor(private formBuilder: FormBuilder, private courseListService: CourseListService, private route: ActivatedRoute, private dialog: MatDialog, private authService: AuthService) {     
    this.courseListForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    description:[''],
    public: [false]})
  }

  ngOnInit(): void {
    this.courseListService.getAllCourses().subscribe(coursesList =>{ 
      this.coursesList = coursesList;
      if(this.coursesList && this.selectedCourses){
        this.setSelectedValues(this.selectedCourses);
      }
    });

    const courseListId = this.route.snapshot.paramMap.get('courseListId');
    if(courseListId){
      this.editCourseList = true;
      this.courseListService.getCourseList(courseListId).subscribe(courseList =>{
        this.courseListForm.controls['name'].setValue(courseList.name);
        this.courseListForm.controls['description'].setValue(courseList.description);
        this.selectedCourses = courseList.coursesList;
        if(this.coursesList && this.selectedCourses){
          this.setSelectedValues(this.selectedCourses);
        }
        
      })
    }
    
  }

  setSelectedValues(selectedCourses): void{
    selectedCourses.forEach(courseInfo => {
      let foundCourse = this.coursesList.find(course => course.subject === courseInfo.subject && course.catalog_nbr === courseInfo.catalog_nbr);
      foundCourse.selected = courseInfo.selected;
      foundCourse.year = courseInfo.year;
    });
  }
  
  //METHOD TO CREATE A COURSELIST
  createCourseList(): void{
    let selectedCourses = this.getSelectedCourse();
    if(selectedCourses.length === 0){
      this.dialog.open(ValidationDialogComponent, {data: {message: "Please select atleast one course. A course list cannot be empty"}});
      return;
    }
    const courseList = {
      name: this.courseListForm.value.name,
      description: this.courseListForm.value.description,
      coursesList: selectedCourses,
      public: this.courseListForm.value.public,
      userName: this.authService.getUserName()
    }
    this.courseListService.createCourseList(courseList).subscribe(response =>  this.dialog.open(SuccessDialogComponent, {data: {successMessage: response.successMessage}}), 
    err => { this.dialog.open(InfoDialogComponent, {data: {errorMessage: err.error.errorMessage}});});
  }

  //METHOD TO UPDATE COURSELIST
  updateCourseList(): void{
    let selectedCourses = this.getSelectedCourse();
    if(selectedCourses.length === 0){
      this.dialog.open(ValidationDialogComponent, {data: {message: "Please select atleast one course. A course list cannot be empty"}});
      return;
    }
    const updatedCourseList = {
      name: this.courseListForm.value.name,
      description: this.courseListForm.value.description,
      coursesList: selectedCourses
    }
    const courseListId = this.route.snapshot.paramMap.get('courseListId');
    this.courseListService.updateCourseList(courseListId, updatedCourseList).subscribe(response => this.dialog.open(SuccessDialogComponent, {data: {successMessage: response.successMessage}}));
  }

  getSelectedCourse(): any{
    return this.coursesList.filter(courseList => courseList.selected)
  }

  get name(){
    return this.courseListForm.get('name');
  }


}
