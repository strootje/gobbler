import { FeedDocType } from '@gobbler/domain';
import { RxJsonSchema } from 'rxdb';

export const FeedSchema: RxJsonSchema<FeedDocType> = {
	title: 'feeds',
	version: 0,

	type: 'object',
	properties: {
		Id: {
			type: 'string'
		},

		Title: {
			type: 'string'
		},

		Url: {
			type: 'string'
		},

		ChannelId: {
			type: 'string'
		}
	},

	required: [
		'Id',
		'Title'
	]
};
