export const WORD_POOL = [
  "villages", "drew", "drove", "agreed", "being", "leader", "children", "family", "cooked", "return",
  "instead", "matter", "stayed", "solution", "guests", "prepared", "tightly", "baskets", "distance", "eaten",
  "lying", "furious", "anyway", "roared", "going", "away", "fought", "shook", "believe", "would",
  "rolled", "story", "perfect", "brought", "reached", "garden", "cautious", "sizes", "stained", "stepped",
  "walking", "pockets", "leaves", "freeze", "reading", "moment", "below", "stood", "sounds", "squeeze",
  "mouth", "eyebrows", "blazed", "answer", "opened", "between", "picked", "nodded", "carrying", "remaining",
  "hundred", "summer", "couple", "smiled", "project", "sleeping", "holidays", "happily", "window", "reached",
  "disturbed", "planning", "cupboard", "question", "feeding", "thought", "talking", "finished", "mangoes", "waiting",
  "heard", "tomorrow", "watching", "promised", "space", "encountered", "useful", "around", "compost", "offered",
  "another", "growing", "something", "again", "corrected", "straight", "missing", "powerful", "temple", "immediately",
  "important", "rushed", "stopped", "minutes", "stories", "through", "kitchen", "heavy", "traffic", "before",
  "different", "everything", "clothes", "people", "beside", "young", "cause", "thanked", "favourite", "thousand"
];

export type ActivityType = 'fill-missing' | 'circle-correct' | 'rewrite-missing' | 'unscramble';

export interface Question {
  id: string;
  type: ActivityType;
  word: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}