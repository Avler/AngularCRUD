import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";
import { routes } from "./app-routing.module";
import { SupabaseService } from "./supabase.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CampaignCreateComponent } from "./campaign-create/campaign-create.component";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignCreateComponent,
    CampaignListComponent,
    CampaignEditComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideRouter(routes), SupabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
