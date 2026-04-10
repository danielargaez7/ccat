import { useState, useEffect, useCallback, useRef } from "react";

// ─── THEME (LIGHT MODE) ─────────────────────────────────────────
const BG = "#F8FAFC";
const CARD = "#FFFFFF";
const BORDER = "#E2E8F0";
const PRI = "#2563EB";
const TEXT = "#1E293B";
const MUTED = "#64748B";
const SUCCESS = "#16A34A";
const WARNING = "#D97706";
const ERROR = "#DC2626";
const FLAGRED = "#EF4444";

const CAT_COLORS = {
  Math: "#2563EB",
  Verbal: "#7C3AED",
  Spatial: "#DB2777",
  Logic: "#D97706",
};

// ─── TEST 1 QUESTIONS ───────────────────────────────────────────
const TEST1_QUESTIONS = [
  { id: 1, image: "questions/q1.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 1 },
  { id: 2, image: "questions/q2.png", correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 1 },
  { id: 3, image: "questions/q3.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 1 },
  { id: 4, image: "questions/q4.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 5, image: "questions/q5.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 6, image: "questions/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 7, image: "questions/q7.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 8, image: "questions/q8.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 1 },
  { id: 9, image: "questions/q9.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 1 },
  { id: 10, image: "questions/q10.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 1 },
  { id: 11, image: "questions/q11.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 12, image: "questions/q12.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 13, image: "questions/q13.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 14, image: "questions/q14.png", correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 15, image: "questions/q15.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 1 },
  { id: 16, image: "questions/q16.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 1 },
  { id: 17, image: "questions/q17.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 1 },
  { id: 18, image: "questions/q18.png", correct: 0, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 1 },
  { id: 19, image: "questions/q19.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 1 },
  { id: 20, image: "questions/q20.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 1 },
  { id: 21, image: "questions/q21.png", correct: 2, category: "Logic", subcategory: "Letter Series", options: 5, test: 1 },
  { id: 22, image: "questions/q22.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 1 },
  { id: 23, image: "questions/q23.png", correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 1 },
  { id: 24, image: "questions/q24.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 1 },
  { id: 25, image: "questions/q25.png", correct: 4, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 1 },
  { id: 26, image: "questions/q26.png", correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 1 },
  { id: 27, image: "questions/q27.png", correct: 0, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 1 },
  { id: 28, image: "questions/q28.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 29, image: "questions/q29.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 30, image: "questions/q30.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 31, image: "questions/q31.png", correct: 1, category: "Math", subcategory: "Number Series", options: 5, test: 1 },
  { id: 32, image: "questions/q32.png", correct: 4, category: "Math", subcategory: "Arithmetic", options: 5, test: 1 },
  { id: 33, image: "questions/q33.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 1 },
  { id: 34, image: "questions/q34.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 35, image: "questions/q35.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 36, image: "questions/q36.png", correct: 2, category: "Math", subcategory: "Data Interpretation", options: 5, test: 1 },
  { id: 37, image: "questions/q37.png", correct: 4, category: "Math", subcategory: "Averages", options: 5, test: 1 },
  { id: 38, image: "questions/q38.png", correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 1 },
  { id: 39, image: "questions/q39.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 1 },
  { id: 40, image: "questions/q40.png", correct: 2, category: "Verbal", subcategory: "Antonyms", options: 5, test: 1 },
  { id: 41, image: "questions/q41.png", correct: 1, category: "Verbal", subcategory: "Antonyms", options: 5, test: 1 },
  { id: 42, image: "questions/q42.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 1 },
  { id: 43, image: "questions/q43.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 1 },
  { id: 44, image: "questions/q44.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 1 },
  { id: 45, image: "questions/q45.png", correct: 2, category: "Math", subcategory: "Averages", options: 5, test: 1 },
  { id: 46, image: "questions/q46.png", correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 1 },
  { id: 47, image: "questions/q47.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 1 },
  { id: 48, image: "questions/q48.png", correct: 3, category: "Math", subcategory: "Combinatorics", options: 5, test: 1 },
  { id: 49, image: "questions/q49.png", correct: 3, category: "Math", subcategory: "Percentages", options: 5, test: 1 },
  { id: 50, image: "questions/q50.png", correct: 4, category: "Logic", subcategory: "Deduction", options: 5, test: 1 },
];

// ─── TEST 2 QUESTIONS ───────────────────────────────────────────
const TEST2_QUESTIONS = [
  { id: 51, image: "questions2/q1.png", correct: 1, category: "Math", subcategory: "Arithmetic", options: 5, test: 2 },
  { id: 52, image: "questions2/q2.png", correct: 0, category: "Math", subcategory: "Number Comparison", options: 5, test: 2 },
  { id: 53, image: "questions2/q3.png", correct: 3, category: "Math", subcategory: "Percentages", options: 5, test: 2 },
  { id: 54, image: "questions2/q4.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 55, image: "questions2/q5.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 56, image: "questions2/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 57, image: "questions2/q7.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 58, image: "questions2/q8.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 59, image: "questions2/q9.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 60, image: "questions2/q10.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 61, image: "questions2/q11.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 62, image: "questions2/q12.png", correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 63, image: "questions2/q13.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 2 },
  { id: 64, image: "questions2/q14.png", correct: 0, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 2 },
  { id: 65, image: "questions2/q15.png", correct: 4, category: "Math", subcategory: "Word Problems", options: 5, test: 2 },
  { id: 66, image: "questions2/q16.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 2 },
  { id: 67, image: "questions2/q17.png", correct: 3, category: "Logic", subcategory: "Letter Series", options: 5, test: 2 },
  { id: 68, image: "questions2/q18.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 2 },
  { id: 69, image: "questions2/q19.png", correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 2 },
  { id: 70, image: "questions2/q20.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 2 },
  { id: 71, image: "questions2/q21.png", correct: 0, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 2 },
  { id: 72, image: "questions2/q22.png", correct: 3, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 2 },
  { id: 73, image: "questions2/q23.png", correct: 2, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 2 },
  { id: 74, image: "questions2/q24.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 75, image: "questions2/q25.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 76, image: "questions2/q26.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 77, image: "questions2/q27.png", correct: 0, category: "Math", subcategory: "Number Series", options: 5, test: 2 },
  { id: 78, image: "questions2/q28.png", correct: 4, category: "Math", subcategory: "Arithmetic", options: 5, test: 2 },
  { id: 79, image: "questions2/q29.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 2 },
  { id: 80, image: "questions2/q30.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 81, image: "questions2/q31.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 82, image: "questions2/q32.png", correct: 1, category: "Math", subcategory: "Data Interpretation", options: 5, test: 2 },
  { id: 83, image: "questions2/q33.png", correct: 2, category: "Math", subcategory: "Averages", options: 5, test: 2 },
  { id: 84, image: "questions2/q34.png", correct: 3, category: "Math", subcategory: "Percentages", options: 5, test: 2 },
  { id: 85, image: "questions2/q35.png", correct: 2, category: "Verbal", subcategory: "Antonyms", options: 5, test: 2 },
  { id: 86, image: "questions2/q36.png", correct: 0, category: "Verbal", subcategory: "Antonyms", options: 5, test: 2 },
  { id: 87, image: "questions2/q37.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 88, image: "questions2/q38.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 89, image: "questions2/q39.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 90, image: "questions2/q40.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 2 },
  { id: 91, image: "questions2/q41.png", correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 2 },
  { id: 92, image: "questions2/q42.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 2 },
  { id: 93, image: "questions2/q43.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 2 },
  { id: 94, image: "questions2/q44.png", correct: 3, category: "Math", subcategory: "Percentages", options: 5, test: 2 },
  // Padded from Test 1
  { id: 95, image: "questions2/q45.png", correct: 4, category: "Logic", subcategory: "Deduction", options: 5, test: 2, duplicateOf: 50 },
  { id: 96, image: "questions2/q46.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 2, duplicateOf: 42 },
  { id: 97, image: "questions2/q47.png", correct: 2, category: "Math", subcategory: "Data Interpretation", options: 5, test: 2, duplicateOf: 36 },
  { id: 98, image: "questions2/q48.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2, duplicateOf: 28 },
  { id: 99, image: "questions2/q49.png", correct: 2, category: "Logic", subcategory: "Letter Series", options: 5, test: 2, duplicateOf: 21 },
  { id: 100, image: "questions2/q50.png", correct: 3, category: "Math", subcategory: "Combinatorics", options: 5, test: 2, duplicateOf: 48 },
];

// ─── TEST 3 QUESTIONS ───────────────────────────────────────────
// duplicateOf: id of the original question in Test 1/2 (excluded from Focused Study pool)
const TEST3_QUESTIONS = [
  { id: 101, image: "questions3/q1.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 3 },
  { id: 102, image: "questions3/q2.png", correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 3 },
  { id: 103, image: "questions3/q3.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 104, image: "questions3/q4.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 105, image: "questions3/q5.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3, duplicateOf: 56 },
  { id: 106, image: "questions3/q6.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 107, image: "questions3/q7.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 3 },
  { id: 108, image: "questions3/q8.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 3 },
  { id: 109, image: "questions3/q9.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 3, duplicateOf: 10 },
  { id: 110, image: "questions3/q10.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 111, image: "questions3/q11.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 112, image: "questions3/q12.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3, duplicateOf: 61 },
  { id: 113, image: "questions3/q13.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 114, image: "questions3/q14.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 115, image: "questions3/q15.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 116, image: "questions3/q16.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 117, image: "questions3/q17.png", correct: 0, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 118, image: "questions3/q18.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 3 },
  { id: 119, image: "questions3/q19.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 3 },
  { id: 120, image: "questions3/q20.png", correct: 3, category: "Logic", subcategory: "Letter Series", options: 5, test: 3, duplicateOf: 67 },
  { id: 121, image: "questions3/q21.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 3, duplicateOf: 68 },
  { id: 122, image: "questions3/q22.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 3 },
  { id: 123, image: "questions3/q23.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 3 },
  { id: 124, image: "questions3/q24.png", correct: 3, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 3 },
  { id: 125, image: "questions3/q25.png", correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 3, duplicateOf: 26 },
  { id: 126, image: "questions3/q26.png", correct: 0, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 3, duplicateOf: 27 },
  { id: 127, image: "questions3/q27.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3, duplicateOf: 74 },
  { id: 128, image: "questions3/q28.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 129, image: "questions3/q29.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 130, image: "questions3/q30.png", correct: 1, category: "Math", subcategory: "Number Series", options: 5, test: 3, duplicateOf: 31 },
  { id: 131, image: "questions3/q31.png", correct: 3, category: "Math", subcategory: "Arithmetic", options: 5, test: 3 },
  { id: 132, image: "questions3/q32.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 3, duplicateOf: 79 },
  { id: 133, image: "questions3/q33.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3, duplicateOf: 34 },
  { id: 134, image: "questions3/q34.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3, duplicateOf: 35 },
  { id: 135, image: "questions3/q35.png", correct: 1, category: "Math", subcategory: "Data Interpretation", options: 5, test: 3, duplicateOf: 82 },
  { id: 136, image: "questions3/q36.png", correct: 4, category: "Math", subcategory: "Averages", options: 5, test: 3 },
  { id: 137, image: "questions3/q37.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 3 },
  { id: 138, image: "questions3/q38.png", correct: 2, category: "Math", subcategory: "Combinatorics", options: 5, test: 3 },
  { id: 139, image: "questions3/q39.png", correct: 2, category: "Verbal", subcategory: "Antonyms", options: 5, test: 3, duplicateOf: 40 },
  { id: 140, image: "questions3/q40.png", correct: 1, category: "Verbal", subcategory: "Antonyms", options: 5, test: 3, duplicateOf: 41 },
  { id: 141, image: "questions3/q41.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 3, duplicateOf: 87 },
  { id: 142, image: "questions3/q42.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 3, duplicateOf: 88 },
  { id: 143, image: "questions3/q43.png", correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 144, image: "questions3/q44.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 3 },
  { id: 145, image: "questions3/q45.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 3 },
  { id: 146, image: "questions3/q46.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 3, duplicateOf: 47 },
  { id: 147, image: "questions3/q47.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 3, duplicateOf: 93 },
  { id: 148, image: "questions3/q48.png", correct: 4, category: "Math", subcategory: "Combinatorics", options: 5, test: 3 },
  { id: 149, image: "questions3/q49.png", correct: 4, category: "Logic", subcategory: "Deduction", options: 5, test: 3, duplicateOf: 50 },
  // Padded from Test 1
  { id: 150, image: "questions3/q50.png", correct: 3, category: "Math", subcategory: "Combinatorics", options: 5, test: 3, duplicateOf: 48 },
];

// ─── TEST 4 QUESTIONS ───────────────────────────────────────────
const TEST4_QUESTIONS = [
  { id: 151, image: "questions4/q1.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 152, image: "questions4/q2.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 4 },
  { id: 153, image: "questions4/q3.png", correct: 4, category: "Math", subcategory: "Number Comparison", options: 5, test: 4 },
  { id: 154, image: "questions4/q4.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 4 },
  { id: 155, image: "questions4/q5.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 156, image: "questions4/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 157, image: "questions4/q7.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 158, image: "questions4/q8.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 4 },
  { id: 159, image: "questions4/q9.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 4 },
  { id: 160, image: "questions4/q10.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 4 },
  { id: 161, image: "questions4/q11.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 162, image: "questions4/q12.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 163, image: "questions4/q13.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 164, image: "questions4/q14.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 165, image: "questions4/q15.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 4 },
  { id: 166, image: "questions4/q16.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 4 },
  { id: 167, image: "questions4/q17.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 4 },
  { id: 168, image: "questions4/q18.png", correct: 0, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 4 },
  { id: 169, image: "questions4/q19.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 4 },
  { id: 170, image: "questions4/q20.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 4 },
  { id: 171, image: "questions4/q21.png", correct: 0, category: "Logic", subcategory: "Letter Series", options: 5, test: 4 },
  { id: 172, image: "questions4/q22.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 4 },
  { id: 173, image: "questions4/q23.png", correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 4 },
  { id: 174, image: "questions4/q24.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 4 },
  { id: 175, image: "questions4/q25.png", correct: 0, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 4 },
  { id: 176, image: "questions4/q26.png", correct: 3, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 4 },
  { id: 177, image: "questions4/q27.png", correct: 2, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 4 },
  { id: 178, image: "questions4/q28.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 179, image: "questions4/q29.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 180, image: "questions4/q30.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 4 },
  { id: 181, image: "questions4/q31.png", correct: 1, category: "Math", subcategory: "Number Series", options: 5, test: 4 },
  { id: 182, image: "questions4/q32.png", correct: 4, category: "Math", subcategory: "Arithmetic", options: 5, test: 4 },
  { id: 183, image: "questions4/q33.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 4 },
  { id: 184, image: "questions4/q34.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 185, image: "questions4/q35.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 186, image: "questions4/q36.png", correct: 3, category: "Math", subcategory: "Data Interpretation", options: 5, test: 4 },
  { id: 187, image: "questions4/q37.png", correct: 4, category: "Math", subcategory: "Averages", options: 5, test: 4 },
  { id: 188, image: "questions4/q38.png", correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 4 },
  { id: 189, image: "questions4/q39.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 4 },
  { id: 190, image: "questions4/q40.png", correct: 1, category: "Verbal", subcategory: "Antonyms", options: 5, test: 4 },
  { id: 191, image: "questions4/q41.png", correct: 0, category: "Verbal", subcategory: "Antonyms", options: 5, test: 4 },
  { id: 192, image: "questions4/q42.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 4 },
  { id: 193, image: "questions4/q43.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 4 },
  { id: 194, image: "questions4/q44.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 4 },
  { id: 195, image: "questions4/q45.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 4 },
  { id: 196, image: "questions4/q46.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 4 },
  { id: 197, image: "questions4/q47.png", correct: 3, category: "Math", subcategory: "Averages", options: 5, test: 4 },
  { id: 198, image: "questions4/q48.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 4 },
  { id: 199, image: "questions4/q49.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 4 },
  { id: 200, image: "questions4/q50.png", correct: 4, category: "Math", subcategory: "Data Interpretation", options: 5, test: 4 },
];

const TEST5_QUESTIONS = [
  { id: 201, image: "questions5/q1.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 202, image: "questions5/q2.png", correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 5 },
  { id: 203, image: "questions5/q3.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 5 },
  { id: 204, image: "questions5/q4.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 205, image: "questions5/q5.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 206, image: "questions5/q6.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 207, image: "questions5/q7.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 208, image: "questions5/q8.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 5 },
  { id: 209, image: "questions5/q9.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 5 },
  { id: 210, image: "questions5/q10.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 5 },
  { id: 211, image: "questions5/q11.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 212, image: "questions5/q12.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 213, image: "questions5/q13.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 214, image: "questions5/q14.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 215, image: "questions5/q15.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 5 },
  { id: 216, image: "questions5/q16.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 5 },
  { id: 217, image: "questions5/q17.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 5 },
  { id: 218, image: "questions5/q18.png", correct: 0, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 5 },
  { id: 219, image: "questions5/q19.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 220, image: "questions5/q20.png", correct: 4, category: "Math", subcategory: "Percentages", options: 5, test: 5 },
  { id: 221, image: "questions5/q21.png", correct: 0, category: "Logic", subcategory: "Letter Series", options: 5, test: 5 },
  { id: 222, image: "questions5/q22.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 5 },
  { id: 223, image: "questions5/q23.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 5 },
  { id: 224, image: "questions5/q24.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 5 },
  { id: 225, image: "questions5/q25.png", correct: 4, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 5 },
  { id: 226, image: "questions5/q26.png", correct: 3, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 5 },
  { id: 227, image: "questions5/q27.png", correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 5 },
  { id: 228, image: "questions5/q28.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 229, image: "questions5/q29.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 230, image: "questions5/q30.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 5 },
  { id: 231, image: "questions5/q31.png", correct: 3, category: "Math", subcategory: "Number Series", options: 5, test: 5 },
  { id: 232, image: "questions5/q32.png", correct: 3, category: "Math", subcategory: "Arithmetic", options: 5, test: 5 },
  { id: 233, image: "questions5/q33.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 234, image: "questions5/q34.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 235, image: "questions5/q35.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 236, image: "questions5/q36.png", correct: 2, category: "Math", subcategory: "Data Interpretation", options: 5, test: 5 },
  { id: 237, image: "questions5/q37.png", correct: 2, category: "Math", subcategory: "Averages", options: 5, test: 5 },
  { id: 238, image: "questions5/q38.png", correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 239, image: "questions5/q39.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 240, image: "questions5/q40.png", correct: 0, category: "Verbal", subcategory: "Antonyms", options: 5, test: 5 },
  { id: 241, image: "questions5/q41.png", correct: 3, category: "Verbal", subcategory: "Antonyms", options: 5, test: 5 },
  { id: 242, image: "questions5/q42.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 5 },
  { id: 243, image: "questions5/q43.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 5 },
  { id: 244, image: "questions5/q44.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 5 },
  { id: 245, image: "questions5/q45.png", correct: 4, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 246, image: "questions5/q46.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 5 },
  { id: 247, image: "questions5/q47.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 248, image: "questions5/q48.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 5 },
  { id: 249, image: "questions5/q49.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 5 },
  { id: 250, image: "questions5/q50.png", correct: 4, category: "Math", subcategory: "Data Interpretation", options: 5, test: 5 },
];

const TEST6_QUESTIONS = [
  { id: 251, image: "questions6/q1.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 6 },
  { id: 252, image: "questions6/q2.png", correct: 0, category: "Math", subcategory: "Number Comparison", options: 5, test: 6 },
  { id: 253, image: "questions6/q3.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 254, image: "questions6/q4.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 255, image: "questions6/q5.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 256, image: "questions6/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 257, image: "questions6/q7.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 258, image: "questions6/q8.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 6 },
  { id: 259, image: "questions6/q9.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 6 },
  { id: 260, image: "questions6/q10.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 6 },
  { id: 261, image: "questions6/q11.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 262, image: "questions6/q12.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 263, image: "questions6/q13.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 264, image: "questions6/q14.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 265, image: "questions6/q15.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 6 },
  { id: 266, image: "questions6/q16.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 6 },
  { id: 267, image: "questions6/q17.png", correct: 4, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 6 },
  { id: 268, image: "questions6/q18.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 6 },
  { id: 269, image: "questions6/q19.png", correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 6 },
  { id: 270, image: "questions6/q20.png", correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 6 },
  { id: 271, image: "questions6/q21.png", correct: 0, category: "Logic", subcategory: "Letter Series", options: 5, test: 6 },
  { id: 272, image: "questions6/q22.png", correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 6 },
  { id: 273, image: "questions6/q23.png", correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 6 },
  { id: 274, image: "questions6/q24.png", correct: 1, category: "Logic", subcategory: "Syllogisms", options: 3, test: 6 },
  { id: 275, image: "questions6/q25.png", correct: 3, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 6 },
  { id: 276, image: "questions6/q26.png", correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 6 },
  { id: 277, image: "questions6/q27.png", correct: 2, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 6 },
  { id: 278, image: "questions6/q28.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 279, image: "questions6/q29.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 280, image: "questions6/q30.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 6 },
  { id: 281, image: "questions6/q31.png", correct: 4, category: "Math", subcategory: "Number Series", options: 5, test: 6 },
  { id: 282, image: "questions6/q32.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 283, image: "questions6/q33.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 284, image: "questions6/q34.png", correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 285, image: "questions6/q35.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 286, image: "questions6/q36.png", correct: 3, category: "Math", subcategory: "Data Interpretation", options: 5, test: 6 },
  { id: 287, image: "questions6/q37.png", correct: 2, category: "Math", subcategory: "Averages", options: 5, test: 6 },
  { id: 288, image: "questions6/q38.png", correct: 3, category: "Math", subcategory: "Percentages", options: 5, test: 6 },
  { id: 289, image: "questions6/q39.png", correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 6 },
  { id: 290, image: "questions6/q40.png", correct: 1, category: "Verbal", subcategory: "Antonyms", options: 5, test: 6 },
  { id: 291, image: "questions6/q41.png", correct: 1, category: "Verbal", subcategory: "Antonyms", options: 5, test: 6 },
  { id: 292, image: "questions6/q42.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 6 },
  { id: 293, image: "questions6/q43.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 6 },
  { id: 294, image: "questions6/q44.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 6 },
  { id: 295, image: "questions6/q45.png", correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 296, image: "questions6/q46.png", correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 6 },
  { id: 297, image: "questions6/q47.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 298, image: "questions6/q48.png", correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 299, image: "questions6/q49.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 6 },
  { id: 300, image: "questions6/q50.png", correct: 4, category: "Math", subcategory: "Data Interpretation", options: 5, test: 6 },
];

// ─── PRACTICE QUESTIONS ─────────────────────────────────────────
const PRACTICE_QUESTIONS = [
  { id: 301, image: "questionsp/q1.png",  correct: 2, category: "Math",    subcategory: "Word Problems",        options: 5, test: 0 },
  { id: 302, image: "questionsp/q2.png",  correct: 4, category: "Logic",   subcategory: "Deduction",            options: 5, test: 0 },
  { id: 303, image: "questionsp/q3.png",  correct: 2, category: "Math",    subcategory: "Combinatorics",        options: 5, test: 0 },
  { id: 304, image: "questionsp/q4.png",  correct: 1, category: "Math",    subcategory: "Percentages",          options: 5, test: 0 },
  { id: 305, image: "questionsp/q5.png",  correct: 4, category: "Verbal",  subcategory: "Sentence Completion",  options: 5, test: 0 },
  { id: 306, image: "questionsp/q6.png",  correct: 2, category: "Verbal",  subcategory: "Analogies",            options: 5, test: 0 },
  { id: 307, image: "questionsp/q7.png",  correct: 3, category: "Verbal",  subcategory: "Analogies",            options: 5, test: 0 },
  { id: 308, image: "questionsp/q8.png",  correct: 2, category: "Verbal",  subcategory: "Antonyms",             options: 5, test: 0 },
  { id: 309, image: "questionsp/q9.png",  correct: 2, category: "Math",    subcategory: "Word Problems",        options: 5, test: 0 },
  { id: 310, image: "questionsp/q10.png", correct: 1, category: "Verbal",  subcategory: "Sentence Completion",  options: 5, test: 0 },
  { id: 311, image: "questionsp/q11.png", correct: 4, category: "Math",    subcategory: "Number Series",        options: 5, test: 0 },
  { id: 312, image: "questionsp/q12.png", correct: 0, category: "Math",    subcategory: "Word Problems",        options: 5, test: 0 },
  { id: 313, image: "questionsp/q13.png", correct: 0, category: "Spatial", subcategory: "Odd One Out",          options: 5, test: 0 },
  { id: 314, image: "questionsp/q14.png", correct: 3, category: "Verbal",  subcategory: "Analogies",            options: 5, test: 0 },
  { id: 315, image: "questionsp/q15.png", correct: 2, category: "Verbal",  subcategory: "Analogies",            options: 5, test: 0 },
  { id: 316, image: "questionsp/q16.png", correct: 1, category: "Math",    subcategory: "Percentages",          options: 5, test: 0 },
];

// ─── TEST 1 (NEW) QUESTIONS ──────────────────────────────────────
// Text questions use { question, choices } instead of { image }.
// Spatial questions from screenshots use image files in questions7/.
// Answers marked // VERIFY should be confirmed visually.
const TEST_NEW_QUESTIONS = [
  { id: 351, question: "15 out of 300 employees did not show up for work on at least one day this week. What is the percentage of employees that showed up for work every day this week?", choices: ["80%", "85%", "90%", "95%"], correct: 3, category: "Math", subcategory: "Percentages", options: 4, test: 7 },
  { id: 352, question: "Which number has the lowest value?", choices: ["0.325", "2/8", "0.56", "0.235", "0.428"], correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 7 },
  { id: 353, question: "Which number has the lowest value?", choices: ["0.03", "3/10", "0.3", "0.2 + 0.15", "2/3"], correct: 0, category: "Math", subcategory: "Number Comparison", options: 5, test: 7 },
  { id: 354, question: "Last week, the price of a microwave increased by 20% to $300. This week, the price went down 10% lower than it was before last week's price increase. What is the price of a microwave this week?", choices: ["$324", "$216", "$243", "$225"], correct: 3, category: "Math", subcategory: "Percentages", options: 4, test: 7 },
  { id: 355, image: "questions7/q1.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 7 }, // VERIFY
  { id: 356, image: "questions7/q2.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 7 }, // VERIFY
  { id: 357, image: "questions7/q3.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 7 }, // VERIFY
  { id: 358, image: "questions7/q4.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 7 }, // VERIFY
  { id: 359, question: "Which number has the lowest value?", choices: ["1/7 × 1/3", "1/6 × 1/4", "1/8 × 1/2", "1/5 × 1/5", "2/24"], correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 7 },
  { id: 360, question: "Which number has the lowest value?", choices: ["1/8 of 32", "1/9 of 27", "2/7 of 21", "1/6 of 30", "2"], correct: 4, category: "Math", subcategory: "Number Comparison", options: 5, test: 7 },
  { id: 361, question: "Which number has the lowest value?", choices: ["7/49", "1/8", "1/9", "2/15", "4/5"], correct: 2, category: "Math", subcategory: "Number Comparison", options: 5, test: 7 },
  { id: 362, question: "How many of the five pairs of items listed below are exact duplicates?\n\n23 009 544 978  ···  23 009 594 978\n81 007 207 098  ···  81 007 207 098\n29 005 543 519  ···  29 055 543 519\n88 748 910 182  ···  88 748 900 182\n91 711 507 155  ···  91 711 507 155", choices: ["1", "2", "3", "4", "5"], correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 7 },
  { id: 363, question: "How many of the five pairs of items listed below are exact duplicates?\n\n48 Cleasby Rd, Menston  ···  48 Clearsby Rd, Merston\n100 Louise Road, Northampton  ···  100 Louise Road, Northampton\n31a Great George St  ···  31a Great George St\n30 Station St, Sunbury  ···  30 Station St, Sunbury\n22 Alibon Place, Leeds  ···  22 Albion Place, Leeds", choices: ["1", "2", "3", "4", "5"], correct: 2, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 7 },
  { id: 364, question: "How many of the five pairs of items listed below are exact duplicates?\n\n42 Celandine View, Soham  ···  42 Celandine View, Soham\n54 Cherry Hindon Rd, Cambridge  ···  54 Cherry Hinton Rd, Cambridge\n52 George St, Brighton  ···  52 George St, Brighton\n84 James's St, Brighton  ···  84 St. James's St, Brighton\n11 Jesus Lane, Cambridge  ···  11 Jesus Lane, Cambridge", choices: ["1", "2", "3", "4", "5"], correct: 2, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 7 },
  { id: 365, question: "Which missing letter completes the series below?\n\nA, C, F, ?, O", choices: ["H", "I", "J", "K", "L"], correct: 2, category: "Logic", subcategory: "Letter Series", options: 5, test: 7 },
  { id: 366, question: "Fill in the missing word:\n\nTo truly _____ the appeal of an event is to scan the number of journalists and photographers in attendance.", choices: ["ignore", "send", "measure", "allow", "transform"], correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 7 },
  { id: 367, question: "Fill in the missing word:\n\nDespite the fact that Lisa's car was stolen while she was on holiday, it _____ clear whether the thieves knew about her long absence.", choices: ["was", "felt", "wasn't", "seemed", "made"], correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 7 },
  { id: 368, question: "Fill in the missing words:\n\nAlthough e-cigarettes do not _____ tobacco, they _____ high doses of nicotine which is derived from the tobacco plant.", choices: ["contain; deliver", "burn; are", "make; deliver", "include; consume", "advertise; produce"], correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 7 },
  { id: 369, question: "Fill in the missing words:\n\nCritically acclaimed artworks that were _____ by artificial intelligence raise the notion that the story of human visual culture _____ come down to a mathematical equation.", choices: ["seen; could", "made; wouldn't", "sold; didn't", "generated; might", "bought; will"], correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 7 },
  { id: 370, image: "questions7/q5.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 7 }, // VERIFY
  { id: 371, image: "questions7/q6.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 7 }, // VERIFY
  { id: 372, image: "questions7/q7.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 7 }, // VERIFY
  { id: 373, question: 'Which of the following is the opposite of the word "progress"?', choices: ["impress", "stride", "pull", "stagnate"], correct: 3, category: "Verbal", subcategory: "Antonyms", options: 4, test: 7 },
  { id: 374, question: 'Which of the following is the opposite of the word "gregarious"?', choices: ["humble", "introverted", "inspiring", "selfish"], correct: 1, category: "Verbal", subcategory: "Antonyms", options: 4, test: 7 },
  { id: 375, question: "Bake : Food", choices: ["Cook : Eat", "Wear : Clothing", "Weave : Textile", "Preparation : Meal", "Fabric : Sew"], correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 7 },
  { id: 376, question: "What is the next number in the series?\n\n1   8   27   64   125", choices: ["226", "196", "206", "216"], correct: 3, category: "Math", subcategory: "Number Series", options: 4, test: 7 },
  { id: 377, question: "What is the next number in the series?\n\n4   7   12   19", choices: ["28", "26", "32", "30"], correct: 0, category: "Math", subcategory: "Number Series", options: 4, test: 7 },
  { id: 378, question: "Julie delivers 3 letters in 5 mins, and Lucia delivers 4 letters in 3 mins. How many letters will Lucia deliver while Julie is delivering 18 letters?", choices: ["24", "40", "72", "120"], correct: 1, category: "Math", subcategory: "Word Problems", options: 4, test: 7 },
  { id: 379, question: "What is the next number in the series?\n\n5   3   8   11", choices: ["9", "18", "19", "14"], correct: 2, category: "Math", subcategory: "Number Series", options: 4, test: 7 },
  { id: 380, question: "The ratio of female to male employees in a factory is 7:9. The total amount of employees in the factory is 320. How many females work in the factory?", choices: ["70", "90", "140", "180"], correct: 2, category: "Math", subcategory: "Ratios", options: 4, test: 7 },
  { id: 381, question: "Assumptions:\nThe mountain is taller than the hill.\nThe hill is shorter than the skyscraper.\n\nConclusion:\nThe skyscraper is taller than the mountain.\n\nIf the assumptions are true, is the conclusion", choices: ["Correct", "Incorrect", "Cannot be determined"], correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 7 },
  { id: 382, question: "Assumptions:\nCourier A delivers at least 25 parcels per day.\nCourier B always delivers fewer parcels than Courier A.\nCourier C never delivers fewer parcels than Courier B.\n\nConclusion:\nCourier B delivers more parcels per day than couriers A and C.\n\nIf the assumptions are true, is the conclusion", choices: ["Correct", "Cannot be determined based on the information available", "Incorrect"], correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 7 },
  { id: 383, question: "Assumptions:\nAll offices have a printer.\nAll printers have ink.\n\nConclusion:\nSome offices have no ink.\n\nIf the assumptions are true, is the conclusion", choices: ["Correct", "Cannot be determined based on the information available", "Incorrect"], correct: 2, category: "Logic", subcategory: "Syllogisms", options: 3, test: 7 },
  { id: 384, question: "What is the next number in the series?\n\n1   3   −1   7   −9", choices: ["5", "13", "23", "25"], correct: 2, category: "Math", subcategory: "Number Series", options: 4, test: 7 },
  { id: 385, question: "Vigorous : Energy", choices: ["Saturated : Liquid", "Excited : Thrilled", "Potent : Robust", "Capacity : Volume", "Wrath : Irate"], correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 7 },
  { id: 386, image: "questions7/q8.png", correct: 3, category: "Spatial", subcategory: "Figure Series", options: 5, test: 7 }, // VERIFY
  { id: 387, image: "questions7/q9.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 5, test: 7 }, // VERIFY
  { id: 388, image: "questions7/q10.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 5, test: 7 }, // VERIFY
  { id: 389, question: "What is the next number in the series?\n\n3   5   7   11   13", choices: ["15", "17", "16", "19"], correct: 1, category: "Math", subcategory: "Number Series", options: 4, test: 7 },
  { id: 390, question: 'Which of the following is the opposite of the word "provisional"?', choices: ["equal", "severe", "permanent", "destructive"], correct: 2, category: "Verbal", subcategory: "Antonyms", options: 4, test: 7 },
  { id: 391, question: 'Which of the following is the opposite of the word "hinder"?', choices: ["expedite", "aftermath", "solve", "pride"], correct: 0, category: "Verbal", subcategory: "Antonyms", options: 4, test: 7 },
  { id: 392, question: 'Which of the following is the opposite of the word "blunder"?', choices: ["better", "loss", "draw", "accuracy"], correct: 3, category: "Verbal", subcategory: "Antonyms", options: 4, test: 7 },
  { id: 393, question: 'Which of the following is the opposite of the word "procure"?', choices: ["replace", "pass", "sell", "place"], correct: 2, category: "Verbal", subcategory: "Antonyms", options: 4, test: 7 },
  { id: 394, question: "Singer : Choir", choices: ["Writer : Album", "Composer : Lyrics", "Band : Musician", "Poem : Anthology", "Novel : Page"], correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 7 },
  { id: 395, question: "Race : Track", choices: ["Field : Soccer", "Coach : Player", "Tennis : Court", "Ball : Net", "Serve : Shoot"], correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 7 },
  { id: 396, question: "Which pair of letters comes next in the series below?\n\nAA,  BD,  CI,  ?", choices: ["AI", "DP", "DY", "AL", "EL"], correct: 1, category: "Logic", subcategory: "Letter Series", options: 5, test: 7 },
  { id: 397, question: "What is the next number in the series?\n\n2   44   4   41   6   38   8", choices: ["11", "10", "35", "34"], correct: 2, category: "Math", subcategory: "Number Series", options: 4, test: 7 },
  { id: 398, question: "Jamie exercises every weekend in the park, combining walking and running. When running he passes 600 meters in 4 minutes, and his walking speed is 4.8 km/h. If Jamie exercises for 30 minutes and the trail's length is 3,240 meters, how much time does he spend on running?", choices: ["10 mins", "12 mins", "18 mins", "20 mins"], correct: 1, category: "Math", subcategory: "Word Problems", options: 4, test: 7 },
  { id: 399, question: "John, Rachel, Sam and Lucy arrived at the studio for a Pilates class.\nTwo of the four arrived earlier than scheduled, and the other two arrived late to class.\nSam arrived late to class.\n\nTherefore, it is not possible that:", choices: ["John arrived before Lucy and Sam", "Sam arrived before John", "Sam arrived before Lucy and Rachel", "Sam arrived after Rachel", "Lucy arrived before Rachel"], correct: 2, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 7 },
  { id: 400, question: "AUGUST MONTHLY PERFORMANCE SUMMARY\n\nAgent A: 12 new accounts  |  +50% change from July  |  1 lost account\nAgent B: 21 new accounts  |  −20% change from July  |  0 lost accounts\nAgent C: 14 new accounts  |  −33.33% change from July  |  2 lost accounts\nAgent D: 10 new accounts  |  +25% change from July  |  3 lost accounts\n\nHow many new accounts did agents A and C account for together in July?", choices: ["29", "24", "18", "26", "Cannot say"], correct: 0, category: "Math", subcategory: "Data Interpretation", options: 5, test: 7 },
];

// ─── NORMAL MODE TEST 2 ──────────────────────────────────────────
const TEST2_NORMAL_QUESTIONS = [
  { id: 401, question: "Fill in the missing word:\n\nYesterday, TravelCost disclosed a data breach involving its customer database that it said could ______ at least 50 thousand customers.", choices: ["affect", "fly", "cost", "charge", "cause"], correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 8 },
  { id: 402, question: "What is the next number in the series?\n\n0   1.5   3   4.5   6", choices: ["6.5", "7", "7.5", "8"], correct: 2, category: "Math", subcategory: "Number Series", options: 4, test: 8 },
  { id: 403, question: 'Which of the following is the opposite of the word "mobile"?', choices: ["screen", "stationary", "laptop", "travel"], correct: 1, category: "Verbal", subcategory: "Antonyms", options: 4, test: 8 },
  { id: 404, question: "What is 12 of 200, in percentage?", choices: ["6", "7", "8", "9"], correct: 0, category: "Math", subcategory: "Percentages", options: 4, test: 8 },
  { id: 405, question: "What is the next number in the series?\n\n5   11   23   47", choices: ["105", "97", "95", "87"], correct: 2, category: "Math", subcategory: "Number Series", options: 4, test: 8 },
  { id: 406, question: "Which number has the highest value?", choices: ["1/3 + 1/9", "0.25 + 0.46", "0.3 + 1/4", "0.18 + 0.43", "0.17 + 0.4"], correct: 1, category: "Math", subcategory: "Number Comparison", options: 5, test: 8 },
  { id: 407, question: "Fill in the missing word:\n\nNBC's TV ratings are staging a comeback this year, ______ a trend of declining viewership that has challenged the company's senior executives in recent years.", choices: ["featuring", "increasing", "repeating", "reversing", "negating"], correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 8 },
  { id: 408, question: "Fill in the missing words:\n\nThe amount spent by US advertisers is forecast to ______ the £100bn mark for the first time next year, but the milestone is only being passed ______ continued high levels of digital advertising growth.", choices: ["surpass; despite", "miss; thanks to", "break; due to", "hit; albeit", "cross; against"], correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 8 },
  { id: 409, question: "Fill in the missing words:\n\nA new painkiller made by one of the world's biggest pharmaceutical firms was launched ______ the company being ______ it could cause extreme pain.", choices: ["by; reported", "although; motivated", "while; ignored", "amid; recommended", "despite; warned"], correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 8 },
  { id: 410, question: "What is the next number in the series?\n\n57   53   48   42   35", choices: ["31", "28", "27", "25"], correct: 2, category: "Math", subcategory: "Number Series", options: 4, test: 8 },
  { id: 411, question: "What is the next number in the series?\n\n1   4   6   24   26   104", choices: ["46", "106", "64", "130"], correct: 1, category: "Math", subcategory: "Number Series", options: 4, test: 8 },
  { id: 412, question: "How many of the five pairs of items listed below are exact duplicates?\n\nLS1 6PU  ···  LS1 6PU\nLS28 6DD  ···  LS28 6PD\nLS8 STP  ···  LS8 2TP\nLS26 6JA  ···  LS29 6JA\nLS1 3BB  ···  LS1 3BB", choices: ["1", "2", "3", "4", "5"], correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 8 },
  { id: 413, question: "How many of the five pairs of items listed below are exact duplicates?\n\nCB7 5DP  ···  C37 5DP\nCB1 7AA  ···  CB1 77A\nBN2 1RJ  ···  BN2 1HJ\nBN2 5SH  ···  BN2 5SH\nCB5 8BA  ···  CB5 8BA", choices: ["1", "2", "3", "4", "5"], correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 8 },
  { id: 414, question: "What is the next number in the series?\n\n70   35   30   15   10   5", choices: ["0", "2.5", "5", "10"], correct: 0, category: "Math", subcategory: "Number Series", options: 4, test: 8 },
  { id: 415, question: "Which letter comes next in the series below?\n\nE, C, F, D, G, ?", choices: ["E", "H", "C", "A", "B"], correct: 0, category: "Logic", subcategory: "Letter Series", options: 5, test: 8 },
  { id: 416, question: "Which number has the HIGHEST value?", choices: ["5/12", "3/4", "19/36", "7/8", "6/7"], correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 8 },
  { id: 417, question: 'Which of the following is the opposite of the word "prevalent"?', choices: ["trendy", "contemporary", "areal", "rare"], correct: 3, category: "Verbal", subcategory: "Antonyms", options: 4, test: 8 },
  { id: 418, image: "questions8/q1.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 4, test: 8 }, // VERIFY
  { id: 419, image: "questions8/q2.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 4, test: 8 }, // VERIFY
  { id: 420, image: "questions8/q3.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 4, test: 8 }, // VERIFY
  { id: 421, image: "questions8/q4.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 4, test: 8 }, // VERIFY
  { id: 422, question: 'Which of the following is the opposite of the word "ration"?', choices: ["whole", "friction", "charity", "scarce"], correct: 2, category: "Verbal", subcategory: "Antonyms", options: 4, test: 8 },
  { id: 423, image: "questions8/q5.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 8 }, // VERIFY
  { id: 424, image: "questions8/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 8 }, // VERIFY
  { id: 425, question: "The price of one kilogram of bananas increased by 50% so that 4kg of bananas now cost $18. What was the price of one kilogram of bananas prior to the price increase?", choices: ["3", "3.5", "4", "4.5"], correct: 0, category: "Math", subcategory: "Percentages", options: 4, test: 8 },
  { id: 426, question: "Dan can walk 100 meters in 1 minute. Peter can walk 400 meters in 5 minutes. If they start off together, how far ahead will they be of each other after 10 minutes?", choices: ["100m", "200m", "300m", "400m", "500m"], correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 8 },
  { id: 427, question: 'Which of the following is the opposite of the word "ensure"?', choices: ["warrant", "instill", "endanger", "insure"], correct: 2, category: "Verbal", subcategory: "Antonyms", options: 4, test: 8 },
  { id: 428, question: "How many of the five pairs of items listed below are exact duplicates?\n\n599 338  ···  599 388\n590 468  ···  590 458\n249 740  ···  249 740\n327 934  ···  327 934\n487 0949  ···  487 0949", choices: ["1", "2", "3", "4", "5"], correct: 2, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 8 },
  { id: 429, question: "The profit obtained from selling Product X for $236 is the same as the loss obtained from selling it for $144. What is the price of Product X?", choices: ["150", "185", "200", "190"], correct: 3, category: "Math", subcategory: "Word Problems", options: 4, test: 8 },
  { id: 430, question: 'Which of the following is the opposite of the word "hedge"?', choices: ["bend", "free", "encircle", "induce"], correct: 1, category: "Verbal", subcategory: "Antonyms", options: 4, test: 8 },
  { id: 431, image: "questions8/q7.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 8 }, // VERIFY
  { id: 432, image: "questions8/q8.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 8 }, // VERIFY
  { id: 433, image: "questions8/q9.png", correct: 0, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 8 }, // VERIFY
  { id: 434, image: "questions8/q10.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 8 }, // VERIFY
  { id: 435, question: "Curiosity : Knowledge", choices: ["Water : Thirst", "Intellect : Wisdom", "Appetite : Food", "Dread : Distress", "Idea : Interest"], correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 8 },
  { id: 436, question: "Five students took an exam that contains 40 questions. The pass mark is 80%. How many students did NOT pass the exam?\n\nZoe = 30, Jonah = 35, Katie = 31, Elliot = 38, Chris = 29", choices: ["1", "2", "3", "4", "5"], correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 8 },
  { id: 437, question: "Which number has the highest value?", choices: ["3/8", "11/32", "5/16", "1/4", "8/28"], correct: 0, category: "Math", subcategory: "Number Comparison", options: 5, test: 8 },
  { id: 438, question: "Tyre : Deflate", choices: ["Balloon : Air", "Blade : Cut", "Wheel : Roll", "Knife : Dull", "Bullet : Gun"], correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 8 },
  { id: 439, question: "Interview : Screen", choices: ["Tournament : Player", "Employer : Employee", "Swimming : Exercise", "Sport : Athlete", "Company : Hire"], correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 8 },
  { id: 440, question: "Fiddle : Nervous", choices: ["Violin : Musician", "Fearful : Fidget", "Fuss : Twitch", "Anger : Rage", "Shiver : Cold"], correct: 4, category: "Verbal", subcategory: "Analogies", options: 5, test: 8 },
  { id: 441, question: "Assumptions:\nAll police officers have a mustache.\nPhil does not have a mustache.\n\nConclusion:\nPhil is not a police officer.\n\nIf the assumptions are true, is the conclusion", choices: ["Correct", "Cannot be determined based on the information available", "Incorrect"], correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 8 },
  { id: 442, question: "Assumptions:\nAll cardboard is made of paper.\nNo cardboard is made of plastic.\n\nConclusion:\nSome paper is not made of plastic.\n\nIf the assumptions are true, is the conclusion", choices: ["Correct", "Cannot be determined based on the information available", "Incorrect"], correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 8 },
  { id: 443, question: "Assumptions:\nNo gardeners are engineers.\nAll Spanish speakers are gardeners.\n\nConclusion:\nSome engineers are not Spanish speakers.\n\nIf the assumptions are true, is the conclusion", choices: ["Correct", "Cannot be determined based on the information available", "Incorrect"], correct: 0, category: "Logic", subcategory: "Syllogisms", options: 3, test: 8 },
  { id: 444, question: "Which number has the highest value?", choices: ["3×0.03", "2×0.03", "2×0.025", "0.3×0.2", "5×0.01"], correct: 0, category: "Math", subcategory: "Number Comparison", options: 5, test: 8 },
  { id: 445, question: "Which number has the highest value?", choices: ["1/8 + 1/2", "1/3 + 1/6", "2/3 − 1/5", "3/4 − 1/6", "1/2 + 1/9"], correct: 0, category: "Math", subcategory: "Number Comparison", options: 5, test: 8 },
  { id: 446, question: "Tina is taller than Sia and Uma is shorter than Roslyn. If Tina is shorter than Uma, who is the shortest?", choices: ["Roslyn", "Sia", "Tina", "Uma"], correct: 1, category: "Logic", subcategory: "Deductive Reasoning", options: 4, test: 8 },
  { id: 447, question: "What is the next number in the series?\n\n416   405   394   383", choices: ["272", "327", "382", "372"], correct: 3, category: "Math", subcategory: "Number Series", options: 4, test: 8 },
  { id: 448, question: "Which pair of letters comes next in the series below?\n\nCA, ED, GG, IJ, KM, ?", choices: ["LH", "MH", "NJ", "MP", "NI"], correct: 3, category: "Logic", subcategory: "Letter Series", options: 5, test: 8 },
  { id: 449, question: "There are 26 students in Class A. Class B has 14 boys and 11 girls. When the classes are combined there are three more girls than boys. How many girls are there in Class A?", choices: ["11", "12", "13", "14", "16"], correct: 4, category: "Math", subcategory: "Word Problems", options: 5, test: 8 },
  { id: 450, question: "Alex can pack 5 packages in half an hour, while Shana packs 36 packages in 3 hours. Alex started working at 8:00, and Shana joined him at 11:00. At what time will they have finished packing 250 packages in total?", choices: ["18:00", "19:00", "21:00", "22:00"], correct: 2, category: "Math", subcategory: "Word Problems", options: 4, test: 8 },
];

// ─── QUESTION POOLS PER TAB ─────────────────────────────────────
// Starter tab: original 6 tests + practice (backward-compatible)
const STARTER_ALL = [...TEST1_QUESTIONS, ...TEST2_QUESTIONS, ...TEST3_QUESTIONS, ...TEST4_QUESTIONS, ...TEST5_QUESTIONS, ...TEST6_QUESTIONS, ...PRACTICE_QUESTIONS];
const STARTER_UNIQUE = STARTER_ALL.filter((q) => !q.duplicateOf);
// Normal tab: extra practice pool (not used in timed tests)
const NORMAL_EXTRA_QUESTIONS = [
  // ── Deductive Reasoning ────────────────────────────────────────
  { id: 460, question: "Five adventurers, including Linda, went parachuting. Pamela, Bobby and Juliana jumped consecutively, in some order. Herman jumped between Bobby and one other person.\n\nWhich of the following must be true?", choices: ["Herman jumped before Juliana", "Pamela jumped last", "Linda jumped either first or last", "Bobby jumped second", "Herman was one of the first two jumpers"], correct: 2, category: "Logic", subcategory: "Deductive Reasoning", options: 5 },
  { id: 461, question: "Five candidates are running for Mayor. Ronald got more votes than Sasha. Terry got twice as many votes as Wilma. Terry got fewer votes than Sasha. Victor got three times as many votes as Terry.\n\nWhich of the following must be true?", choices: ["Ronald won the election", "Victor won the election", "Sasha got more votes than Victor", "Victor got more votes than Wilma", "Wilma finished in fourth place"], correct: 3, category: "Logic", subcategory: "Deductive Reasoning", options: 5 },
  // ── Word Relationships ─────────────────────────────────────────
  { id: 476, question: "Vestige; Vintage\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 2, category: "Verbal", subcategory: "Word Relationships", options: 3 },
  { id: 477, question: "Sombre; Upbeat\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3 },
  { id: 478, question: "Accessory; Accessible\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 2, category: "Verbal", subcategory: "Word Relationships", options: 3 },
  { id: 479, question: "Supplant; Limited\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 2, category: "Verbal", subcategory: "Word Relationships", options: 3 },
  { id: 480, question: "Accredit; Account\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 2, category: "Verbal", subcategory: "Word Relationships", options: 3 },
  { id: 481, question: "Inhibit; Permit\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3 },
  // ── Math Word Problems ─────────────────────────────────────────
  { id: 489, question: "80 yoga classes cost $480 to attend. How much would it cost to attend 16 classes?", choices: ["$36", "$96", "$94", "$48", "$102"], correct: 1, category: "Math", subcategory: "Word Problems", options: 5 },
  { id: 490, question: "Andrea runs a marathon in aid of three different charities. She receives donations and decides to donate $5000 to the first charity, $6000 to the second, and $4000 to the third. How much more would the third charity receive if the donations were divided equally between the 3 charities?", choices: ["1000", "2000", "3000", "5000", "6000"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5 },
  { id: 491, question: "Jack and Megan are getting married and their families each agree to contribute to the wedding. Jack's family contribute £6200, Megan's family contribute £9800 and Jack and Megan contribute the remaining £5600. How much less would Megan's family have paid if they decided to split the wedding costs evenly between the 3 of them?", choices: ["£7200", "£3200", "£6200", "£2600", "£2800"], correct: 3, category: "Math", subcategory: "Word Problems", options: 5 },
  { id: 492, question: "Josh works part-time and Henry works full-time. Henry sold 11 times as many phones as Josh did. They both managed to sell 264 phones in total. How many phones did Henry sell?", choices: ["202", "212", "222", "232", "242"], correct: 4, category: "Math", subcategory: "Word Problems", options: 5 },
  { id: 497, question: "Ben's monthly travel costs are currently $500 but are expected to increase by 10% each month, for the next two months. What would be Ben's total travel costs for the next two months?", choices: ["1,055", "1,095", "1,105", "1,155"], correct: 3, category: "Math", subcategory: "Percentages", options: 4 },
  // ── Probability & Combinatorics ────────────────────────────────
  { id: 501, question: "Sean arbitrarily chooses a whole number between 1 and 10 (inclusive). Brad arbitrarily chooses two different whole numbers between 1 and 10 (inclusive). What are the chances that Brad will choose the same number that Sean chose?", choices: ["0.19", "0.2", "0.5", "0.1", "0.04"], correct: 1, category: "Math", subcategory: "Probability", options: 5 },
  { id: 502, question: "Jenny's doctor will determine the correct diagnosis with a probability of 50% and Rob's doctor will determine the correct diagnosis with a probability of 40%. What are the chances that Jenny will get a single correct diagnosis if she visits both doctors?", choices: ["25%", "40%", "55%", "50%", "60%"], correct: 3, category: "Math", subcategory: "Probability", options: 5 },
  { id: 503, question: "There are 10 socks in a drawer, and they can make 5 pairs in different colors, if ordered. What are the chances to arbitrarily choose two socks that make a pair?", choices: ["1/5", "2/100", "1/9", "4/5", "1/4"], correct: 2, category: "Math", subcategory: "Probability", options: 5 },
  { id: 506, question: "The local grocery shop offers cheap meal deals, which are a combination of a sandwich, drink and snack, or a salad and drink, without a snack. There are 8 sandwich types, 4 salad types, 6 snack types and 9 drink types. How many unique lunch deal combinations are offered, in total?", choices: ["398", "468", "1728", "162", "436"], correct: 1, category: "Math", subcategory: "Combinatorics", options: 5 },
  { id: 507, question: "The area of the blue rectangle is 24.5cm². What is the area of the white rectangle, in cm²?", choices: ["7.5", "28", "13.5", "15", "10.5"], correct: 4, category: "Math", subcategory: "Geometry", options: 5 }, // VERIFY
  { id: 509, question: "Rectangle A has an area of 39 square meters, rectangle B has an area of 27 square meters. Given that all sides are whole numbers, what is the length of side X (the shared side)?", choices: ["16.5", "33", "4", "3", "1.5"], correct: 3, category: "Math", subcategory: "Geometry", options: 5 },
];

// Normal Test 3 (50 q · 15 min) — drawn from practice pool + reused spatial images
const TEST3_NORMAL_QUESTIONS = [
  // ── Logic: Deductive Reasoning ─────────────────────────────────
  { id: 520, question: "The dog show had one first-place winner, two second-place winners, and three third-place winners. The Poodle was not the first-place winner. The Great Dane finished between the Chihuahua and the Labrador (in some order). The Sheepdog and the Terrier did not win the same prize as each other.\n\nWhich dog could not have finished in second place?", choices: ["Terrier", "Great Dane", "Poodle"], correct: 2, category: "Logic", subcategory: "Deductive Reasoning", options: 3, test: 9 },
  { id: 521, question: "Five friends are sitting in a row. Jim is in a seat to the left of Teresa, but to the right of Bjorn. Bjorn is in a seat immediately to the left of Phil. Scott is in a seat next to Teresa.\n\nWho can be seated second from the right?", choices: ["Only Teresa", "Only Jim", "Teresa or Scott", "Jim or Teresa", "Anyone"], correct: 2, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 522, question: "Ari, Blaire, Chris, Dina, Eli, Fay, and Gal have a focal meeting with their team manager. They are to enter one after the other, not necessarily in this order. Chris enters immediately before Dina. Gal enters sometime after Chris. There are exactly two workers who enter between Ari and Eli. Ari is the second to enter the meeting room.\n\nWho entered the room third?", choices: ["Fay", "Chris", "Dina", "Gal", "None of the above"], correct: 1, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 523, question: "At Intech LTD, six product managers are scheduled to deliver a quarterly summary — Prudence, Chloe, Harriette, Lia, Maurice and Gale, not necessarily in this order. Chloe is scheduled to deliver her presentation after Harriette. Gale is scheduled after Lia. Lia is scheduled three slots after Prudence. Harriette is either scheduled on the first or the third slot.\n\nWhich of the following is a complete list of managers who can deliver on the second slot?", choices: ["Prudence", "Maurice", "Maurice, Chloe, Prudence", "Chloe, Maurice", "Maurice, Prudence"], correct: 4, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 524, question: "The F train has more cars than the R train. The V train has the most cars. The Q train has fewer cars than the R train. The H train has fewer cars than the F train.\n\nWhich of the following must be true?", choices: ["The H train has the second-greatest number of cars", "The R and H trains have the same number of cars", "The Q train has the smallest number of cars", "The V train has more cars than the H train", "The Q train has more cars than the F train"], correct: 3, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 525, question: "Five detectives were employed this year, and each detective solved at least one case. Alvin solved three times as many cases as Edward. Betty solved three fewer cases than Edward. Duncan and Betty solved three total cases. Claire solved the most cases.\n\nWhich of the following must be true?", choices: ["The smallest possible number of combined solved cases is under 30", "Edward solved exactly twice as many cases as Duncan", "Claire solved at least four times as many cases as Duncan", "Betty, Edward and Duncan combined to solve more cases than Alvin", "Alvin solved the third-most number of cases"], correct: 0, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 526, question: "Phil made a sales trip to five cities. He visited Baltimore sometime between his visit to Honolulu and Tulsa (or Tulsa and Honolulu). He visited Tulsa immediately before he visited Miami. He visited Seattle either first or last.\n\nWhich of the following must be false?", choices: ["Phil visited Miami immediately before Honolulu", "Phil visited Honolulu immediately before Seattle", "Phil visited Baltimore second", "Phil's first visit was not to Miami", "Phil visited Seattle and Honolulu on consecutive visits"], correct: 0, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 527, question: "A student can graduate early, on time or late. No more than two students graduated at any one time. Rocky graduated sometime after Viola. Neither Ulysses nor Tilly graduated early. Sarah and Walter graduated at different times.\n\nWhich of the following must be false?", choices: ["Rocky graduated on time", "Viola graduated on time", "Tilly graduated late", "Walter graduated early", "Sarah and Ulysses graduated together"], correct: 1, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  { id: 528, question: "Adam the Astronaut visited four planets. He visited Jupiter and Venus back-to-back (though not necessarily in that order). He visited Neptune sometime before Mercury.\n\nWhich of the following must be false?", choices: ["Adam visited Jupiter last", "Adam visited Mercury last", "Adam visited Mercury immediately before Jupiter", "Adam visited Venus third", "Adam visited Neptune second"], correct: 4, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 9 },
  // ── Verbal: Word Relationships ─────────────────────────────────
  { id: 529, question: "Mend; Amend\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 530, question: "Candid; Candidate\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 2, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 531, question: "Epitome; Incarnation\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 532, question: "Barter; Exchange\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 533, question: "Impose; Pose\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 2, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 534, question: "Adequate; Sparse\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 535, question: "Apparent; Evident\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 536, question: "Follow; Lead\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 537, question: "Assured; Bashful\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 538, question: "Dissent; Dispute\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 539, question: "Expansive; Extensive\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 540, question: "Coarse; Smooth\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 541, question: "Determined; Resolute\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 0, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  { id: 542, question: "Adamant; Flexible\n\nThe two words above", choices: ["have similar meanings", "have contradictory meanings", "have neither similar nor contradictory meanings"], correct: 1, category: "Verbal", subcategory: "Word Relationships", options: 3, test: 9 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 543, question: "Six batteries weigh 72 grams. How much does one battery weigh?", choices: ["12gr", "8gr", "15gr", "6gr", "10gr"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 544, question: "A packet of chewing gum costs £1.35. If Lewis wishes to buy 4 packs of gum, how much will this cost him?", choices: ["£4.35", "£5.40", "£5.70", "£6.35", "£4.95"], correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 545, question: "Charlotte sold 60 glasses of homemade lemonade and earned £90. How much would she have earned from selling 15 of those glasses?", choices: ["£15.5", "£19", "£22.5", "£25", "£25.5"], correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 546, question: "Donald weighs four times more than Mickey. Mickey weighs thirty times more than Andy. What is the weight ratio between Donald and Andy?", choices: ["90:8", "120:1", "30:4"], correct: 1, category: "Math", subcategory: "Word Problems", options: 3, test: 9 },
  { id: 547, question: "A café uses 840 eggs per month for its breakfast menu. If the supplier charges $2.40 per dozen eggs, and then increases the price to $3.00 per dozen, how much more will the café spend on eggs each month?", choices: ["$42", "$35", "$50.4", "$42.5", "$60"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 548, question: "With 32 tennis league games behind him, Joe has a win:loss ratio of 1:3. How many games must he win in a row in order to have a win:loss ratio of 1:2?", choices: ["4", "5", "2", "3", "6"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 549, question: "Rebecca ate 4 times as many cherries as Charlie did. In total, they both ate 30 cherries. How many cherries did Rebecca eat?", choices: ["24", "20", "28", "34", "26"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 550, question: "1,200 students are enrolled at a school. On one day, 4% of students were away on a trip. How many students were in school on that day?", choices: ["48", "62", "1152", "1150", "1196"], correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 9 },
  { id: 551, question: "A shop donates 5% of all earnings to charity. How much would the shop donate to charity from a purchase worth £30?", choices: ["£1.2", "£1.5", "£0.3", "£15", "£2.5"], correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 9 },
  { id: 552, question: "The cost of filling up Sam's petrol tank was $40. The price of petrol then increased by 45%. How much more does Sam need to pay now?", choices: ["$18", "$56", "$16", "$22", "$58"], correct: 0, category: "Math", subcategory: "Percentages", options: 5, test: 9 },
  { id: 553, question: "Zach's parents reduced his weekly pocket money from £20 to £15. What is the percentage decrease?", choices: ["75%", "15%", "30%", "25%", "20%"], correct: 3, category: "Math", subcategory: "Percentages", options: 5, test: 9 },
  { id: 554, question: "Ron planned to purchase 15 bottles of his favorite wine at $25 per bottle. However, the price of a wine bottle increased by 20% and Ron decided to not exceed his budget. How many bottles could Ron purchase at the new price?", choices: ["14", "13", "12", "11", "None of the above"], correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 9 },
  { id: 555, question: "90% of the bolts manufactured in a production line comply with the industry's standard, of which 80% are at a premium standard. If a bolt is chosen arbitrarily, what are the chances it will conform to premium standards?", choices: ["18%", "72%", "40%", "36%", "85%"], correct: 1, category: "Math", subcategory: "Probability", options: 5, test: 9 },
  { id: 556, question: "Ruby has 3 pairs of shoes — black, silver, white — and two pairs of trousers — black and white. If she chooses one pair of shoes and one pair of trousers arbitrarily, what are the chances that both items will be in the same color?", choices: ["1/3", "2/5", "1/5", "4/5", "1/6"], correct: 0, category: "Math", subcategory: "Probability", options: 5, test: 9 },
  { id: 557, question: "Dave has a three-digit combination lock. Each digit is one of the numbers 0, 1, 2, 3, 4 and digits can repeat in the code. How many different combinations does Dave have for setting his code?", choices: ["120", "119", "125", "124", "122"], correct: 2, category: "Math", subcategory: "Combinatorics", options: 5, test: 9 },
  { id: 558, question: "Peggy has a doll clothing set that includes the following apparel items: 4 skirts, 3 shoes, 3 shirts, and 3 socks. How many dressing options does Peggy have for her doll, given that she must use one item of each type?", choices: ["108", "13", "36", "96", "27"], correct: 0, category: "Math", subcategory: "Combinatorics", options: 5, test: 9 },
  { id: 559, question: "Collin needs to cover a 3m by 5m room floor and was offered two options:\n\nOffer A: $4 per tile, tile size 0.25m × 0.5m\nOffer B: $3 per tile, tile size 0.5m × 0.5m\n\nWhat is the total price of the cheaper offer?", choices: ["$120", "$160", "$180", "$200", "$360"], correct: 2, category: "Math", subcategory: "Geometry", options: 5, test: 9 },
  // ── Spatial (reused images from Tests 1 & 2) ───────────────────
  { id: 560, image: "questions7/q2.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 9 },
  { id: 561, image: "questions7/q4.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 9 },
  { id: 562, image: "questions7/q6.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 9 },
  { id: 563, image: "questions7/q7.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 9 },
  { id: 564, image: "questions7/q9.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 5, test: 9 },
  { id: 565, image: "questions8/q2.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 4, test: 9 },
  { id: 566, image: "questions8/q4.png", correct: 0, category: "Spatial", subcategory: "Figure Series", options: 4, test: 9 },
  { id: 567, image: "questions8/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 9 },
  { id: 568, image: "questions8/q8.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 9 },
  { id: 569, image: "questions8/q10.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 9 },
];

// Normal Test 4 (50 q · 15 min) — Udemy practice test
const TEST4_NORMAL_QUESTIONS = [
  // ── Math ───────────────────────────────────────────────────────
  { id: 570, question: "Identify the next number in the series:\n\n3, 5, 9, 17, ...", choices: ["33", "27", "29", "31", "35"], correct: 0, category: "Math", subcategory: "Number Series", options: 5, test: 10 },
  { id: 571, question: "If a box contains 24 apples and 8 of them are red, what percentage of the apples are red?", choices: ["25%", "30%", "33.33%", "40%", "50%"], correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 10 },
  { id: 572, question: "If it takes 5 tickets for one person to enter a movie theater, how many tickets would be needed for a group of 12 people to all watch a movie together?", choices: ["50", "55", "60", "65", "72"], correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  { id: 573, question: "A grocery store restocks 35 bags of apples on Wednesday. If the store restocks 30% more bags on Thursday, how many bags of apples does it restock on Thursday?", choices: ["40", "45", "50", "55", "60"], correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 10 }, // VERIFY
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 574, question: "Cloud : Rain\n\nAs Volcano is to:", choices: ["Lava", "Mountain", "Ice", "Eruption", "Water"], correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 10 },
  { id: 575, question: "He was renowned for his _______ personality, always able to diffuse tense situations.", choices: ["Obstinate", "Gregarious", "Bellicose", "Malignant", "Amiable"], correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  { id: 576, question: "OCCUPIED : VACANT\n\nAs:", choices: ["BEAUTIFUL is to SIGHT", "BLISSFUL is to HAPPINESS", "CONSERVED is to RETAINED", "HONORABLE is to SHAMEFUL", "MYOPIC is to SHORTSIGHTED"], correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 10 },
  // ── Spatial ────────────────────────────────────────────────────
  { id: 577, image: "questions9/q1.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 10 }, // VERIFY
  { id: 578, image: "questions9/q2.png", correct: 1, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 10 }, // VERIFY
  // ── Logic ──────────────────────────────────────────────────────
  { id: 579, question: "If it has rained every Tuesday for the past month, what is likely to happen next Tuesday?", choices: ["It will rain.", "It will be sunny.", "It will snow.", "It will be windy.", "It is likely to rain, but uncertain."], correct: 4, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 580, question: "A car travels 150 miles in 3 hours. For the next part of its journey, the car increases its speed by 20% and travels for an additional 2 hours. How many total miles does the car travel in the entire journey?", choices: ["270", "240", "250", "260", "265"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  { id: 581, question: "What is the next number in the series?\n\n4, 9, 16, 25, ...", choices: ["34", "36", "38", "40", "42"], correct: 1, category: "Math", subcategory: "Number Series", options: 5, test: 10 },
  { id: 582, question: "A boutique is holding a sale where all designer dresses are sold at a discount of 35%. If the regular price of a dress is $280, how many dresses could be bought at the sale price with $1,680?", choices: ["3", "5", "7", "8", "9"], correct: 4, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  { id: 583, question: "What is the probability of rolling a total of 7 with two six-sided dice?", choices: ["1/6", "1/8", "1/12", "1/18", "1/36"], correct: 0, category: "Math", subcategory: "Probability", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 584, question: "The scientist's theory was so _______ that it was impossible to prove it wrong using current technology.", choices: ["Impeccable", "Abstract", "Infallible", "Esoteric", "Erroneous"], correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  { id: 585, question: "Painting : Artist\n\nAs Symphony is to:", choices: ["Composer", "Conductor", "Musician", "Performer", "Listener"], correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 586, question: "18 is 30% of what number?", choices: ["50", "54", "60", "72", "58"], correct: 2, category: "Math", subcategory: "Percentages", options: 5, test: 10 },
  // ── Spatial ────────────────────────────────────────────────────
  { id: 587, image: "questions9/q3.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 10 }, // VERIFY
  { id: 588, image: "questions9/q4.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 10 }, // VERIFY
  // ── Logic ──────────────────────────────────────────────────────
  { id: 589, question: "If no cats are birds, and all sparrows are birds, then:", choices: ["Some sparrows are cats.", "No sparrows are cats.", "All cats are sparrows.", "Some cats are not sparrows.", "It cannot be determined."], correct: 1, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 590, question: "A bookstore offers a 25% discount on a particular book. If the discounted price of the book is $45, what was its original price?", choices: ["56", "60", "64", "65", "72"], correct: 1, category: "Math", subcategory: "Percentages", options: 5, test: 10 },
  { id: 591, question: "A car rental agency has a weekly rate of $350 for a luxury car. During a special promotion, they offer an additional weekly discount of $70. If a customer rents the car for 3 weeks, how much do they pay in total?", choices: ["840", "900", "800", "750", "820"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  { id: 592, question: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", choices: ["5 minutes", "10 minutes", "100 minutes", "500 minutes", "1000 minutes"], correct: 0, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 593, question: "What is the next string in the series?\n\nAZCX, BYDW, CXEV, DWFU, ...", choices: ["EXGU", "EVGT", "EUGS", "FXHS", "FYIV"], correct: 1, category: "Verbal", subcategory: "Letter Series", options: 5, test: 10 },
  { id: 594, question: "Pen : Write\n\nAs Knife is to:", choices: ["Cut", "Eat", "Cook", "Sharpen", "Hold"], correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 10 },
  { id: 595, question: "His speech was so _______ that it was difficult for the audience to understand the point he was trying to make.", choices: ["Lucid", "Obfuscating", "Perspicuous", "Eloquent", "Concise"], correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 596, question: "A printer prints 40 pages in 5 minutes. At this rate, how many hours will it take to print a 460-page document?", choices: ["1", "1.1", "0.8", "0.95", "2"], correct: 3, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  // ── Spatial ────────────────────────────────────────────────────
  { id: 597, image: "questions9/q5.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 10 }, // VERIFY
  { id: 598, image: "questions9/q6.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 10 }, // VERIFY
  // ── Logic ──────────────────────────────────────────────────────
  { id: 599, question: "If all the trains on schedule have been late for the past week, what can be inferred about the train's schedule?", choices: ["It is reliable.", "It is unreliable.", "It is fast.", "It is well-planned.", "Cannot be determined."], correct: 1, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 600, question: "A coffee shop sells a cup of coffee for $2.50. If they offer a \"buy one get one half off\" deal, how much would 5 cups of coffee cost?", choices: ["$7.50", "$9.50", "$10.00", "$11.00", "$12.50"], correct: 2, category: "Math", subcategory: "Word Problems", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 601, question: "How many of the five pairs of company names below are exact duplicates?\n\nCarter & Sons LLC  ···  Carter & Sons, LLC\nGreenfield Electronics  ···  Greenfield Electronics\nO'Conner, Lee and Zhao  ···  O'Connor, Lee and Zhao\nBakersfield Bistro  ···  Bakersfield Bistro\nZenith Roofing Services  ···  Zenith Roofing Service", choices: ["1", "2", "3", "4", "5"], correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 602, question: "What is the probability of drawing an ace from a standard deck of 52 playing cards?", choices: ["1/14", "1/26", "1/52", "4/52", "1/12"], correct: 3, category: "Math", subcategory: "Probability", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 603, question: "How many of the five pairs of artist names below are exact duplicates?\n\nAnna Bell Taylor  ···  Anna-Bell Taylor\nThe J. Harrison Band  ···  The J Harrison Band\nDJ KoolKat  ···  DJ KoolKat\nMaroon Five  ···  Maroon 5\nEddy & The Echoes  ···  Eddy & The Echoes", choices: ["1", "2", "3", "4", "5"], correct: 1, category: "Logic", subcategory: "Attention to Detail", options: 5, test: 10 },
  { id: 604, question: "The artist's work was so _______ that it was difficult to believe it was made by a human and not a machine.", choices: ["Abstract", "Clumsy", "Primitive", "Meticulous", "Haphazard"], correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 605, question: "The average of 3 numbers is greater than 6 but less than 9. Which of the following could NOT be the sum of these three numbers?", choices: ["18", "19", "20", "26", "21"], correct: 0, category: "Math", subcategory: "Averages", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 606, question: "Water : Ice\n\nAs Lava is to:", choices: ["Volcano", "Magma", "Rock", "Heat", "Eruption"], correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 607, question: "The average (arithmetic mean) of 7 numbers is greater than 9 but less than 14. Which of the following could NOT be the sum of these seven numbers?", choices: ["70", "91", "98", "65", "62"], correct: 4, category: "Math", subcategory: "Averages", options: 5, test: 10 },
  { id: 608, question: "Which number does not belong in the following group?\n\n2, 3, 5, 7, 11, 14, 17", choices: ["2", "3", "14", "17", "11"], correct: 2, category: "Math", subcategory: "Number Series", options: 5, test: 10 },
  // ── Logic ──────────────────────────────────────────────────────
  { id: 609, question: "All roses are flowers, and some flowers fade quickly. Therefore,", choices: ["All roses fade quickly.", "Some roses are not flowers.", "Some roses fade quickly.", "No roses fade quickly.", "It cannot be determined."], correct: 4, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
  // ── Math ───────────────────────────────────────────────────────
  { id: 610, question: "There are 4 numbers: 5, 8, 11, and X. Given that their sum is greater than 36 and their average is less than 10, which of the following could be the number X?", choices: ["9", "10", "12", "14", "16", "17"], correct: 3, category: "Math", subcategory: "Word Problems", options: 6, test: 10 },
  { id: 611, question: "If a bag contains 6 red, 4 blue, and 5 green marbles, what is the probability of picking a red marble?", choices: ["1/3", "1/4", "3/8", "2/5", "1/2"], correct: 3, category: "Math", subcategory: "Probability", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 612, question: "The teacher's approach was supposed to _____ creativity in her students; however, it inadvertently stymied their willingness to explore _____ solutions to problems.", choices: ["suppress .. conventional", "encourage .. innovative", "restrict .. unique", "stimulate .. traditional", "inhibit .. unorthodox"], correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  // ── Logic ──────────────────────────────────────────────────────
  { id: 613, question: "Adam, Bella, Carlos, and Diana are colleagues — one engineer, one architect, one teacher, one nurse. Each has a favorite cuisine: Italian, Mexican, Japanese, Indian.\n- Adam is the engineer.\n- Bella loves Italian food.\n- The teacher is a fan of Japanese cuisine.\n- Carlos is not the teacher and does not like Mexican food.\n\nWhich of the following statements could be deduced as true?\n1. Carlos is either the architect or the nurse.\n2. Diana's favorite cuisine is Mexican.\n3. The engineer (Adam)'s favorite cuisine is Mexican.", choices: ["1 only", "2 only", "3 only", "1 and 2", "1 and 3"], correct: 0, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 614, question: "Despite the _______ of evidence, the theory could not be completely proven.", choices: ["Absence", "Plethora", "Scarcity", "Ambiguity", "Certainty"], correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  { id: 615, question: "Clock : Time\n\nAs Thermometer is to:", choices: ["Heat", "Cold", "Temperature", "Weather", "Pressure"], correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 10 },
  // ── Logic ──────────────────────────────────────────────────────
  { id: 616, question: "Jasmine, Kurt, and Leo are in a book club — one historian, one biologist, one mathematician. Their favorite genres are mystery, science fiction, and romance.\n- Kurt is a historian.\n- The mathematician loves science fiction.\n- Leo is not a biologist and his favorite genre is not romance.\n\nWhich of the following statements are true?\n1. Jasmine is either the biologist or the mathematician.\n2. The biologist's favorite genre is mystery.\n3. Kurt's favorite genre is either mystery or science fiction.", choices: ["1 only", "2 only", "3 only", "1 and 3", "None of the above"], correct: 3, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
  // ── Verbal ─────────────────────────────────────────────────────
  { id: 617, question: "Choose the word most nearly OPPOSITE to:\n\nCOVERT", choices: ["Hidden", "Open", "Secretive", "Silent", "Implicit"], correct: 1, category: "Verbal", subcategory: "Antonyms", options: 5, test: 10 },
  { id: 618, question: "The politician's speech was meant to _____ unity, but instead it exposed a deep _____ within the party that surprised many of the attendees.", choices: ["undermine .. harmony", "celebrate .. solidarity", "advocate .. division", "foster .. consensus", "proclaim .. schism"], correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 10 },
  // ── Logic ──────────────────────────────────────────────────────
  { id: 619, question: "If every time it rains, the grass gets wet, and it is raining now, then:", choices: ["The grass is wet.", "The grass is dry.", "It is sunny.", "It is impossible to tell.", "The grass may or may not be wet."], correct: 0, category: "Logic", subcategory: "Deductive Reasoning", options: 5, test: 10 },
];

// Normal tab: test pools indexed 0-based (Normal Test 1 = index 0, Test 2 = index 1, ...)
const NORMAL_TESTS = [TEST_NEW_QUESTIONS, TEST2_NORMAL_QUESTIONS, TEST3_NORMAL_QUESTIONS, TEST4_NORMAL_QUESTIONS];
const NORMAL_ALL = [...TEST_NEW_QUESTIONS, ...TEST2_NORMAL_QUESTIONS, ...TEST3_NORMAL_QUESTIONS, ...TEST4_NORMAL_QUESTIONS, ...NORMAL_EXTRA_QUESTIONS];
const NORMAL_UNIQUE = [...NORMAL_ALL];
// Combined — used only for resumeSession id lookup
const ALL_QUESTIONS = [...STARTER_ALL, ...NORMAL_ALL];

const CATEGORIES = ["Math", "Verbal", "Spatial", "Logic"];
const TOTAL_TIME = 900;
const LETTERS = ["A", "B", "C", "D", "E"];

// ─── STORAGE ────────────────────────────────────────────────────
// Starter keys (existing — backward compatible)
const SESSIONS_KEY = "ccat-killer-sessions";
const FLAGS_KEY = "ccat-killer-flags";
const WRONG_KEY = "ccat-killer-wrong";
const PRACTICE_KEY = "ccat-practice-progress";
// Normal mode keys
const N_SESSIONS_KEY = "normal-sessions";
const N_FLAGS_KEY = "normal-flags";
const N_WRONG_KEY = "normal-wrong";
const N_PRACTICE_KEY = "normal-practice";

const userKey = (key) => `${getUserCode()}_${key}`;
const getStore = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(userKey(key)) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const setStore = (key, val) => localStorage.setItem(userKey(key), JSON.stringify(val));

// ─── CLOUD SYNC ─────────────────────────────────────────────────
let syncTimeout = null;
const syncToCloud = (code) => {
  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      await fetch(`/api/sync/${encodeURIComponent(code)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flaggedIds: getStore(FLAGS_KEY),
          wrongIds: getStore(WRONG_KEY),
          sessions: getStore(SESSIONS_KEY),
          practiceProgress: getStore(PRACTICE_KEY, null),
        }),
      });
    } catch (e) { /* offline — localStorage still has it */ }
  }, 500); // debounce 500ms
};

const loadFromCloud = async (code) => {
  try {
    const res = await fetch(`/api/sync/${encodeURIComponent(code)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
};

// ─── SHUFFLE ────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── LOGIN GATE ─────────────────────────────────────────────────
const AUTH_KEY = "ccat-killer-auth";
const USER_KEY = "ccat-killer-user";
const VALID_CODES = ["Testkiller123", "1234567890", "zxcvbnm", "Guest1", "asdfghjkl", "0987654321", "oliviais#1"];

// Current user code (read from localStorage)
const getUserCode = () => localStorage.getItem(USER_KEY) || "Testkiller123";

function LoginScreen({ onLogin }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (VALID_CODES.includes(code)) {
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(USER_KEY, code);
      onLogin(code);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ background: BG, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lexend', sans-serif", padding: 20, boxSizing: "border-box" }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "48px 40px", textAlign: "center", maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: TEXT, margin: "0 0 6px" }}>CCAT <span style={{ color: PRI }}>Test Killer</span></h1>
        <p style={{ color: MUTED, fontSize: 14, margin: "0 0 28px" }}>Enter your access code to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
            autoFocus
            style={{
              width: "100%", padding: "14px 16px", fontSize: 16, borderRadius: 10,
              border: `2px solid ${error ? ERROR : BORDER}`, outline: "none", fontFamily: "'Lexend', sans-serif",
              background: BG, color: TEXT, marginBottom: 16, textAlign: "center",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { if (!error) e.target.style.borderColor = PRI; }}
            onBlur={(e) => { if (!error) e.target.style.borderColor = BORDER; }}
          />
          {error && <div style={{ color: ERROR, fontSize: 13, marginBottom: 12, fontWeight: 600 }}>Wrong code. Try again.</div>}
          <button type="submit" style={{
            width: "100%", padding: "14px", fontSize: 16, fontWeight: 600,
            background: PRI, color: "#fff", border: "none", borderRadius: 10,
            cursor: "pointer", fontFamily: "'Lexend', sans-serif",
          }}>Enter</button>
        </form>
      </div>
    </div>
  );
}

// ─── SPLASH SCREEN ─────────────────────────────────────────────
function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 5000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjU5NmMxOGVpY2FhbDh5YXZxaWZoZ2t6NW0xN29lYTR1a2F4ZTM3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1iTH1WIUjM0VATSw/giphy.gif" alt="Loading..." style={{ maxWidth: 300, maxHeight: 300 }} />
    </div>
  );
}

// ─── MIGRATE OLD DATA ───────────────────────────────────────────
// One-time: move un-prefixed keys to Testkiller123-prefixed keys
(function migrateOldData() {
  if (localStorage.getItem("ccat-migrated")) return;
  const oldCode = "Testkiller123";
  [SESSIONS_KEY, FLAGS_KEY, WRONG_KEY, PRACTICE_KEY].forEach((key) => {
    const old = localStorage.getItem(key);
    if (old && !localStorage.getItem(`${oldCode}_${key}`)) {
      localStorage.setItem(`${oldCode}_${key}`, old);
      localStorage.removeItem(key);
    }
  });
  localStorage.setItem("ccat-migrated", "true");
})();

// ─── APP ────────────────────────────────────────────────────────
export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "true");
  const [showSplash, setShowSplash] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleLogin = async (code) => {
    setAuthed(true);
    setSyncing(true);
    setShowSplash(true);
    // Load cloud data on login
    const cloud = await loadFromCloud(code);
    if (cloud) {
      // Merge: cloud sessions + local sessions, deduplicated by id
      const localSessions = getStore(SESSIONS_KEY);
      const mergedSessions = [...cloud.sessions];
      localSessions.forEach((ls) => { if (!mergedSessions.find((cs) => cs.id === ls.id)) mergedSessions.push(ls); });
      mergedSessions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setStore(SESSIONS_KEY, mergedSessions);
      // Cloud flags/wrong win (most recent state)
      if (cloud.flaggedIds.length > 0 || getStore(FLAGS_KEY).length === 0) setStore(FLAGS_KEY, cloud.flaggedIds);
      if (cloud.wrongIds.length > 0 || getStore(WRONG_KEY).length === 0) setStore(WRONG_KEY, cloud.wrongIds);
      if (cloud.practiceProgress) setStore(PRACTICE_KEY, cloud.practiceProgress);
    }
    setSyncing(false);
  };

  if (!authed) return <LoginScreen onLogin={handleLogin} />;
  if (showSplash) return <SplashScreen onDone={() => setShowSplash(false)} />;

  const handleLogout = () => { localStorage.removeItem(AUTH_KEY); localStorage.removeItem(USER_KEY); setAuthed(false); };

  return <AppMain onLogout={handleLogout} />;
}

function AppMain({ onLogout }) {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem(userKey("active-tab")) || "starter");
  const [page, setPage] = useState("dashboard");
  const [mode, setMode] = useState(null);
  const [testNum, setTestNum] = useState(null);
  const [focusedCategory, setFocusedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionResult, setSessionResult] = useState(null);
  const [sessions, setSessions] = useState(() => getStore(activeTab === "normal" ? N_SESSIONS_KEY : SESSIONS_KEY));
  const [flaggedIds, setFlaggedIds] = useState(() => getStore(activeTab === "normal" ? N_FLAGS_KEY : FLAGS_KEY));
  const [wrongIds, setWrongIds] = useState(() => getStore(activeTab === "normal" ? N_WRONG_KEY : WRONG_KEY));
  const timerRef = useRef(null);

  // Tab-aware key helpers
  const sk = activeTab === "normal"
    ? { sess: N_SESSIONS_KEY, flags: N_FLAGS_KEY, wrong: N_WRONG_KEY, pract: N_PRACTICE_KEY }
    : { sess: SESSIONS_KEY, flags: FLAGS_KEY, wrong: WRONG_KEY, pract: PRACTICE_KEY };

  const switchTab = useCallback((tab) => {
    if (tab === activeTab) return;
    clearInterval(timerRef.current);
    localStorage.setItem(userKey("active-tab"), tab);
    const nk = tab === "normal"
      ? { sess: N_SESSIONS_KEY, flags: N_FLAGS_KEY, wrong: N_WRONG_KEY }
      : { sess: SESSIONS_KEY, flags: FLAGS_KEY, wrong: WRONG_KEY };
    setActiveTab(tab);
    setPage("dashboard"); setMode(null); setShowFeedback(false);
    setSessions(getStore(nk.sess));
    setFlaggedIds(getStore(nk.flags));
    setWrongIds(getStore(nk.wrong));
  }, [activeTab]);

  // Persist flags and wrong + cloud sync
  useEffect(() => { setStore(sk.flags, flaggedIds); syncToCloud(getUserCode()); }, [flaggedIds]); // eslint-disable-line
  useEffect(() => { setStore(sk.wrong, wrongIds); syncToCloud(getUserCode()); }, [wrongIds]); // eslint-disable-line

  // Timer
  useEffect(() => {
    if (mode === "test" && page === "quiz") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(timerRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [mode, page]);

  // Auto-finish when timer hits 0
  useEffect(() => {
    if (mode === "test" && page === "quiz" && timeLeft === 0) {
      finishWith(answers);
    }
    // eslint-disable-next-line
  }, [timeLeft]);

  const startTest = useCallback((num) => {
    let pool;
    if (activeTab === "normal") {
      pool = NORMAL_TESTS[num - 1] || NORMAL_TESTS[0];
    } else {
      pool = num === 1 ? TEST1_QUESTIONS : num === 2 ? TEST2_QUESTIONS : num === 3 ? TEST3_QUESTIONS : num === 4 ? TEST4_QUESTIONS : num === 5 ? TEST5_QUESTIONS : TEST6_QUESTIONS;
    }
    setMode("test"); setTestNum(activeTab === "normal" ? num + 6 : num);
    setQuestions(shuffle(pool));
    setCurrentIdx(0); setAnswers({}); setTimeLeft(TOTAL_TIME); setShowFeedback(false);
    setPage("quiz");
  }, [activeTab]);

  const practiceProgress = getStore(activeTab === "normal" ? N_PRACTICE_KEY : PRACTICE_KEY, null);

  const startPractice = useCallback((forceRestart = false) => {
    const pKey = activeTab === "normal" ? N_PRACTICE_KEY : PRACTICE_KEY;
    const pool = activeTab === "normal" ? NORMAL_UNIQUE : STARTER_UNIQUE;
    setMode("practice"); setTestNum(null); setShowFeedback(false);
    const saved = !forceRestart ? getStore(pKey, null) : null;
    if (saved) {
      const qs = saved.questionIds.map((id) => pool.find((q) => q.id === id)).filter(Boolean);
      setQuestions(qs);
      setCurrentIdx(saved.currentIdx || 0);
      setAnswers(saved.answers || {});
    } else {
      localStorage.removeItem(userKey(pKey));
      setQuestions(shuffle(pool));
      setCurrentIdx(0); setAnswers({});
    }
    setPage("quiz");
  }, [activeTab]);

  const pickFocused = useCallback((cat) => {
    setFocusedCategory(cat);
    setPage("focused-picker");
  }, []);

  const startFocused = useCallback((cat, sub = null) => {
    setMode("focused"); setFocusedCategory(cat); setTestNum(null);
    const uPool = activeTab === "normal" ? NORMAL_UNIQUE : STARTER_UNIQUE;
    const pool = uPool.filter((q) => q.category === cat && (sub === null || q.subcategory === sub));
    setQuestions(shuffle(pool));
    setCurrentIdx(0); setAnswers({}); setShowFeedback(false);
    setPage("quiz");
  }, [activeTab]);

  const startTestKiller = useCallback(() => {
    const tabPool = activeTab === "normal" ? NORMAL_ALL : STARTER_ALL;
    const killQs = tabPool.filter((q) => flaggedIds.includes(q.id));
    if (killQs.length === 0) return;
    setMode("killer"); setTestNum(null);
    setQuestions(shuffle(killQs));
    setCurrentIdx(0); setAnswers({}); setShowFeedback(false);
    setPage("quiz");
  }, [flaggedIds, activeTab]);

  const toggleFlag = useCallback((qId) => {
    setFlaggedIds((prev) => {
      const wasFlag = prev.includes(qId);
      const next = wasFlag ? prev.filter((x) => x !== qId) : [...prev, qId];
      // If unflagging during killer mode, remove from active quiz
      if (wasFlag && mode === "killer") {
        setQuestions((qs) => {
          const filtered = qs.filter((q) => q.id !== qId);
          if (filtered.length === 0) { setPage("dashboard"); setMode(null); }
          else { setCurrentIdx((idx) => Math.min(idx, filtered.length - 1)); }
          return filtered;
        });
      }
      return next;
    });
  }, [mode]);

  const handleAnswer = useCallback((answerIdx) => {
    if (showFeedback) return;
    const q = questions[currentIdx];
    const newAnswers = { ...answers, [q.id]: answerIdx };
    setAnswers(newAnswers);

    // Track wrong answers — auto-flag wrong questions for Test Killer
    if (answerIdx !== q.correct) {
      setWrongIds((prev) => prev.includes(q.id) ? prev : [...prev, q.id]);
      setFlaggedIds((prev) => prev.includes(q.id) ? prev : [...prev, q.id]);
    } else {
      // If they got it right, remove from wrong list
      setWrongIds((prev) => prev.filter((x) => x !== q.id));
    }

    // Save practice progress
    if (mode === "practice") {
      setStore(activeTab === "normal" ? N_PRACTICE_KEY : PRACTICE_KEY, { questionIds: questions.map((q) => q.id), currentIdx, answers: newAnswers });
      syncToCloud(getUserCode());
    }

    if (mode === "test") {
      if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
      else finishWith(newAnswers);
    } else {
      setShowFeedback(true);
    }
    // eslint-disable-next-line
  }, [showFeedback, questions, currentIdx, answers, mode]);

  const nextQuestion = useCallback(() => {
    setShowFeedback(false);
    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      if (mode === "practice") {
        setStore(activeTab === "normal" ? N_PRACTICE_KEY : PRACTICE_KEY, { questionIds: questions.map((q) => q.id), currentIdx: nextIdx, answers });
        syncToCloud(getUserCode());
      }
    } else finishWith(answers);
    // eslint-disable-next-line
  }, [currentIdx, questions, answers]);

  const finishWith = (finalAnswers) => {
    clearInterval(timerRef.current);
    const pKey = activeTab === "normal" ? N_PRACTICE_KEY : PRACTICE_KEY;
    const sKey = activeTab === "normal" ? N_SESSIONS_KEY : SESSIONS_KEY;
    if (mode === "practice") localStorage.removeItem(userKey(pKey));
    const result = buildResult(finalAnswers, questions, mode, focusedCategory, testNum, timeLeft);
    const newSessions = [result, ...getStore(sKey)];
    setStore(sKey, newSessions);
    setSessions(newSessions);
    setSessionResult(result);
    setPage("results");
    syncToCloud(getUserCode());
  };

  const handleClearData = () => {
    localStorage.removeItem(userKey(sk.sess));
    localStorage.removeItem(userKey(sk.flags));
    localStorage.removeItem(userKey(sk.wrong));
    localStorage.removeItem(userKey(sk.pract));
    setSessions([]); setFlaggedIds([]); setWrongIds([]); setSessionResult(null);
    syncToCloud(getUserCode());
  };

  const goHome = () => {
    clearInterval(timerRef.current);
    setPage("dashboard"); setMode(null); setShowFeedback(false);
  };

  const clearAllFlags = useCallback(() => {
    setFlaggedIds([]);
    setWrongIds([]);
    setStore(activeTab === "normal" ? N_FLAGS_KEY : FLAGS_KEY, []);
    setStore(activeTab === "normal" ? N_WRONG_KEY : WRONG_KEY, []);
    syncToCloud(getUserCode());
    setPage("dashboard"); setMode(null); setShowFeedback(false);
  }, [activeTab]);

  const resumeSession = useCallback((session) => {
    const tabPool = activeTab === "normal" ? NORMAL_ALL : STARTER_ALL;
    const qs = session.questionIds.map((id) => tabPool.find((q) => q.id === id)).filter(Boolean);
    if (qs.length === 0) return;
    setMode("practice"); setTestNum(null); setShowFeedback(false);
    setQuestions(qs);
    setAnswers(session.answers || {});
    const firstUnanswered = qs.findIndex((q) => session.answers[q.id] === undefined);
    setCurrentIdx(firstUnanswered >= 0 ? firstUnanswered : 0);
    setPage("quiz");
  }, [activeTab]);

  const killerCount = flaggedIds.length;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: "'Lexend', sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        img { max-width: 100%; height: auto; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      {/* Logout Button */}
      <button onClick={onLogout} style={{
        position: "fixed", top: 16, right: 16, background: CARD, border: `1px solid ${BORDER}`,
        borderRadius: 8, padding: "6px 14px", color: MUTED, cursor: "pointer", fontSize: 12,
        fontFamily: "'Lexend', sans-serif", zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}>Log out</button>

      {page === "dashboard" && <Dashboard sessions={sessions} onStartTest={startTest} onStartPractice={startPractice} onPickFocused={pickFocused} onStartFocused={startFocused} onStartKiller={startTestKiller} onClearData={handleClearData} onViewHistory={() => setPage("history")} onViewCharts={() => setPage("charts")} killerCount={killerCount} practiceProgress={practiceProgress} activeTab={activeTab} onSwitchTab={switchTab} uniqueQuestions={activeTab === "normal" ? NORMAL_UNIQUE : STARTER_UNIQUE} />}
      {page === "focused-picker" && <SubcategoryPickerView category={focusedCategory} onStartFocused={startFocused} onHome={goHome} sessions={sessions} uniqueQuestions={activeTab === "normal" ? NORMAL_UNIQUE : STARTER_UNIQUE} />}
      {page === "quiz" && <QuizView mode={mode} questions={questions} currentIdx={currentIdx} answers={answers} timeLeft={timeLeft} showFeedback={showFeedback} onAnswer={handleAnswer} onNext={nextQuestion} onFinish={() => finishWith(answers)} onHome={goHome} focusedCategory={focusedCategory} flaggedIds={flaggedIds} onToggleFlag={toggleFlag} testNum={testNum} onClearFlags={clearAllFlags} />}
      {page === "results" && <ResultsView result={sessionResult} onHome={goHome} onStartFocused={startFocused} />}
      {page === "history" && <HistoryView sessions={sessions} onHome={goHome} onResumeSession={resumeSession} allQuestions={ALL_QUESTIONS} />}
      {page === "charts" && <ChartsView sessions={sessions} onHome={goHome} />}
    </div>
  );
}

// ─── BUILD RESULT ───────────────────────────────────────────────
function buildResult(answers, questions, mode, focusedCategory, testNum, timeLeft) {
  const catStats = {};
  const subStats = {};
  let totalCorrect = 0;
  questions.forEach((q) => {
    const cat = q.category, sub = q.subcategory;
    if (!catStats[cat]) catStats[cat] = { total: 0, correct: 0 };
    if (!subStats[sub]) subStats[sub] = { total: 0, correct: 0, category: cat };
    catStats[cat].total++; subStats[sub].total++;
    if (answers[q.id] === q.correct) { totalCorrect++; catStats[cat].correct++; subStats[sub].correct++; }
  });
  const strengths = [], weaknesses = [];
  Object.entries(subStats).forEach(([name, s]) => {
    const pct = Math.round((s.correct / s.total) * 100);
    const entry = { name, ...s, pct };
    if (pct >= 70) strengths.push(entry); else weaknesses.push(entry);
  });
  strengths.sort((a, b) => b.pct - a.pct);
  weaknesses.sort((a, b) => a.pct - b.pct);
  return {
    id: Date.now(), date: new Date().toISOString(), mode, testNum, focusedCategory,
    totalQuestions: questions.length, totalCorrect,
    accuracy: Math.round((totalCorrect / questions.length) * 100),
    timeUsed: mode === "test" ? TOTAL_TIME - timeLeft : null,
    catStats, subStats, strengths, weaknesses,
    answers: { ...answers }, questionIds: questions.map((q) => q.id),
  };
}

// ─── DASHBOARD ──────────────────────────────────────────────────
function Dashboard({ sessions, onStartTest, onStartPractice, onPickFocused, onStartFocused, onStartKiller, onClearData, onViewHistory, onViewCharts, killerCount, practiceProgress, activeTab, onSwitchTab, uniqueQuestions }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const lastTest = sessions.find((s) => s.mode === "test");
  const weakCats = lastTest ? Object.entries(lastTest.catStats).filter(([, s]) => s.correct / s.total < 0.7).map(([c]) => c) : [];
  const totalTests = sessions.filter((s) => s.mode === "test").length;
  const avgAccuracy = totalTests > 0 ? Math.round(sessions.filter((s) => s.mode === "test").reduce((a, s) => a + s.accuracy, 0) / totalTests) : null;
  const isNormal = activeTab === "normal";

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>

      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: 6, marginBottom: 32, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 5 }}>
        {[["starter", "Starter"], ["normal", "12 Min Prep"]].map(([tab, label]) => (
          <button key={tab} onClick={() => onSwitchTab(tab)} style={{
            flex: 1, background: activeTab === tab ? PRI : "transparent",
            border: "none", borderRadius: 10, padding: "10px 16px",
            color: activeTab === tab ? "#fff" : MUTED, cursor: "pointer",
            fontSize: 14, fontWeight: 600, transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>CCAT <span style={{ color: PRI }}>Test Killer</span></h1>
        <p style={{ color: MUTED, margin: "8px 0 0", fontSize: 14 }}>{isNormal ? "100" : "300"} questions.</p>
        {avgAccuracy !== null && (
          <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "8px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <span style={{ color: MUTED, fontSize: 13 }}>Avg Score</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: avgAccuracy >= 70 ? SUCCESS : avgAccuracy >= 50 ? WARNING : ERROR }}>{avgAccuracy}%</span>
            <span style={{ color: MUTED, fontSize: 13 }}>across {totalTests} test{totalTests !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>

        {isNormal ? (
          /* Normal Mode: grid of available tests */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {NORMAL_TESTS.map((_, idx) => (
              <button key={idx} onClick={() => onStartTest(idx + 1)} style={{
                background: `linear-gradient(135deg, ${PRI}18, ${PRI}06)`, border: `2px solid ${PRI}44`,
                borderRadius: 16, padding: "20px 16px", cursor: "pointer", color: TEXT,
                textAlign: "center", transition: "transform 0.15s, box-shadow 0.15s",
              }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${PRI}20`; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 22 }}>⏱️</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>Test {idx + 1}</div>
                <div style={{ color: MUTED, fontSize: 10, marginTop: 1, fontStyle: "italic" }}>* {["12 min prep", "12 min prep", "AI", "Udemy"][idx] || ""} *</div>
                <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>50 q · 15 min</div>
              </button>
            ))}
          </div>
        ) : (
          /* Starter: 6-test grid */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} onClick={() => onStartTest(n)} style={{
                background: `linear-gradient(135deg, ${PRI}18, ${PRI}06)`, border: `2px solid ${PRI}44`,
                borderRadius: 16, padding: "20px 16px", cursor: "pointer", color: TEXT,
                textAlign: "center", transition: "transform 0.15s, box-shadow 0.15s",
              }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${PRI}20`; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 22 }}>⏱️</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>Test {n}</div>
                <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>50 q · 15 min</div>
              </button>
            ))}
          </div>
        )}

        {isNormal ? (
          /* Normal Mode: Focused Study left | Practice + Test Killer stacked right */
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>

            {/* Focused Study */}
            <div style={{ background: `linear-gradient(135deg, ${WARNING}15, ${WARNING}05)`, border: `1px solid ${WARNING}33`, borderRadius: 16, padding: "24px", textAlign: "center" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>🎯</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Focused Study</div>
                <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>Drill a specific category</div>
              </div>
              <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {CATEGORIES.map((cat) => {
                  const count = uniqueQuestions.filter((q) => q.category === cat).length;
                  if (count === 0) return null;
                  const isWeak = weakCats.includes(cat);
                  return (
                    <button key={cat} onClick={() => onPickFocused(cat)} style={{
                      background: `${CAT_COLORS[cat]}10`, border: `1px solid ${CAT_COLORS[cat]}${isWeak ? "88" : "33"}`,
                      borderRadius: 10, padding: "14px 16px", cursor: "pointer", color: TEXT, textAlign: "center",
                      transition: "transform 0.15s",
                    }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                       onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        <span style={{ color: CAT_COLORS[cat] }}>{cat}</span>
                        {isWeak && <span style={{ marginLeft: 6, fontSize: 11, color: ERROR, fontWeight: 700 }}>WEAK</span>}
                      </div>
                      <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{count} questions</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right column: Practice on top, Test Killer below */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Practice Mode */}
              <div style={{
                background: `linear-gradient(135deg, ${SUCCESS}15, ${SUCCESS}05)`, border: `1px solid ${SUCCESS}33`,
                borderRadius: 16, padding: "24px", textAlign: "center", color: TEXT,
                transition: "transform 0.15s, box-shadow 0.15s", flex: 1,
              }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${SUCCESS}15`; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>📚</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Practice Mode</div>
                <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>All unique questions &bull; No timer</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                  {practiceProgress ? (
                    <>
                      <button onClick={() => onStartPractice(false)} style={{
                        background: SUCCESS, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff",
                        cursor: "pointer", fontSize: 13, fontWeight: 600,
                      }}>Resume (Q{(practiceProgress.currentIdx || 0) + 1}/{practiceProgress.questionIds?.length || 0})</button>
                      <button onClick={() => onStartPractice(true)} style={{
                        background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 16px",
                        color: MUTED, cursor: "pointer", fontSize: 13, fontWeight: 600,
                      }}>Restart</button>
                    </>
                  ) : (
                    <button onClick={() => onStartPractice(false)} style={{
                      background: SUCCESS, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff",
                      cursor: "pointer", fontSize: 13, fontWeight: 600,
                    }}>Start</button>
                  )}
                </div>
              </div>

              {/* Test Killer */}
              <button onClick={onStartKiller} disabled={killerCount === 0} style={{
                background: killerCount > 0 ? `linear-gradient(135deg, ${FLAGRED}15, ${FLAGRED}05)` : CARD,
                border: `1px solid ${killerCount > 0 ? FLAGRED + "33" : BORDER}`,
                borderRadius: 16, padding: "20px", cursor: killerCount > 0 ? "pointer" : "default",
                textAlign: "center", color: TEXT, transition: "transform 0.15s, box-shadow 0.15s",
                opacity: killerCount > 0 ? 1 : 0.5,
              }} onMouseOver={(e) => { if (killerCount > 0) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${FLAGRED}15`; } }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>🚩</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Test Killer <span style={{ fontSize: 13, fontWeight: 600, color: FLAGRED }}>{killerCount > 0 ? `(${killerCount})` : ""}</span></div>
                <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{killerCount > 0 ? "Flagged questions — destroy your weak spots" : "No flagged questions yet"}</div>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Starter: Test Killer full width */}
            <button onClick={onStartKiller} disabled={killerCount === 0} style={{
              background: killerCount > 0 ? `linear-gradient(135deg, ${FLAGRED}15, ${FLAGRED}05)` : CARD,
              border: `1px solid ${killerCount > 0 ? FLAGRED + "33" : BORDER}`,
              borderRadius: 16, padding: "20px", cursor: killerCount > 0 ? "pointer" : "default",
              textAlign: "center", color: TEXT, transition: "transform 0.15s, box-shadow 0.15s",
              opacity: killerCount > 0 ? 1 : 0.5,
            }} onMouseOver={(e) => { if (killerCount > 0) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${FLAGRED}15`; } }}
               onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>🚩</div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Test Killer <span style={{ fontSize: 13, fontWeight: 600, color: FLAGRED }}>{killerCount > 0 ? `(${killerCount})` : ""}</span></div>
              <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{killerCount > 0 ? "Flagged questions — destroy your weak spots" : "No flagged questions yet"}</div>
            </button>

            {/* Starter: Focused Study + Practice side by side */}
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              {/* Focused Study */}
              <div style={{ background: `linear-gradient(135deg, ${WARNING}15, ${WARNING}05)`, border: `1px solid ${WARNING}33`, borderRadius: 16, padding: "24px", textAlign: "center" }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>🎯</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>Focused Study</div>
                  <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>Drill a specific category</div>
                </div>
                <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {CATEGORIES.map((cat) => {
                    const count = uniqueQuestions.filter((q) => q.category === cat).length;
                    if (count === 0) return null;
                    const isWeak = weakCats.includes(cat);
                    return (
                      <button key={cat} onClick={() => onPickFocused(cat)} style={{
                        background: `${CAT_COLORS[cat]}10`, border: `1px solid ${CAT_COLORS[cat]}${isWeak ? "88" : "33"}`,
                        borderRadius: 10, padding: "14px 16px", cursor: "pointer", color: TEXT, textAlign: "center",
                        transition: "transform 0.15s",
                      }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                         onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>
                          <span style={{ color: CAT_COLORS[cat] }}>{cat}</span>
                          {isWeak && <span style={{ marginLeft: 6, fontSize: 11, color: ERROR, fontWeight: 700 }}>WEAK</span>}
                        </div>
                        <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{count} questions</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Practice Mode */}
              <div style={{
                background: `linear-gradient(135deg, ${SUCCESS}15, ${SUCCESS}05)`, border: `1px solid ${SUCCESS}33`,
                borderRadius: 16, padding: "24px", textAlign: "center", color: TEXT,
                transition: "transform 0.15s, box-shadow 0.15s",
              }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${SUCCESS}15`; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>📚</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Practice Mode</div>
                <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>All unique questions &bull; No timer</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                  {practiceProgress ? (
                    <>
                      <button onClick={() => onStartPractice(false)} style={{
                        background: SUCCESS, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff",
                        cursor: "pointer", fontSize: 13, fontWeight: 600,
                      }}>Resume (Q{(practiceProgress.currentIdx || 0) + 1}/{practiceProgress.questionIds?.length || 0})</button>
                      <button onClick={() => onStartPractice(true)} style={{
                        background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 16px",
                        color: MUTED, cursor: "pointer", fontSize: 13, fontWeight: 600,
                      }}>Restart</button>
                    </>
                  ) : (
                    <button onClick={() => onStartPractice(false)} style={{
                      background: SUCCESS, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff",
                      cursor: "pointer", fontSize: 13, fontWeight: 600,
                    }}>Start</button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onViewCharts} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 20px", color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>📈 Charts</button>
        <button onClick={onViewHistory} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 20px", color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>📊 History {sessions.filter((s) => s.mode !== "killer").length > 0 ? `(${sessions.filter((s) => s.mode !== "killer").length})` : ""}</button>
        {sessions.length > 0 && !showConfirm && <button onClick={() => setShowConfirm(true)} style={{ background: "transparent", border: `1px solid ${ERROR}44`, borderRadius: 10, padding: "10px 20px", color: ERROR, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>🗑️ Clear All Data</button>}
        {showConfirm && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: ERROR, fontSize: 13 }}>Are you sure?</span>
            <button onClick={() => { onClearData(); setShowConfirm(false); }} style={{ background: ERROR, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Yes, Clear</button>
            <button onClick={() => setShowConfirm(false)} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 16px", color: TEXT, cursor: "pointer", fontSize: 13 }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SUBCATEGORY PICKER ─────────────────────────────────────────
function SubcategoryPickerView({ category, onStartFocused, onHome, sessions = [], uniqueQuestions }) {
  const color = CAT_COLORS[category];
  const allForCat = uniqueQuestions.filter((q) => q.category === category);
  const totalCount = allForCat.length;
  const subs = [...new Set(allForCat.map((q) => q.subcategory))].sort();

  // Aggregate subcategory accuracy across all sessions
  const subAgg = {};
  sessions.forEach((s) => {
    if (!s.subStats) return;
    Object.entries(s.subStats).forEach(([sub, st]) => {
      if (st.category !== category) return;
      if (!subAgg[sub]) subAgg[sub] = { correct: 0, total: 0 };
      subAgg[sub].correct += st.correct;
      subAgg[sub].total += st.total;
    });
  });
  const getSubPct = (sub) => {
    const a = subAgg[sub];
    if (!a || a.total === 0) return null;
    return Math.round((a.correct / a.total) * 100);
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color }}>{category}</h2>
          <div style={{ color: MUTED, fontSize: 13 }}>Pick a topic to drill</div>
        </div>
        <button onClick={onHome} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", color: MUTED, cursor: "pointer", fontSize: 13 }}>← Back</button>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {/* All option */}
        <button onClick={() => onStartFocused(category, null)} style={{
          background: `${color}12`, border: `2px solid ${color}55`, borderRadius: 14, padding: "18px 20px",
          cursor: "pointer", textAlign: "left", color: TEXT, display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "transform 0.15s, box-shadow 0.15s",
        }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 4px 16px ${color}20`; }}
           onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color }}>All {category}</div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>Mix of everything</div>
          </div>
          <span style={{ fontWeight: 700, color, fontSize: 14 }}>{totalCount} questions</span>
        </button>

        {subs.map((sub) => {
          const count = allForCat.filter((q) => q.subcategory === sub).length;
          const pct = getSubPct(sub);
          const isWeak = pct !== null && pct < 70;
          const borderColor = isWeak ? `${ERROR}55` : BORDER;
          const bgColor = isWeak ? `${ERROR}06` : CARD;
          return (
            <button key={sub} onClick={() => onStartFocused(category, sub)} style={{
              background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 14, padding: "16px 20px",
              cursor: "pointer", textAlign: "left", color: TEXT, display: "flex", justifyContent: "space-between", alignItems: "center",
              transition: "transform 0.15s, box-shadow 0.15s",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
               onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{sub}</span>
                {isWeak && <span style={{ fontSize: 10, fontWeight: 700, color: ERROR, background: `${ERROR}15`, borderRadius: 4, padding: "2px 6px" }}>WEAK</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {pct !== null && <span style={{ fontWeight: 700, fontSize: 13, color: pct >= 70 ? SUCCESS : pct >= 50 ? WARNING : ERROR }}>{pct}%</span>}
                <span style={{ color: MUTED, fontSize: 12 }}>{count} q's</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── QUIZ VIEW ──────────────────────────────────────────────────
function QuizView({ mode, questions, currentIdx, answers, timeLeft, showFeedback, onAnswer, onNext, onFinish, onHome, focusedCategory, flaggedIds, onToggleFlag, testNum, onClearFlags }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const q = questions[currentIdx];
  const userAnswer = answers[q.id];
  const isCorrect = userAnswer === q.correct;
  const progress = ((currentIdx + (showFeedback ? 1 : 0)) / questions.length) * 100;
  const isFlagged = flaggedIds.includes(q.id);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const timeColor = timeLeft <= 60 ? ERROR : timeLeft <= 180 ? WARNING : TEXT;

  const modeLabel = mode === "test" ? (testNum >= 7 ? `Test ${testNum - 6}` : `Test ${testNum}`) : mode === "practice" ? "Practice" : mode === "killer" ? "Test Killer" : `Focused: ${focusedCategory}`;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px", animation: "fadeIn 0.2s ease" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onHome} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", color: MUTED, cursor: "pointer", fontSize: 13 }}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: MUTED, fontSize: 13 }}>{modeLabel}</span>
          {mode === "test" && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: timeColor }}>{formatTime(timeLeft)}</div>}
        </div>
        {mode === "test" ? (
          <button onClick={onFinish} style={{ background: PRI, border: "none", borderRadius: 8, padding: "6px 14px", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Finish Early</button>
        ) : mode === "killer" ? (
          showClearConfirm ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: ERROR }}>Clear all?</span>
              <button onClick={onClearFlags} style={{ background: ERROR, border: "none", borderRadius: 6, padding: "4px 10px", color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>Yes</button>
              <button onClick={() => setShowClearConfirm(false)} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", color: MUTED, cursor: "pointer", fontSize: 11 }}>No</button>
            </div>
          ) : (
            <button onClick={() => setShowClearConfirm(true)} style={{ background: "transparent", border: `1px solid ${FLAGRED}55`, borderRadius: 8, padding: "6px 12px", color: FLAGRED, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🗑️ Clear All</button>
          )
        ) : <div style={{ width: 80 }} />}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: MUTED }}>Question {currentIdx + 1} of {questions.length}</span>
          <span style={{ fontSize: 13, color: CAT_COLORS[q.category] }}>{q.category} &bull; {q.subcategory}</span>
        </div>
        <div style={{ height: 4, background: BORDER, borderRadius: 2 }}>
          <div style={{ height: 4, background: PRI, borderRadius: 2, width: `${progress}%`, transition: "width 0.3s ease" }} />
        </div>
      </div>

      {/* Question Content + Flag */}
      <div style={{ position: "relative", background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", justifyContent: "center", alignItems: q.image ? "center" : "flex-start", minHeight: q.image ? 200 : "auto" }}>
        <button onClick={() => onToggleFlag(q.id)} style={{
          position: "absolute", top: 10, right: 10, background: "transparent",
          border: "none", borderRadius: 8, width: 36, height: 36,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, transition: "all 0.15s", color: isFlagged ? FLAGRED : "#CBD5E1", opacity: isFlagged ? 1 : 0.5,
        }} title={isFlagged ? "Unflag question" : "Flag for review"}>🚩</button>
        {q.image ? (
          <img src={`${process.env.PUBLIC_URL}/${q.image}`} alt={`Question ${q.id}`} style={{ maxWidth: "100%", maxHeight: 500 }} />
        ) : (
          <div style={{ width: "100%", paddingRight: 32 }}>
            {q.question.split("\n").map((line, i) => (
              line === ""
                ? <div key={i} style={{ height: 8 }} />
                : <p key={i} style={{ margin: "0 0 2px", fontSize: 14, lineHeight: 1.65, fontFamily: line.includes("···") ? "'JetBrains Mono', monospace" : "inherit", color: TEXT }}>{line}</p>
            ))}
          </div>
        )}
      </div>

      {/* Answer Buttons — wide text buttons for text questions, compact letters for image questions */}
      {q.choices ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {q.choices.map((choice, i) => {
            let bg = CARD, borderCol = BORDER, textColor = TEXT;
            if (showFeedback) {
              if (i === q.correct) { bg = `${SUCCESS}18`; borderCol = SUCCESS; textColor = SUCCESS; }
              else if (i === userAnswer && !isCorrect) { bg = `${ERROR}18`; borderCol = ERROR; textColor = ERROR; }
            } else if (mode === "test" && userAnswer === i) { bg = `${PRI}15`; borderCol = PRI; }
            return (
              <button key={i} onClick={() => onAnswer(i)} disabled={showFeedback} style={{
                background: bg, border: `2px solid ${borderCol}`, borderRadius: 10, padding: "11px 16px",
                cursor: showFeedback ? "default" : "pointer", color: textColor, fontSize: 14,
                fontFamily: "'Lexend', sans-serif", textAlign: "left", transition: "all 0.15s",
                opacity: showFeedback && i !== q.correct && i !== userAnswer ? 0.4 : 1,
                display: "flex", alignItems: "center", gap: 10,
              }} onMouseOver={(e) => { if (!showFeedback) { e.currentTarget.style.borderColor = PRI; e.currentTarget.style.background = `${PRI}10`; } }}
                 onMouseOut={(e) => { if (!showFeedback) { e.currentTarget.style.borderColor = mode === "test" && userAnswer === i ? PRI : BORDER; e.currentTarget.style.background = mode === "test" && userAnswer === i ? `${PRI}15` : CARD; } }}>
                <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", minWidth: 18, color: showFeedback ? textColor : MUTED }}>{LETTERS[i]}</span>
                <span>{choice}{showFeedback && i === q.correct && " ✓"}{showFeedback && i === userAnswer && !isCorrect && i !== q.correct && " ✗"}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center" }}>
          {Array.from({ length: q.options }, (_, i) => {
            const letter = LETTERS[i];
            let bg = CARD, borderCol = BORDER, textColor = TEXT;
            if (showFeedback) {
              if (i === q.correct) { bg = `${SUCCESS}18`; borderCol = SUCCESS; textColor = SUCCESS; }
              else if (i === userAnswer && !isCorrect) { bg = `${ERROR}18`; borderCol = ERROR; textColor = ERROR; }
            } else if (mode === "test" && userAnswer === i) { bg = `${PRI}15`; borderCol = PRI; }
            return (
              <button key={i} onClick={() => onAnswer(i)} disabled={showFeedback} style={{
                background: bg, border: `2px solid ${borderCol}`, borderRadius: 10, padding: "10px 0",
                width: 52, minWidth: 52, cursor: showFeedback ? "default" : "pointer", color: textColor,
                fontSize: 15, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center",
                opacity: showFeedback && i !== q.correct && i !== userAnswer ? 0.4 : 1,
              }} onMouseOver={(e) => { if (!showFeedback) { e.currentTarget.style.borderColor = PRI; e.currentTarget.style.background = `${PRI}10`; } }}
                 onMouseOut={(e) => { if (!showFeedback) { e.currentTarget.style.borderColor = mode === "test" && userAnswer === i ? PRI : BORDER; e.currentTarget.style.background = mode === "test" && userAnswer === i ? `${PRI}15` : CARD; } }}>
                {letter}{showFeedback && i === q.correct && "✓"}{showFeedback && i === userAnswer && !isCorrect && i !== q.correct && "✗"}
              </button>
            );
          })}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          <div style={{ background: isCorrect ? `${SUCCESS}10` : `${ERROR}10`, border: `1px solid ${isCorrect ? SUCCESS : ERROR}33`, borderRadius: 12, padding: "16px 20px", marginBottom: 16, textAlign: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: isCorrect ? SUCCESS : ERROR }}>
              {isCorrect ? "✓ Correct!" : `✗ Wrong — Answer is ${LETTERS[q.correct]}`}
            </span>
          </div>
          <button onClick={onNext} style={{ width: "100%", background: PRI, border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", color: "#fff", fontSize: 16, fontWeight: 600 }}>
            {currentIdx < questions.length - 1 ? "Next Question →" : "See Results →"}
          </button>
        </div>
      )}

      {/* Nav dots */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 20 }}>
        {questions.map((qn, i) => (
          <div key={qn.id} style={{ width: 10, height: 10, borderRadius: "50%", background: i === currentIdx ? PRI : answers[qn.id] !== undefined ? `${PRI}66` : BORDER, transition: "background 0.2s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── RESULTS VIEW ───────────────────────────────────────────────
function ResultsView({ result, onHome, onStartFocused }) {
  if (!result) return null;
  const { accuracy, totalCorrect, totalQuestions, catStats, strengths, weaknesses, mode, timeUsed, testNum } = result;
  const scoreColor = accuracy >= 80 ? SUCCESS : accuracy >= 60 ? WARNING : ERROR;
  const readiness = accuracy >= 80 ? "Exceptional" : accuracy >= 65 ? "Strong" : accuracy >= 50 ? "Average" : accuracy >= 30 ? "Improving" : "Developing";
  const modeLabel = mode === "test" ? (testNum >= 7 ? `Test ${testNum - 6}` : `Test ${testNum}`) : mode === "practice" ? "Practice" : mode === "killer" ? "Test Killer" : "Focused Study";

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>{modeLabel} Complete</h2>
        <div style={{ width: 140, height: 140, borderRadius: "50%", margin: "20px auto", border: `6px solid ${scoreColor}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 42, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{accuracy}%</span>
          <span style={{ fontSize: 12, color: MUTED }}>{readiness}</span>
        </div>
        <div style={{ color: MUTED, fontSize: 14 }}>
          {totalCorrect} / {totalQuestions} correct{timeUsed != null && ` • ${Math.floor(timeUsed / 60)}m ${timeUsed % 60}s`}
        </div>
        {mode === "test" && <div style={{ marginTop: 8, color: MUTED, fontSize: 13 }}>Estimated CCAT Score: <span style={{ color: TEXT, fontWeight: 700 }}>{Math.round(accuracy / 100 * 50)}/50</span></div>}
      </div>

      <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>📊 Category Breakdown</h3>
        <div style={{ display: "grid", gap: 16 }}>
          {Object.entries(catStats).map(([cat, stats]) => {
            const pct = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={cat}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: CAT_COLORS[cat] }}>{cat}</span>
                  <span style={{ fontWeight: 700, color: pct >= 70 ? SUCCESS : pct >= 50 ? WARNING : ERROR }}>{pct}% <span style={{ fontWeight: 400, color: MUTED, fontSize: 12 }}>({stats.correct}/{stats.total})</span></span>
                </div>
                <div style={{ height: 8, background: `${CAT_COLORS[cat]}15`, borderRadius: 4 }}><div style={{ height: 8, background: CAT_COLORS[cat], borderRadius: 4, width: `${pct}%`, transition: "width 0.5s ease" }} /></div>
              </div>
            );
          })}
        </div>
      </div>

      {strengths.length > 0 && (
        <div style={{ background: `${SUCCESS}06`, borderRadius: 16, border: `1px solid ${SUCCESS}22`, padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", color: SUCCESS }}>💪 Strengths</h3>
          {strengths.map((s) => <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span style={{ fontSize: 14 }}>{s.name} <span style={{ color: MUTED, fontSize: 12 }}>({s.category})</span></span><span style={{ fontWeight: 700, color: SUCCESS, fontSize: 14 }}>{s.pct}%</span></div>)}
        </div>
      )}

      {weaknesses.length > 0 && (
        <div style={{ background: `${ERROR}06`, borderRadius: 16, border: `1px solid ${ERROR}22`, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", color: ERROR }}>🔧 Needs Work</h3>
          {weaknesses.map((w) => (
            <div key={w.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
              <span style={{ fontSize: 14 }}>{w.name} <span style={{ color: MUTED, fontSize: 12 }}>({w.category})</span></span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, color: ERROR, fontSize: 14 }}>{w.pct}%</span>
                <button onClick={() => onStartFocused(w.category)} style={{ background: `${WARNING}15`, border: `1px solid ${WARNING}33`, borderRadius: 6, padding: "4px 10px", color: WARNING, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>Practice</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={onHome} style={{ background: PRI, border: "none", borderRadius: 12, padding: "14px 32px", cursor: "pointer", color: "#fff", fontSize: 15, fontWeight: 600 }}>Back to Dashboard</button>
      </div>
    </div>
  );
}

// ─── HISTORY VIEW ───────────────────────────────────────────────
function HistoryView({ sessions, onHome, onResumeSession, allQuestions }) {
  const [expandedId, setExpandedId] = useState(null);
  // Exclude Test Killer sessions from history display and stats
  const timedSessions = sessions.filter((s) => s.mode === "test");
  const displaySessions = sessions.filter((s) => s.mode !== "killer");

  // Progression stats — timed tests only
  const totalSessions = timedSessions.length;
  const avgAccuracy = totalSessions > 0 ? Math.round(timedSessions.reduce((s, x) => s + x.accuracy, 0) / totalSessions) : 0;
  const totalQuestions = timedSessions.reduce((s, x) => s + x.totalQuestions, 0);
  const totalCorrect = timedSessions.reduce((s, x) => s + x.totalCorrect, 0);
  const best = totalSessions > 0 ? Math.max(...timedSessions.map((s) => s.accuracy)) : 0;

  // Last 5 vs prior 5 trend — timed tests only
  const recent5 = timedSessions.slice(0, 5);
  const prior5 = timedSessions.slice(5, 10);
  const recent5Avg = recent5.length > 0 ? Math.round(recent5.reduce((s, x) => s + x.accuracy, 0) / recent5.length) : 0;
  const prior5Avg = prior5.length > 0 ? Math.round(prior5.reduce((s, x) => s + x.accuracy, 0) / prior5.length) : null;
  const trend = prior5Avg !== null ? recent5Avg - prior5Avg : null;

  // Category averages — timed tests only
  const catTotals = {};
  timedSessions.forEach((s) => {
    Object.entries(s.catStats).forEach(([cat, st]) => {
      if (!catTotals[cat]) catTotals[cat] = { correct: 0, total: 0 };
      catTotals[cat].correct += st.correct;
      catTotals[cat].total += st.total;
    });
  });

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>📊 Session History</h2>
        <button onClick={onHome} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", color: MUTED, cursor: "pointer", fontSize: 13 }}>← Back</button>
      </div>

      {/* Progression Stats */}
      {totalSessions > 0 && (
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Overall Progression</div>

          {/* Top stats row */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: PRI }}>{totalSessions}</div>
              <div style={{ fontSize: 11, color: MUTED }}>Sessions</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: avgAccuracy >= 75 ? SUCCESS : avgAccuracy >= 50 ? WARNING : ERROR }}>{avgAccuracy}%</div>
              <div style={{ fontSize: 11, color: MUTED }}>Avg Score</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: SUCCESS }}>{best}%</div>
              <div style={{ fontSize: 11, color: MUTED }}>Best</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>{totalCorrect}/{totalQuestions}</div>
              <div style={{ fontSize: 11, color: MUTED }}>Correct</div>
            </div>
          </div>

          {/* Trend */}
          {trend !== null && (
            <div style={{ textAlign: "center", padding: "8px 0", marginBottom: 16, background: trend > 0 ? `${SUCCESS}10` : trend < 0 ? `${ERROR}10` : `${MUTED}10`, borderRadius: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: trend > 0 ? SUCCESS : trend < 0 ? ERROR : MUTED }}>
                {trend > 0 ? `↑ +${trend}%` : trend < 0 ? `↓ ${trend}%` : "→ 0%"} vs previous 5 sessions
              </span>
            </div>
          )}

          {/* Accuracy chart */}
          {timedSessions.length > 0 && (() => {
            const chartSessions = [...timedSessions].reverse(); // oldest first
            const barW = Math.max(20, Math.min(44, 500 / Math.max(chartSessions.length, 1)));
            return (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 8 }}>Accuracy Over Time</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 100, overflowX: "auto", paddingBottom: 2 }}>
                  {chartSessions.map((s, i) => {
                    const h = Math.max(4, (s.accuracy / 100) * 84);
                    const color = s.accuracy >= 75 ? SUCCESS : s.accuracy >= 50 ? WARNING : ERROR;
                    return (
                      <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: barW, minWidth: 16 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color, marginBottom: 2 }}>{s.accuracy}%</span>
                        <div style={{ width: "100%", height: h, background: `${color}cc`, borderRadius: "3px 3px 0 0" }} />
                        <span style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>#{i + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Category breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {CATEGORIES.map((cat) => {
              const st = catTotals[cat];
              if (!st || st.total === 0) return null;
              const pct = Math.round((st.correct / st.total) * 100);
              return (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: CAT_COLORS[cat], width: 50 }}>{cat}</span>
                  <div style={{ flex: 1, height: 6, background: BORDER, borderRadius: 3 }}>
                    <div style={{ height: 6, background: CAT_COLORS[cat], borderRadius: 3, width: `${pct}%` }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: MUTED, width: 32, textAlign: "right" }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {displaySessions.length === 0 ? <div style={{ textAlign: "center", color: MUTED, padding: 40 }}>No sessions yet.</div> : (
        <div style={{ display: "grid", gap: 12 }}>
          {displaySessions.map((s) => {
            const color = s.accuracy >= 75 ? SUCCESS : s.accuracy >= 50 ? WARNING : ERROR;
            const date = new Date(s.date);
            const label = s.mode === "test" ? `⏱️ Test ${s.testNum}` : s.mode === "practice" ? "📚 Practice" : s.mode === "killer" ? "🚩 Test Killer" : `🎯 Focused: ${s.focusedCategory}`;
            const isExpanded = expandedId === s.id;
            return (
              <div key={s.id} onClick={() => setExpandedId(isExpanded ? null : s.id)} style={{ background: CARD, border: `1px solid ${isExpanded ? PRI + "44" : BORDER}`, borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: MUTED, fontSize: 12 }}>{date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{s.timeUsed != null && ` • ${Math.floor(s.timeUsed / 60)}m ${s.timeUsed % 60}s`}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      {Object.entries(s.catStats).map(([cat, st]) => <span key={cat} style={{ fontSize: 11, color: CAT_COLORS[cat], fontWeight: 500 }}>{cat}: {Math.round(st.correct / st.total * 100)}%</span>)}
                    </div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>{isExpanded ? "▲ Hide details" : "▼ Show details"}</div>
                  </div>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", border: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color }}>{s.accuracy}%</span>
                  </div>
                </div>

                {/* Expanded: subcategory breakdown */}
                {isExpanded && s.subStats && (
                  <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
                    {CATEGORIES.filter((cat) => s.catStats?.[cat]).map((cat) => {
                      const catSubs = Object.entries(s.subStats)
                        .filter(([, st]) => st.category === cat)
                        .map(([name, st]) => ({ name, pct: Math.round((st.correct / st.total) * 100), correct: st.correct, total: st.total }))
                        .sort((a, b) => a.pct - b.pct);
                      if (catSubs.length === 0) return null;
                      return (
                        <div key={cat} style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: CAT_COLORS[cat], marginBottom: 6 }}>{cat}</div>
                          {catSubs.map((sub) => (
                            <div key={sub.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "3px 0 3px 12px" }}>
                              <span style={{ color: TEXT }}>{sub.name}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 11, color: MUTED }}>({sub.correct}/{sub.total})</span>
                                <span style={{ fontWeight: 700, color: sub.pct >= 70 ? SUCCESS : sub.pct >= 50 ? WARNING : ERROR, minWidth: 36, textAlign: "right" }}>{sub.pct}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                    {s.questionIds && s.answers && (() => {
                      const qMap = Object.fromEntries(allQuestions.map((q) => [q.id, q]));
                      const wrong = s.questionIds
                        .map((id, idx) => ({ q: qMap[id], idx: idx + 1, given: s.answers[id] }))
                        .filter(({ q, given }) => q && given !== undefined && given !== q.correct);
                      if (wrong.length === 0) return <div style={{ fontSize: 12, color: SUCCESS, marginTop: 12 }}>✓ No wrong answers!</div>;
                      return (
                        <div style={{ marginTop: 14 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: ERROR, marginBottom: 6 }}>✗ Wrong answers ({wrong.length})</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {wrong.map(({ q, idx, given }) => (
                              <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, background: `${ERROR}08`, borderRadius: 6, padding: "5px 10px" }}>
                                <span style={{ color: MUTED }}>Q{idx} <span style={{ color: CAT_COLORS[q.category], fontWeight: 600 }}>{q.subcategory}</span></span>
                                <span style={{ fontWeight: 600 }}>
                                  <span style={{ color: ERROR }}>You: {LETTERS[given] ?? "—"}</span>
                                  <span style={{ color: MUTED }}> → </span>
                                  <span style={{ color: SUCCESS }}>Ans: {LETTERS[q.correct]}</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                    {s.questionIds && (
                      <button onClick={() => onResumeSession(s)} style={{ marginTop: 12, background: PRI, border: "none", borderRadius: 8, padding: "8px 18px", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                        Continue session →
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── CHARTS VIEW ────────────────────────────────────────────────
function ChartsView({ sessions, onHome }) {
  const testSessions = sessions.filter((s) => s.mode === "test").reverse(); // oldest first
  const allWithTime = sessions.filter((s) => s.timeUsed != null).reverse();

  // Build category trend data from test sessions
  const catTrends = {};
  CATEGORIES.forEach((c) => { catTrends[c] = []; });
  testSessions.forEach((s, i) => {
    Object.entries(s.catStats).forEach(([cat, st]) => {
      if (catTrends[cat]) catTrends[cat].push({ idx: i + 1, pct: Math.round(st.correct / st.total * 100) });
    });
  });

  const maxTests = testSessions.length;
  const barWidth = Math.max(24, Math.min(48, 500 / Math.max(maxTests, 1)));

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>📈 Charts &amp; Progress</h2>
        <button onClick={onHome} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", color: MUTED, cursor: "pointer", fontSize: 13 }}>← Back</button>
      </div>

      {testSessions.length === 0 ? <div style={{ textAlign: "center", color: MUTED, padding: 40 }}>Take a timed test to see your charts!</div> : (
        <>
          {/* Overall Accuracy Trend */}
          <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Overall Accuracy Over Time</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 180, padding: "0 8px" }}>
              {testSessions.map((s, i) => {
                const h = (s.accuracy / 100) * 160;
                const color = s.accuracy >= 75 ? SUCCESS : s.accuracy >= 50 ? WARNING : ERROR;
                return (
                  <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: barWidth }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 4 }}>{s.accuracy}%</span>
                    <div style={{ width: "100%", height: h, background: `${color}cc`, borderRadius: "4px 4px 0 0", transition: "height 0.3s" }} />
                    <span style={{ fontSize: 10, color: MUTED, marginTop: 4 }}>T{s.testNum || "?"} #{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Per Test */}
          {allWithTime.length > 0 && (
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Time Per Test</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 180, padding: "0 8px" }}>
                {allWithTime.map((s, i) => {
                  const maxTime = 900;
                  const h = (s.timeUsed / maxTime) * 160;
                  const mins = Math.floor(s.timeUsed / 60);
                  const secs = s.timeUsed % 60;
                  const color = s.timeUsed <= 600 ? SUCCESS : s.timeUsed <= 780 ? WARNING : ERROR;
                  return (
                    <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: barWidth }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color, marginBottom: 4 }}>{mins}:{secs.toString().padStart(2, "0")}</span>
                      <div style={{ width: "100%", height: h, background: `${PRI}aa`, borderRadius: "4px 4px 0 0" }} />
                      <span style={{ fontSize: 10, color: MUTED, marginTop: 4 }}>#{i + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Trends */}
          <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Category Progress</h3>
            <div style={{ display: "grid", gap: 20 }}>
              {CATEGORIES.map((cat) => {
                const data = catTrends[cat];
                if (data.length === 0) return null;
                const latest = data[data.length - 1]?.pct || 0;
                const first = data[0]?.pct || 0;
                const diff = latest - first;
                return (
                  <div key={cat}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, color: CAT_COLORS[cat] }}>{cat}</span>
                      <span style={{ fontSize: 13 }}>
                        <span style={{ fontWeight: 700, color: latest >= 70 ? SUCCESS : latest >= 50 ? WARNING : ERROR }}>{latest}%</span>
                        {data.length > 1 && <span style={{ color: diff >= 0 ? SUCCESS : ERROR, fontSize: 12, marginLeft: 6 }}>{diff >= 0 ? "↑" : "↓"}{Math.abs(diff)}%</span>}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
                      {data.map((d, i) => (
                        <div key={i} style={{ flex: 1, maxWidth: 40, height: `${(d.pct / 100) * 56}px`, background: CAT_COLORS[cat], borderRadius: "3px 3px 0 0", opacity: 0.4 + (i / data.length) * 0.6 }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Summary</h3>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { label: "Tests Taken", value: testSessions.length },
                { label: "Best Score", value: `${Math.max(...testSessions.map((s) => s.accuracy))}%` },
                { label: "Avg Score", value: `${Math.round(testSessions.reduce((a, s) => a + s.accuracy, 0) / testSessions.length)}%` },
                { label: "Questions Answered", value: sessions.reduce((a, s) => a + s.totalQuestions, 0) },
                { label: "Fastest Test", value: allWithTime.length > 0 ? `${Math.floor(Math.min(...allWithTime.map((s) => s.timeUsed)) / 60)}m` : "—" },
                { label: "Avg Time", value: allWithTime.length > 0 ? `${Math.floor(allWithTime.reduce((a, s) => a + s.timeUsed, 0) / allWithTime.length / 60)}m` : "—" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: PRI }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
