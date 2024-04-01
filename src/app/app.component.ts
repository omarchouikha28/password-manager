import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';
import { CredentialsService } from './services/credentials.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  credentials = new Set<string>();

  constructor(private _dialog: MatDialog, private _credService: CredentialsService) { }

  ngOnInit(): void {
    this.getCredentials();
  }

  openAddCredentialsForm() {
    const dialogRef = this._dialog.open(CredentialsFormComponent);
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value)
          this.getCredentials();
      }
    })
  }

  openCredentialsList(userName: String) {
    const dialogRef = this._dialog.open(DashboardComponent, {
      data: {
        "userName": userName
      }
    });
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.getCredentials();
        }
      }
    })
  }

  getCredentials(): void {
    this.credentials = new Set<string>();
    this._credService.getCredentials().subscribe({
      next: value => {
        value.forEach((e) => this.credentials.add(e.userName));
      },
      error: error => {
        console.error(error)
      }
    })
  }
}
