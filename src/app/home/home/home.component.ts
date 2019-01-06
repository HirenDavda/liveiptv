import { Component, OnInit } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { HomeService } from '@app/home/home.service';
import { ChannelItems } from '@app/core/services/common.model';
import { ROUTE_ANIMATIONS_ELEMENTS, AppState } from '@app/core';
import { ComonServices } from '@app/core/services/common.service';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  selectSettings,
  SettingsState
} from '@app/settings';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  GetChannelSubscribe: ISubscription;
  AllChannels: ChannelItems[];
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings: SettingsState;
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private homeService: HomeService, private comonServices: ComonServices, private store: Store<AppState>) { }

  ngOnInit() {

    this.subscribeToSettings();
  }

  getData() {
    const channels = this.comonServices.getChannels();
    if (channels === null) {
      this.getChannels();
    } else {
      this.AllChannels = JSON.parse(channels);
    }
  }

  getChannels() {
    if (this.GetChannelSubscribe !== undefined) {
      this.GetChannelSubscribe.unsubscribe();
    }
    this.GetChannelSubscribe = this.homeService.GetList(this.settings.server, this.settings.country).subscribe((data) => {
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
        this.getData();
      });
  }
}
