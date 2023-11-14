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

  async updateFounds(campaignData: any) {
    // Retrieve the current amount
    const { data: currentData, error: retrieveError } = await this.supabase
      .from("found")
      .select("amount")
      .eq("id", 1)
      .single();

    if (retrieveError) {
      return { data: null, error: retrieveError };
    }

    const newAmount = currentData.amount - campaignData.fund;

    const { data, error } = await this.supabase
      .from("found")
      .update({ amount: newAmount })
      .eq("id", 1);

    return { data, error };
  }

  async getCampaigns() {
    const { data, error } = await this.supabase.from("campaign").select("*");
    return { data, error };
  }
  async getFounds() {
    const { data, error } = await this.supabase.from("found").select("*");
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
