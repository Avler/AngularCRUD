import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SupabaseService } from "../supabase.service";

@Component({
  selector: "app-campaign-create",
  templateUrl: "./campaign-create.component.html",
  styleUrls: ["./campaign-create.component.scss"],
})
export class CampaignCreateComponent {
  campaignForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.createForm();
  }

  navigateToList() {
    this.router.navigate(["/campaign/list"]); // Adjust the route as necessary for your app
  }

  createForm() {
    this.campaignForm = this.formBuilder.group({
      name: ["", Validators.required],
      keywords: ["", Validators.required],
      bidAmount: ["", [Validators.required, Validators.min(0.01)]],
      fund: ["", [Validators.required, Validators.min(0.01)]],
      status: ["on", Validators.required],
      town: ["", Validators.required],
      radius: ["", [Validators.required, Validators.min(1)]],
    });
  }

  async onSubmit() {
    if (this.campaignForm.valid) {
      console.log("Form Submitted", this.campaignForm.value);
      const result = await this.supabaseService.addCampaign(
        this.campaignForm.value
      );
      if (result) {
        console.log("Campaign added successfully", result);
      }
    }
    this.navigateToList();
  }
}
