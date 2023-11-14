import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SupabaseService } from "../supabase.service";

@Component({
  selector: "app-campaign-edit",
  templateUrl: "./campaign-edit.component.html",
  styleUrls: ["./campaign-edit.component.scss"],
})
export class CampaignEditComponent {
  campaignForm!: FormGroup;
  campaignId!: number; // or string, depending on your ID type

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.params["id"]; // Retrieve the campaign ID from the route
    this.createForm();
    this.loadCampaignData();
  }

  createForm() {
    this.campaignForm = this.formBuilder.group({
      name: ["", Validators.required],
      keywords: ["", Validators.required],
      bidAmount: ["", [Validators.required, Validators.min(0.01)]],
      fund: ["", [Validators.required, Validators.min(0.01)]],
      status: ["", Validators.required],
      town: ["", Validators.required],
      radius: ["", [Validators.required, Validators.min(1)]],
    });
  }

  navigateToList() {
    this.router.navigate(["/campaign/list"]);
  }

  async loadCampaignData() {
    // Fetch the campaign data from the database using the campaign ID
    const { data, error } = await this.supabaseService.getCampaign(
      this.campaignId
    );
    if (error) {
      console.error("Error fetching campaign", error);
      // Handle the error, possibly redirecting the user back to the campaign list
      return;
    }

    if (data) {
      this.campaignForm.patchValue({
        name: data.campaign_name,
        keywords: data.keywords, // Assuming keywords are stored as an array
        bidAmount: data.bid_amount,
        fund: data.campaign_fund,
        status: data.status ? "on" : "off", // Convert boolean to string if necessary
        town: data.town,
        radius: data.radius,
      });
    }
  }

  async onSubmit() {
    if (this.campaignForm.valid) {
      // Convert form status back to boolean if necessary
      const formValue = {
        ...this.campaignForm.value,
        status: this.campaignForm.value.status === "on",
      };

      // Update the campaign data in the database
      const { data, error } = await this.supabaseService.updateCampaign(
        this.campaignId,
        formValue
      );
      if (error) {
        console.error("Error updating campaign", error);
        // Handle the error, possibly showing a message to the user
        return;
      }

      console.log("Campaign updated successfully", data);
      // Redirect the user back to the campaign list
      this.router.navigate(["/campaign/list"]);
    }
  }
}
