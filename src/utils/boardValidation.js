import { data as completeWordList } from './wordList.json';
import _ from 'lodash';

const boardValidation = (boardRowsLetterArray, answersLetterArray) => {
	const boardDetails = getBoardDetails(boardRowsLetterArray, answersLetterArray);
	console.log(boardDetails);
	var variantsRequired = 0;
	var remainingUnknownAnswersLetterArray = [...answersLetterArray];
	var remainingBoardDetails = _.cloneDeep(boardDetails);
	for (let i = 0; i < boardDetails.length; i++) {
		variantsRequired += remainingBoardDetails[0].possibilities.length - 1;
		remainingUnknownAnswersLetterArray = remainingUnknownAnswersLetterArray.filter(
			(letter) => !remainingBoardDetails[0].missingLetters.includes(letter)
		);
		remainingBoardDetails = remainingBoardDetails.slice(1);
		const rowsLetterArray = remainingBoardDetails.map(
			(rowDetails) => rowDetails.boardRowsLetterArray
		);
		remainingBoardDetails = getBoardDetails(rowsLetterArray, remainingUnknownAnswersLetterArray);
	}

	// const allRowPossibilities = wordArray
	// 	.map((word) => getRowPossibilites(word, answers))
	// 	.sort((a, b) => (a.length < b.length ? -1 : 1));
};

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
			possibilitesRegex[i] = '[a-z]';
		}
	}
	const re = new RegExp(possibilitesRegex.join(''));
	return completeWordList.filter((word) => re.test(word));
};

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

export { boardValidation };
