import { provideRouter, Routes } from '@angular/router';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignFormComponent } from './pages/campaign-form/campaign-form.component';
import { CampaignMessagesComponent } from './pages/campaign-messages/campaign-messages.component';

export const appRoutes: Routes = [
  { path: 'campaigns', component: CampaignListComponent },
  { path: 'campaigns/new', component: CampaignFormComponent },
  { path: 'messages/:campaignId', component: CampaignMessagesComponent },
  { path: '', redirectTo: '/campaigns', pathMatch: 'full' },
  { path: '**', redirectTo: '/campaigns' },
];

export const appConfig = {
  providers: [
    provideRouter(appRoutes)
  ],
};