import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HomeService } from '@app/home/home.service';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
  {
    path: '**',
    component: HomeComponent
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
