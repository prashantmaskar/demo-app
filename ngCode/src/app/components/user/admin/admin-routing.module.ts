import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
const routes: Routes = [

  {
    path: 'admin',
     component: AdminComponent,
     children:[
      {
        path: '', 
        redirectTo: 'detail',
        pathMatch: 'full'
      },
       {
         path:'reports',
         component: DesignationComponent
       },
       {
        path:'team',
        component: TeamComponent
      },
      {
        path:'team-list',
        component: TeamListComponent
      },
      {
      path:'addgoals',
      component:AddProjectComponent
      },
      {
         path:'monthly-checkin',
         component: ClientComponent
       },
       {
         path:'detail',
         component: DetailsComponent
       },
       {
        path:'reset_password',
        component: ResetPasswordComponent
      },
      {
        path:'my-ratings',
        component: MyRatingsComponent
      },
      {
      path:'Reports-Genration',
      component:ReportsComponent
      }
     ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
