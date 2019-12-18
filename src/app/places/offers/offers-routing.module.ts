import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OffersPage } from './offers.page';

const routes: Routes = [
  {
    path: '',
    component: OffersPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-offer/new-offer.module').then( m => m.NewOfferPageModule)
  },
  {
    path: 'edit/:placeId',
    loadChildren: () => import('./edit-offer/edit-offer.module').then( m => m.EditOfferPageModule)
  },
  {
    path: 'offer-item',
    loadChildren: () => import('./offer-item/offer-item.component')
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersPageRoutingModule {}
