import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampaignCreateComponent } from "./campaign-create/campaign-create.component";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "campaign/list", component: CampaignListComponent },
  { path: "campaign/create", component: CampaignCreateComponent },
  { path: "campaign/edit/:id", component: CampaignEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
