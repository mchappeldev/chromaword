import { data as completeWordList } from './wordList.json';
import { boardValidation } from './boardValidation';

const alphabet = Array(26)
	.fill()
	.map((x, i) => String.fromCharCode(97 + i));
const uncommonLetters = ['j', 'q', 'v', 'x', 'z'];
const oddsOfReplacingUncommonLetters = 0.85;

const selectAnswers = () => {
	const tentativeAnswers = getRandom([...alphabet], 6);
	const answers = rollToReplaceUncommonLetters(tentativeAnswers);
	return answers;
};

const rollToReplaceUncommonLetters = (previousAnswers) => {
	let availableReplacementLetters = alphabet.filter(
		(letter) => !previousAnswers.includes(letter) && !uncommonLetters.includes(letter)
	);
	const newAnswers = previousAnswers.map((letter) => {
		const roll = Math.random();
		const passesRoll = roll < oddsOfReplacingUncommonLetters;
		if (uncommonLetters.includes(letter) && passesRoll) {
			const newLetter = getRandom(availableReplacementLetters, 1)[0];
			availableReplacementLetters = availableReplacementLetters.filter(
				(letter) => letter != newLetter
			);
			return newLetter;
		} else {
			return letter;
		}
	});
	return newAnswers;
};

const getWords = (answers) => {
	let words = [];
	for (let i = 0; i < answers.length; i++) {
		const re = new RegExp(`[${answers[i]}]`);
		const plausibleWords = completeWordList.filter((word) => re.test(word));
		const word = getRandom(plausibleWords, 1);
		words.push(word.toString());
	}
	// everyColorAppearsInMultipleRows(words, answers);
	return words;
};

const everyColorAppearsInMultipleRows = (words, answers) => {
	var lettersInLessThanTwoRows = [];
	const updateLettersInLessThanTwoRows = () => {
		lettersInLessThanTwoRows = [];
		answers.forEach((letter) => {
			const rowsContainingLetter = words.filter((row) => row.includes(letter));
			if (rowsContainingLetter.length < 2) lettersInLessThanTwoRows.push(letter);
		});
	};
	updateLettersInLessThanTwoRows();

	while (lettersInLessThanTwoRows.length != 0) {
		const rowsWithoutLetter = words.filter((word) => !word.includes(lettersInLessThanTwoRows[0]));
		const wordToReplace = rowsWithoutLetter[Math.floor(Math.random() * rowsWithoutLetter.length)];
		const indexOfWordToReplace = words.indexOf(wordToReplace);
		const re = new RegExp(
			`(?=.*${lettersInLessThanTwoRows[0]}.*)(?=.*${answers[indexOfWordToReplace]}.*)`
		);
		const plausibleWords = completeWordList.filter((word) => re.test(word));
		const newWord = getRandom(plausibleWords, 1);
		words.splice(indexOfWordToReplace, 1, newWord[0]);
		updateLettersInLessThanTwoRows();
	}
};

const getBoard = () => {
	const answers = selectAnswers();

	var boardIsValid = false;
	var executionCount = 0;
	var wordArray;
	// console.log(executionCount);
	while (!boardIsValid && executionCount < 50) {
		executionCount++;
		try {
			wordArray = getWords(answers).map((word) => word.split(''));
			boardValidation(wordArray, answers);
			boardIsValid = true;
		} catch (error) {
			if (error.type != 'Invalid Board') throw error;
		}
	}
	// const wordArray = getWords(answers).map((word) => word.split(''));

	return {
		wordArray,
		answers
	};
};

const getRandom = (source, quantity) => {
	const results = [];
	for (var i = 0; i < quantity; i++) {
		const nextValue = source[Math.floor(Math.random() * source.length)];
		source = source.filter((letter) => letter != nextValue);
		results.push(nextValue);
	}

	return results;
};

export { getBoard, getRandom, selectAnswers, getWords };
