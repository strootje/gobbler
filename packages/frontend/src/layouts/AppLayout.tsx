import { Drawer } from 'chichi-app';
import { Menu, Navbar } from 'chichi-base';
import { css, StyleDeclarationValue, StyleSheet } from 'aphrodite';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useState } from 'preact/hooks';

const Styles = StyleSheet.create({
	Layout: {
		position: 'relative'
	}
});

export interface AppLayoutProps {
	styles?: StyleDeclarationValue[]
}

export const AppLayout: FunctionalComponent<AppLayoutProps> = (props) => {
	const {
		styles,
		children
	} = Object.assign({
		styles: []
	}, props);

	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const burgerOnClick = useCallback(() => setDrawerOpen(p => !p), []);

	return (
		<div class={css(Styles.Layout, ...styles)}>
			<Navbar>
				<Navbar.Brand>
					<Navbar.Item>
						<img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" />
					</Navbar.Item>

					<Navbar.Burger active={isDrawerOpen} onClick={burgerOnClick} />
				</Navbar.Brand>
			</Navbar>

			<Drawer open={isDrawerOpen}>
				<Navbar>
					<Navbar.Brand>
						<Navbar.Item>test</Navbar.Item>
						<Navbar.Burger active={isDrawerOpen} onClick={burgerOnClick} />
					</Navbar.Brand>
				</Navbar>

				<Menu>
					<Menu.Label>General</Menu.Label>
					<Menu.List>
						<Menu.Item>item 1</Menu.Item>
						<Menu.Item>item 2</Menu.Item>
						<Menu.Item>item 3</Menu.Item>
						<Menu.Item>item 4</Menu.Item>
					</Menu.List>
				</Menu>
			</Drawer>

			{children}
		</div>
	);
}
