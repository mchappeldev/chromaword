import { writable, readable } from 'svelte/store';
import { browser } from '$app/env';

export const showModal = writable(false);
export const modalData = writable({ header: '', message: '' });
export const selectedColor = writable(7);
export const guesses = writable(Array(6).fill(''));
export const wordArray = writable([]);
export const answers = writable([]);
export const boardData = writable({
	boardId: null,
	boardWords: [],
	boardAnswers: [],
	analysis: {}
});
export const reviewEnjoyment = writable(0);
export const reviewDifficulty = writable(0);
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

export const seenInstructions = writable(false);

if (browser) {
	if (localStorage.seenInstructions) seenInstructions.set(localStorage.seenInstructions === 'true');

	seenInstructions.subscribe((x) => (localStorage.seenInstructions = String(x)));
}
