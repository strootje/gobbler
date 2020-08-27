import { PullToRefresh, Stack } from 'chichi-app';
import { Card } from 'chichi-base';
import { Article, Feed, YoutubeFeed } from '@gobbler/domain';
import { ArticleRepository, FeedRepository } from '@gobbler/infra';
import { css, StyleSheet } from 'aphrodite';
import * as ClassNames from 'classnames';
import { useAsyncEffect } from 'hooks/AsyncEffect';
import { AppLayout } from 'layouts/AppLayout';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import * as ShortId from 'shortid';

const Styles = StyleSheet.create({
	WallScene: {
		height: '100%',
		display: 'flex',
		'flex-flow': 'column nowrap'
	},

	FeedStack: {
		margin: '0 .5rem',
		padding: '.5rem 0',
		'overflow-x': 'scroll',
		'scrollbar-width': 'none',
		'flex-shrink': '0',

		':scrollbar': {
			display: 'none'
		}
	},

	FeedStackItem: {
		'flex-shrink': '0',
		':not(:first-child)': {
			'margin-left': '.2rem'
		}
	},

	ArticlesLayout: {
		'flex-grow': '1'
	}
});

export const WallScene: FunctionalComponent = () => {
	const [
		feeds,
		setFeeds
	] = useState<Feed[]>([]);

	const [
		articles,
		setArticles
	] = useState<Article[]>([]);

	const [
		isFeedLoading,
		setFeedLoading
	] = useState<{ [feedId: string]: boolean }>({});

	useAsyncEffect(async () => {
		const feedRepository = await FeedRepository.CreateAsync();
		const articleRepository = await ArticleRepository.CreateAsync();
		const feedSubscription = feedRepository.FindAll().subscribe(setFeeds);
		const articleSubscription = articleRepository.FindAll().subscribe(setArticles);

		return () => {
			feedSubscription.unsubscribe();
			articleSubscription.unsubscribe();
		};
	});

	const addTestFeeds = useCallback(async () => {
		const feedRepository = await FeedRepository.CreateAsync();
		feedRepository.Add(new YoutubeFeed(ShortId(), 'BPS Space', 'UCILl8ozWuxnFYXIe2svjHhg'));
		feedRepository.Add(new YoutubeFeed(ShortId(), 'Smarter Every Day', 'UC6107grRI4m0o2-emgoDnAA'));
		feedRepository.Add(new YoutubeFeed(ShortId(), 'Cafe Weltschmerz', 'UClK9f1anqhuSaqDN5YE-wfw'));
		feedRepository.Add(new YoutubeFeed(ShortId(), 'Ryan Long Comedy', 'UCzKFvBRI6VT3jYJq6a820nA'));
		//https://stonetoss.com/index.php/comic/feed/
		//https://www.youtube.com/c/MarcelVos/videos
	}, []);

	const onRefresh = useCallback(async () => {
		const articleRepostiory = await ArticleRepository.CreateAsync();

		const tasks: Promise<void>[] = [];
		for (const feed of feeds) {
			tasks.push((async () => {
				setFeedLoading(state => ({ ...state, [feed.Id]: true }));
				await articleRepostiory.FetchArticlesAsync(feed);
				setFeedLoading(state => ({ ...state, [feed.Id]: false }));
			})());
		}

		await Promise.all(tasks);
	}, [feeds]);

	return (
		<AppLayout styles={[Styles.WallScene]}>
			{feeds.length <= 0 && <a onClick={addTestFeeds}>add test feeds</a>}
			<Stack className={css(Styles.FeedStack)} orientation='horizontal'>
				{feeds.length > 0 && feeds.map(feed => (
					<figure class={ClassNames('image', 'is-32x32', css(Styles.FeedStackItem))}>
						{isFeedLoading[feed.Id] && <span class="badge">{0}</span>}
						<img class="is-rounded" src="https://bulma.io/images/placeholders/32x32.png" alt={feed.Title} />
					</figure>
				))}
			</Stack>

			<PullToRefresh className={css(Styles.ArticlesLayout)} onRefresh={onRefresh}>
				{articles.length <= 0 && (
					<p>no articles</p>
				)}
				{articles && articles.map(article => (
					<Card>
						<Card.Image>
						</Card.Image>

						<Card.Content>
							<p>{article.Title}</p>
						</Card.Content>
					</Card>
				))}
			</PullToRefresh>
		</AppLayout>
	);
}
