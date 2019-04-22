import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import{FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Title } from '@angular/platform-browser';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {
  signinForm:FormGroup;
  username:string;
  password:string;
  post:any;
  error:boolean=false;
  hide = true;
user_role:number;
  users:{ username:string,
          password:string,
          success:string,
          type:string,
          auth_token:string,
          userrole:number
        
  };          
  titleAlert:string = 'This Field is Required';
  error_message="";

  constructor(private loginService:LoginService, private router:Router, private formBuilder:FormBuilder,private titleService: Title) { 
   
      this.username="";
      this.password="";
      
  
    this.signinForm=formBuilder.group({
      "username":[null, [Validators.required, Validators.email]],
      "password":[null,Validators.required]
    });
  }

  ngOnInit() {
    this.titleService.setTitle("CEO Goals - Login");
  }

  login(post){
    this.username=post.username;
    this.password=post.password;
    this.loginService.login(this.username,this.password).subscribe(users=>{
      this.users = users;
           console.log(this.users); 
       if(users.req_status=='1'){
        window.localStorage.setItem("auth-key",users.auth_token);
        window.localStorage.setItem("user_role",users.user_role);
        window.localStorage.setItem("user_name",users.user_fname);
        this.router.navigate(["user"]);
       }
       else{
         this.error=true;
         this.error_message = users.message ;
       }
      this.loginService.setLoggedin(false);
      
      //this.loginService.setIndex(this.users.username);
      /*if(this.users.type=="student"){
        this.router.navigate(["user/profile"]);
      }else if(this.users.type=="Admin"){
        this.router.navigate(["admin/home"]);
      }else if(this.users.type=="Employee"){
        this.router.navigate(["employee"]);
      }*/
    },
    error=>{
      this.error=!this.error;
      this.error_message="Your Credentials Do not Match";
      console.log(this.error_message);
    }
  );
  }
}

