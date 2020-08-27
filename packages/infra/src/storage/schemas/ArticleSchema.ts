import { ArticleDocType } from '@gobbler/domain';
import { RxJsonSchema } from 'rxdb';

export const ArticleSchema: RxJsonSchema<ArticleDocType> = {
	title: 'articles',
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
		}
	},

	required: [
		'Id',
		'Title',
		'Url'
	]
};
