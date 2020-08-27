import { GenericFeed, GenericFeedDocType } from './feeds/GenericFeed';
import { YoutubeFeed, YoutubeFeedDocType } from './feeds/YoutubeFeed';

export interface BaseFeedDocType {
	readonly Id: string;
	readonly Title: string;
}

export type FeedDocType
	= GenericFeedDocType
	| YoutubeFeedDocType;

export interface BaseFeed extends BaseFeedDocType {
	readonly Id: string;
	readonly Title: string;
	readonly Url: string;
}

export type Feed
	= GenericFeed
	| YoutubeFeed;
