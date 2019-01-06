import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';

import { HttpClientModule } from '@angular/common/http';
import { ComonServices } from '@app/core/services/common.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [HttpService, ComonServices],
  exports: []
})
export class CoreModule { }
