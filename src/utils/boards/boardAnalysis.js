import { round } from 'lodash';
import { data as completeWordList } from '../wordList.json';

const numberOfLettersMissingImpactOnDifficulty = [1, 1.9, 4.2, 7.3, 11.4, 16.9];
const wordDifficultyImpactOnDifficulty = [0.9, 1.0, 1.1, 1.3, 1.6];
const letterImpactOnDifficulty = [0.9, 1, 1, 1, 0.85, 1, 1, 1, 0.95, 1.3, 1, 1, 1, 1, 0.95, 1, 1.3, 1, 0.75, 1, 1, 1.1, 1.05, 1.3, 1, 1.2];
const lowerLevelPossibleWordImpactOnDifficulty = [1, 1.4, 2.2, 4, 7];
const numberOfLetterAppearancesImpactOnDifficulty = [1, .975, .95, .925, .90, .88, .86, .84, .82, .80, .80, .80];
// const easiestThreeRowsPercentageOfGuessDifficulty = [.7, .25, .05];

var boardWords;
var boardAnswers;
var lettersHidden;
var oneLetterRows;
var alphabet;
var knownLetters;
var maxGuessDifficulty = 0;
var cumulativeGuessDifficulty = 0;




const analyzeBoard = (boardWordsParam, boardAnswersParam) => {
    maxGuessDifficulty = 0;
    cumulativeGuessDifficulty = 0;
    initalize(boardWordsParam, boardAnswersParam);
    getBasicStats();
    getDifficulty();
    return {
        lettersHidden,
        oneLetterRows,
        maxGuessDifficulty: round(maxGuessDifficulty, 1),
        cumulativeGuessDifficulty: round(cumulativeGuessDifficulty, 1),
    };
};




const getDifficulty = () => {
    var possibleMatches;
    var unknownLetters = alphabet.filter(x => !knownLetters.includes(x));
    var knownWords = [];
    for (let i = 0; i < boardWords.length; i++) {
        possibleMatches = boardWords.map((word) => getWordPossibilites(word, unknownLetters));
        const rowDifficultyFactors = getRowDifficultyFactors(possibleMatches, knownWords, unknownLetters);
        const guessDifficulty = getGuessDifficulty(rowDifficultyFactors);
        if (guessDifficulty > maxGuessDifficulty) maxGuessDifficulty = guessDifficulty;
        cumulativeGuessDifficulty += guessDifficulty;
        const solvedWord = rowDifficultyFactors.filter(x => x.solved === false).sort((a, b) => (a.totalDifficulty < b.totalDifficulty ? -1 : 1))[0].word;
        knownWords.push(solvedWord);
        unknownLetters = removeWordFromUnknownLetters(unknownLetters, solvedWord);
        // console.log(boardWords);
        // console.log(possibleMatches);
        // console.log(rowDifficultyFactors);
        // console.log(guessDifficulty);
    }
};




const getGuessDifficulty = (rowDifficulties) => {
    const sorted = [...rowDifficulties].filter(x => x.solved === false).sort((a, b) => (a.totalDifficulty < b.totalDifficulty ? -1 : 1));
    return sorted[0].totalDifficulty;
};




const getRowDifficultyFactors = (possibleMatches, knownWords, unknownLetters) => {
    var rowDifficulties = [];
    boardWords.forEach((row, i) => {
        var factors = {};
        factors.word = boardWords[i];
        if (knownWords.includes(boardWords[i])) {
            factors.solved = true;
        } else {
            factors.solved = false;
            factors.base = possibleMatches[i].length;
            const missing = numberMissing(row, unknownLetters); // turn into missing letters array to send to these functions instead of boardAnswers
            if (missing) {
                factors.missingLetters = numberOfLettersMissingImpactOnDifficulty[missing - 1];
                factors.wordDifficulty = wordDifficultyImpactOnDifficulty[completeWordList.filter(entry => entry.word === row)[0].difficulty - 1];
                factors.letterDifficulty = getLettersImpactOnDifficulty(row);
                factors.lowerLevelWords = getLowerLevelWordAdjustment(row, possibleMatches[i]);
                factors.letterAppearances = getLettersAppearancesImpact(row);
                factors.totalDifficulty = factors.base * factors.missingLetters * factors.wordDifficulty * factors.letterDifficulty * factors.lowerLevelWords * factors.letterAppearances;
            } else {
                factors.totalDifficulty = 0;
            }
        }
        rowDifficulties[i] = factors;
    });
    return rowDifficulties;
};




const removeWordFromUnknownLetters = (unknownLetters, word) => {
    if (!word) return unknownLetters;
    return [...unknownLetters].filter((x) => !word.split('').includes(x));
};





const getLettersAppearancesImpact = (word) => {
    var difficultyAdjustment = 1;
    const lettersHidden = word.split('').filter(x => !knownLetters.includes(x)).filter(onlyUnique);
    lettersHidden.forEach(letter => {
        const letterOccurances = boardWords.join('').split('').filter(x => x === letter).length;
        difficultyAdjustment *= numberOfLetterAppearancesImpactOnDifficulty[letterOccurances - 1];
    });
    return difficultyAdjustment;
};




const getLowerLevelWordAdjustment = (word, possibleMatches) => {
    const wordDifficulty = completeWordList.filter(entry => entry.word === word)[0].difficulty;
    const lowestLevelPossible = completeWordList.filter(entry => possibleMatches.includes(entry.word)).sort((a, b) => (a.difficulty < b.difficulty ? -1 : 1))[0].difficulty;
    const difference = Math.max(wordDifficulty - lowestLevelPossible, 0);
    const impact = lowerLevelPossibleWordImpactOnDifficulty[difference];
    return impact;
};




const getLettersImpactOnDifficulty = (word) => {
    var difficultyAdjustment = 1;
    word.split('').filter(x => boardAnswers.includes(x)).forEach(letter => {
        difficultyAdjustment *= letterImpactOnDifficulty[alphabet.indexOf(letter)];
    });
    return difficultyAdjustment;
};




const getWordPossibilites = (word, unknownLetters) => {
    var possibilitesRegex = '';
    const wordLetters = word.split('');
    wordLetters.forEach(letter => possibilitesRegex += boardAnswers.includes(letter) && unknownLetters.includes(letter) ? `[${unknownLetters.join('')}]` : letter);
    const re = new RegExp(possibilitesRegex);
    return completeWordList.filter((entry) => re.test(entry.word)).map(x => x.word);
};




const initalize = (boardWordsParam, boardAnswersParam) => {
    boardWords = boardWordsParam;
    boardAnswers = boardAnswersParam;
    alphabet = Array(26)
        .fill()
        .map((x, i) => String.fromCharCode(97 + i));
    knownLetters = [...boardWords.map((x) => x.split(''))]
        .flat()
        .filter(onlyUnique)
        .filter((letter) => !boardAnswers.includes(letter));
};




const getBasicStats = () => {
    lettersHidden = numberMissing(boardWords.join(''), boardAnswers);
    oneLetterRows = boardWords.map(word => numberMissing(word, boardAnswers)).filter(x => x === 1)?.length ?? 0;
};




function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}




// Returns the number of characters that would be removed from a string if you take out every character in an array
// For example, if you had a mainString of 'tacos' and ['a', 'g', 's'] to remove, you'd end up with 'tco' and therefore 2 missing letters (returns 2)
function numberMissing(mainString, arrayToRemove) {
    return mainString.length - mainString.replace(new RegExp(`[${arrayToRemove.join('')}]`, 'g'), '').length;
}




export { analyzeBoard };