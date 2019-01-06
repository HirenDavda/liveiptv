import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsContainerComponent } from './settings';
import { StreamingPlayerModule } from '@app/streaming-player/streaming-player.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'watch/:group/:id',
    loadChildren: './watch/watch.module#WatchModule',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'menu.settings' }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
