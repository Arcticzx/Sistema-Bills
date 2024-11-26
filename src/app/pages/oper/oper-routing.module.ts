import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperPage } from './oper.page';

const routes: Routes = [
  {
    path: '',
    component: OperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperPageRoutingModule {}
