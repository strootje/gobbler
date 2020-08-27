import { ArticleDocType, FeedDocType } from '@gobbler/domain';
import { RxCollection } from 'rxdb';

export type ArticleCollection = RxCollection<ArticleDocType, {}, {}>;
export type FeedCollection = RxCollection<FeedDocType, {}, {}>;

export interface DatabaseSchema {
	articles: ArticleCollection;
	feeds: FeedCollection;
}
