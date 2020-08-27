import { Article, Feed } from '@gobbler/domain';
import * as RssParser from 'rss-parser';
import { Observable } from 'rxjs';
import * as ShortId from 'shortid';
import { MapToArticles, ParseArticle } from '../mappers/ArticleMapper';
import { PouchStorage } from '../storage/PouchStorage';

export class ArticleRepository {
	private static readonly ProxyUrl = 'https://cors-anywhere.herokuapp.com';
	private static self: ArticleRepository;

	private constructor(
		private readonly pouchStorage: PouchStorage
	) {
	}

	public static async CreateAsync(): Promise<ArticleRepository> {
		if (!ArticleRepository.self) {
			const storage = await PouchStorage.CreateAsync();
			ArticleRepository.self = new ArticleRepository(storage);
		}

		return ArticleRepository.self;
	}

	public FindAll(): Observable<Article[]> {
		return this.pouchStorage.Articles.find().$.pipe(MapToArticles);
	}

	public async FindByPermalinkAsync(permalink: string): Promise<Article | null> {
		const articleDoc = await this.pouchStorage.Articles.findOne().where('url').eq(permalink).exec();

		if (!articleDoc) {
			return null;
		}

		return ParseArticle(articleDoc);
	}

	public async FetchArticlesAsync(feed: Feed): Promise<void> {
		const parser = new RssParser();
		const output = await parser.parseURL(`${ArticleRepository.ProxyUrl}/${feed.Url}`);

		if (!output.items) {
			return;
		}

		const tasks: Promise<any>[] = [];
		for (const item of output.items) {
			tasks.push((async () => {
				const article = await this.FindByPermalinkAsync(item.link!);

				if (!article) {
					await this.pouchStorage.Articles.insert({
						Id: ShortId(),
						Title: item.title || 'derp..',
						Url: item.link || 'derp..'
					});
				}
			})());
		}

		await Promise.all(tasks);
	}
}
