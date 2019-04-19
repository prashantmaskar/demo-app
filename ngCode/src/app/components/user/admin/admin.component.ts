import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.styl']
})
export class AdminComponent implements OnInit {
  user_role:any;
  canrate:boolean;
  open:boolean = false;
  isOpen: boolean = false;
  usertoken: string;
  constructor(private AdminService: AdminService) {
    this.user_role = localStorage.getItem('user_role');
    this.usertoken = localStorage.getItem('auth-key');
    this.AdminService.chk_if_can_rate(this.usertoken).subscribe(val => {
      this.canrate = val.can_rate;
    });
   }

  ngOnInit() {
  }
  disp_child(){
    console.log("fds");
    this.open = !this.open;
  }
}
