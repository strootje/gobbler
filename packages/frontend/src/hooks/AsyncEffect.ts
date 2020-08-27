import { Inputs, useEffect } from 'preact/hooks';

interface AsyncEffectCallback {
	(): Promise<(void | (() => void | (() => Promise<void>)))>;
}

interface AsyncEffect {
	(effect: AsyncEffectCallback, inputs?: Inputs): void;
}

export const useAsyncEffect: AsyncEffect = (effect, inputs) => useEffect(() => {
	const cleanup = effect();
	return () => cleanup.then(p => p && p());
}, inputs || []);
