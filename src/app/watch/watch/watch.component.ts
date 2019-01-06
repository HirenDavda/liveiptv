import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComonServices } from '@app/core/services/common.service';
import { BitrateOption, VgAPI } from 'videogular2/core';
import { IDRMLicenseServer } from 'videogular2/streaming';
import { VgDASH } from 'videogular2/src/streaming/vg-dash/vg-dash';
import { VgHLS } from 'videogular2/src/streaming/vg-hls/vg-hls';
import { SubscriptionLike as ISubscription, Observable } from 'rxjs';
import { HomeService } from '@app/home/home.service';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  selectSettings,
  SettingsState
} from '@app/settings';
import { AppState } from '@app/core';

export class IMediaStream {
  type: 'vod' | 'dash' | 'hls';
  source: string;
  label: string;
  token: string;
  licenseServers: IDRMLicenseServer;
  constructor(data) {
    this.type = data.type || 'hls';
    this.source = data.source || 'https://ind17-lh.akamaihd.net/i/ind17_9xm@68548/master.m3u8';
    this.label = data.label || '';
    this.token = data.token || '';
    this.licenseServers = data.licenseServers || '';
  }
}
@Component({
  selector: 'anms-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  VideoURL = '';
  @ViewChild(VgDASH) vgDash: VgDASH;
  @ViewChild(VgHLS) vgHls: VgHLS;
  api: VgAPI;
  bitrates: BitrateOption[];
  currentStream: IMediaStream = new IMediaStream({});
  isLoaded = false;
  height = window.innerHeight - 110;
  sidebarheight = window.innerHeight - 110;
  GetChannelSubscribe: ISubscription;
  hasError = false;
  settings: SettingsState;
  private unsubscribe$: Subject<void> = new Subject<void>();
  token = '';
  constructor(private actiateRoute: ActivatedRoute, private comonServices: ComonServices,
    private homeService: HomeService, private store: Store<AppState>) { }

  ngOnInit() {
    this.RouteChangeHandler();
    if (window.innerWidth <= 600) {
      this.height = 300;
      this.sidebarheight = 700;
    }

  }
  RouteChangeHandler() {
    this.actiateRoute.params.subscribe(params => {
      this.isLoaded = false;
      this.subscribeToSettings(params);

    });
  }

  getToken(param) {
    if (this.GetChannelSubscribe !== undefined) {
      this.GetChannelSubscribe.unsubscribe();
    }
    this.token = '';
    this.GetChannelSubscribe = this.homeService.getToken().subscribe((data) => {
      console.log(data);
      this.token = data;
      this.getVideoData(param);
    }, (err) => {
      console.log('err');
      console.log(err);
    });
  }

  getVideoData(params) {
    if (params['id'] !== undefined && params['group'] !== undefined) {
      const tempReturnData = this.comonServices.getInfoByChannel(params['id']);
      if (tempReturnData !== null) {
        this.VideoURL = tempReturnData.url;
        this.currentStream.source = tempReturnData.url + this.token;
        this.currentStream.type = 'hls';
        this.currentStream.label = tempReturnData.title;
        this.isLoaded = true;
        this.hasError = false;
      }
    }
  }


  onPlayerReady(api: VgAPI) {
    this.api = api;
    console.log(this.vgHls.hls);
    this.vgHls.hls.on(this.vgHls.hls, () => {
      console.log(this.vgHls.hls);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 600) {
      this.height = 300;
      this.sidebarheight = window.innerHeight - 110 - 300;
    } else {
      this.height = event.target.innerHeight - 110;
      this.sidebarheight = this.height;
    }

  }
  private subscribeToSettings(params) {
    this.store
      .pipe(select(selectSettings), takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        this.settings = settings;
        if (settings['server'] === 'SERVER2') {
          this.getToken(params);
        } else {
          this.getVideoData(params);
        }
      });
  }
}
