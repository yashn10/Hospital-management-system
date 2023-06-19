import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('patient');
    this.customerlist = JSON.parse(data || '');
  }

  patientForm: FormGroup;

  customerlist: any = [];
  // firstname1 = "";
  // lastname1 = "";
  // email1 = "";
  // contact1 = "";
  iseditclicked1 = "no";
  indexselected1 = "";
  issubmitted = false;

  clear1() {
    this.patientForm.reset();
    // this.firstname1 = "";
    // this.lastname1 = "";
    // this.email1 = "";
    // this.contact1 = "";
  }

  submit1() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj1 = {
    //   firstname1: this.firstname1,
    //   lastname1: this.lastname1,
    //   email1: this.email1,
    //   contact1: this.contact1,
    // }

    this.customerlist.push(this.patientForm.value);
    localStorage.setItem('patient', JSON.stringify(this.customerlist));
    this.issubmitted = true;
    this.clear1();
    this.modalRef?.hide();
  }

  edit1(i: any) {
    this.iseditclicked1 = "yes";
    this.indexselected1 = i;
    this.patientForm.patchValue(
      {
        firstname1: this.customerlist[i].firstname1,
        lastname1: this.customerlist[i].lastname1,
        email1: this.customerlist[i].email1,
        // contact1: this.customerlist[i].contact1
      }
    )
  }

  delete1(i: any) {
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
        this.customerlist.splice(i, 1);
        localStorage.setItem('patient', JSON.stringify(this.customerlist));

        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  update1() {
    this.iseditclicked1 = "no";
    this.customerlist[this.indexselected1].firstname1 = this.patientForm.value.firstname1;
    this.customerlist[this.indexselected1].lastname1 = this.patientForm.value.lastname1;
    this.customerlist[this.indexselected1].email1 = this.patientForm.value.email1;
    // this.customerlist[this.indexselected1].contact1 = this.patientForm.value.contact1;
    localStorage.setItem('patient', JSON.stringify(this.customerlist));

    this.clear1();
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
    this.patientForm = this.FormBuilder.group(
      {
        firstname1: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        lastname1: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        email1: ['',Validators.compose([Validators.required, Validators.minLength(3)])]
        // contact1: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}