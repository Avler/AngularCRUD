import { Injectable } from "@angular/core";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./supabase.config";

@Injectable({
  providedIn: "root",
})
export class SupabaseService {
  private supabase = createClient(supabaseConfig.url, supabaseConfig.key);

  async addCampaign(campaignData: any) {
    const campaign = {
      campaign_name: campaignData.name,
      keywords: campaignData.keywords,
      bid_amount: campaignData.bidAmount,
      campaign_fund: campaignData.fund,
      status: campaignData.status,
      town: campaignData.town,
      radius: campaignData.radius,
    };

    const { data, error } = await this.supabase
      .from("campaign")
      .insert([campaign]);

    if (error) {
      console.error("Error adding campaign", error);
      return null;
    }
    return data;
  }

  async getCampaigns() {
    const { data, error } = await this.supabase.from("campaign").select("*");
    return { data, error };
  }

  async deleteCampaign(campaignId: number) {
    const { data, error } = await this.supabase
      .from("campaign")
      .delete()
      .match({ id: campaignId });

    return { data, error };
  }

  async getCampaign(campaignId: number) {
    const { data, error } = await this.supabase
      .from("campaign")
      .select("*")
      .eq("id", campaignId)
      .single();

    return { data, error };
  }

  async updateCampaign(campaignId: number, campaignData: any) {
    const { data, error } = await this.supabase
      .from("campaign")
      .update({
        campaign_name: campaignData.name,
        keywords: campaignData.keywords,
        bid_amount: campaignData.bidAmount,
        campaign_fund: campaignData.fund,
        status: campaignData.status,
        town: campaignData.town,
        radius: campaignData.radius,
      })
      .eq("id", campaignId);

    return { data, error };
  }
}
