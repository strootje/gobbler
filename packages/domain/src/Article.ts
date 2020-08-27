export interface ArticleDocType {
	readonly Id: string;
	readonly Title: string;
	readonly Url: string;
}

export class Article implements ArticleDocType {
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
