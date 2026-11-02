import { IRequestOptions } from "../../types";

class Loader {
    private readonly baseLink: string;
    private readonly options: IRequestOptions;

    constructor(baseLink: string, options: IRequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }


    public getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: IRequestOptions },
        callback : (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ) : void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) : Response{
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options : IRequestOptions, endpoint : string) : string {
        const urlOptions : IRequestOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: 'GET' | 'POST',
        endpoint: string,
        callback: (data: T) => void,
        options: IRequestOptions = {}
    ) : void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
