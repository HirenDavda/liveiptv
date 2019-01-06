import { Action } from '@ngrx/store';

import { Language, SettingsState } from './settings.model';

export enum SettingsActionTypes {
  CHANGE_LANGUAGE = '[Settings] Change Language',
  CHANGE_THEME = '[Settings] Change Theme',
  CHANGE_AUTO_NIGHT_AUTO_MODE = '[Settings] Change Auto Night Mode',
  CHANGE_ANIMATIONS_PAGE = '[Settings] Change Animations Page',
  CHANGE_ANIMATIONS_PAGE_DISABLED = '[Settings] Change Animations Page Disabled',
  CHANGE_ANIMATIONS_ELEMENTS = '[Settings] Change Animations Elements',
  PERSIST = '[Settings] Persist',
  CHANGE_SERVER = '[Settings] Change Server',
  CHANGE_COUNTRY = '[Settings] Change Country',
}

export class ActionSettingsChangeLanguage implements Action {
  readonly type = SettingsActionTypes.CHANGE_LANGUAGE;

  constructor(readonly payload: { language: Language }) { }
}

export class ActionSettingsChangeTheme implements Action {
  readonly type = SettingsActionTypes.CHANGE_THEME;

  constructor(readonly payload: { theme: string }) { }
}

export class ActionSettingsChangeServer implements Action {
  readonly type = SettingsActionTypes.CHANGE_SERVER;

  constructor(readonly payload: { server: string }) { }
}

export class ActionSettingsChangeCountry implements Action {
  readonly type = SettingsActionTypes.CHANGE_COUNTRY;

  constructor(readonly payload: { country: string }) { }
}

export class ActionSettingsChangeAutoNightMode implements Action {
  readonly type = SettingsActionTypes.CHANGE_AUTO_NIGHT_AUTO_MODE;

  constructor(readonly payload: { autoNightMode: boolean }) { }
}

export class ActionSettingsChangeAnimationsPage implements Action {
  readonly type = SettingsActionTypes.CHANGE_ANIMATIONS_PAGE;

  constructor(readonly payload: { pageAnimations: boolean }) { }
}

export class ActionSettingsChangeAnimationsPageDisabled implements Action {
  readonly type = SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED;

  constructor(readonly payload: { pageAnimationsDisabled: boolean }) { }
}

export class ActionSettingsChangeAnimationsElements implements Action {
  readonly type = SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS;

  constructor(readonly payload: { elementsAnimations: boolean }) { }
}

export class ActionSettingsPersist implements Action {
  readonly type = SettingsActionTypes.PERSIST;

  constructor(readonly payload: { settings: SettingsState }) { }
}

export type SettingsActions =
  | ActionSettingsPersist
  | ActionSettingsChangeLanguage
  | ActionSettingsChangeTheme
  | ActionSettingsChangeAnimationsPage
  | ActionSettingsChangeAnimationsPageDisabled
  | ActionSettingsChangeAnimationsElements
  | ActionSettingsChangeAutoNightMode
  | ActionSettingsChangeServer
  | ActionSettingsChangeCountry;
