import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '@app/core/services/global-constants';
import { TranslateService } from '@ngx-translate/core';
import { ChannelItems } from '@app/core/services/common.model';

@Injectable()
export class ComonServices {
    constructor(
    ) {

    }

    storeChannel(channels) {
        localStorage.setItem(GlobalConstants.CookieKeys.Channels, JSON.stringify(channels));
    }
    removeChannel() {
        localStorage.removeItem(GlobalConstants.CookieKeys.Channels);
    }
    getChannels() {
        return localStorage.getItem(GlobalConstants.CookieKeys.Channels);
    }
    getInfoByChannel(id) {
        const data = localStorage.getItem(GlobalConstants.CookieKeys.Channels);
        const mappedData: ChannelItems[] = JSON.parse(data);
        const finded = mappedData.filter(subData => subData.id === id);
        if (finded.length > 0) {
            return finded[0];
        } else {
            return null;
        }
    }
}
