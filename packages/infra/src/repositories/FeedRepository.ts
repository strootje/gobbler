import { Feed } from '@gobbler/domain';
import { Observable } from 'rxjs';
import { MapToFeed, MapToFeedDocType } from '../mappers/FeedMapper';
import { PouchStorage } from '../storage/PouchStorage';

export class FeedRepository {
	private static self: FeedRepository;

	private constructor(
		private readonly pouchStorage: PouchStorage
	) {
	}

	public static async CreateAsync(): Promise<FeedRepository> {
		if (!FeedRepository.self) {
			const storage = await PouchStorage.CreateAsync();
			FeedRepository.self = new FeedRepository(storage);
		}

		return FeedRepository.self;
	}

	public Add(feed: Feed): void {
		this.pouchStorage.Feeds.insert(MapToFeedDocType(feed));
	}

	public FindAll(): Observable<Feed[]> {
		return this.pouchStorage.Feeds.find().$.pipe(MapToFeed);
	}
}
