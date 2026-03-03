import { Routes } from '@angular/router';

import { AssetsListComponent } from './pages/assets-list/assets-list';
import { AssetFormComponent } from './pages/asset-form/asset-form';

export const routes: Routes = [
  { path: '', redirectTo: 'assets', pathMatch: 'full' },
  { path: 'assets', component: AssetsListComponent },
  { path: 'assets/new', component: AssetFormComponent },
  { path: 'assets/:id/edit', component: AssetFormComponent },
];