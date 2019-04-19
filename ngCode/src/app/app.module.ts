import { BrowserModule,Title } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatTableModule,MatSortModule,MatPaginatorModule,MatSelectModule,MatSidenavModule,MatNativeDateModule,MatListModule,MatMenuModule  } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MentionModule } from 'angular-mentions/mention';
import {TimeAgoPipe} from 'time-ago-pipe';
import {MinusSignToParens} from './components/user/projects/workflow/minusSignToParens.pipe';

import {MatBottomSheetModule,} from '@angular/material/bottom-sheet';
BottomSheetOverviewExampleSheet

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LoginService} from "./services/login.service";
import {ProjectService} from "./services/project.service";
import {AdminService} from "./services/admin.service";
import {ExcelserviceService} from "./services/excelservice.service";
import { UserComponent } from './components/user/user.component';
import { UserHeaderComponent } from './components/user/user-header/user-header.component';
import { ProjectsComponent } from './components/user/projects/projects.component';
import { WorkflowComponent } from './components/user/projects/workflow/workflow.component';

import { ProjectListComponent } from './components/user/projects/project-list/project-list.component';
import { ProjectTeamComponent } from './components/user/projects/project-team/project-team.component';
import { ProjectComponent } from './components/user/projects/project/project.component';
import { SettingsComponent } from './components/user/projects/settings/settings.component';

import {ConfirmationDialog} from './components/user/admin/confirm-dialog/confirmation-dialog.component'

import { UserMenuComponent } from './components/user/user-menu/user-menu.component';

import { ProjectFeedbackComponent } from './components/user/projects/project-feedback/project-feedback.component';
import {TaskStatusComponent,BottomSheetOverviewExampleSheet} from './components/user/projects/task-status/task-status.component';
import{ProjectStatusComponent} from './components/user/projects/project-status/project-status.component';
import { UserFooterComponent } from './components/user/user-footer/user-footer.component';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AssociatesFeedbackComponent } from './components/user/projects/associates-feedback/associates-feedback.component';
import { FeedbackRatingsComponent } from './components/user/projects/associates-feedback/feedback-ratings/feedback-ratings.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMarqueeModule } from 'ng-marquee';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserHeaderComponent,
    ProjectsComponent,
    WorkflowComponent,
    ProjectListComponent,
    ProjectTeamComponent,
    ProjectComponent,
    SettingsComponent,
    ConfirmationDialog,
    TimeAgoPipe,
    MinusSignToParens,
    UserMenuComponent,
    ProjectFeedbackComponent,
    TaskStatusComponent,
    BottomSheetOverviewExampleSheet,
    ProjectStatusComponent,
    UserFooterComponent,
    BreadcrumbComponent,
    AssociatesFeedbackComponent,
    FeedbackRatingsComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule ,
    DragDropModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    MatMenuModule ,
    MentionModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgxSpinnerModule,
    NgMarqueeModule,
    
    ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    MatMenuModule ,
    UserMenuComponent,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatTooltipModule
    ],
   
  providers: [
    LoginService,
    ProjectService,
    AdminService,
    ExcelserviceService,
    MatDatepickerModule,
    Title
  ],
  entryComponents:[ConfirmationDialog,BottomSheetOverviewExampleSheet],
  bootstrap: [AppComponent]
})
export class AppModule { }
