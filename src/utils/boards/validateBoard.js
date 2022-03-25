import { data as completeWordList } from '../wordList.json';
import { verifyBoardUnique } from './verifyOnlyOneSolution';

var alphabet; // ['A','B','C'...] - Just an array of the alphabet that's needed occasionally
var boardWords; // ['tacos', 'bacon', 'llama'] Array of the words on the board
var boardAnswers; // ['g', 'm', 's', etc] Array of the letters that make up the answers to the board
var knownLetters;




const boardValidation = (boardWordsParam, boardAnswersParam) => {
    initalizeBoardInfo(boardWordsParam, boardAnswersParam);
    const possibilities = simplifyPossibilitiesWhereOnlyOneWordPossible();
    if (possibilities) verifyBoardUnique(boardWords, possibilities, boardAnswers);
};




const initalizeBoardInfo = (boardWordsParam, boardAnswersParam) => {
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




const simplifyPossibilitiesWhereOnlyOneWordPossible = () => {
    var possibleMatches;
    var unknownLetters = alphabet.filter(x => !knownLetters.includes(x));
    var knownWords = [];
    for (let i = 0; i < boardWords.length; i++) {
        possibleMatches = boardWords.map((word) => getWordPossibilites(word, unknownLetters));
        var leastPossibilities = leastPossible(possibleMatches.filter(x => !knownWords.includes(x[0])));
        if (leastPossibilities.length === 1) {
            knownWords.push(leastPossibilities[0]);
            unknownLetters = removeWordFromUnknownLetters(unknownLetters, leastPossibilities[0]);
        } else {
            return possibleMatches;
        }
    }
    return false;
};




const getWordPossibilites = (word, unknownLetters) => {
    var possibilitesRegex = '';
    const wordLetters = word.split('');
    wordLetters.forEach(letter => possibilitesRegex += boardAnswers.includes(letter) && unknownLetters.includes(letter) ? `[${unknownLetters.join('')}]` : letter);
    const re = new RegExp(possibilitesRegex);
    return completeWordList.filter((entry) => re.test(entry.word)).map(x => x.word);
};




const removeWordFromUnknownLetters = (unknownLetters, word) => {
    if (!word) return unknownLetters;
    return [...unknownLetters].filter((x) => !word.split('').includes(x));
};




function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}




function leastPossible(possibilities) {
    return [...possibilities].sort((a, b) => (a.length < b.length ? -1 : 1))[0];
}




export { boardValidation };