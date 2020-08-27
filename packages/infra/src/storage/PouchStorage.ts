import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { ArticleSchema } from './schemas/ArticleSchema';
import { ArticleCollection, DatabaseSchema, FeedCollection } from './schemas/DatabaseSchema';
import { FeedSchema } from './schemas/FeedSchema';

export class PouchStorage {
	private static self: PouchStorage;

	private constructor(
		private readonly context: RxDatabase<DatabaseSchema>
	) {
	}

	public static async CreateAsync(): Promise<PouchStorage> {
		if (!PouchStorage.self) {
			addRxPlugin(require('pouchdb-adapter-indexeddb'));
			const context = await createRxDatabase<DatabaseSchema>({
				name: 'globber',
				adapter: 'indexeddb'
			});

			await context.collection({
				name: 'articles',
				schema: ArticleSchema
			});

			await context.collection({
				name: 'feeds',
				schema: FeedSchema
			});

			PouchStorage.self = new PouchStorage(context);
		}

		return PouchStorage.self;
	}

	public get Articles(): ArticleCollection { return this.context.articles; }
	public get Feeds(): FeedCollection { return this.context.feeds; }
}
