import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS, AppState } from '@app/core';
import { HomeService } from '@app/home/home.service';
import { ChannelItems } from '@app/core/services/common.model';
import { ComonServices } from '@app/core/services/common.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  selectSettings,
  SettingsState
} from '@app/settings';

@Component({
  selector: 'anms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  GetChannelSubscribe: ISubscription;
  AllChannels: ChannelItems[];
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings: SettingsState;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private homeService: HomeService, private comonServices: ComonServices, private store: Store<AppState>) { }

  ngOnInit() {
    this.subscribeToSettings();
  }


  getChannels() {
    if (this.GetChannelSubscribe !== undefined) {
      this.GetChannelSubscribe.unsubscribe();
    }

    this.GetChannelSubscribe = this.homeService.GetList('', '').subscribe((data) => {

      if (data.length > 0) {
        this.AllChannels = data;
        this.comonServices.storeChannel(data);
      } else {
        this.AllChannels = [];
      }
    }, (err) => {
      console.log(err);
    });
  }

  private subscribeToSettings() {
    this.store
      .pipe(select(selectSettings), takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        this.settings = settings;
        const channels = this.comonServices.getChannels();
        if (channels === null) {
          this.getChannels();
        } else {
          this.AllChannels = JSON.parse(channels);
        }
      });
  }
}
