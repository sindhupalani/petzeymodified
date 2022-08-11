import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { PetSearching } from '../Model/petforsearch.model';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss'],
})
export class AddAppointmentsComponent implements OnInit {
  inputValue: string = '';
  vetId = '';
  vetName = '';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  petRecommended: PetSearching[];

  issues: string[];
  petIssue: string;

  selected: Date | null;
  timeArray = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private service: AppointmentService,
    private datepipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      petDetail: new FormControl([Validators.required]),
    });
    this.secondFormGroup = this._formBuilder.group({
      issue: new FormControl('', [Validators.required]),
      reason: new FormControl(''),
    });
    this.thirdFormGroup = this._formBuilder.group({
      date: new FormControl([Validators.required]),
      time: new FormControl('', [Validators.required]),
    });

    // this.service.Fetchpets(this.vetId).subscribe({
    //   next: (data) => (this.petRecommended = data),
    //   error: (err) => console.log(err),
    // });

    this.vetId = JSON.parse(localStorage.getItem('vetId'));
    this.vetName = JSON.parse(localStorage.getItem('vetName'));
  }

  displayFnForpet(pet: PetSearching): string {
    return pet && pet.Name ? pet.Name : '';
  }

  OnInput($event) {
    this.petIssue = $event.target.value;
  }
  removeIssue() {
    this.petIssue = null;
  }
  removeReason() {
    this.secondFormGroup.patchValue({
      reason: '',
    });
  }
  OnIssuesSelect() {
    this.secondFormGroup.patchValue({
      issues: this.petIssue,
    });
  }
  updateFormDate(event: any) {
    var date = this.datepipe.transform(event, 'yyyy-MM-dd');
    this.thirdFormGroup.get('date').setValue(date);
    console.log(this.thirdFormGroup.value);
  }
  updateFormTime(data) {
    this.thirdFormGroup.get('time').setValue(data);
  }
  ConfirmAppointment() {
    var data = {
      AppointmentDate: this.thirdFormGroup.get('date').value,
      AppointmentTime: this.thirdFormGroup.get('time').value,
      Reason: this.secondFormGroup.get('reason').value,
      Issue: this.secondFormGroup.get('issue').value,
      VetId: this.vetId,
      VetName: this.vetName,
      petId: this.firstFormGroup.get('petDetail').value.Id,
      petName: this.firstFormGroup.get('petDetail').value.Name,
    };

    this.service.PostFormData(data).subscribe({
      next: (response) => {
        this.service.SetAppointmentConfirmationData(response);
      },
      error: (err) => {
        window.alert(err.message);
        window.location.reload();
      },
      complete: () => this.router.navigate(['appointment-confirmation']),
    });
  }
}
