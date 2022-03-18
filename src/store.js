import { writable } from 'svelte/store';

export const showModal = writable(false);
export const modalData = writable({ header: '', message: '' });
export const selectedColor = writable(7);
export const guesses = writable(Array(6).fill(''));
