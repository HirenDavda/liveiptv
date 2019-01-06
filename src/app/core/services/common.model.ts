
export class ErrorModel {
    ErrorCode: number;
    ErrorMessage: string;

    constructor(data) {
        this.ErrorCode = data.ErrorCode || 0;
        this.ErrorMessage = data.ErrorCode || '';

    }
}
export class ChannelItems {
    group: string;
    id: string;
    media_url: string;
    service: string;
    thumb_square: string;
    title: string;
    url: string;
    constructor(data) {
        this.group = data.group || '';
        this.media_url = data.media_url || '';
        this.id = data.id || '';
        this.service = data.service || '';
        this.thumb_square = data.thumb_square || '';
        this.title = data.title || '';
        this.url = data.url || '';
    }
}

export class Country {
    list: any[];
    constructor(data) {
        this.list = data.list || [];
    }
}

export class Servers {
    list: any[];
    constructor(data) {
        this.list = data.list || [];
    }
}
