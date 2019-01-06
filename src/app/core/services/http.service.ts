import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { GlobalConstants } from './global-constants';
import { TranslateService } from '@ngx-translate/core';
import { ErrorModel } from './common.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import {RequestOptions} from "@angular/http";

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private translateService: TranslateService
    ) {

    }
    DeepTrim(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                const value = obj[prop], type = typeof value;
                if (value != null && (type === 'string' || type === 'object') && obj.hasOwnProperty(prop)) {
                    if (type === 'object') {
                        this.DeepTrim(obj[prop]);
                    } else {
                        obj[prop] = obj[prop].trim();
                    }
                }
            }
        }
        return obj;
    }

    dataURItoBlob(dataURI) {
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = decodeURI(dataURI.split(',')[1]);
        }
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const array = [];
        for (let i = 0; i < byteString.length; i++) {
            array.push(byteString.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: mimeString });
    }

    blobToFile(theBlob: Blob, fileName): File {
        const b: any = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;

        // Cast to a File() type
        return <File>theBlob;
    }

    postWithFile<TReturn>(apiPath: string, fieldName: string[], files: File[]): Observable<any> {

        const headers = new HttpHeaders();
        const formData: FormData = new FormData();
        let i = 0;
        files.forEach(data => {
            if (fieldName[i] === null && data.name !== undefined && data.name !== null) {
                fieldName[i] = data.name;
            }
            formData.append(fieldName[i], data, fieldName[i]);
            i++;
        });
        let header = this.getDefaultRequestHeaders();
        header = header.set('X-Requested-With', 'XMLHttpRequest');
        header = header.delete('Content-Type');
        return this.http.post(GlobalConstants.Host + apiPath, formData, {
            headers: header
        }).pipe(map(this.extractData), catchError(this.handleError));
    }
    post<TReturn>(apiPath: string, requestObject: Object, options?: any): Observable<TReturn> {

        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }

        return this.http.post(GlobalConstants.Host + apiPath, this.DeepTrim(requestObject), options).pipe(
            map(this.extractData), catchError(this.handleError));
    }

    put<TReturn>(apiPath: string, putObject?: Object, options?: any): Observable<TReturn> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }
        return this.http.put(GlobalConstants.Host + apiPath, this.DeepTrim(putObject), options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    putWithQueryParams<TReturn>(apiPath: string, options?: any): Observable<any> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }
        return this.http.put(GlobalConstants.Host + apiPath, null, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    delete<TReturn>(apiPath: string, options?: any): Observable<any> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }
        return this.http.delete(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    deleteWithBody<TReturn>(apiPath: string, body: any): Observable<any> {
        const options = {
            headers: this.getDefaultRequestHeaders(),
            body: body
        };
        return this.http.delete(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    get<TReturn>(apiPath: string, searchParams?: any): Observable<any> {
        const options: any = {
            headers: this.getDefaultRequestHeaders(),
            search: searchParams
        };
        return this.http.get(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    download(apiPath: string, searchParams?: any): Observable<any> {
        const options: any = {
            headers: this.getDefaultRequestHeaders()
        };
        options.responseType = 'arrayBuffer';
        return this.http.request(GlobalConstants.Host + apiPath, options).pipe(
            map((res: any) => {
                return new Blob([res.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            }),
            catchError(this.handleError));
    }

    /**Simple GET request with no predefined values */
    getFile(url: string): Observable<any> {
        const options: any = {
            method: 'GET',
            responseType: 'arrayBuffer',
            headers: new HttpHeaders(GlobalConstants.Headers.ContentTypes.ApplicationOctetStream)
        };

        return this.http.request(url, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getListWithOptions<TModel>(apiPath: string, headers?: HttpHeaders): Observable<any> {
        const options: any = {
            headers: headers
        };
        if (!options.headers) {
            headers = this.getDefaultRequestHeaders();
        }

        return this.http.get(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }


    getDefaultRequestHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': GlobalConstants.HeaderValues.ApplicationJSON,
            'x-app-version': GlobalConstants.HeaderValues.AppVersion,
            'accept-language': this.translateService.currentLang,
            'x-api-version': GlobalConstants.HeaderValues.APIVersion
        });
        return headers;
    }

    private extractData(res: Response): any {
        if (res === null) {
            return [];
        } else {
            const body: any = res;
            return body || {};
        }
    }

    private handleError(error: any) {
        // console.warn(error);
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // checking if usr is logged in or not. If not then do not redirect. if yes then redirect
        console.log(error);
        if (error.status === 401) {
            window.location.href = '/' + GlobalConstants.Routes.auth + '/' + GlobalConstants.Routes._401;
            return observableThrowError(error.status);
        }
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        if (error.status === 400 && error.hasOwnProperty('error')) {
            return observableThrowError(error.error);
        } else if (error.status === 503) {
            const errorData: ErrorModel = { ErrorCode: 503, ErrorMessage: 'Service Not Available' };
            return observableThrowError(errorData);
        } else if (error.status === 0) {
            const errorData: ErrorModel = { ErrorCode: 0, ErrorMessage: 'Internet Not Connect' };
            return observableThrowError(errorData);
        }
        return observableThrowError(JSON.parse(error._body));
    }
}
