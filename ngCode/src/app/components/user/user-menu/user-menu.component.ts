import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.styl']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;

  user_role:string;
  user_name:string;


  	@Input() currentUser = null;
  	@HostListener('document:click', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		this.isOpen = false;
    	}
  	}
  	
    
  	constructor(private elementRef: ElementRef,private router: Router) { 
      this.user_role = localStorage.getItem('user_role');
      this.user_name = localStorage.getItem('user_name');	
    }


  	ngOnInit() {
  	}
    logout(){
      localStorage.removeItem("auth-key");
      localStorage.clear();
      this.router.navigate([""]);
    }
}