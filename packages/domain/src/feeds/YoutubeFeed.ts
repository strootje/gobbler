import { BaseFeed, BaseFeedDocType } from '../Feed';

export interface YoutubeFeedDocType extends BaseFeedDocType {
	readonly ChannelId: string;
}

export class YoutubeFeed implements YoutubeFeedDocType, BaseFeed {
	constructor(
		private readonly id: string,
		private readonly title: string,
		private readonly channelId: string
	) {
	}

	public get Id() { return this.id; }
	public get Title() { return this.title; }
	public get Url() { return `https://www.youtube.com/feeds/videos.xml?channel_id=${this.channelId}`; }
	public get ChannelId() { return this.channelId; }
}
