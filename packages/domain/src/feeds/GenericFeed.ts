import { BaseFeed, BaseFeedDocType } from '../Feed';

export interface GenericFeedDocType extends BaseFeedDocType {
	readonly Url: string;
}

export class GenericFeed implements GenericFeedDocType, BaseFeed {
	constructor(
		private readonly id: string,
		private readonly title: string,
		private readonly url: string
	) {
	}

	public get Id() { return this.id; }
	public get Title() { return this.title; }
	public get Url() { return this.url; }
}
