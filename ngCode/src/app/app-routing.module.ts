import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {ProjectsComponent} from './components/user/projects/projects.component';
import {WorkflowComponent} from './components/user/projects/workflow/workflow.component';
import {AuthGuard} from './guards/auth.guard';
import { 
  RoleGuardService as RoleGuard 
} from './guards/role-guard.service';
import { from } from 'rxjs';
import { AdminComponent } from './components/user/admin/admin.component';
import { DesignationComponent } from './components/user/admin/designation/designation.component';
import {TeamComponent} from './components/user/admin/team/team.component';
import {TeamListComponent} from './components/user/admin/team-list/team-list.component';
import { ProjectListComponent } from './components/user/projects/project-list/project-list.component';
import { ProjectTeamComponent } from './components/user/projects/project-team/project-team.component';
import { SettingsComponent } from './components/user/projects/settings/settings.component';
import { ProjectComponent } from './components/user/projects/project/project.component';
import { ClientComponent } from './components/user/admin/client/client.component';
import { DetailsComponent } from './components/user/admin/details/details.component';
import { AddProjectComponent } from './components/user/admin/add-project/add-project.component';
import { ProjectFeedbackComponent } from './components/user/projects/project-feedback/project-feedback.component';
import { TaskStatusComponent } from './components/user/projects/task-status/task-status.component'
import { ProjectStatusComponent } from './components/user/projects/project-status/project-status.component';
import { ResetPasswordComponent } from './components/user/admin/reset-password/reset-password.component';
import { AssociatesFeedbackComponent } from './components/user/projects/associates-feedback/associates-feedback.component';
import { FeedbackRatingsComponent } from './components/user/projects/associates-feedback/feedback-ratings/feedback-ratings.component';
import { MyRatingsComponent } from './components/user/admin/my-ratings/my-ratings.component';
import { ReportsComponent } from './components/user/admin/reports/reports.component';
const routes: Routes = [

    {
      path: '',
      loadChildren: './components/login/login.module#LoginModule'
    },
  
  {
    path: 'user',
    component: UserComponent,
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    data:{
      title: 'user'
    },
    children:[
      {
        path: '', 
        redirectTo: 'ceogoals',
        pathMatch: 'full',
        data:{
          title: 'Project List'
        },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data:{
          title: 'Projects'
        },
        children:[
          {
          path: 'task-status/:proj_id',
          component: TaskStatusComponent,
          data:{
            title: 'Task Status'
          },
          },
        {
          path: 'projectfeedback',
          component: ProjectFeedbackComponent ,
          data:{
            title: 'Project FeedBack'
          },
        },
        {
          path: 'project-status',
          component: ProjectStatusComponent,
          data:{
            title: 'Project Status'
          },
        }
        ]
      },
      {
        path: 'projects',
        redirectTo: "ceogoals",
        pathMatch: 'full',
        data:{
          title: 'project List'
        },
        },
        {
          path: 'ceogoals',
          component: ProjectListComponent,
          data:{
            title: 'ceogoals'
          },
        },
        {
          path: 'associateFeedback',
          component: AssociatesFeedbackComponent
        },
        {
          path: 'feedback-ratings',
          component: FeedbackRatingsComponent,
          canActivate: [AuthGuard], 
          data: { 
                expectedRole: '1'
               }
        },
        
      {
        path: 'project/:project_id',
        component: ProjectComponent,
        data:{
          title: 'project'
        },
         children:[
          { path: 'workflow',
           component: WorkflowComponent,
           data:{
            title: 'Workflow'
          },
           
          },
          { path: 'projectteam',
           component: ProjectTeamComponent,
           data:{
            title: 'Project Team'
          }, 
           
          },
          { path: 'settings',
           component: SettingsComponent,
           data:{
            title: 'Settings'
          },
           
          },
           {
            path: '', 
            redirectTo: 'workflow',
            pathMatch: 'full',
            data:{
              title: 'Workflow'
            },
           }
         ]
        },
        {
          path: '',
          loadChildren: './components/user/admin/admin.module#AdminModule'
        },
    ]
    },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
