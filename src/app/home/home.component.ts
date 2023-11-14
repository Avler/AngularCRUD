import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToList() {
    this.router.navigate(["/campaign/list"]);
  }

  goToCreate() {
    this.router.navigate(["/campaign/create"]);
  }
}
