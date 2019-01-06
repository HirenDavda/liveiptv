import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeService } from '@app/home/home.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [SidebarComponent],
  providers: [HomeService],
  exports: [SidebarComponent]
})
export class SidebarModule { }
