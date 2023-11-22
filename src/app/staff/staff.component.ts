import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('staff');
    this.stafflist = JSON.parse(data || '');
  }

  staffForm: FormGroup;

  stafflist: any = [];
  // firstname2 = "";
  // lastname2 = "";
  // email2 = "";
  // contact2 = "";
  iseditclicked2 = "no";
  indexselected2 = "";
  issubmitted = false;

  clear2() {
    this.staffForm.reset();
    // this.firstname2 = "";
    // this.lastname2 = "";
    // this.email2 = "";
    // this.contact2 = "";
  }

  submit2() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj2 = {
    //   firstname2: this.firstname2,
    //   lastname2: this.lastname2,
    //   email2: this.email2,
    //   contact2: this.contact2,
    // }

    this.stafflist.push(this.staffForm.value);
    localStorage.setItem('staff', JSON.stringify(this.stafflist));
    this.issubmitted = true;
    this.clear2();
    this.modalRef?.hide();
  }

  edit2(i: any) {
    this.iseditclicked2 = "yes";
    this.indexselected2 = i;
    this.staffForm.patchValue(
      {
        firstname2: this.stafflist[i].firstname2,
        lastname2: this.stafflist[i].lastname2,
        email2: this.stafflist[i].email2,
        // contact2: this.stafflist[i].contact2
      }
    )
  }

  delete2(i: any) {
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
        this.stafflist.splice(i, 1);
        localStorage.setItem('staff', JSON.stringify(this.stafflist));

        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  update2() {
    this.iseditclicked2 = "no";
    this.stafflist[this.indexselected2].firstname2 = this.staffForm.value.firstname2;
    this.stafflist[this.indexselected2].lastname2 = this.staffForm.value.lastname2;
    this.stafflist[this.indexselected2].email2 = this.staffForm.value.email2;
    // this.stafflist[this.indexselected2].contact2 = this.staffForm.value.contact2;
    localStorage.setItem('staff', JSON.stringify(this.stafflist));

    this.clear2();
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
    this.staffForm = this.FormBuilder.group(
      {
        firstname2: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        lastname2: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        email2: ['',Validators.compose([Validators.required, Validators.minLength(3)])]
        // contact2: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}