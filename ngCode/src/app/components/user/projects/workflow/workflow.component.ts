import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MinusSignToParens } from './minusSignToParens.pipe';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatTabGroup } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ConfirmationDialog } from '../../admin/confirm-dialog/confirmation-dialog.component';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ProjectService } from '../../../../services/project.service';
import { environment } from '../../../../../environments/environment';

import { from } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.styl'],
  providers: [DatePipe, MinusSignToParens]
})
export class WorkflowComponent implements OnInit {
  p_id: number;
  displaytask = 'none';
  displayetask = 'none';
  taskaddForm: FormGroup;
  taskeditForm: FormGroup;
  commentForm: FormGroup;
  feedbackForm: FormGroup;
  taskdesc = new FormControl('');
  tasksdate = new FormControl('');
  taskedate = new FormControl('');
  etasksdate = new FormControl('');
  etaskedate = new FormControl('');
  public member: FormControl = new FormControl();
  public status: FormControl = new FormControl();
  taskscdate: string;
  taskecdate: string;
  etaskscdate: string;
  etaskecdate: string;
  etasksdate1: string;
  taskname: string;
  task_id: number;
  post: any;
  error: boolean = false;
  titleAlert: string = 'This Field is Required';
  error_message = "";
  usertoken: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  columns: columns[];
  stscolumns: columns[];
  ticketlist: ticketlist[];
  nteammembrs: nteammembrs[];
  attachments: attachments[];
  comments: comments[];
  feedbacks: feedbacks[];
  selected = new Array();
  selcolumnid: number;
  dayremain: any;
  taskcomment: string;
  taskfeedback: string;
  user_role: string;
  islead: boolean;
  items: string[];
  minDates: any;
  taskehour: number;
  taskahour: number;
  taskrhour: number;
  actualHour: number;
  estimateHour: number;
  hourstat: number;
  feedback_id: number;
  @ViewChild('upload_attachment') upload_attachmentVariable: ElementRef;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  today: string;
  todays: number;
  @ViewChild('buttontxtt') private buttontxtt: any;
  @ViewChild('buttontxttm') private buttontxttm: any;
  @ViewChild('buttontxttmf') private buttontxttmf: any;
  @ViewChild('estimateHours') private estimateHours: any;
  @ViewChild('actualHours') private actualHours: any;
  rootapi = environment.baseUrl;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private ProjectService: ProjectService, public snackBar: MatSnackBar, private datePipe: DatePipe, private renderer: Renderer2, public dialog: MatDialog,private titleService: Title) {
    this.route.parent.params.subscribe(params =>

      this.p_id = params['project_id']
    );
    this.todays = Date.now();
    this.today = this.datePipe.transform(this.todays, 'yyyy-MM-dd HH:MM:SS');

    this.taskname = "";
    this.user_role = localStorage.getItem('user_role');
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.chk_if_lead(this.usertoken).subscribe(val => {
      this.islead = val.is_lead;
    });
    this.taskaddForm = formBuilder.group({

      "taskname": [null, Validators.required],
      taskdesc: this.taskdesc,
      tasksdate: this.tasksdate,
      taskedate: this.taskedate,
      member: this.member,
      "taskehour": ["0", Validators.required],
      "taskahour": ["0", Validators.required],
      "taskrhour": ["0", Validators.required],
    }, { validator: this.dateLessThan('tasksdate', 'taskedate') });
    this.taskeditForm = formBuilder.group({
      "taskname": [null, Validators.required],
      taskdesc: this.taskdesc,
      etasksdate: this.etasksdate,
      etaskedate: this.etaskedate,
      task_id: this.task_id,
      emember: this.member,
      "taskehour": ["0", Validators.required],
      "taskahour": ["0", Validators.required],
      "taskrhour": ["0", Validators.required],
    }, { validator: this.dateLess('etasksdate', 'etaskedate') });

    this.commentForm = formBuilder.group({
      comment_id: ['0', Validators.required],
      "taskcomment": [null, Validators.required],
      task_id: this.task_id
    });
    this.feedbackForm = formBuilder.group({
      feedback_id: ['0', Validators.required],
      "taskfeedback": [null, Validators.required],
      task_id: this.task_id
    });
    this.get_task_list();
    this.get_nteam_list();
    this.get_stscolumn_list();

  }
  minDate = new Date();
  Dayremain(dates, enddate) {
    let date1 = new Date(enddate).getTime();
    let date2 = new Date().getTime();
    let diffMs = (date1 - date2);
    let diffDays = Math.floor(diffMs / 86400000); // days
    // let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    // let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //this.dayremain = diffDays;
    //alert(diffDays);
    if (diffDays == 0) {
      this.dayremain = "Ending Today";
    }
    if (diffDays < 0) {
      this.dayremain = "Deadline Passed";
    }
    if (diffDays > 0) {
      this.dayremain = diffDays + " Day(s) Remaining";
    }
    //return this.dayremain;

  }
  dateLessThan(taskedate: string, tasksdate: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[tasksdate];
      let t = group.controls[taskedate];
      if (f.value < t.value) {

        return {
          dates: 'Start Date should be less than End Date'

        };
      }
      return {};
    }
  }
  dateLess(etasksdate: string, etaskedate: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[etasksdate];
      let t = group.controls[etaskedate];
      if (f.value > t.value) {

        return {
          dates: 'Start Date should be less than End Date'

        };
      }
      return {};
    }
  }
  fnUpdateMinMaxDates(etasksdateval: string, etaskedateval: string) {

    this.minDates = new Date(etasksdateval);


    let todate = new Date(etaskedateval).getTime();

    // if(frmdate > todate)
    // {


    //   console.log(this.buttontxtt._elementRef);
    //   this.buttontxtt._elementRef.nativeElement.disabled = true;
    //   alert('Start Date should be less than End Date');
    // }
  }
  // items: string[] =[ "Noah", "Liam", "Mason", "Jacob" ];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('dropped Event',
        `> dropped '${event.item.data}' into '${event.container.id}'`);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('dropped Event',
        `> dropped '${event.item.data}' into '${event.container.id}'`);
      if (event.container.id != '1') {
        this.update_task_status(event.item.data, event.container.id);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }

    }


  }

  update_task_status(task_id, colmn_id) {
    this.ProjectService.update_task_status(this.p_id, task_id, colmn_id, this.usertoken).subscribe(project => {
      console.log(project)
      if (project.req_status == '1') {
        this.snackBar.open('Task Status Updated Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });

        this.get_stscolumn_list();
      }
      else {
        this.error = true;
        this.error_message = project.message;
      }
      this.ProjectService.setLoggedin(false);


    }
    );
  }
  ngOnInit() {
    this.titleService.setTitle("CDE - Project Workflow");
  }
  opentask() {

    this.taskname = null;
    this.taskdesc = null;
    this.tasksdate = null;
    this.taskedate = null;
    this.taskehour = 0;
    this.taskahour = 0;
    this.taskrhour = 0;
    //this.taskscdate = this.convert(this.tasksdate);
    //this.taskecdate = this.convert(this.taskedate);
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.add_task(this.p_id, this.taskname, this.taskdesc, this.taskscdate, this.taskecdate, this.member.value, this.taskehour, this.taskahour, this.taskrhour, this.usertoken).subscribe(project => {
      if (project.req_status == '1') {
        /*this.snackBar.open('Task Added Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });*/
        this.edittask(project.task_id);
        this.taskaddForm.reset();
        this.displaytask = 'none';
        this.get_task_list();
      }
      else {
        this.error = true;
        this.error_message = project.message;
      }
      this.ProjectService.setLoggedin(false);


    }
    );


  }
  onCloseHandledtask() {
    this.displaytask = 'none';


  }
  //Get Team List
  get_nteam_list() {
    this.usertoken = localStorage.getItem('auth-key');

    this.ProjectService.get_pteam_list(this.p_id, this.usertoken).subscribe((nteam_list: nteammembrs[]) => {
      this.nteammembrs = nteam_list;

    });

  }
  //get task list
  get_task_list() {

    this.ProjectService.get_task_list(this.p_id).subscribe((task_list: columns[]) => {
      this.columns = task_list;


    });
  }
  //get task list
  get_stscolumn_list() {

    this.ProjectService.get_stscolumn_list().subscribe((column_list: columns[]) => {
      this.stscolumns = column_list;


    });
  }
  //add task fun

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  addtask(post) {

    this.taskname = post.taskname;
    this.taskdesc = post.taskdesc;
    this.tasksdate = post.tasksdate;
    this.taskedate = post.taskedate;

    this.taskscdate = this.convert(this.tasksdate);
    this.taskecdate = this.convert(this.taskedate);
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.add_task(this.p_id, this.taskname, this.taskdesc, this.taskscdate, this.taskecdate, this.member.value, this.taskehour, this.taskahour, this.taskrhour, this.usertoken).subscribe(project => {
      if (project.req_status == '1') {
        this.snackBar.open('Task Added Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.taskaddForm.reset();
        this.displaytask = 'none';
        this.get_task_list();
      }
      else {
        this.error = true;
        this.error_message = project.message;
      }
      this.ProjectService.setLoggedin(false);


    }
    );
  }

  selectFile(event) {
    this.uploadFile(event.target.files);

  }
  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");

      return

    }
    let file: File = files[0];
    this.ProjectService.uploadFile(file, this.p_id, this.ticketlist[0].ticket_id, this.usertoken)
      .subscribe(
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
          this.snackBar.open('Attachment Added Sucessfully', 'close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.upload_attachmentVariable.nativeElement.value = "";
          this.get_attachment_list();
          this.get_task_list();
        }
      )
  }
  edittask(taskid) {
    this.displayetask = "block";
    this.tabGroup.selectedIndex = 0;
    this.selected = [];
    this.ProjectService.get_task_details(taskid).subscribe((task_details: ticketlist[]) => {
      this.ticketlist = task_details;
      let startDateVal = new Date();
      let endDateVal = new Date();

      if (this.ticketlist[0].start_date != null) {
        startDateVal = new Date(this.ticketlist[0].start_date);
      }

      if (this.ticketlist[0].end_date != null) {
        endDateVal = new Date(this.ticketlist[0].end_date);
      }

      this.taskeditForm = this.formBuilder.group({
        "taskname": [this.ticketlist[0].name, Validators.required],
        taskdesc: this.ticketlist[0].description,
        etasksdate: (startDateVal).toISOString(),
        etaskedate: (endDateVal).toISOString(),
        "taskehour": [this.ticketlist[0].estimated_hours, Validators.required],
        "taskahour": [this.ticketlist[0].actual_hours, Validators.required],
        "taskrhour": [this.ticketlist[0].rework_hours, Validators.required],
        task_id: this.ticketlist[0].ticket_id,
      }, { validator: this.dateLess('etasksdate', 'etaskedate') });
      this.hourstat = this.ticketlist[0].actual_hours - this.ticketlist[0].estimated_hours;
      this.commentForm = this.formBuilder.group({
        comment_id: ['0', Validators.required],
        "taskcomment": [null, Validators.required],
        task_id: this.ticketlist[0].ticket_id,
      });
      this.feedbackForm = this.formBuilder.group({
        feedback_id: ['0', Validators.required],
        "taskfeedback": [null, Validators.required],
        task_id: this.ticketlist[0].ticket_id,
      });
      this.get_task_user_username();
      this.get_task_comments(this.ticketlist[0].ticket_id);
      this.get_task_feedbacks(this.ticketlist[0].ticket_id);
      this.get_attachment_list();



      if (this.ticketlist[0].members != null) {
        this.selected = this.ticketlist[0].members.split(", ");
      } else {
        this.selected = [];
      }
      this.status.setValue(this.ticketlist[0].column_id);
    });
  }
  updatetask(post) {
    this.task_id = post.task_id;
    this.taskname = post.taskname;
    this.taskdesc = post.taskdesc;
    this.tasksdate = post.etasksdate;
    this.taskedate = post.etaskedate;
    this.usertoken = localStorage.getItem('auth-key');
    this.taskscdate = this.convert(this.tasksdate);
    this.taskecdate = this.convert(this.taskedate);
    this.taskehour = post.taskehour;
    this.taskahour = post.taskahour;
    this.taskrhour = post.taskrhour;
    this.usertoken = localStorage.getItem('auth-key');

    this.ProjectService.update_task(this.p_id, this.task_id, this.taskname, this.taskdesc, this.taskscdate, this.taskecdate, this.member.value, this.status.value, this.taskehour, this.taskahour, this.taskrhour, this.usertoken).subscribe(project => {
      if (project.req_status == '1') {
        this.snackBar.open('Changes Saved Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.taskeditForm.reset();
        this.displayetask = 'none';
        this.get_task_list();
        this.member.reset();
      }
      else {
        this.error = true;
        this.error_message = project.message;
      }
      this.ProjectService.setLoggedin(false);

    },
      error => {
        this.error = !this.error;
        this.error_message = "Task Not updated";
      }
    );
  }

  addcomment(post) {
    this.task_id = post.task_id;
    this.taskcomment = post.taskcomment;
    this.usertoken = localStorage.getItem('auth-key');
    this.buttontxttm._elementRef.nativeElement.innerText = 'Add Comment';
    if (post.comment_id != 0) {

      this.ProjectService.update_comment(post.comment_id, this.p_id, this.task_id, this.taskcomment, this.usertoken).subscribe(project => {
        if (project.req_status == '1') {
          this.snackBar.open('Comment Updated Sucessfully', 'close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.commentForm.reset();
          this.commentForm = this.formBuilder.group({
            comment_id: ['0', Validators.required],
            "taskcomment": [null, Validators.required],
            task_id: this.ticketlist[0].ticket_id,
          });
          this.get_task_comments(post.task_id);
          this.get_task_list();
        }
        else {
          this.error = true;
          this.error_message = project.message;
        }
        this.ProjectService.setLoggedin(false);

      },
        error => {
          this.error = !this.error;
          this.error_message = "Comment Not Added ";
        }
      );
    }
    else {
      this.ProjectService.add_commnet(this.p_id, this.task_id, this.taskcomment, this.usertoken).subscribe(project => {
        if (project.req_status == '1') {
          this.snackBar.open('Comment Added Sucessfully', 'close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.commentForm.reset();
          this.commentForm = this.formBuilder.group({
            comment_id: ['0', Validators.required],
            "taskcomment": [null, Validators.required],
            task_id: this.ticketlist[0].ticket_id,
          });
          this.get_task_comments(post.task_id);
          this.get_task_list();
        }
        else {
          this.error = true;
          this.error_message = project.message;
        }
        this.ProjectService.setLoggedin(false);

      },
        error => {
          this.error = !this.error;
          this.error_message = "Comment Not Added";
        }
      );
    }
  }
  commentEdit(comment, comment_id) {
    // console.log(this.buttontxtt._elementRef.nativeElement);
    this.commentForm = this.formBuilder.group({
      comment_id: [comment_id, Validators.required],
      "taskcomment": [comment.comment, Validators.required],
      task_id: comment.ticket_id
    });

    this.buttontxttm._elementRef.nativeElement.innerText = 'Update Comment';
  }
  get_task_comments(task_id) {
    this.ProjectService.get_commnets(task_id).subscribe(comment => {
      this.comments = comment;



    },
      error => {
        this.error = !this.error;
        this.error_message = "Comment Not Added";
      }
    );
  }
  //feedback
  addtaskfeedback(post) {
    this.task_id = post.task_id;
    this.taskfeedback = post.taskfeedback;
    this.usertoken = localStorage.getItem('auth-key');
    this.buttontxttmf._elementRef.nativeElement.innerText = 'Add Feedback';
    if (post.feedback_id != 0) {

      this.ProjectService.update_feedback(post.feedback_id, this.p_id, this.task_id, this.taskfeedback, this.usertoken).subscribe(project => {
        if (project.req_status == '1') {
          this.snackBar.open('Feedback Updated Sucessfully', 'close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.feedbackForm.reset();
          this.feedbackForm = this.formBuilder.group({
            feedback_id: ['0', Validators.required],
            "taskfeedback": [null, Validators.required],
            task_id: this.ticketlist[0].ticket_id,
          });
          this.get_task_feedbacks(post.task_id);
          this.get_task_list();
        }
        else {
          this.error = true;
          this.error_message = project.message;
        }
        this.ProjectService.setLoggedin(false);

      },
        error => {
          this.error = !this.error;
          this.error_message = "Feedback Not Added ";
        }
      );
    }
    else {
      this.ProjectService.add_feedback(this.p_id, this.task_id, this.taskfeedback, this.usertoken).subscribe(project => {
        if (project.req_status == '1') {
          this.snackBar.open('Feedback Added Sucessfully', 'close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.feedbackForm.reset();
          this.feedbackForm = this.formBuilder.group({
            feedback_id: ['0', Validators.required],
            "taskfeedback": [null, Validators.required],
            task_id: this.ticketlist[0].ticket_id,
          });
          this.get_task_feedbacks(post.task_id);
          this.get_task_list();
        }
        else {
          this.error = true;
          this.error_message = project.message;
        }
        this.ProjectService.setLoggedin(false);

      },
        error => {
          this.error = !this.error;
          this.error_message = "Feedback Not Added";
        }
      );
    }
  }

  feedbackEdit(feedback, feedback_id) {
    // console.log(this.buttontxtt._elementRef.nativeElement);
    this.feedbackForm = this.formBuilder.group({
      feedback_id: [feedback_id, Validators.required],
      "taskfeedback": [feedback.feedback, Validators.required],
      task_id: feedback.ticket_id
    });

    this.buttontxttmf._elementRef.nativeElement.innerText = 'Update Feedback';
  }
  get_task_feedbacks(task_id) {
    this.ProjectService.get_feedbacks(task_id).subscribe(feedback => {
      this.feedbacks = feedback;



    },
      error => {
        this.error = !this.error;
        this.error_message = "Feedback Not Added";
      }
    );
  }

  get_task_user_username() {
    this.ProjectService.get_task_user_username(this.p_id).subscribe(comment => {
      this.items = comment;
    },
      error => {
        this.error = !this.error;
        this.error_message = "Comment Not Added";
      }
    );
  }
  delete_task(task_id) {

    this.ProjectService.del_task(task_id, this.p_id, this.usertoken).subscribe(del_id_res => {

      this.get_task_list();

    });
  }
  openDialog(event: Event, task_id) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you surely want to delete?',
        buttonText: {
          ok: 'Ok',
          cancel: 'No'
        },

        uid: task_id
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {
      if (data.confirmed) {
        snack.dismiss();
        this.delete_task(data.id);
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }

  openDialogs(event: Event, task_id) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you surely want to delete?',
        buttonText: {
          ok: 'Ok',
          cancel: 'No'
        },

        uid: task_id
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {
      if (data.confirmed) {
        snack.dismiss();
        this.del_attach(data.id);
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }

  openDialogs1(event: Event, task_id) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you surely want to delete?',
        buttonText: {
          ok: 'Ok',
          cancel: 'No'
        },

        uid: task_id
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {
      if (data.confirmed) {
        snack.dismiss();
        this.del_comment(data.id);
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }


  del_comment(comment_id) {
    this.ProjectService.del_comment(comment_id, this.ticketlist[0].ticket_id, this.p_id, this.usertoken).subscribe(del_id_res => {
      this.get_task_comments(this.ticketlist[0].ticket_id);
      this.get_nteam_list();
      this.commentForm.reset();
      this.buttontxttm._elementRef.nativeElement.innerText = 'Add Comment';
      this.commentForm = this.formBuilder.group({
        comment_id: ['0', Validators.required],
        "taskcomment": [null, Validators.required],
        task_id: this.ticketlist[0].ticket_id,
      });
    });
  }
  del_feedback(feedback_id, i) {
    this.ProjectService.del_feedback(feedback_id, this.ticketlist[0].ticket_id, this.p_id, this.usertoken).subscribe(del_id_res => {

      this.feedbacks.splice(i, 1);
      this.get_nteam_list();

      this.feedbackForm.reset();
      this.buttontxttmf._elementRef.nativeElement.innerText = 'Add Feedback';
      this.feedbackForm = this.formBuilder.group({
        feedback_id: ['0', Validators.required],
        "taskfeedback": [null, Validators.required],
        task_id: this.ticketlist[0].ticket_id,
      });
    });
  }
  get_attachment_list() {
    this.ProjectService.get_attchments(this.ticketlist[0].ticket_id).subscribe(attchment => {
      this.attachments = attchment;
    },
      error => {
        this.error = !this.error;
        this.error_message = "Comment Not Added";
      }
    );
  }
  del_attach(attachment_id, ) {
    this.ProjectService.delete_attachment(attachment_id, this.ticketlist[0].ticket_id, this.p_id, this.usertoken).subscribe(del_id_res => {

      this.get_attachment_list();

    });
  }
  onCloseHandledetask() {
    this.displayetask = 'none';
  }
  actualhour() {

    this.estimateHour = this.estimateHours.nativeElement.value;
    this.actualHour = this.actualHours.nativeElement.value;

    this.hourstat = this.actualHour - this.estimateHour;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
export interface ticketlist {
  column_id: number;
  created_by: number;
  description: string;
  name: string;
  slug: string;
  proj_id: number;
  ticket_id: number;
  start_date: string;
  end_date: string;
  members: string;
  estimated_hours: number;
  actual_hours: number;
  rework_hours: number;
};
export interface columns {
  id: number;
  name: string;
  ticket: {
    [key: string]: ticketlist
  };
}
export interface nteammembrs {
  email: string;
  uid: number;
  first_name: string;
}
export interface comments {
  comment_id: number;
  ticket_id: number;
  created_by: string;
  entry_time: string;
  first_name: string;
  comment: string;
}
export interface feedbacks {
  feedback_id: number;
  ticket_id: number;
  created_by: string;
  entry_time: string;
  first_name: string;
  feedback: string;
}
export interface attachments {
  attachment_id: number;
  ticket_id: number;
  proj_id: number;
  entry_time: string;
  first_name: string;
  display_name: string;
  file: string;
}