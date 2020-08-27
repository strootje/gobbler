import { Feed, FeedDocType, GenericFeed, YoutubeFeed, YoutubeFeedDocType } from '@gobbler/domain';
import { RxDocument } from 'rxdb';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const MapToFeed: OperatorFunction<RxDocument<FeedDocType, {}>[], Feed[]> = map<RxDocument<FeedDocType, {}>[], Feed[]>(l => l.map(p => {
	if (IsYoutubeFeed(p)) {
		return new YoutubeFeed(p.Id, p.Title, p.ChannelId);
	} else {
		return new GenericFeed(p.Id, p.Title, p.Url);
	}
}));

export const MapToFeedDocType = (feed: Feed): FeedDocType => {
	if (IsYoutubeFeed(feed)) {
		return {
			Id: feed.Id,
			Title: feed.Title,
			ChannelId: feed.ChannelId
		};
	} else {
		return {
			Id: feed.Id,
			Title: feed.Title,
			Url: feed.Url
		};
	}
}

function IsYoutubeFeed(feed: FeedDocType): feed is YoutubeFeedDocType;
function IsYoutubeFeed(feed: Feed): feed is YoutubeFeed;
function IsYoutubeFeed(feed: FeedDocType | Feed) {
	return 'ChannelId' in feed;
}
