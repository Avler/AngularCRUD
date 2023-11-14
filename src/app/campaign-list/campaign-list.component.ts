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
  found: any[] = [];
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
    this.loadFounds();
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

  async loadFounds() {
    const { data, error } = await this.supabaseService.getFounds();
    if (error) {
      console.error("Error loading founds", error);
      this.found = [];
    } else {
      this.found = data || [];
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
      // Retrieve the campaign's fund amount
      const campaignToDelete = this.campaigns.find((c) => c.id === campaign.id);
      const campaignFund = campaignToDelete
        ? campaignToDelete.campaign_fund
        : 0;

      // Delete the campaign
      const { error } = await this.supabaseService.deleteCampaign(campaign.id);
      if (!error) {
        // Update the found balance and refresh it
        const updateResult = await this.supabaseService.updateFounds({
          fund: -campaignFund,
        });
        if (!updateResult.error) {
          this.loadFounds(); // Refresh the balance
        }
        this.loadCampaigns(); // Refresh the list
      }
    }
  }
}
