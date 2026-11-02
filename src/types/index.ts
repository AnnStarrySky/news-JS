export interface ISource {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface ISourcesResponse {
    status: 'ok' | 'error';
    sources: ISource[];
}

export interface IArticleSource {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: IArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface INewsResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: IArticle[];
}

export interface IRequestOptions {
    [key: string]: string;
}