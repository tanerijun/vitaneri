import { writable } from 'svelte/store';

export const page = writable({ url: { pathname: '/posts' } });
