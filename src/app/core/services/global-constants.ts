
import { environment } from 'environments/environment';
import { Routes } from '@app/core/services/route.URL';
import { ApiPath } from '@app/core/services/api';

export const GlobalConstants = {
    Host: environment.Host,
    Headers: {
        ContentTypes: {
            ApplicationOctetStream: {
                'Content-Type': 'application/octet-stream; charset=utf-8'
            },
            ApplicationJSON: { 'Content-Type': 'application/json' }
        },
    },
    HeaderValues: {
        ApplicationJSON: 'application/json',
        ApplicationOctetStream: 'application/octet-stream',
        AppVersion: environment.ver,
        APIVersion: '1.0',
        TokenAuth: 'Basic QFN3aWZ0MTE0IzpAU3dpZnQxMTQj'
    },
    CookieKeys: {
        Token: 'FreeLiveIPTV-loginToken',
        Channels: 'FreeLiveIPTV-channelData'
    },
    DefaultCookieExpirationInHours: 720,
    Routes: Routes,
    ApiPath: ApiPath
};

