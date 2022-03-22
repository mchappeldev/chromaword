const verifyBoardUnique = (correctWords, possibleMatches, answersArray) => {
	// console.log(correctWords);
	// console.log(possibleMatches);
	// console.log(answersArray);

	// correctWords = ['perks', 'oasis', 'aides', 'bonus', 'jarls', 'ruled'];
	// possibleMatches = [
	// 	['perks', 'perms'],
	// 	['oasis'],
	// 	['aides'],
	// 	['bogus', 'bonus'],
	// 	['jarls'],
	// 	['ruled']
	// ];
	// answersArray = ['k', 'o', 'i', 'n', 'j', 'l'];

	var numCombinations = 1;
	possibleMatches.forEach((x) => {
		numCombinations *= x.length;
	});
	if (numCombinations > 10000) return false; // If there are over 10k combinations, I'm going to assume it isn't unique and bail
	const combinations = cartesian(...possibleMatches);
	const correctBoardString = correctWords.join('');
	var correctPositions = [];
	answersArray.forEach((letter, letterIndex) => {
		let lettersCorrectPositions = [];
		for (let i = 0; i < correctBoardString.length; i++) {
			if (correctBoardString[i] === letter) lettersCorrectPositions.push(i);
		}
		correctPositions.push(lettersCorrectPositions);
	});

	combinations.forEach((combo) => {
		var valid = true;
		var replacementLetters = [];
		const comboBoardString = combo.join('');
		answersArray.every((answer, answerIndex) => {
			const suggestedReplacementLetter = comboBoardString[correctBoardString.indexOf(answer)];
			let letterPositions = [];
			for (let i = 0; i < correctBoardString.length; i++) {
				if (comboBoardString[i] === suggestedReplacementLetter) letterPositions.push(i);
			}
			if (letterPositions.toString() == correctPositions[answerIndex].toString()) {
				replacementLetters.push(suggestedReplacementLetter);
				return true;
			} else {
				valid = false;
				return false;
			}
		});
		if (
			valid &&
			!hasDuplicates(replacementLetters) &&
			replacementLetters.toString() != answersArray.toString()
		) {
			throw { type: 'Invalid Board', message: 'Not unique' }; //Board has more than one solution
		}
	});
	console.log('test');
};

const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

function hasDuplicates(array) {
	return new Set(array).size !== array.length;
}

export { verifyBoardUnique };
