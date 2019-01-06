import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeTheme,
  ActionSettingsPersist,
  ActionSettingsChangeServer,
  ActionSettingsChangeCountry
} from '../settings.actions';
import { SettingsState } from '../settings.model';
import { selectSettings } from '../settings.selectors';
import { HomeService } from '@app/home/home.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Servers } from '@app/core/services/common.model';
import { ComonServices } from '@app/core/services/common.service';
@Component({
  selector: 'anms-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;
  Servers = [];
  Country = [];
  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
  ];
  GetServerSubscribe: ISubscription;
  constructor(private store: Store<{}>, private homeService: HomeService, private comonServices: ComonServices) {
    store
      .pipe(select(selectSettings), takeUntil(this.unsubscribe$))
      .subscribe(settings => (this.settings = settings));
  }

  ngOnInit() {
    this.getServer();
    if (this.settings.server !== '') {
      this.getCountries(this.settings.server);
    }
  }

  getServer() {
    this.GetServerSubscribe = this.homeService.GetServer().subscribe((data: Servers) => {
      this.Servers = data.list;
    }, (err) => {
      console.log(err);
    });
  }

  getCountries(server) {
    this.GetServerSubscribe = this.homeService.GetCountries(server).subscribe((data: Servers) => {
      this.Country = data.list;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(
      new ActionSettingsChangeAutoNightMode({ autoNightMode })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsPage({ pageAnimations })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsElements({ elementsAnimations })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onServerSelect({ value: server }) {
    this.store.dispatch(new ActionSettingsChangeServer({ server }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
    this.getCountries(server);
    this.comonServices.removeChannel();
  }

  onCountrySelect({ value: country }) {
    this.store.dispatch(new ActionSettingsChangeCountry({ country }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
    this.comonServices.removeChannel();
  }
}
