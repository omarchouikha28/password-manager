import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CredentialsService } from '../../services/credentials.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Credentials } from '../../interfaces/credentials';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrl: './credentials-form.component.css'
})
export class CredentialsFormComponent implements OnInit {
  hide = true;
  credForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _credService: CredentialsService,
    private _dialogRef: MatDialogRef<CredentialsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Credentials
  ) {
    this.credForm = this._formBuilder.group({
      category: '',
      app: '',
      userName: '',
      encryptedPassword: ''
    })
  }
  ngOnInit(): void {
    this.credForm.patchValue(this.data);
  }

  onFormSubmit() {
    const encryptedPassword = this.credForm.get('encryptedPassword');
    if (this.data) {
      encryptedPassword?.setValue(btoa(encryptedPassword.value));
      this._credService.updateCredentials(this.data.id, this.credForm.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
        error: (error) => {
          console.log(error)
        }
      })
    } else {
      if (this.credForm.valid) {
        encryptedPassword?.setValue(btoa(encryptedPassword.value));
        this._credService.addCredentials(this.credForm.value).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.log(error)
          }
        })
      }
    }
  }
}
