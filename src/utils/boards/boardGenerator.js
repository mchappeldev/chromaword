import { data as completeWordList } from '../wordList.json';
import { boardValidation } from './validateBoard';
import { analyzeBoard } from './boardAnalysis';

const uncommonLetters = ['j', 'q', 'v', 'x', 'z']; // Indicates which letters should be avoided as answers
const oddsOfReplacingUncommonLetters = 0.85; // Specifies how aggressively we should be avoiding selecting an uncommon letter as answer
var alphabet; // ['a', 'b', 'c', etc] Array of the whole alphabet
var targetDifficulty; // Number 1-5 specifies what difficulty level of board is being created
var maxIsolatedColors; // Number 0-6 specifies how many colors are permitted to be on only one row
var boardAnswers; // ['g', 'm', 's', etc] Array of the letters that make up the answers to the board
var boardWords; // ['tacos', 'bacon', 'llama'] Array of the words on the board




const getBoard = (targetDifficultyParam = 3, maxIsolatedColorsParam = 1) => {
    initializeSettings(targetDifficultyParam, maxIsolatedColorsParam);
    boardAnswers = selectAnswers();
    generateUntilValidBoardCreated();
    const analysis = analyzeBoard(boardWords, boardAnswers);
    console.log(analysis);
    return {
        boardWords,
        boardAnswers,
        analysis
    };
};




const initializeSettings = (targetDifficultyParam, maxIsolatedColorsParam) => {
    alphabet = Array(26)
        .fill()
        .map((x, i) => String.fromCharCode(97 + i));
    targetDifficulty = targetDifficultyParam;
    maxIsolatedColors = maxIsolatedColorsParam;
};




const selectAnswers = () => {
    const tentativeAnswers = getRandom([...alphabet], 6);
    const answers = rollToReplaceUncommonLetters(tentativeAnswers);
    return answers;
};




const generateUntilValidBoardCreated = () => {
    var boardIsValid = false;
    var executionCount = 0;
    while (!boardIsValid && executionCount < 50) {
        executionCount++;
        try {
            boardWords = getWords(boardAnswers);
            boardValidation(boardWords, boardAnswers);
            boardIsValid = true;
        } catch (error) {
            if (error != 'Invalid') throw error;
        }
    }
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
        const plausibleWords = completeWordList.filter((entry) => re.test(entry.word) && entry.difficulty <= targetDifficulty).map(x => x.word);
        const word = getRandom(plausibleWords, 1);
        words.push(word.toString());
    }
    limitIsolatedColors(words, answers);
    return words;
};




const limitIsolatedColors = (words, answers) => {
    var lettersInLessThanTwoRows = [];
    const updateLettersInLessThanTwoRows = () => {
        lettersInLessThanTwoRows = [];
        answers.forEach((letter) => {
            const rowsContainingLetter = words.filter((row) => row.includes(letter));
            if (rowsContainingLetter.length < 2) lettersInLessThanTwoRows.push(letter);
        });
    };
    updateLettersInLessThanTwoRows();
    while (lettersInLessThanTwoRows.length > maxIsolatedColors) {
        const rowsWithoutLetter = words.filter((word) => !word.includes(lettersInLessThanTwoRows[0]));
        const wordToReplace = rowsWithoutLetter[Math.floor(Math.random() * rowsWithoutLetter.length)];
        const indexOfWordToReplace = words.indexOf(wordToReplace);
        const re = new RegExp(
            `(?=.*${lettersInLessThanTwoRows[0]}.*)(?=.*${answers[indexOfWordToReplace]}.*)`
        );
        const plausibleWords = completeWordList.filter((entry) => re.test(entry.word) && entry.difficulty <= targetDifficulty).map(x => x.word);
        const newWord = getRandom(plausibleWords, 1);
        words.splice(indexOfWordToReplace, 1, newWord[0]);
        updateLettersInLessThanTwoRows();
    }
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