import { writable, readable } from 'svelte/store';
import { browser } from '$app/env';

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
export const colors = readable([
	'hsl(0, 69%, 69%)',
	'hsl(18, 68%, 68%)',
	'hsl(54, 68%, 68%)',
	'hsl(144, 50%, 62%)',
	'hsl(205, 68%, 68%)',
	'hsl(284, 52%, 66%)',
	'hsl(0, 0%, 66%)'
]); // red, orange, yellow, green, blue, purple, grey

export const seenInstructions = writable(false);

if (browser) {
	if (localStorage.seenInstructions) seenInstructions.set(localStorage.seenInstructions === 'true');

	seenInstructions.subscribe((x) => (localStorage.seenInstructions = String(x)));
}
