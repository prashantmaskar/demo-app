import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatTableModule,MatSortModule,MatPaginatorModule,MatSelectModule,MatSidenavModule,MatNativeDateModule,MatListModule,MatMenuModule  } from '@angular/material';
import {AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminComponent } from './admin.component';
import { DesignationComponent } from './designation/designation.component';
import {TeamComponent} from './team/team.component';
import {TeamListComponent} from './team-list/team-list.component';
import { ClientComponent } from './client/client.component';
import { DetailsComponent } from './details/details.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyRatingsComponent } from './my-ratings/my-ratings.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminRoutingModule } from './admin-routing.module';
import{MonthName} from './my-ratings/monthname.pipe'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AutofocusDirective } from '../../../autofocus.directive';


@NgModule({
  declarations: [
    AdminComponent,
    DesignationComponent,
    TeamComponent,
    TeamListComponent,
    ClientComponent,
    DetailsComponent,
    AddProjectComponent,
    ResetPasswordComponent,
    MyRatingsComponent,
    ReportsComponent,
    MonthName,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    AngularFontAwesomeModule,
    MatDatepickerModule,
    
  ]
})
export class AdminModule { }
