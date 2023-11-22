import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('doctor');
    this.employeelist = JSON.parse(data || '');
  }

  doctorForm: FormGroup;

  employeelist: any = [];
  // firstname = "";
  // lastname = "";
  // email = "";
  // contact = "";
  iseditclicked = "no";
  indexselected = "";
  issubmitted = false;

  clear() {
    this.doctorForm.reset();
    // this.firstname = "";
    // this.lastname = "";
    // this.email = "";
    // this.contact = "";
  }

  submit() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj = {
    //   firstname: this.firstname,
    //   lastname: this.lastname,
    //   email: this.email,
    //   contact: this.contact,
    // }

    this.employeelist.push(this.doctorForm.value);
    localStorage.setItem('doctor', JSON.stringify(this.employeelist));
    this.issubmitted = true;
    this.clear();
    this.modalRef?.hide();
  }

  edit(i: any) {
    this.iseditclicked = "yes";
    this.indexselected = i;
    this.doctorForm.patchValue(
      {
        firstname: this.employeelist[i].firstname,
        lastname: this.employeelist[i].lastname,
        email: this.employeelist[i].email,
        // contact: this.employeelist[i].contact
      }
    )
  }

  delete(i: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeelist.splice(i, 1);
        localStorage.setItem('doctor', JSON.stringify(this.employeelist));

        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  update() {
    this.iseditclicked = "no";
    this.employeelist[this.indexselected].firstname = this.doctorForm.value.firstname;
    this.employeelist[this.indexselected].lastname = this.doctorForm.value.lastname;
    this.employeelist[this.indexselected].email = this.doctorForm.value.email;
    // this.employeelist[this.indexselected].contact = this.doctorForm.value.contact;
    localStorage.setItem('doctor', JSON.stringify(this.employeelist));

    this.clear();
    this.modalRef?.hide();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private FormBuilder: FormBuilder) {
    this.doctorForm = this.FormBuilder.group(
      {
        firstname: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        lastname: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['',Validators.compose([Validators.required, Validators.minLength(3)])]
        // contact: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}