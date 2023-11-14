import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SupabaseService } from "../supabase.service";

@Component({
  selector: "app-campaign-list",
  templateUrl: "./campaign-list.component.html",
  styleUrls: ["./campaign-list.component.scss"],
})
export class CampaignListComponent implements OnInit {
  campaigns: any[] = []; // This should match the type of your campaign objects

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  async loadCampaigns() {
    const { data, error } = await this.supabaseService.getCampaigns();
    if (error) {
      console.error("Error loading campaigns", error);
      this.campaigns = [];
    } else {
      this.campaigns = data || [];
    }
  }

  navigateToCreate() {
    this.router.navigate(["/campaign/create"]); // Adjust the route as necessary for your app
  }

  async editCampaign(campaign: any) {
    // Navigate to the CampaignCreateComponent with the campaign id as a parameter
    this.router.navigate(["/campaign/edit", campaign.id]); // Make sure you have the route set up for this
  }

  async deleteCampaign(campaign: any) {
    const confirmation = confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (confirmation) {
      const { error } = await this.supabaseService.deleteCampaign(campaign.id);
      if (error) {
        console.error("Error deleting campaign", error);
      } else {
        this.loadCampaigns(); // Refresh the list
      }
    }
  }
}
