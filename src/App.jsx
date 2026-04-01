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
  { id: 5, image: "questions/q5.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
  { id: 6, image: "questions/q6.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 1 },
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
  { id: 17, image: "questions/q17.png", correct: 4, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 1 },
  { id: 18, image: "questions/q18.png", correct: 1, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 1 },
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
  { id: 54, image: "questions2/q4.png", correct: 0, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 55, image: "questions2/q5.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 56, image: "questions2/q6.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 57, image: "questions2/q7.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 58, image: "questions2/q8.png", correct: 2, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 59, image: "questions2/q9.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 60, image: "questions2/q10.png", correct: 1, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 61, image: "questions2/q11.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 62, image: "questions2/q12.png", correct: 0, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 63, image: "questions2/q13.png", correct: 4, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 2 },
  { id: 64, image: "questions2/q14.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 2 },
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
  { id: 75, image: "questions2/q25.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 76, image: "questions2/q26.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 77, image: "questions2/q27.png", correct: 0, category: "Math", subcategory: "Number Series", options: 5, test: 2 },
  { id: 78, image: "questions2/q28.png", correct: 4, category: "Math", subcategory: "Arithmetic", options: 5, test: 2 },
  { id: 79, image: "questions2/q29.png", correct: 1, category: "Math", subcategory: "Word Problems", options: 5, test: 2 },
  { id: 80, image: "questions2/q30.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 81, image: "questions2/q31.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 2 },
  { id: 82, image: "questions2/q32.png", correct: 1, category: "Math", subcategory: "Data Interpretation", options: 5, test: 2 },
  { id: 83, image: "questions2/q33.png", correct: 1, category: "Math", subcategory: "Averages", options: 5, test: 2 },
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
  { id: 95, image: "questions2/q45.png", correct: 4, category: "Logic", subcategory: "Deduction", options: 5, test: 2 },
  { id: 96, image: "questions2/q46.png", correct: 3, category: "Verbal", subcategory: "Analogies", options: 5, test: 2 },
  { id: 97, image: "questions2/q47.png", correct: 2, category: "Math", subcategory: "Data Interpretation", options: 5, test: 2 },
  { id: 98, image: "questions2/q48.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 2 },
  { id: 99, image: "questions2/q49.png", correct: 2, category: "Logic", subcategory: "Letter Series", options: 5, test: 2 },
  { id: 100, image: "questions2/q50.png", correct: 3, category: "Math", subcategory: "Combinatorics", options: 5, test: 2 },
];

// ─── TEST 3 QUESTIONS ───────────────────────────────────────────
// duplicateOf: id of the original question in Test 1/2 (excluded from Focused Study pool)
const TEST3_QUESTIONS = [
  { id: 101, image: "questions3/q1.png", correct: 2, category: "Math", subcategory: "Arithmetic", options: 5, test: 3 },
  { id: 102, image: "questions3/q2.png", correct: 3, category: "Math", subcategory: "Number Comparison", options: 5, test: 3 },
  { id: 103, image: "questions3/q3.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 104, image: "questions3/q4.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 105, image: "questions3/q5.png", correct: 4, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3, duplicateOf: 56 },
  { id: 106, image: "questions3/q6.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 107, image: "questions3/q7.png", correct: 1, category: "Verbal", subcategory: "Analogies", options: 5, test: 3 },
  { id: 108, image: "questions3/q8.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 3 },
  { id: 109, image: "questions3/q9.png", correct: 0, category: "Verbal", subcategory: "Analogies", options: 5, test: 3, duplicateOf: 10 },
  { id: 110, image: "questions3/q10.png", correct: 3, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 111, image: "questions3/q11.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 112, image: "questions3/q12.png", correct: 2, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3, duplicateOf: 61 },
  { id: 113, image: "questions3/q13.png", correct: 4, category: "Verbal", subcategory: "Sentence Completion", options: 5, test: 3 },
  { id: 114, image: "questions3/q14.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 115, image: "questions3/q15.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 116, image: "questions3/q16.png", correct: 2, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
  { id: 117, image: "questions3/q17.png", correct: 3, category: "Spatial", subcategory: "Odd One Out", options: 5, test: 3 },
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
  { id: 128, image: "questions3/q28.png", correct: 3, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
  { id: 129, image: "questions3/q29.png", correct: 2, category: "Spatial", subcategory: "Pattern Completion", options: 5, test: 3 },
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

// ALL_QUESTIONS = every question across all 3 tests (for Test Killer tracking)
const ALL_QUESTIONS = [...TEST1_QUESTIONS, ...TEST2_QUESTIONS, ...TEST3_QUESTIONS];
// UNIQUE_QUESTIONS = no duplicates (for Focused Study & Practice Mode)
const UNIQUE_QUESTIONS = ALL_QUESTIONS.filter((q) => !q.duplicateOf);
const CATEGORIES = ["Math", "Verbal", "Spatial", "Logic"];
const TOTAL_TIME = 900;
const LETTERS = ["A", "B", "C", "D", "E"];

// ─── STORAGE ────────────────────────────────────────────────────
const SESSIONS_KEY = "ccat-killer-sessions";
const FLAGS_KEY = "ccat-killer-flags";
const WRONG_KEY = "ccat-killer-wrong";
const PRACTICE_KEY = "ccat-practice-progress";

const getStore = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const setStore = (key, val) => localStorage.setItem(key, JSON.stringify(val));

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
const ACCESS_CODE = "Testkiller123";

function LoginScreen({ onLogin }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lexend', sans-serif" }}>
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

// ─── APP ────────────────────────────────────────────────────────
export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "true");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const handleLogout = () => { localStorage.removeItem(AUTH_KEY); setAuthed(false); };

  return <AppMain onLogout={handleLogout} />;
}

function AppMain({ onLogout }) {
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
  const [sessions, setSessions] = useState(() => getStore(SESSIONS_KEY));
  const [flaggedIds, setFlaggedIds] = useState(() => getStore(FLAGS_KEY));
  const [wrongIds, setWrongIds] = useState(() => getStore(WRONG_KEY));
  const timerRef = useRef(null);

  // Persist flags and wrong
  useEffect(() => { setStore(FLAGS_KEY, flaggedIds); }, [flaggedIds]);
  useEffect(() => { setStore(WRONG_KEY, wrongIds); }, [wrongIds]);

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
    const pool = num === 1 ? TEST1_QUESTIONS : num === 2 ? TEST2_QUESTIONS : TEST3_QUESTIONS;
    setMode("test"); setTestNum(num);
    setQuestions(shuffle(pool));
    setCurrentIdx(0); setAnswers({}); setTimeLeft(TOTAL_TIME); setShowFeedback(false);
    setPage("quiz");
  }, []);

  const practiceProgress = getStore(PRACTICE_KEY, null);

  const startPractice = useCallback((forceRestart = false) => {
    setMode("practice"); setTestNum(null); setShowFeedback(false);
    const saved = !forceRestart ? getStore(PRACTICE_KEY, null) : null;
    if (saved) {
      const qs = saved.questionIds.map((id) => UNIQUE_QUESTIONS.find((q) => q.id === id)).filter(Boolean);
      setQuestions(qs);
      setCurrentIdx(saved.currentIdx || 0);
      setAnswers(saved.answers || {});
    } else {
      localStorage.removeItem(PRACTICE_KEY);
      setQuestions(shuffle(UNIQUE_QUESTIONS));
      setCurrentIdx(0); setAnswers({});
    }
    setPage("quiz");
  }, []);

  const startFocused = useCallback((cat) => {
    setMode("focused"); setFocusedCategory(cat); setTestNum(null);
    setQuestions(shuffle(UNIQUE_QUESTIONS.filter((q) => q.category === cat)));
    setCurrentIdx(0); setAnswers({}); setShowFeedback(false);
    setPage("quiz");
  }, []);

  const startTestKiller = useCallback(() => {
    const killQs = ALL_QUESTIONS.filter((q) => flaggedIds.includes(q.id));
    if (killQs.length === 0) return;
    setMode("killer"); setTestNum(null);
    setQuestions(shuffle(killQs));
    setCurrentIdx(0); setAnswers({}); setShowFeedback(false);
    setPage("quiz");
  }, [flaggedIds]);

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
      setStore(PRACTICE_KEY, { questionIds: questions.map((q) => q.id), currentIdx, answers: newAnswers });
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
      if (mode === "practice") setStore(PRACTICE_KEY, { questionIds: questions.map((q) => q.id), currentIdx: nextIdx, answers });
    } else finishWith(answers);
    // eslint-disable-next-line
  }, [currentIdx, questions, answers]);

  const finishWith = (finalAnswers) => {
    clearInterval(timerRef.current);
    if (mode === "practice") localStorage.removeItem(PRACTICE_KEY);
    const result = buildResult(finalAnswers, questions, mode, focusedCategory, testNum, timeLeft);
    const newSessions = [result, ...getStore(SESSIONS_KEY)];
    setStore(SESSIONS_KEY, newSessions);
    setSessions(newSessions);
    setSessionResult(result);
    setPage("results");
  };

  const handleClearData = () => {
    localStorage.removeItem(SESSIONS_KEY);
    localStorage.removeItem(FLAGS_KEY);
    localStorage.removeItem(WRONG_KEY);
    localStorage.removeItem(PRACTICE_KEY);
    setSessions([]); setFlaggedIds([]); setWrongIds([]); setSessionResult(null);
  };

  const goHome = () => {
    clearInterval(timerRef.current);
    setPage("dashboard"); setMode(null); setShowFeedback(false);
  };

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

      {page === "dashboard" && <Dashboard sessions={sessions} onStartTest={startTest} onStartPractice={startPractice} onStartFocused={startFocused} onStartKiller={startTestKiller} onClearData={handleClearData} onViewHistory={() => setPage("history")} onViewCharts={() => setPage("charts")} killerCount={killerCount} practiceProgress={practiceProgress} />}
      {page === "quiz" && <QuizView mode={mode} questions={questions} currentIdx={currentIdx} answers={answers} timeLeft={timeLeft} showFeedback={showFeedback} onAnswer={handleAnswer} onNext={nextQuestion} onFinish={() => finishWith(answers)} onHome={goHome} focusedCategory={focusedCategory} flaggedIds={flaggedIds} onToggleFlag={toggleFlag} testNum={testNum} />}
      {page === "results" && <ResultsView result={sessionResult} onHome={goHome} onStartFocused={startFocused} />}
      {page === "history" && <HistoryView sessions={sessions} onHome={goHome} />}
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
function Dashboard({ sessions, onStartTest, onStartPractice, onStartFocused, onStartKiller, onClearData, onViewHistory, onViewCharts, killerCount, practiceProgress }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const lastTest = sessions.find((s) => s.mode === "test");
  const weakCats = lastTest ? Object.entries(lastTest.catStats).filter(([, s]) => s.correct / s.total < 0.7).map(([c]) => c) : [];
  const totalTests = sessions.filter((s) => s.mode === "test").length;
  const avgAccuracy = totalTests > 0 ? Math.round(sessions.filter((s) => s.mode === "test").reduce((a, s) => a + s.accuracy, 0) / totalTests) : null;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>CCAT <span style={{ color: PRI }}>Test Killer</span></h1>
        <p style={{ color: MUTED, margin: "8px 0 0", fontSize: 14 }}>150 questions across 3 tests. Master every category.</p>
        {avgAccuracy !== null && (
          <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "8px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <span style={{ color: MUTED, fontSize: 13 }}>Avg Score</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: avgAccuracy >= 70 ? SUCCESS : avgAccuracy >= 50 ? WARNING : ERROR }}>{avgAccuracy}%</span>
            <span style={{ color: MUTED, fontSize: 13 }}>across {totalTests} test{totalTests !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
        {/* Timed Tests */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[1, 2, 3].map((n) => (
            <button key={n} onClick={() => onStartTest(n)} style={{
              background: `linear-gradient(135deg, ${PRI}15, ${PRI}05)`, border: `1px solid ${PRI}33`,
              borderRadius: 16, padding: "24px 20px", cursor: "pointer", textAlign: "center", color: TEXT,
              transition: "transform 0.15s, box-shadow 0.15s",
            }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${PRI}15`; }}
               onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>⏱️</div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Timed Test {n}</div>
              <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>50 questions &bull; 15 min</div>
            </button>
          ))}
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
          <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>All unique questions &bull; No timer &bull; See answers after each</div>
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
          background: killerCount > 0 ? `linear-gradient(135deg, ${FLAGRED}15, ${FLAGRED}05)` : `${CARD}`,
          border: `1px solid ${killerCount > 0 ? FLAGRED + "33" : BORDER}`,
          borderRadius: 16, padding: "24px", cursor: killerCount > 0 ? "pointer" : "default", textAlign: "center", color: TEXT,
          transition: "transform 0.15s, box-shadow 0.15s", opacity: killerCount > 0 ? 1 : 0.5,
        }} onMouseOver={(e) => { if (killerCount > 0) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${FLAGRED}15`; } }}
           onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🚩</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Test Killer <span style={{ fontSize: 13, fontWeight: 600, color: FLAGRED }}>{killerCount > 0 ? `(${killerCount})` : ""}</span></div>
          <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{killerCount > 0 ? "Wrong answers + flagged questions — destroy your weak spots" : "No wrong or flagged questions yet"}</div>
        </button>

        {/* Focused Study */}
        <div style={{ background: `linear-gradient(135deg, ${WARNING}15, ${WARNING}05)`, border: `1px solid ${WARNING}33`, borderRadius: 16, padding: "24px", textAlign: "center" }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>🎯</div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Focused Study</div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>Drill a specific category</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {CATEGORIES.map((cat) => {
              const count = UNIQUE_QUESTIONS.filter((q) => q.category === cat).length;
              const isWeak = weakCats.includes(cat);
              return (
                <button key={cat} onClick={() => onStartFocused(cat)} style={{
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
      </div>

      {/* Bottom Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {sessions.length > 0 && <button onClick={onViewCharts} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 20px", color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>📈 Charts</button>}
        {sessions.length > 0 && <button onClick={onViewHistory} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 20px", color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>📊 History ({sessions.length})</button>}
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

// ─── QUIZ VIEW ──────────────────────────────────────────────────
function QuizView({ mode, questions, currentIdx, answers, timeLeft, showFeedback, onAnswer, onNext, onFinish, onHome, focusedCategory, flaggedIds, onToggleFlag, testNum }) {
  const q = questions[currentIdx];
  const userAnswer = answers[q.id];
  const isCorrect = userAnswer === q.correct;
  const progress = ((currentIdx + (showFeedback ? 1 : 0)) / questions.length) * 100;
  const isFlagged = flaggedIds.includes(q.id);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const timeColor = timeLeft <= 60 ? ERROR : timeLeft <= 180 ? WARNING : TEXT;

  const modeLabel = mode === "test" ? `Timed Test ${testNum}` : mode === "practice" ? "Practice" : mode === "killer" ? "Test Killer" : `Focused: ${focusedCategory}`;

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

      {/* Question Image + Flag */}
      <div style={{ position: "relative", background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
        {/* Flag Button */}
        <button onClick={() => onToggleFlag(q.id)} style={{
          position: "absolute", top: 10, right: 10, background: "transparent",
          border: "none", borderRadius: 8, width: 36, height: 36,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, transition: "all 0.15s", color: isFlagged ? FLAGRED : "#CBD5E1", opacity: isFlagged ? 1 : 0.5,
        }} title={isFlagged ? "Unflag question" : "Flag for review"}>
          🚩
        </button>
        <img src={`${process.env.PUBLIC_URL}/${q.image}`} alt={`Question ${q.id}`} style={{ maxWidth: "100%", maxHeight: 500 }} />
      </div>

      {/* Answer Buttons Row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center" }}>
        {Array.from({ length: q.options }, (_, i) => {
          const letter = LETTERS[i];
          let bg = CARD, border = BORDER, textColor = TEXT;
          if (showFeedback) {
            if (i === q.correct) { bg = `${SUCCESS}18`; border = SUCCESS; textColor = SUCCESS; }
            else if (i === userAnswer && !isCorrect) { bg = `${ERROR}18`; border = ERROR; textColor = ERROR; }
          } else if (mode === "test" && userAnswer === i) { bg = `${PRI}15`; border = PRI; }
          return (
            <button key={i} onClick={() => onAnswer(i)} disabled={showFeedback} style={{
              background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "10px 0",
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
  const modeLabel = mode === "test" ? `Timed Test ${testNum}` : mode === "practice" ? "Practice" : mode === "killer" ? "Test Killer" : "Focused Study";

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
function HistoryView({ sessions, onHome }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px", animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>📊 Session History</h2>
        <button onClick={onHome} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", color: MUTED, cursor: "pointer", fontSize: 13 }}>← Back</button>
      </div>
      {sessions.length === 0 ? <div style={{ textAlign: "center", color: MUTED, padding: 40 }}>No sessions yet.</div> : (
        <div style={{ display: "grid", gap: 12 }}>
          {sessions.map((s) => {
            const color = s.accuracy >= 75 ? SUCCESS : s.accuracy >= 50 ? WARNING : ERROR;
            const date = new Date(s.date);
            const label = s.mode === "test" ? `⏱️ Timed Test ${s.testNum}` : s.mode === "practice" ? "📚 Practice" : s.mode === "killer" ? "🚩 Test Killer" : `🎯 Focused: ${s.focusedCategory}`;
            return (
              <div key={s.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: MUTED, fontSize: 12 }}>{date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{s.timeUsed != null && ` • ${Math.floor(s.timeUsed / 60)}m ${s.timeUsed % 60}s`}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    {Object.entries(s.catStats).map(([cat, st]) => <span key={cat} style={{ fontSize: 11, color: CAT_COLORS[cat], fontWeight: 500 }}>{cat}: {Math.round(st.correct / st.total * 100)}%</span>)}
                  </div>
                </div>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color }}>{s.accuracy}%</span>
                </div>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
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
