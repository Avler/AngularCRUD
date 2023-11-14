import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SupabaseService } from "../supabase.service";

@Component({
  selector: "app-campaign-list",
  templateUrl: "./campaign-list.component.html",
  styleUrls: ["./campaign-list.component.scss"],
})
export class CampaignListComponent implements OnInit {
  campaigns: any[] = [];

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
    this.router.navigate(["/campaign/create"]);
  }

  async editCampaign(campaign: any) {
    this.router.navigate(["/campaign/edit", campaign.id]);
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
