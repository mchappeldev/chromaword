import { data } from './wordList.json';

const getBoard = () => {
	const wordArray = [];
	for (var i = 0; i < 6; i++) {
		const newWord = data[Math.floor(Math.random() * data.length) + 1];
		wordArray.push(newWord.split(''));
	}

	return wordArray;
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

export { getBoard, getRandom };
