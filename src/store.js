import { writable, readable } from 'svelte/store';

export const showModal = writable(false);
export const modalData = writable({ header: '', message: '' });
export const selectedColor = writable(7);
export const guesses = writable(Array(6).fill(''));
export const wordArray = writable([]);
export const answers = writable([]);
export const boardData = writable({
	boardWords: [],
	boardAnswers: []
});
export const knownLetters = writable([]);
export const variance = writable(0);
export const colors = readable([
	'#E67878',
	'#E59978',
	'#E5DA78',
	'#6FCF96',
	'#78B7E5',
	'#BF7DD6',
	'#A9A9A9'
]); // red, orange, yellow, green, blue, purple, grey
