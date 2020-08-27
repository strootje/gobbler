import { Article, ArticleDocType } from '@gobbler/domain';
import { RxDocument } from 'rxdb';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const ParseArticle = (doc: ArticleDocType): Article => new Article(doc.Id, doc.Title, doc.Url);
export const MapToArticle: OperatorFunction<RxDocument<ArticleDocType, {}>, Article> = map<RxDocument<ArticleDocType, {}>, Article>(ParseArticle);
export const MapToArticles: OperatorFunction<RxDocument<ArticleDocType, {}>[], Article[]> = map<RxDocument<ArticleDocType, {}>[], Article[]>(l => l.map(ParseArticle));
