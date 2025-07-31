import { WORD_POOL, ActivityType, Question } from '../data/words';

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random words from the pool
function getRandomWords(count: number): string[] {
  return shuffleArray(WORD_POOL).slice(0, count);
}

// Generate scrambled version of a word
function scrambleWord(word: string): string {
  const letters = word.split('');
  let scrambled;
  do {
    scrambled = shuffleArray(letters).join('');
  } while (scrambled === word && word.length > 1);
  return scrambled;
}

// Remove random letters from word for fill-missing activity
function createMissingLetters(word: string): { question: string; answer: string } {
  const wordLength = word.length;
  const numMissing = Math.min(Math.max(1, Math.floor(wordLength * 0.3)), 3);
  const positions = shuffleArray([...Array(wordLength).keys()]).slice(0, numMissing);
  
  let question = word.split('');
  positions.forEach(pos => {
    question[pos] = '_';
  });
  
  return {
    question: question.join(' '),
    answer: word
  };
}

// Generate wrong spellings for circle-correct activity
function generateWrongSpellings(word: string): string[] {
  const wrongSpellings: string[] = [];
  const wordLen = word.length;
  
  // Type 1: Replace random letter
  if (wordLen > 2) {
    const pos = Math.floor(Math.random() * wordLen);
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let newChar;
    do {
      newChar = chars[Math.floor(Math.random() * chars.length)];
    } while (newChar === word[pos]);
    
    const wrong1 = word.substring(0, pos) + newChar + word.substring(pos + 1);
    wrongSpellings.push(wrong1);
  }
  
  // Type 2: Swap adjacent letters
  if (wordLen > 2) {
    const pos = Math.floor(Math.random() * (wordLen - 1));
    const wrong2 = word.substring(0, pos) + word[pos + 1] + word[pos] + word.substring(pos + 2);
    wrongSpellings.push(wrong2);
  }
  
  // Type 3: Remove a letter
  if (wordLen > 3) {
    const pos = Math.floor(Math.random() * wordLen);
    const wrong3 = word.substring(0, pos) + word.substring(pos + 1);
    wrongSpellings.push(wrong3);
  }
  
  return wrongSpellings.slice(0, 3);
}

// Generate question for fill-missing activity
function generateFillMissingQuestion(word: string, id: string): Question {
  const { question, answer } = createMissingLetters(word);
  
  return {
    id,
    type: 'fill-missing',
    word,
    question: `Fill in the missing letters: ${question}`,
    correctAnswer: answer,
  };
}

// Generate question for circle-correct activity
function generateCircleCorrectQuestion(word: string, id: string): Question {
  const wrongSpellings = generateWrongSpellings(word);
  const options = shuffleArray([word, ...wrongSpellings]).slice(0, 4);
  
  return {
    id,
    type: 'circle-correct',
    word,
    question: 'Circle the correctly spelled word:',
    options,
    correctAnswer: word,
  };
}

// Generate question for rewrite-missing activity
function generateRewriteMissingQuestion(word: string, id: string): Question {
  const pos = Math.floor(Math.random() * word.length);
  // Omit the letter at position 'pos'
  const missingWord = word.substring(0, pos) + word.substring(pos + 1);
  return {
    id,
    type: 'rewrite-missing',
    word,
    question: `Spot the missing letter and rewrite: ${missingWord}`,
    correctAnswer: word,
  };
}

// Generate question for unscramble activity
function generateUnscrambleQuestion(word: string, id: string): Question {
  const scrambled = scrambleWord(word);
  
  return {
    id,
    type: 'unscramble',
    word,
    question: `Unscramble the letters: ${scrambled}`,
    correctAnswer: word,
  };
}

// Main function to generate questions for an activity
export function generateQuestions(activityType: ActivityType, count: number = 20): Question[] {
  const words = getRandomWords(count);
  
  return words.map((word, index) => {
    const id = `${activityType}-${index + 1}`;
    
    switch (activityType) {
      case 'fill-missing':
        return generateFillMissingQuestion(word, id);
      case 'circle-correct':
        return generateCircleCorrectQuestion(word, id);
      case 'rewrite-missing':
        return generateRewriteMissingQuestion(word, id);
      case 'unscramble':
        return generateUnscrambleQuestion(word, id);
      default:
        throw new Error(`Unknown activity type: ${activityType}`);
    }
  });
}