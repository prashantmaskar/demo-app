import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../../services/project.service";
@Component({
  selector: "app-project",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.styl"]
})
export class ProjectsComponent implements OnInit {
  projects: projects[];
  post: any;
  usertoken: string;
  constructor(private ProjectService: ProjectService) {
    this.get_project_list();
  }

  ngOnInit() {}
  get_project_list() {
    this.usertoken = localStorage.getItem("auth-key");
    this.ProjectService.get_project_list(this.usertoken).subscribe(projects => {
      this.projects = projects;
    });
  }
}
interface projects {
  name: string;
  c_name: string;
  proj_id: number;
}
