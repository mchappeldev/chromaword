import { data as completeWordList } from './wordList.json';
import { variance } from '../store.js';
import _ from 'lodash';

var invalidBoard = false; // If the board fails to meet quality standard at any point, it will be marked invalid
var variantsRequired = 0; // Indicates how many times players would have to guess. Anything over 0 indicates a difficult board
var alphabet; // ['A','B','C'...] - Just an array of the alphabet that's needed occasionally
var boardRowsLetterArray; // [['T','A','C','O','S'],['B','A','C','O','N']]
var answersLetterArray; // ['G','L','A','W','B','R'] - An array of the letters that are the answers
var originalBoardDetails;
var remainingBoardDetails;
var remainingPossibleLetters;
var knownLetters;
var remainingUnknownAnswersLetterArray;

const boardValidation = (boardRowsLetterArrayParam, answersLetterArrayParam) => {
	initalizeBoardInfo(boardRowsLetterArrayParam, answersLetterArrayParam);

	for (let i = 0; i < originalBoardDetails.length; i++) {
		if (variantsRequired === 0 && remainingBoardDetails[0].possibilities.length > 1)
			verifyBoardUnique();
		variantsRequired += remainingBoardDetails[0].possibilities.length - 1;
		remainingPossibleLetters.concat(remainingBoardDetails[0].missingLetters);
		remainingUnknownAnswersLetterArray = remainingUnknownAnswersLetterArray.filter(
			(letter) => !remainingBoardDetails[0].missingLetters.includes(letter)
		);
		remainingBoardDetails = remainingBoardDetails.slice(1);
		const rowsLetterArray = remainingBoardDetails.map(
			(rowDetails) => rowDetails.boardRowsLetterArray
		);
		remainingBoardDetails = getBoardDetails(rowsLetterArray, remainingUnknownAnswersLetterArray);
	}
	variance.set(variantsRequired);
};

const initalizeBoardInfo = (boardRowsLetterArrayParam, answersLetterArrayParam) => {
	boardRowsLetterArray = boardRowsLetterArrayParam;
	answersLetterArray = answersLetterArrayParam;

	alphabet = Array(26)
		.fill()
		.map((x, i) => String.fromCharCode(97 + i));
	knownLetters = [...boardRowsLetterArray]
		.flat()
		.filter(onlyUnique)
		.filter((letter) => !answersLetterArray.includes(letter));
	remainingPossibleLetters = alphabet.filter((letter) => !knownLetters.includes(letter));
	originalBoardDetails = getBoardDetails(boardRowsLetterArray, answersLetterArray);
	remainingBoardDetails = _.cloneDeep(originalBoardDetails);
	remainingUnknownAnswersLetterArray = [...answersLetterArray];
};

const verifyBoardUnique = () => {};

const getBoardDetails = (boardRowsLetterArray, answersLetterArray) => {
	const wordArrayDetails = boardRowsLetterArray.map((word) => {
		const missingLetters = [];
		const missingLetterIndexes = [];
		word.forEach((letter, i) => {
			if (answersLetterArray.includes(letter)) {
				missingLetters.push(letter);
				missingLetterIndexes.push(i);
			}
		});
		const possibilities = getRowPossibilites(word, answersLetterArray);
		return {
			wordString: word.join(''),
			boardRowsLetterArray: word,
			missingLetterIndexes,
			missingLetters: missingLetters.filter(onlyUnique),
			possibilities
		};
	});
	return wordArrayDetails.sort((a, b) =>
		a.possibilities.length < b.possibilities.length ? -1 : 1
	);
};

const getRowPossibilites = (word, answers) => {
	const possibilitesRegex = [...word];
	for (let i = 0; i < word.length; i++) {
		if (answers.includes(word[i])) {
			possibilitesRegex[i] = `[${remainingPossibleLetters.join('')}]`;
		}
	}
	const re = new RegExp(possibilitesRegex.join(''));
	return completeWordList.filter((word) => re.test(word));
};

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

export { boardValidation };
