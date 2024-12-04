import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperPageRoutingModule } from './oper-routing.module';

import { OperPage } from './oper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperPageRoutingModule
  ],
  declarations: [OperPage]
})
export class OperPageModule {}
