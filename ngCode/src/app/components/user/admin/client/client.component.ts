import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,VERSION, MatDialogRef, MatDialog,  MAT_DIALOG_DATA} from '@angular/material';
import { AdminService } from '../../../../services/admin.service';
import {ConfirmationDialog} from '../confirm-dialog/confirmation-dialog.component';
import { Title } from '@angular/platform-browser';
import {HttpClient, HttpParams, HttpRequest, HttpEvent,HttpEventType,HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.styl']
})
export class ClientComponent implements OnInit {
  display='none';
  designForm: FormGroup;
  post:any;
  client:string;
  client_id:number;
  usertoken:string;
  error:boolean=false;
  titleAlert:string = 'This field is required';
  error_message="";
  clients:clients[];
  selectedFile: File;
  user_role:any;
  url:any;
  @ViewChild('upload_attachment')
  upload_attachment: ElementRef;
  @ViewChild('focusauto') private focusauto: ElementRef;
  constructor(
    private formBuilder:FormBuilder, 
    private AdminService:AdminService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private titleService: Title
    ) {
    this.designForm=formBuilder.group({
      "client":[null, Validators.required],
      "client_id":['0', Validators.required],
      "client_logo":[null, Validators.required]
    });
    this.get_client_list();
    this.user_role = localStorage.getItem('user_role');
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Clients");
  }
  openteam(){
    
    this.designForm.reset();
    this.designForm=this.formBuilder.group({
      "client":[null, Validators.required],
      "client_id":['0', Validators.required],
      
    });
    this.upload_attachment.nativeElement.value = "";
    this.url ='/assets/clients/client-logo-placeholder.png';
    this.display="block";
    setTimeout(() => {this.focusauto.nativeElement.focus();});
  }
  selectFile(event) {
    
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
        
      }
  }
  add_client(post){
    this.client=post.client;
    this.client_id=post.client_id;
    console.log(this.selectedFile);
    if(post.client_id == 0){ 
    this.usertoken=localStorage.getItem('auth-key');
    this.AdminService.add_client(this.client,this.usertoken,this.selectedFile).subscribe
    (
      event => {
        if (event.type == HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
        }
      },
      (err) => {
        console.log("Upload Error:", err);
      }, () => {
        this.snackBar.open('Client Added Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.designForm.reset();
        this.onCloseHandled();
        this.upload_attachment.nativeElement.value = "";
        this.get_client_list();
        // this.upload_attachmentVariable.nativeElement.value = "";
        // this.get_attachment_list();
      }
    );
  }else{
    this.AdminService.update_client_details(this.client,this.client_id,this.selectedFile).subscribe
     (
      //  client=>{
    

    //   if(client.req_status=='1'){
    //     console.log("Client Updated Successfully");
    //     this.designForm=this.formBuilder.group({
    //       "client":[null, Validators.required],
    //       "client_id":['0', Validators.required]
    //     });
    //     this.get_client_list();
    //   }
    //   else{
    //     this.error=true;
    //     this.error_message = client.message;
    //   }
    //   this.AdminService.setLoggedin(false);
    // },
    //   error=>{
    //     this.error=!this.error;
    //     this.error_message ="Client Not Added";
    //     console.log(this.error_message);
    //   }  
    event => {
      if (event.type == HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${percentDone}% loaded.`);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely loaded!');
      }
    },
    (err) => {
      console.log("Upload Error:", err);
    }, () => {
      this.snackBar.open('Client Updated Sucessfully', 'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.designForm.reset();
      this.upload_attachment.nativeElement.value = "";
      this.onCloseHandled();
      this.get_client_list();
      // this.upload_attachmentVariable.nativeElement.value = "";
      // this.get_attachment_list();
    }  
    ); 
  }
  }
  get_client_list(){
    this.AdminService.get_client_list().subscribe((clnt_list:clients[])=>{
      this.clients=clnt_list;
   
    });
  }
  onEdit(id:number){
    this.AdminService.edit_client(id).subscribe(client_res=>{

      this.designForm=this.formBuilder.group({
        "client":[client_res.c_name, Validators.required],
        "client_id":[client_res.id, Validators.required]
      });
      this.url = '/assets/clients/'+ client_res.c_logo;
      this.display="block";
});
  }
  onCloseHandled(){
    this.display='none';

 }
  onDelete(index: number,id:number){
    this.AdminService.del_client(id).subscribe(del_id_res=>{
      if(del_id_res.req_status == '1'){
        this.snackBar.open('Client Deleted Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.get_client_list();
      }
    });
  }
  openDialog(i,uid) {

    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        },
        uindex:i,
        uid:uid
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {

      if (data.confirmed) {
        snack.dismiss();
        this.onDelete(data.index,data.id);
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }


}
interface clients{
  client:string,
  id:number,
  imgsrc:string
}
