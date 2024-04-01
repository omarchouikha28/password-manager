import { Component, Inject, OnInit } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CredentialsService } from '../../services/credentials.service';
import { CredentialsFormComponent } from '../credentials-form/credentials-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  hide = true;
  credentials!: Credentials[];

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<DashboardComponent>,
    private _credService: CredentialsService,
    @Inject(MAT_DIALOG_DATA) public data: { userName: string }) { }

  ngOnInit(): void {
    this.getCredentialsByUser();
  }

  openEditCredentialsForm(data: Credentials) {
    const dialogRef = this._dialog.open(CredentialsFormComponent, {
      data: {
        ...data, encryptedPassword: atob(data.encryptedPassword)
      }
    });
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value)
          this.getCredentialsByUser();
      }
    })
  }

  getCredentialsByUser() {
    this._credService.getByUser(this.data.userName).subscribe({
      next: value => {
        this.credentials = value;
      },
      error: error => {
        console.error(error)
      }
    })
  }

  deleteCredentials(id: number) {
    this._credService.deleteCredentials(id).subscribe({
      next: () => {
        this.getCredentialsByUser();
        if (this.credentials.length == 1)
          this._dialogRef.close(true);
      },
      error: error => {
        console.error(error)
      }
    })
  }


}
