import { Injectable } from '@angular/core';
import { GlobalConstants } from '@app/core/services/global-constants';
import { HttpService } from '@app/core/services/http.service';
import { ChannelItems, Servers, Country } from '@app/core/services/common.model';

@Injectable()
export class HomeService {

  constructor(
    private httpService: HttpService
  ) { }

  GetList(server, country) {
    if (server === '') {
      server = 'SERVER1';
    }
    const apiPath = `${GlobalConstants.ApiPath.GetAllChannels}?server=${server}&country=${country}`;
    return this.httpService.get<ChannelItems[]>(apiPath);
  }

  GetServer() {
    const apiPath = `${GlobalConstants.ApiPath.GetServers}`;
    return this.httpService.get<Servers[]>(apiPath);
  }

  GetCountries(server) {
    const apiPath = `${GlobalConstants.ApiPath.GetCountry}${server}`;
    return this.httpService.get<Country[]>(apiPath);
  }

  getToken() {
    return this.httpService.get<any>(GlobalConstants.ApiPath.GetToken);
  }

}
