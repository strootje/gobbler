type EventKeys = keyof HTMLElementEventMap;

export interface EventListener<TEventType extends EventKeys> {
	(this: HTMLElement, evt: HTMLElementEventMap[TEventType]): any;
}

export function AddEventListener<TEventType extends EventKeys>(
	elem: HTMLElement,
	key: TEventType,
	listener: EventListener<TEventType>,
	options: AddEventListenerOptions
) {
	elem.addEventListener(key, listener, options);

	return () => elem.removeEventListener(key, listener);
}
