import { useState, useEffect, useCallback, useRef } from "react";

// SVG ICONS
const Icons = {
  brain: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M12 2a4 4 0 0 1 4 4c0 .6-.1 1.1-.4 1.6A5 5 0 0 1 19 12a5 5 0 0 1-3 4.6V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-3.4A5 5 0 0 1 5 12a5 5 0 0 1 3.4-4.4C8.1 7.1 8 6.6 8 6a4 4 0 0 1 4-4z"/><path d="M12 2v8"/></svg>,
  chart: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
  target: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  clipboard: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
  book: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>,
  clock: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  help: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
  edit: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  hash: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  box: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  palette: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.24-.3-.39-.65-.39-1.04 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.36-8.92-10-8.92z"/></svg>,
  lightbulb: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>,
  alert: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  trending: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  check: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  xCircle: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  info: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  refresh: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  puzzle: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>,
  ruler: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M2 4h20v6H2z"/><path d="M6 4v6"/><path d="M10 4v3"/><path d="M14 4v6"/><path d="M18 4v3"/></svg>,
  play: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill={p?.color||"currentColor"} style={p?.style}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  send: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  loader: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" style={{...p?.style, animation: "spin 1s linear infinite"}}><path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg>,
  messageCircle: (p) => <svg width={p?.size||18} height={p?.size||18} viewBox="0 0 24 24" fill="none" stroke={p?.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p?.style}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
};


// ─── CONFIG ─────────────────────────────────────────────────────
const ANTHROPIC_API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY || "";


// ─── QUESTION BANK ───────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 101, category: "Math",
    question: "If a cashier rings up 15 customers per hour, how many customers can he ring up in eight hours?",
    options: ["60", "90", "120", "135"], correct: 2,
    explanation: "15 customers/hour x 8 hours = 120 customers.",
    concept: "Rate x Time — multiply the rate by the number of time units.",
    visual: "15 x 8 = 120",
    tip: "Rate problems: just multiply rate by time. Think of it as repeated addition."
  },
  {
    id: 102, category: "Math",
    question: "Which of the following is the smallest value?",
    options: ["0.146", "2.0102", "0.45", "1.09"], correct: 0,
    explanation: "Compare: 0.146 < 0.45 < 1.09 < 2.0102. The smallest is 0.146.",
    concept: "Decimal Comparison — compare digit by digit from left to right.",
    visual: "0.146 < 0.45 < 1.09 < 2.0102",
    tip: "Look at the ones digit first. If tied, move to tenths, then hundredths."
  },
  {
    id: 103, category: "Math",
    question: "A home goods store sells 175 rugs in the first quarter of the fiscal year. If it sells 20% more rugs in the next quarter, how many rugs does it sell in the second quarter?",
    options: ["205", "210", "215", "220"], correct: 1,
    explanation: "20% of 175 = 35. So 175 + 35 = 210 rugs in Q2.",
    concept: "Percentage Increase — find the percentage amount, then add it.",
    visual: "175 x 0.20 = 35 -> 175 + 35 = 210",
    tip: "20% = 1/5. So divide by 5, then add to original. 175/5 = 35."
  },
  {
    id: 104, category: "Math",
    question: "In a class of forty students, one fifth of the students also play on the school's football team. If four more students from the class join the football team, what percentage of students in the class will be on the football team?",
    options: ["25%", "30%", "33%", "35%"], correct: 1,
    explanation: "1/5 of 40 = 8 students. Add 4 more = 12. 12/40 = 30%.",
    concept: "Fraction to Count, then Percentage.",
    visual: "40/5 = 8 -> 8 + 4 = 12 -> 12/40 = 0.30 = 30%",
    tip: "Convert fraction to a count first, adjust, then find the new percentage."
  },
  {
    id: 105, category: "Math",
    question: "24 is 60% of what number?",
    options: ["56", "48", "36", "40"], correct: 3,
    explanation: "24 = 0.60 x N -> N = 24 / 0.60 = 40.",
    concept: "Reverse Percentage — divide the part by the percentage.",
    visual: "24 / 0.60 = 40",
    tip: "\'X is Y% of what?\' -> divide X by Y%. Always divide when finding the whole."
  },
  {
    id: 106, category: "Math",
    question: "What would be the next group of letters in the following series? aceg ... bdfh ... cegi ... dfhj ... ?",
    options: ["efhj", "efik", "eghj", "egik"], correct: 3,
    explanation: "Each group starts one letter later: a,b,c,d,e. Within each group, letters skip one: e,g,i,k.",
    concept: "Letter Sequence — find the pattern in starting letters AND spacing.",
    visual: "Start: a->b->c->d->e | Skip pattern: every other letter -> e,g,i,k",
    tip: "Look at the first letter of each group separately, then the internal spacing."
  },
  {
    id: 107, category: "Math",
    question: "What would be the next number in the following series? 5 ... 9 ... 17 ... 33 ... 65 ... ?",
    options: ["97", "105", "113", "129"], correct: 3,
    explanation: "Pattern: each number x 2 - 1. 65 x 2 - 1 = 129.",
    concept: "Multiplicative Sequence with Adjustment.",
    visual: "5 ->x2-1-> 9 ->x2-1-> 17 ->x2-1-> 33 ->x2-1-> 65 ->x2-1-> 129",
    tip: "If simple doubling doesn\'t work, try \'double then add/subtract a small number\'."
  },
  {
    id: 108, category: "Math",
    question: "An automobile factory produces 75 cars in an hour. How many hours will it take to produce 3000 cars?",
    options: ["32", "35", "40", "44"], correct: 2,
    explanation: "3000 / 75 = 40 hours.",
    concept: "Division for Time — total output / rate = time needed.",
    visual: "3000 / 75 = 40 hours",
    tip: "When you know the total and the rate, divide to find time."
  },
  {
    id: 109, category: "Math",
    question: "An electrician can complete a repair in 3.5 hours. His less experienced colleague takes 4.0 hours to complete a repair. If both individuals start working at the same time, and each works 56 hours over the course of one week, how many total repairs will they have completed?",
    options: ["30", "32", "34", "36"], correct: 0,
    explanation: "Electrician: 56/3.5 = 16 repairs. Colleague: 56/4.0 = 14 repairs. Total: 16 + 14 = 30.",
    concept: "Combined Work Rate — calculate each person's output separately, then add.",
    visual: "56/3.5 = 16 | 56/4.0 = 14 | 16 + 14 = 30",
    tip: "For \'working at the same time\' problems: find each person\'s total, then add."
  },
  {
    id: 110, category: "Math",
    question: "150 is what percentage of 240?",
    options: ["58.1%", "62.5%", "65.0%", "66.7%"], correct: 1,
    explanation: "150 / 240 = 0.625 = 62.5%.",
    concept: "Part / Whole = Percentage.",
    visual: "150 / 240 = 0.625 = 62.5%",
    tip: "\'X is what % of Y\' -> divide X by Y, then multiply by 100."
  },
  {
    id: 111, category: "Math",
    question: "A restaurant has a special where all appetizers are sold at a discount of 20%. If the regular price of an appetizer is $10, how many appetizers could be bought at the discount price if a customer spent $64?",
    options: ["6", "8", "10", "12"], correct: 1,
    explanation: "Discount price: $10 x 0.80 = $8. Number: $64 / $8 = 8 appetizers.",
    concept: "Discount then Division.",
    visual: "$10 x 0.80 = $8 per appetizer -> $64 / $8 = 8",
    tip: "Find the sale price first, then divide your budget by it."
  },
  {
    id: 112, category: "Math",
    question: "The table below displays sales figures for realtors. What was the approximate average sales price for the houses sold by Mrs. Boggs in Year 1? (Boggs: 5 houses, $1,550,000 total in Year 1)",
    options: ["$250,000", "$310,000", "$333,333", "$350,000"], correct: 1,
    explanation: "$1,550,000 / 5 houses = $310,000 per house.",
    concept: "Average = Total / Count.",
    visual: "$1,550,000 / 5 = $310,000",
    tip: "Average is always total divided by number of items."
  },
  {
    id: 113, category: "Math",
    question: "A group of four numbers has an average (arithmetic mean) of 21. The first three numbers are 24, 9, and 19. What is the other number?",
    options: ["24", "26", "28", "32"], correct: 3,
    explanation: "Total must be 21 x 4 = 84. Sum of known: 24+9+19 = 52. Missing: 84-52 = 32.",
    concept: "Finding a Missing Value from an Average.",
    visual: "21 x 4 = 84 -> 84 - (24+9+19) = 84 - 52 = 32",
    tip: "Multiply the average by the count to get the total, then subtract what you know."
  },
  {
    id: 114, category: "Math",
    question: "An investor purchases shares in a company for $15/share. The shares appreciate 50% in the first year and 10% the next. What is the price of the stock after two years?",
    options: ["$23.75/share", "$24.00/share", "$24.25/share", "$24.75/share"], correct: 3,
    explanation: "Year 1: $15 x 1.50 = $22.50. Year 2: $22.50 x 1.10 = $24.75.",
    concept: "Compound Percentage Growth — apply each percentage to the NEW amount.",
    visual: "$15 ->x1.5-> $22.50 ->x1.1-> $24.75",
    tip: "Don\'t add percentages! Apply each one sequentially to the updated value."
  },
  {
    id: 115, category: "Math",
    question: "An estimated 40% of all people were born after the year 2000. If two people are selected at random, what are the chances that NEITHER person was born after the year 2000?",
    options: ["16%", "20%", "30%", "36%"], correct: 3,
    explanation: "Chance of NOT being born after 2000 = 60%. For both: 0.60 x 0.60 = 0.36 = 36%.",
    concept: "Independent Probability — multiply individual probabilities.",
    visual: "P(not after 2000) = 60% -> 0.60 x 0.60 = 0.36 = 36%",
    tip: "\'Neither\' means find the complement first (100% - 40% = 60%), then multiply."
  },
  {
    id: 116, category: "Math",
    question: "A group of four numbers has an average (arithmetic mean) of 24. The first three numbers are 35, 11, and 20. What is the other number?",
    options: ["26", "28", "30", "32"], correct: 2,
    explanation: "Total = 24 x 4 = 96. Known sum: 35+11+20 = 66. Missing: 96-66 = 30.",
    concept: "Finding a Missing Value from an Average.",
    visual: "24 x 4 = 96 -> 96 - 66 = 30",
    tip: "Average x count = total. Subtract what you know to find what\'s missing."
  },
  {
    id: 117, category: "Math",
    question: "The average (arithmetic mean) of 4 numbers is more than 15 but less than 17. Which of the following could be the sum of these four numbers?",
    options: ["51", "59", "61", "69"], correct: 2,
    explanation: "Sum must be between 15x4=60 and 17x4=68. Only 61 falls in that range.",
    concept: "Average Bounds — convert average range to sum range.",
    visual: "15 x 4 = 60 | 17 x 4 = 68 | 60 < sum < 68 -> 61 fits",
    tip: "Multiply both bounds by the count to find the valid sum range."
  },
  {
    id: 118, category: "Math",
    question: "A school year begins with 24 students trying out for the basketball team and 20 students trying out for the debate team. Within a week, 6 students have dropped out of the basketball tryouts and 2 students have dropped out of the debate tryouts. What percentage of the remaining students are trying out for the basketball team?",
    options: ["40%", "50%", "60%", "70%"], correct: 1,
    explanation: "Basketball remaining: 24-6=18. Debate remaining: 20-2=18. Total remaining: 36. 18/36 = 50%.",
    concept: "Updated Counts then Percentage.",
    visual: "Bball: 24-6=18 | Debate: 20-2=18 | Total: 36 | 18/36 = 50%",
    tip: "Update each group first, then find the percentage of the new total."
  },
  {
    id: 119, category: "Math",
    question: "An office supply store sells pencils from five different brands, each with five different colors, and in three different sizes. How many different combinations of brand, color, and size are possible?",
    options: ["25", "50", "75", "100"], correct: 2,
    explanation: "5 brands x 5 colors x 3 sizes = 75 combinations.",
    concept: "Counting Principle — multiply the number of choices for each category.",
    visual: "5 x 5 x 3 = 75",
    tip: "For \'how many combinations\': multiply the options for each independent choice."
  },
  {
    id: 120, category: "Math",
    question: "Jacob is one third the age of his grandmother, and 20% younger than his sister. If Jacob's sister is 35 years old, how old is Jacob's grandmother?",
    options: ["82", "84", "86", "88"], correct: 1,
    explanation: "Jacob is 20% younger than 35: 35 x 0.80 = 28. Grandmother: 28 x 3 = 84.",
    concept: "Chained Relationships — solve step by step.",
    visual: "Sister=35 ->x0.80-> Jacob=28 ->x3-> Grandma=84",
    tip: "Work backwards from the known value through each relationship."
  },
  {
    id: 121, category: "Math",
    question: "An investor buys stock in a company and in the twelve months after she invests the value of the stock decreases 30%. By what amount will the value of the stock need to go up from there in order that the price of the stock will be equal to what the investor first paid for it?",
    options: ["30%", "37.5%", "42.9%", "45%"], correct: 2,
    explanation: "After 30% decrease, stock is at 70% of original. To get back: need to gain 30/70 = 42.9%.",
    concept: "Recovery Percentage — the base is smaller after a loss.",
    visual: "100 ->-30%-> 70 | Need +30 from 70 | 30/70 = 42.9%",
    tip: "A 30% drop needs MORE than 30% gain to recover because the base is now smaller."
  },
  {
    id: 122, category: "Math",
    question: "A home is purchased for $600,000. Its value appreciated 10% in the first five years and another 10% in the next five years. What is the value of the home after ten years?",
    options: ["$726,000", "$750,000", "$792,000", "$825,000"], correct: 0,
    explanation: "Year 5: $600,000 x 1.10 = $660,000. Year 10: $660,000 x 1.10 = $726,000.",
    concept: "Compound Appreciation — each increase applies to the new value.",
    visual: "$600K ->x1.1-> $660K ->x1.1-> $726K",
    tip: "10% + 10% is NOT 20% total. Each 10% applies to the larger updated amount."
  },
  {
    id: 123, category: "Math",
    question: "A restaurant buys 1500 eggs per week, at $1.50 per dozen. If the cost per dozen eggs rises to $1.80, how much more will the restaurant have to pay for eggs per week?",
    options: ["$23.25", "$35.00", "$32.75", "$37.50"], correct: 3,
    explanation: "1500/12 = 125 dozen. Old cost: 125 x $1.50 = $187.50. New cost: 125 x $1.80 = $225. Difference: $37.50.",
    concept: "Cost Increase Calculation.",
    visual: "1500/12 = 125 dozen | 125 x ($1.80 - $1.50) = 125 x $0.30 = $37.50",
    tip: "Shortcut: find the dozen count, then multiply by the price DIFFERENCE."
  },
  {
    id: 124, category: "Math",
    question: "By what percentage did the median age increase between 1970 and 2000 if in 1970 the median age was 28 and by 2000 the median age was 35?",
    options: ["7%", "11%", "20%", "25%"], correct: 3,
    explanation: "Increase: 35-28 = 7. Percentage: 7/28 = 0.25 = 25%.",
    concept: "Percentage Change = (New - Old) / Old.",
    visual: "(35 - 28) / 28 = 7/28 = 1/4 = 25%",
    tip: "Always divide the change by the ORIGINAL value, not the new one."
  },
  {
    id: 125, category: "Math",
    question: "7 is 25% of what number?",
    options: ["14", "21", "28", "35"], correct: 2,
    explanation: "7 = 0.25 x N -> N = 7 / 0.25 = 28.",
    concept: "Reverse Percentage.",
    visual: "7 / 0.25 = 28 (or: 25% = 1/4, so 7 x 4 = 28)",
    tip: "25% = 1/4. If 7 is one quarter, the whole is 7 x 4 = 28."
  },
  {
    id: 126, category: "Math",
    question: "What would be the next number in the following series? 2 ... 3 ... 5 ... 8 ... 13 ... ?",
    options: ["17", "19", "20", "21"], correct: 3,
    explanation: "Differences: +1, +2, +3, +5. Wait — this is actually adding increasing amounts: +1,+2,+3,+5,+8. The pattern is each term = sum of two before: 8+13=21.",
    concept: "Fibonacci-like Sequence.",
    visual: "2+3=5 | 3+5=8 | 5+8=13 | 8+13=21",
    tip: "If simple differences don\'t work, try adding the last two numbers together."
  },
  {
    id: 127, category: "Math",
    question: "If 40% of women voted for Candidate A in an election, and 60% of men voted for Candidate A, which must be true if Candidate A won 52% of the votes?",
    options: ["42% of voters were men", "52% of voters were men", "56% of voters were men", "60% of voters were men"], correct: 3,
    explanation: "Let m = fraction of men. 0.60m + 0.40(1-m) = 0.52. 0.60m + 0.40 - 0.40m = 0.52. 0.20m = 0.12. m = 0.60 = 60%.",
    concept: "Weighted Average / Mixture Problem.",
    visual: "0.60m + 0.40(1-m) = 0.52 -> 0.20m = 0.12 -> m = 60%",
    tip: "Set up an equation where the weighted contributions equal the overall result."
  },
  {
    id: 128, category: "Math",
    question: "If a factory produces 16 lawn mowers per hour, how many lawn mowers can it produce in seven hours?",
    options: ["96", "105", "112", "120"], correct: 2,
    explanation: "16 x 7 = 112 lawn mowers.",
    concept: "Rate x Time.",
    visual: "16 x 7 = 112",
    tip: "Simple multiplication: rate per hour times number of hours."
  },
  {
    id: 129, category: "Math",
    question: "An appliance store sells 165 dishwashers in November. If it sells 200 more dishwashers in the next month, how many dishwashers does it sell in December?",
    options: ["365", "355", "325", "265"], correct: 0,
    explanation: "165 + 200 = 365 dishwashers in December.",
    concept: "Simple Addition — '200 more' means add 200.",
    visual: "165 + 200 = 365",
    tip: "\'More\' = addition. Don\'t overthink it."
  },
  {
    id: 130, category: "Math",
    question: "An account manager makes $1,800 per pay cycle, plus 12.5% commission on all customer renewals. If she makes $2,750 during a certain pay cycle, then how much money did she generate in renewals during this time?",
    options: ["$7,400", "$7,500", "$7,600", "$7,700"], correct: 2,
    explanation: "Commission earned: $2,750 - $1,800 = $950. Renewals: $950 / 0.125 = $7,600.",
    concept: "Reverse Commission — find the base from the commission amount.",
    visual: "$2,750 - $1,800 = $950 commission -> $950 / 0.125 = $7,600",
    tip: "Subtract base pay to get commission, then divide by commission rate."
  },
  {
    id: 131, category: "Math",
    question: "A pie eating contest begins with 14 men and 10 women as contestants. By the end of Round One, 2 men and 2 women have dropped out. What percentage of contestants proceeding to Round Two are women?",
    options: ["40%", "50%", "60%", "70%"], correct: 0,
    explanation: "Women remaining: 10-2=8. Men remaining: 14-2=12. Total: 20. 8/20 = 40%.",
    concept: "Updated Counts then Percentage.",
    visual: "Women: 10-2=8 | Men: 14-2=12 | Total: 20 | 8/20 = 40%",
    tip: "Update each group, find new total, then calculate percentage."
  },
  {
    id: 132, category: "Math",
    question: "What is the average (arithmetic mean) of the following numbers: 1, 4, 8, 17, and 32?",
    options: ["8.0", "10.3", "12.0", "12.4"], correct: 3,
    explanation: "Sum: 1+4+8+17+32 = 62. Average: 62/5 = 12.4.",
    concept: "Arithmetic Mean = Sum / Count.",
    visual: "(1+4+8+17+32) / 5 = 62/5 = 12.4",
    tip: "Add all numbers, then divide by how many there are."
  },
  {
    id: 133, category: "Math",
    question: "What would be the next number in the following series? 1 ... 3 ... 3 ... 9 ... 27 ... ?",
    options: ["81", "122", "162", "243"], correct: 4,
    explanation: "Pattern: multiply consecutive pairs. 1x3=3, 3x3=9, 3x9=27, 9x27=243.",
    concept: "Product Sequence — each term is the product of the previous two.",
    visual: "1x3=3 | 3x3=9 | 3x9=27 | 9x27=243",
    tip: "If simple addition/multiplication by a constant fails, try multiplying the last two terms."
  },
  {
    id: 134, category: "Math",
    question: "A part-time employee works 23.5 hours per week on average. His coworker works 27 hours per week on average. How many hours combined do they work over four weeks?",
    options: ["94", "121", "174", "202"], correct: 3,
    explanation: "Combined weekly: 23.5 + 27 = 50.5 hours. Over 4 weeks: 50.5 x 4 = 202.",
    concept: "Combined Rate x Time.",
    visual: "(23.5 + 27) x 4 = 50.5 x 4 = 202",
    tip: "Add the individual rates first, then multiply by the time period."
  },
  {
    id: 135, category: "Math",
    question: "An investor purchases shares in a company for $5/share. The shares appreciate 25% in the first year and 40% the next. What is the price of the stock after two years?",
    options: ["$8.00/share", "$8.25/share", "$8.50/share", "$8.75/share"], correct: 3,
    explanation: "Year 1: $5 x 1.25 = $6.25. Year 2: $6.25 x 1.40 = $8.75.",
    concept: "Compound Growth.",
    visual: "$5 ->x1.25-> $6.25 ->x1.40-> $8.75",
    tip: "Apply each percentage increase to the updated value, not the original."
  },
  {
    id: 136, category: "Math",
    question: "It is estimated that 10% of all U.S. citizens have never traveled outside of the state in which they were born. If two U.S. citizens were to be selected at random, what are the chances that NEITHER person has traveled outside of their own birth state?",
    options: ["0.1%", "0.5%", "1.0%", "5.0%"], correct: 2,
    explanation: "P(hasn't traveled) = 10% = 0.10. Both: 0.10 x 0.10 = 0.01 = 1.0%.",
    concept: "Independent Probability — multiply probabilities.",
    visual: "0.10 x 0.10 = 0.01 = 1%",
    tip: "For \'both\' with independent events, multiply the individual probabilities."
  },
  {
    id: 137, category: "Math",
    question: "A store has a sale where all jackets are sold at a discount of 40%. If the regular price of the jackets is $75, how many jackets could be bought at the sale price if a shopper spent $495?",
    options: ["11", "12", "13", "14"], correct: 0,
    explanation: "Sale price: $75 x 0.60 = $45. Number: $495 / $45 = 11.",
    concept: "Discount then Division.",
    visual: "$75 x 0.60 = $45 -> $495 / $45 = 11",
    tip: "40% OFF means you pay 60%. Find the sale price, then divide your budget."
  },
  {
    id: 138, category: "Math",
    question: "A fast food restaurant uses 3 pieces of lettuce on each burger. If it serves 150 burgers per day, how many pieces of lettuce will it need each day?",
    options: ["250", "300", "350", "450"], correct: 3,
    explanation: "3 x 150 = 450 pieces of lettuce.",
    concept: "Simple Multiplication.",
    visual: "3 x 150 = 450",
    tip: "Per-item quantity times number of items."
  },
  {
    id: 139, category: "Math",
    question: "A customer service representative handles 7.5 calls per hour, while his coworker handles 8 calls per hour. If both representatives start working at the same time, and each spends 60 hours handling calls over a two-week period, how many calls have they handled in total?",
    options: ["900", "915", "930", "945"], correct: 2,
    explanation: "Rep 1: 7.5 x 60 = 450. Rep 2: 8 x 60 = 480. Total: 450 + 480 = 930.",
    concept: "Combined Work Output.",
    visual: "(7.5 x 60) + (8 x 60) = 450 + 480 = 930",
    tip: "Calculate each person\'s output separately, then add."
  },
  {
    id: 140, category: "Math",
    question: "A company hires 14 new employees onto Sales Team A and 14 new employees onto Sales Team B. Within one year, 2 of the new Team A employees and 6 of the new Team B employees have quit. What percentage of the remaining employees are on Team A?",
    options: ["55%", "60%", "65%", "70%"], correct: 1,
    explanation: "Team A: 14-2=12. Team B: 14-6=8. Total: 20. 12/20 = 60%.",
    concept: "Updated Counts then Percentage.",
    visual: "A: 14-2=12 | B: 14-6=8 | Total: 20 | 12/20 = 60%",
    tip: "Subtract dropouts from each group, then find the percentage of the new total."
  },
  {
    id: 141, category: "Math",
    question: "Quentin is one third the age of his aunt, and 20% older than his sister. If Quentin's sister is 15 years old, how old is Quentin's aunt?",
    options: ["45", "48", "51", "54"], correct: 3,
    explanation: "Quentin is 20% older than 15: 15 x 1.20 = 18. Aunt: 18 x 3 = 54.",
    concept: "Chained Age Relationships.",
    visual: "Sister=15 ->x1.20-> Quentin=18 ->x3-> Aunt=54",
    tip: "\'20% older\' means multiply by 1.20. Then apply the next relationship."
  },
  {
    id: 142, category: "Math",
    question: "A store selling posters carries posters in three different sizes, with twelve different designs, and each poster is available in four different frames. How many different combinations of size, design, and frame are possible?",
    options: ["108", "120", "132", "144"], correct: 3,
    explanation: "3 x 12 x 4 = 144.",
    concept: "Counting Principle.",
    visual: "3 x 12 x 4 = 144",
    tip: "Multiply options for each independent category."
  },
  {
    id: 143, category: "Math",
    question: "A convenience store sells gum from eight different brands, each with six different flavors, and in three different sizes. How many different combinations are possible?",
    options: ["96", "120", "144", "168"], correct: 2,
    explanation: "8 x 6 x 3 = 144.",
    concept: "Counting Principle.",
    visual: "8 x 6 x 3 = 144",
    tip: "Multiply: brands x flavors x sizes."
  },
  {
    id: 201, category: "Verbal",
    question: "SALMON is to FISH as ...",
    options: ["EXPERIMENT is to CHEMISTRY", "OXYGEN is to ELEMENT", "TRAIN is to BUS", "ANIMAL is to REPTILE"], correct: 1,
    explanation: "Salmon is a type of fish. Oxygen is a type of element. Both are specific-to-category relationships.",
    concept: "Type-to-Category Analogy.",
    visual: "SALMON -> type of -> FISH | OXYGEN -> type of -> ELEMENT",
    tip: "Ask: \'Is A a specific example of B?\' Then find the same pattern."
  },
  {
    id: 202, category: "Verbal",
    question: "PAPER is to THIN as ...",
    options: ["FLEA is to TINY", "BINDER is to ORGANIZE", "PRINTER is to COPY", "RABBIT is to WISHFUL"], correct: 0,
    explanation: "Paper is characteristically thin. A flea is characteristically tiny. Both are object-to-defining-trait relationships.",
    concept: "Object-to-Characteristic Analogy.",
    visual: "PAPER -> inherently -> THIN | FLEA -> inherently -> TINY",
    tip: "Ask: \'Is B an inherent quality of A?\' Match the same relationship type."
  },
  {
    id: 203, category: "Verbal",
    question: "OCCUPIED is to VACANT as ...",
    options: ["BEAUTIFUL is to SIGHT", "BLISSFUL is to HAPPINESS", "CONSERVED is to RETAINED", "HONORABLE is to SHAMEFUL"], correct: 3,
    explanation: "Occupied and vacant are antonyms. Honorable and shameful are antonyms.",
    concept: "Antonym Analogy.",
    visual: "OCCUPIED <-> VACANT (opposites) | HONORABLE <-> SHAMEFUL (opposites)",
    tip: "If the pair are opposites, find another pair of opposites in the options."
  },
  {
    id: 204, category: "Verbal",
    question: "Despite his reputation for ________, his social life blossomed during his college years as he made innumerable friends across his university.",
    options: ["vitality", "amiability", "adroitness", "introversion"], correct: 3,
    explanation: "The sentence uses 'despite' indicating contrast. A reputation for introversion contrasts with a blossoming social life.",
    concept: "Contrast Clue Words — 'despite', 'although', 'however' signal opposites.",
    visual: "Despite [negative social trait] -> social life blossomed. introversion fits.",
    tip: "Look for signal words like \'despite\' — the blank should CONTRAST with the rest."
  },
  {
    id: 205, category: "Verbal",
    question: "It can be helpful to ask for a third opinion to ________ a dispute when two people cannot reach ________.",
    options: ["arbitrate .. solace", "abate .. discord", "adjudicate .. concurrence", "alleviate .. fusion"], correct: 2,
    explanation: "Adjudicate means to settle a dispute through judgment. Concurrence means agreement — what two people in a dispute can't reach.",
    concept: "Sentence Completion — both blanks must make logical sense together.",
    visual: "adjudicate (settle a dispute) + concurrence (agreement) = both fit",
    tip: "Test BOTH words in the sentence. If either doesn\'t fit, eliminate that option."
  },
  {
    id: 206, category: "Verbal",
    question: "Given his ________ for eating unhealthy foods, the patient was advised to ________ his daily caloric intake and to get more exercise.",
    options: ["affection .. enhance", "penchant .. induce", "propensity .. restrict", "disinclination .. reduce"], correct: 2,
    explanation: "Propensity means a natural tendency. Restrict makes sense for someone who tends to eat unhealthy foods.",
    concept: "Double-Blank Sentence Completion.",
    visual: "propensity (tendency) + restrict (limit intake) = logical pair",
    tip: "The first blank describes the habit, the second describes the remedy."
  },
  {
    id: 207, category: "Verbal",
    question: "The politician hoped to silence the rumors through litigation; however, these lawsuits only ________ the rumors by giving them more attention.",
    options: ["decried", "denounced", "regulated", "amplified"], correct: 3,
    explanation: "'However' signals the opposite of silencing. Amplified means made louder/stronger — the opposite of what was intended.",
    concept: "Contrast Signal + Vocabulary.",
    visual: "hoped to silence -> however -> amplified (made louder)",
    tip: "\'However\' means the result was the opposite of the goal."
  },
  {
    id: 208, category: "Verbal",
    question: "The author has been criticized for the ________ views expressed in his book; while his words may have once been met with agreement, they are now being met with disappointment.",
    options: ["antiquated", "copacetic", "positive", "futuristic"], correct: 0,
    explanation: "Views that once had agreement but now cause disappointment are outdated/antiquated.",
    concept: "Context Clues — temporal shift indicates outdated views.",
    visual: "once agreed with -> now disappointing = antiquated (outdated)",
    tip: "\'Once agreed... now disappointed\' tells you the views are old-fashioned."
  },
  {
    id: 209, category: "Verbal",
    question: "Choose the word most nearly OPPOSITE to: ERSATZ",
    options: ["exorbitant", "artificial", "reconditioned", "genuine"], correct: 3,
    explanation: "Ersatz means substitute/fake/artificial. The opposite is genuine (real, authentic).",
    concept: "Antonyms — Vocabulary.",
    visual: "ERSATZ (fake/substitute) <-> GENUINE (real/authentic)",
    tip: "Ersatz = fake. If you don\'t know the word, look for the most \'real/authentic\' option."
  },
  {
    id: 210, category: "Verbal",
    question: "Choose the word most nearly OPPOSITE to: PIVOTAL",
    options: ["Climactic", "Strategic", "Heavy", "Secondary"], correct: 3,
    explanation: "Pivotal means crucial/essential. Secondary means of lesser importance — the opposite.",
    concept: "Antonyms.",
    visual: "PIVOTAL (crucial, key) <-> SECONDARY (less important)",
    tip: "Pivotal = the thing everything hinges on. Opposite = not that important."
  },
  {
    id: 211, category: "Verbal",
    question: "INTERESTING is to RIVETING as ...",
    options: ["DELIGHTFUL is to OVERPOWERING", "ETHEREAL is to APPEALING", "LEGITIMATE is to COMMONPLACE", "RISKY is to PERILOUS"], correct: 3,
    explanation: "Riveting is a more intense form of interesting. Perilous is a more intense form of risky. Both are mild-to-intense synonym pairs.",
    concept: "Intensity Analogy — same meaning, different strength.",
    visual: "INTERESTING -> stronger -> RIVETING | RISKY -> stronger -> PERILOUS",
    tip: "If A and B are synonyms but B is stronger, find another pair like that."
  },
  {
    id: 212, category: "Verbal",
    question: "SEQUESTER is to INTEGRATE as ...",
    options: ["ALLY is to CABAL", "INCORPORATE is to ABSORB", "DEBASE is to DIGNIFY", "SEQUENCE is to NUMBER"], correct: 2,
    explanation: "Sequester (isolate) and integrate (combine) are antonyms. Debase (lower) and dignify (honor) are antonyms.",
    concept: "Antonym Analogy.",
    visual: "SEQUESTER <-> INTEGRATE | DEBASE <-> DIGNIFY",
    tip: "Both pairs are opposite actions."
  },
  {
    id: 213, category: "Verbal",
    question: "After years of ________ economic growth that brightened the country's collective mood, a prolonged period of economic ________ set in, marked by high unemployment, political instability, and social unrest.",
    options: ["tepid .. stagnation", "rapid .. stability", "sluggish .. malaise", "robust .. contraction"], correct: 3,
    explanation: "Robust growth (strong, positive) followed by contraction (shrinking) — a clear reversal. The contrast matches the sentence structure.",
    concept: "Double-Blank with Contrast.",
    visual: "robust (strong growth) -> then -> contraction (economic shrinking)",
    tip: "The two blanks should describe opposite economic conditions."
  },
  {
    id: 214, category: "Verbal",
    question: "Choose the word most nearly OPPOSITE to: IRRELEVANT",
    options: ["supercilious", "prevalent", "germane", "progressive"], correct: 2,
    explanation: "Irrelevant means not related/applicable. Germane means relevant and appropriate — the direct opposite.",
    concept: "Antonyms — Vocabulary.",
    visual: "IRRELEVANT (not related) <-> GERMANE (relevant, pertinent)",
    tip: "Germane is a formal word for \'relevant\'. Good vocabulary word to memorize."
  },
  {
    id: 215, category: "Verbal",
    question: "Choose the word most nearly OPPOSITE to: PROLIFIC",
    options: ["truthful", "unknown", "obscure", "unproductive"], correct: 3,
    explanation: "Prolific means producing a lot. Unproductive is the opposite.",
    concept: "Antonyms.",
    visual: "PROLIFIC (produces a lot) <-> UNPRODUCTIVE (produces little)",
    tip: "Think of a prolific author — writes many books. Opposite = writes nothing."
  },
  {
    id: 216, category: "Verbal",
    question: "ENTRENCH is to DISLODGE as ...",
    options: ["SUBSCRIBE is to PURSUE", "LOATHE is to CHERISH", "MAINTAIN is to INSIST", "PERUSE is to GANDER"], correct: 1,
    explanation: "Entrench (establish firmly) and dislodge (remove) are antonyms. Loathe (hate) and cherish (love) are antonyms.",
    concept: "Antonym Analogy.",
    visual: "ENTRENCH <-> DISLODGE | LOATHE <-> CHERISH",
    tip: "Both pairs are direct opposites in meaning."
  },
  {
    id: 217, category: "Verbal",
    question: "IRATE is to ANGER as ...",
    options: ["MUTINOUS is to COMPLIANCE", "JOYOUS is to GLEE", "INSENSITIVE is to FRAGILITY", "ACTUAL is to LIKELIHOOD"], correct: 1,
    explanation: "Irate means full of anger. Joyous means full of glee. Both are adjective-to-noun pairs where the adjective embodies the noun.",
    concept: "Adjective-to-Noun Analogy.",
    visual: "IRATE = full of ANGER | JOYOUS = full of GLEE",
    tip: "Ask: \'Is A the adjective form of B?\' Find the matching pair."
  },
  {
    id: 218, category: "Verbal",
    question: "PENCIL is to WRITE as ...",
    options: ["CLOWN is to CIRCUS", "TYPING is to ESSAY", "OVEN is to BAKE", "BALLOON is to INFLATE"], correct: 2,
    explanation: "A pencil is used to write. An oven is used to bake. Both are tool-to-function relationships.",
    concept: "Tool-to-Function Analogy.",
    visual: "PENCIL -> used to -> WRITE | OVEN -> used to -> BAKE",
    tip: "Ask: \'What is A used for?\' Match the same pattern."
  },
  {
    id: 219, category: "Verbal",
    question: "CANOE is to BOAT as ...",
    options: ["MAST is to SAIL", "SUBMARINE is to OCEAN", "HELICOPTER is to AIRCRAFT", "OAR is to MOTOR"], correct: 2,
    explanation: "A canoe is a type of boat. A helicopter is a type of aircraft. Both are specific-to-general category.",
    concept: "Type-to-Category Analogy.",
    visual: "CANOE -> type of -> BOAT | HELICOPTER -> type of -> AIRCRAFT",
    tip: "\'Is A a specific kind of B?\' Find the same relationship."
  },
  {
    id: 220, category: "Verbal",
    question: "Under her mentor's ________, guided by the mentor's decades of experience, the new employee quickly developed the skills that she needed to excel in her job.",
    options: ["pilferage", "suffrage", "shortage", "tutelage"], correct: 3,
    explanation: "Tutelage means guidance or instruction from a mentor. The context clues ('guided by' and 'decades of experience') confirm this.",
    concept: "Context Clues — surrounding words reveal the meaning.",
    visual: "mentor's [guidance] + decades of experience = tutelage",
    tip: "The sentence basically defines the word. \'Guided by experience\' = tutelage."
  },
  {
    id: 221, category: "Verbal",
    question: "Although his minimalistic presentation was not the most ________ in terms of formatting and data visualization, the information that he provided was groundbreaking and well-received by his audience.",
    options: ["tiresome", "elegant", "indecorous", "dubious"], correct: 1,
    explanation: "The presentation was minimalistic (not fancy in formatting) but the content was great. Elegant fits — it wasn't the most polished/refined visually.",
    concept: "Contrast Completion — 'although' signals a contrast.",
    visual: "not the most elegant (visually) BUT groundbreaking (content)",
    tip: "\'Although\' introduces a concession. The blank should describe what was lacking."
  },
  {
    id: 222, category: "Verbal",
    question: "Taking issue with media reports, the president ________ that she had no plans to step down and ________ claims that her office was guilty of corruption.",
    options: ["averred .. detailed", "affirmed .. dismissed", "alleged .. derided", "admitted .. disputed"], correct: 1,
    explanation: "Affirmed (stated firmly) that she won't step down and dismissed (rejected) corruption claims. Both fit a denial narrative.",
    concept: "Double-Blank with Consistent Tone.",
    visual: "affirmed (stated firmly, no stepping down) + dismissed (rejected corruption claims)",
    tip: "Both blanks should support the same stance — denying the media reports."
  },
  {
    id: 223, category: "Verbal",
    question: "Choose the word most nearly OPPOSITE to: ELATION",
    options: ["dejection", "accumulation", "disrespect", "skepticism"], correct: 0,
    explanation: "Elation means great happiness/joy. Dejection means sadness/low spirits — the direct opposite.",
    concept: "Antonyms.",
    visual: "ELATION (great joy) <-> DEJECTION (sadness)",
    tip: "Elation = extreme happiness. Opposite = extreme sadness = dejection."
  },
  {
    id: 224, category: "Verbal",
    question: "FOND is to AFFECTION as ...",
    options: ["INVOLUNTARY is to FREEDOM", "BLATANT is to DISCRETION", "BARREN is to FERTILITY", "ABERRANT is to ANOMALY"], correct: 3,
    explanation: "Being fond relates to affection (same direction). Being aberrant (unusual) relates to anomaly (something unusual). Both are adjective-noun pairs with matching meaning.",
    concept: "Adjective-to-Related-Noun Analogy.",
    visual: "FOND -> relates to -> AFFECTION | ABERRANT -> relates to -> ANOMALY",
    tip: "The other options are OPPOSITE pairs, not matching pairs. Fond/affection both mean liking."
  },
  {
    id: 225, category: "Verbal",
    question: "Aware of the political ________ of making a magnanimous gesture of support, the politician extended her best wishes to her opponent when he fell ill, despite the fact that she had nothing but ________ for him.",
    options: ["favor .. disdain", "advantages .. respect", "utility .. contempt", "convenience .. sadness"], correct: 2,
    explanation: "Utility (usefulness) of making a kind gesture politically, despite having contempt (strong dislike) for the opponent.",
    concept: "Double-Blank — strategic kindness despite true feelings.",
    visual: "political utility (strategic benefit) + contempt (true feeling) = makes sense",
    tip: "The \'despite\' tells you the second blank must conflict with the kind gesture."
  },
  {
    id: 226, category: "Verbal",
    question: "Based on the ________ behavior and ________ toward service staff exhibited by the job applicant before his interview, the hiring manager decided not to move forward with his application.",
    options: ["gregarious .. conceit", "atrocious .. pity", "obnoxious .. chivalry", "supercilious .. insolence"], correct: 3,
    explanation: "Supercilious (arrogant) behavior and insolence (rudeness) toward staff would justify not hiring someone.",
    concept: "Double-Blank — both must be negative traits.",
    visual: "supercilious (arrogant) + insolence (rude) = reason not to hire",
    tip: "Both blanks must be negative since the outcome was rejection."
  },
  {
    id: 301, category: "Verbal",
    question: "David lives west of Katrina. Nathan lives west of David. Katrina lives east of Nathan. Is this True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 0,
    explanation: "From west to east: Nathan, David, Katrina. So Katrina IS east of Nathan. True.",
    concept: "Spatial Logic — draw the positions on a line.",
    visual: "West [Nathan] -- [David] -- [Katrina] East -> Katrina IS east of Nathan",
    tip: "Draw a line and place each person. Then check the final statement."
  },
  {
    id: 302, category: "Verbal",
    question: "Debbie is a cooking instructor. All cooking instructors went to cooking school. Debbie went to cooking school. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 0,
    explanation: "Debbie is a cooking instructor. All cooking instructors went to cooking school. Therefore Debbie went to cooking school. True.",
    concept: "Syllogism — if A is in group B, and all B have property C, then A has property C.",
    visual: "Debbie -> cooking instructor -> all went to cooking school -> True",
    tip: "If \'all\' members of a group share a trait, any specific member has that trait."
  },
  {
    id: 303, category: "Verbal",
    question: "Every employee at Company X is bilingual. Courtney is bilingual. Courtney works at Company X. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 2,
    explanation: "We know all Company X employees are bilingual, and Courtney is bilingual. But many people outside Company X could also be bilingual. We can't confirm she works there.",
    concept: "Affirming the Consequent Fallacy — having the trait doesn't prove membership.",
    visual: "All X employees -> bilingual. Courtney -> bilingual. But bilingual does NOT mean at X.",
    tip: "Just because Courtney has the trait doesn\'t mean she\'s in the group. Many others could too."
  },
  {
    id: 304, category: "Verbal",
    question: "Randall is older than Nicole. Greg is younger than Nicole. Randall is younger than Greg. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 1,
    explanation: "Randall > Nicole > Greg in age. So Randall is OLDER than Greg, not younger. False.",
    concept: "Transitive Ordering.",
    visual: "Age: Randall > Nicole > Greg -> Randall is NOT younger than Greg. False.",
    tip: "Line them up in order, then check the claim."
  },
  {
    id: 305, category: "Verbal",
    question: "Jay was hired before Barbara. Chris was hired after Jay. Barbara was hired before Chris. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 2,
    explanation: "Jay was first. Chris was after Jay. But we don't know if Barbara was before or after Chris — only that she was after Jay.",
    concept: "Incomplete Information — some orderings can't be determined.",
    visual: "Jay first. Barbara after Jay. Chris after Jay. Barbara vs Chris = unknown.",
    tip: "If you can\'t place two items relative to each other, the answer is Uncertain."
  },
  {
    id: 306, category: "Verbal",
    question: "All members of the orchestra attended the concert. Lisa attended the concert. Lisa was a member of the orchestra. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 2,
    explanation: "All orchestra members attended, but non-members could also attend. Lisa attending doesn't prove she's a member.",
    concept: "Affirming the Consequent — attendance doesn't prove membership.",
    visual: "Orchestra -> attended. Lisa attended. But audience also attended. Uncertain.",
    tip: "The concert is open to everyone, not just orchestra members."
  },
  {
    id: 307, category: "Verbal",
    question: "Luke, Alice, and Jenny each have a pet. One has a dog, one has a cat, and the other has a frog. Each got their pet in a different year: 2010, 2012, and 2014. 1) Alice has a frog. 2) Luke got his pet in 2012. 3) The owner of the cat got his or her pet first. Which of the following is true?",
    options: ["Luke got a cat in 2012", "Alice got a frog in 2010", "Jenny got a dog in 2014", "Jenny got a cat in 2010"], correct: 3,
    explanation: "Alice has frog. Cat owner got pet first (2010). Luke got pet in 2012, so Luke doesn't have the cat. Jenny must have the cat and got it in 2010. Luke got dog in 2012. Alice got frog in 2014.",
    concept: "Logic Puzzle — process of elimination.",
    visual: "Cat=2010 | Luke=2012 | Alice=frog -> Jenny=cat=2010, Luke=dog=2012, Alice=frog=2014",
    tip: "Start with the most constrained clue and work outward by elimination."
  },
  {
    id: 308, category: "Verbal",
    question: "Abby knows Denise. Denise knows Sonny. Abby does not know Sonny. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 2,
    explanation: "Knowing someone doesn't mean you know everyone they know. We have no info about Abby and Sonny directly.",
    concept: "Non-Transitive Relationships — 'knowing' doesn't transfer.",
    visual: "Abby -> knows Denise -> knows Sonny. But Abby -> Sonny = unknown.",
    tip: "Unlike \'taller than\', \'knowing someone\' is NOT transitive. You can\'t chain it."
  },
  {
    id: 309, category: "Verbal",
    question: "All supporters of the new mayoral candidate voted in the election. Victoria did not vote in the election. Victoria was a supporter of the new mayoral candidate. True, False, or Uncertain?",
    options: ["True", "False", "Uncertain"], correct: 1,
    explanation: "All supporters voted. Victoria didn't vote. Therefore Victoria was NOT a supporter. False.",
    concept: "Contrapositive Logic — if all A do B, and someone didn't do B, they're not A.",
    visual: "All supporters voted. Victoria didn't vote -> Victoria is NOT a supporter. False.",
    tip: "If the rule is \'all A do B\' and someone doesn\'t do B, they can\'t be A."
  },
  {
    id: 401, category: "Verbal",
    question: "How many of the five items in the left column are exactly the same as the corresponding entry in the right column? Left: Emory Capital | Wu Family Dentistry | Howerton Enterprises | Johnson Engineering | Sonoma Designs. Right: Emery Capital | Wu's Family Dentistry | Howerton Enterprises | Johnston Engineering | Sonora Designs.",
    options: ["1", "2", "3", "4"], correct: 0,
    explanation: "Only 'Howerton Enterprises' matches exactly. Emory/Emery, Wu/Wu's, Johnson/Johnston, Sonoma/Sonora are all different.",
    concept: "Attention to Detail — character-by-character comparison.",
    visual: "Emory!=Emery | Wu!=Wu's | Howerton=Howerton [match] | Johnson!=Johnston | Sonoma!=Sonora",
    tip: "Go letter by letter. Look for added/missing letters, apostrophes, and swapped letters."
  },
  {
    id: 402, category: "Verbal",
    question: "How many of the five items match exactly? Left: Middleton Training Inc. | Laurelmont Corp. | Harrell Automotive | Two Ferns Realty | Simpson Hardware. Right: Middletown Training Inc. | Laurelmont Co. | Harrell Automotive | Two Ferns Realty | Stimpson Hardware.",
    options: ["1", "2", "3", "4"], correct: 1,
    explanation: "Harrell Automotive and Two Ferns Realty match. Middleton/Middletown, Corp./Co., Simpson/Stimpson differ.",
    concept: "Attention to Detail.",
    visual: "Middleton!=Middletown | Corp.!=Co. | Harrell=Harrell [match] | Two Ferns=Two Ferns [match] | Simpson!=Stimpson",
    tip: "Check abbreviations (Corp vs Co), extra letters (town vs ton), and name changes."
  },
  {
    id: 403, category: "Verbal",
    question: "How many of the five items match exactly? Left: 3351 McIntyre Dr. | 9872 Aguacate Ct. | 176 N. Fourteenth St. | 801 Sycamore Ln. | 520 Causeway Blvd. #12. Right: 3351 McIntyre Dr. | 9872 Aguacate Ct. | 176 N. Fortieth St. | 801 Sycamore Ln. | 520 Causeway Blvd. #12.",
    options: ["1", "2", "3", "4"], correct: 3,
    explanation: "All match except 176 N. Fourteenth St. vs 176 N. Fortieth St. So 4 match.",
    concept: "Attention to Detail — address comparison.",
    visual: "McIntyre=McIntyre | Aguacate=Aguacate | Fourteenth!=Fortieth | Sycamore=Sycamore | Causeway=Causeway -> 4 match",
    tip: "Numbers, street names, and suffixes (St, Dr, Ln) all need to match exactly."
  },
  {
    id: 404, category: "Verbal",
    question: "How many of the five items match exactly? Left: Roberts Realty | Elysian Pottery | Apex Fitness | Green's Deli | McCook Consulting. Right: Roberts Realty | Elysian Pottery | Apex Fitness | Greens' Deli | McCook Consulting.",
    options: ["1", "2", "3", "4"], correct: 3,
    explanation: "Green's vs Greens' — apostrophe moved. The other 4 match exactly.",
    concept: "Attention to Detail — apostrophe placement.",
    visual: "Roberts=Roberts | Elysian=Elysian | Apex=Apex | Green's!=Greens' | McCook=McCook -> 4 match",
    tip: "Watch for apostrophe placement — Green\'s vs Greens\' is a real difference."
  },
  {
    id: 405, category: "Verbal",
    question: "How many of the five items match exactly? Left: Corvalis Manufacturing Co. | Hastings Insurance | Feldman Productions | Brown & Ellis Consulting, Inc. | Sylvan & de Young Law Firm. Right: Corvalis Manufacturing Corp. | Hastings Insurance | Feldman Production | Brown & Ellison Consulting, Inc. | Sylvan & De Young Law Firm.",
    options: ["1", "2", "3", "4"], correct: 0,
    explanation: "Only Hastings Insurance matches. Co./Corp., Productions/Production, Ellis/Ellison, de/De all differ.",
    concept: "Attention to Detail.",
    visual: "Co.!=Corp. | Hastings=Hastings [match] | Productions!=Production | Ellis!=Ellison | de!=De -> 1 match",
    tip: "Capitalization matters too! \'de\' vs \'De\' counts as different."
  },
  {
    id: 227, category: "Verbal",
    question: "Even though the team's performance ________ under their old manager, his firing was inevitable given his unethical actions behind closed doors.",
    options: ["dwindled", "stalled", "tarnished", "flourished"], correct: 3,
    explanation: "'Even though' signals contrast. The team did WELL (flourished) but he was fired anyway for ethics violations.",
    concept: "Contrast Signal — 'even though' means the blank contrasts with the outcome.",
    visual: "Even though performance flourished -> still fired (for unethical actions)",
    tip: "\'Even though\' = something positive happened, BUT something negative still occurred."
  },
  {
    id: 228, category: "Verbal",
    question: "The car company's losses continued to ________ as the product recalls drove customers away, rarely a ________ of future growth.",
    options: ["climb .. president", "mount .. precursor", "decrease .. credential", "augment .. byproduct"], correct: 1,
    explanation: "Losses mounting (increasing) due to recalls, which is rarely a precursor (forerunner) of growth.",
    concept: "Double-Blank — losses growing, not a sign of growth.",
    visual: "mount (increase) + precursor (sign of what's to come) = logical pair",
    tip: "Test both words. \'Mount\' works for increasing losses. \'Precursor\' works for predicting growth."
  },
  {
    id: 229, category: "Verbal",
    question: "Although the cabin crewmembers were ________ by the severe turbulence that was shaking the airplane, it was enough to ________ the unfortunate passengers who were less accustomed to the experience.",
    options: ["unbridled .. commiserate", "encouraged .. disconcert", "undaunted .. startle", "betrothed .. contextualize"], correct: 2,
    explanation: "Crew were undaunted (not scared) but passengers were startled (frightened). The contrast makes sense.",
    concept: "Double-Blank with Contrast between groups.",
    visual: "Crew: undaunted (brave) | Passengers: startled (scared) = logical contrast",
    tip: "The crew and passengers react differently — one calm, one scared."
  },
  {
    id: 230, category: "Verbal",
    question: "TRUCK is to TRANSPORT as ...",
    options: ["BASKET is to CART", "CHORE is to CLEAN", "WHEEL is to AXLE", "BED is to REST"], correct: 3,
    explanation: "A truck is used for transport. A bed is used for rest. Both are object-to-purpose relationships.",
    concept: "Object-to-Purpose Analogy.",
    visual: "TRUCK -> purpose -> TRANSPORT | BED -> purpose -> REST",
    tip: "Ask: \'What is A primarily used for?\'"
  },
  {
    id: 231, category: "Verbal",
    question: "SPORADIC is to REGULAR as ...",
    options: ["DISPLEASED is to CONTENT", "INNATE is to CHARACTER", "REMOTE is to SECLUDED", "RARE is to OCCURRENCE"], correct: 0,
    explanation: "Sporadic (irregular) and regular are antonyms. Displeased (unhappy) and content (happy) are antonyms.",
    concept: "Antonym Analogy.",
    visual: "SPORADIC <-> REGULAR | DISPLEASED <-> CONTENT",
    tip: "Both pairs are opposites."
  },
  {
    id: 232, category: "Verbal",
    question: "While the restaurant has always been popular due to the high ________ of its service, the replacement of its old head chef was soon followed by a noticeable improvement in its food as well.",
    options: ["abridgement", "tact", "maturity", "caliber"], correct: 3,
    explanation: "Caliber means quality or standard. The restaurant was known for high caliber (quality) service.",
    concept: "Vocabulary in Context.",
    visual: "high caliber = high quality/standard of service",
    tip: "Caliber = level of quality. \'High caliber\' = excellent."
  },
  {
    id: 233, category: "Verbal",
    question: "Even ________ cynics were moved by the young girl's heroic acts in rescuing her grandmother from a house fire.",
    options: ["hardened", "temperamental", "insidious", "progressive"], correct: 0,
    explanation: "Even hardened (tough, unfeeling) cynics were moved — emphasizing how impressive the acts were.",
    concept: "Emphasis through Extreme — 'even X were moved' means X is normally unmoved.",
    visual: "Even hardened cynics (normally unfeeling) were moved -> very impressive act",
    tip: "\'Even ___\' intensifies the statement. The blank should be the hardest group to impress."
  },
  {
    id: 234, category: "Verbal",
    question: "Apparently ________ by convention or modesty, the vacationer decided to sunbathe in the nude on the crowded beach.",
    options: ["unmasked", "unconstrained", "discomfited", "disguised"], correct: 1,
    explanation: "Unconstrained means not limited by rules or conventions. The person wasn't held back by social norms.",
    concept: "Vocabulary — matching word to described behavior.",
    visual: "unconstrained = not limited by conventions -> sunbathes nude publicly",
    tip: "The person ignores social conventions = unconstrained."
  },
  {
    id: 235, category: "Verbal",
    question: "The beloved celebrity spokesperson, who was featured in the dramatic advertisement for the well-known charity, ________ any and all sympathetic viewers to make a donation to the worthy cause.",
    options: ["defrauded", "implored", "exhumed", "articulated"], correct: 1,
    explanation: "Implored means begged or entreated earnestly — fitting for a charity spokesperson asking for donations.",
    concept: "Vocabulary in Context.",
    visual: "implored = begged/entreated earnestly for donations",
    tip: "Implore = to beg or plead. Perfect for a heartfelt charity appeal."
  },
  {
    id: 236, category: "Verbal",
    question: "As an example of the athlete's ________, she went on to complete the race despite spraining her ankle midway through.",
    options: ["humor", "grit", "frailty", "brilliance"], correct: 1,
    explanation: "Grit means courage and determination. Finishing a race with a sprained ankle shows grit.",
    concept: "Vocabulary — matching trait to demonstrated behavior.",
    visual: "grit = determination/perseverance -> finished race despite injury",
    tip: "Grit = mental toughness. Running through pain = pure grit."
  },
  {
    id: 237, category: "Verbal",
    question: "FALLIBLE is to MISTAKE as ...",
    options: ["GULLIBLE is to MISLEAD", "RATIONAL is to REASON", "LEGIBLE is to WRITING", "CREDIBLE is to DELAY"], correct: 1,
    explanation: "Fallible means capable of making mistakes. Rational means capable of reason. Both are adjective-to-associated-noun pairs.",
    concept: "Adjective-to-Noun Capability Analogy.",
    visual: "FALLIBLE -> prone to -> MISTAKE | RATIONAL -> capable of -> REASON",
    tip: "Ask: \'If you are A, you are associated with B.\' Match that pattern."
  },
  {
    id: 144, category: "Math",
    question: "What would be the next group of letters in the following series? xrfrm ... xqen ... xpdo ... xocp ... ?",
    options: ["xnbp", "xndo", "xnbq", "xpbp"], correct: 2,
    explanation: "First letter stays x. Second: r,q,p,o,n (descending). Third: f,e,d,c,b (descending). Fourth: r,e,d,c,b... wait. Let me re-examine: positions 2-5 each decrease by 1. So n,b,q fits the pattern of each shifting down one letter.",
    concept: "Multi-position Letter Sequence — each position follows its own rule.",
    visual: "Pos2: r,q,p,o,n | Pos3: f,e,d,c,b | Pos4: r,n,o,p,q | Answer: xnbq",
    tip: "Track each letter position separately — they often follow independent patterns."
  },
  {
    id: 145, category: "Math",
    question: "What would be the next group of letters in the following series? bd ... eg ... hj ... km ... ?",
    options: ["no", "kn", "mo", "np"], correct: 3,
    explanation: "First letters: b,e,h,k,n (+3 each). Second letters: d,g,j,m,p (+3 each). Next: np.",
    concept: "Letter Sequence with Constant Spacing.",
    visual: "First: b+3=e+3=h+3=k+3=n | Second: d+3=g+3=j+3=m+3=p -> np",
    tip: "Check each position independently. Both advance by 3 letters."
  },
  {
    id: 146, category: "Math",
    question: "What would be the next group of letters in the following series? wxgz ... vxhy ... uxix ... txjw ... ?",
    options: ["sxkv", "sxiv", "rxlw", "sxkw"], correct: 0,
    explanation: "Pos1: w,v,u,t,s (-1). Pos2: x stays. Pos3: g,h,i,j,k (+1). Pos4: z,y,x,w,v (-1). Answer: sxkv.",
    concept: "Multi-position Letter Sequence.",
    visual: "Pos1: -1 each | Pos2: constant x | Pos3: +1 each | Pos4: -1 each -> sxkv",
    tip: "Track each position separately. Some go up, some go down, some stay constant."
  },
];

// ─── STORAGE HELPERS ─────────────────────────────────────────────
const storageGet = async (key) => {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
};
const storageSet = async (key, val) => {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
};

// ─── CONSTANTS ───────────────────────────────────────────────────
const CATEGORIES = ["Math", "Verbal"];
const CAT_COLORS = { Math: "#4DA6FF", Verbal: "#A78BFA" };
const CAT_ICON_COMPONENTS = {
  Math: (s) => Icons.hash({size: s || 22, color: CAT_COLORS.Math}),
  Verbal: (s) => Icons.edit({size: s || 22, color: CAT_COLORS.Verbal}),
};
const TOTAL_TIME = 15 * 60; // 15 minutes

// ─── MAIN APP ────────────────────────────────────────────────────
export default function CCATApp() {
  const [page, setPage] = useState("dashboard");
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await storageGet("ccat-sessions");
      if (s) setSessions(s);
      setLoaded(true);
    })();
  }, []);

  const saveSessions = async (s) => {
    setSessions(s);
    await storageSet("ccat-sessions", s);
  };

  const startTest = (category = null) => {
    let qs = category
      ? QUESTIONS.filter(q => q.category === category)
      : [...QUESTIONS];
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    if (!category) qs = qs.slice(0, 50);
    setCurrentSession({
      questions: qs, answers: {}, currentQ: 0,
      startTime: Date.now(), category, reviewed: {},
    });
    setPage("quiz");
  };

  const endTest = async () => {
    if (!currentSession) return;
    const { questions, answers, startTime, category } = currentSession;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    let correct = 0;
    questions.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
    const session = {
      id: Date.now(), date: new Date().toISOString(),
      category: category || "Full Test", total: questions.length,
      correct, timeUsed: elapsed,
      answers: { ...answers }, questionIds: questions.map(q => q.id),
    };
    await saveSessions([session, ...sessions]);
    setCurrentSession(null);
    setPage("results");
  };

  if (!loaded) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#101922"}}>
      {Icons.brain({size: 48, color: "#2b8cee"})}
      <div style={{color:"#64748B",fontSize:16,marginTop:16,fontFamily:"'Lexend',sans-serif"}}>Loading CCAT Study...</div>
    </div>
  );

  // Compute stats for child components
  const totalQ = sessions.reduce((a, s) => a + s.total, 0);
  const totalCorrect = sessions.reduce((a, s) => a + s.correct, 0);
  const accuracy = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

  const getCatStats = (cat) => {
    let cc = 0, ct = 0;
    sessions.forEach(s => {
      s.questionIds.forEach((qid, idx) => {
        const q = QUESTIONS.find(qq => qq.id === qid);
        if (q && q.category === cat) { ct++; if (s.answers[idx] === q.correct) cc++; }
      });
    });
    return { correct: cc, total: ct, pct: ct > 0 ? Math.round((cc / ct) * 100) : 0 };
  };

  const BG = "#101922";
  const CARD = "#0F172A";
  const BORDER = "#1E293B";
  const PRI = "#2b8cee";

  return (
    <div style={{minHeight:"100vh",background:BG,color:"#E2E8F0",fontFamily:"'Lexend',sans-serif"}}>
      <style>{globalCSS}</style>
      {page === "quiz" && currentSession ? (
        <PracticeView session={currentSession} setSession={setCurrentSession} onEnd={endTest}
          onExit={() => { setCurrentSession(null); setPage("dashboard"); }} />
      ) : (
        <>
          <AppHeader page={page} setPage={setPage} sessions={sessions} />
          <div style={{maxWidth:1120,margin:"0 auto",padding:"24px 16px",minHeight:"calc(100vh - 65px)"}}>
            {page === "dashboard" && <Dashboard sessions={sessions} onStart={startTest} setPage={setPage} accuracy={accuracy} getCatStats={getCatStats} />}
            {page === "practice" && <PracticeSelect onStart={startTest} getCatStats={getCatStats} />}
            {page === "results" && <Results sessions={sessions} />}
            {page === "history" && <History sessions={sessions} />}
            {page === "resources" && <Resources />}
          </div>
        </>
      )}
    </div>
  );
}

// ─── APP HEADER ──────────────────────────────────────────────────
function AppHeader({ page, setPage, sessions }) {
  const tabs = [
    { id: "dashboard", label: "Home", filled: true },
    { id: "practice", label: "Practice", filled: false },
    { id: "results", label: "Progress", filled: false },
    { id: "history", label: "History", filled: false },
    { id: "resources", label: "Resources", filled: false },
  ];
  return (
    <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #1E293B",background:"#101922",padding:"0 24px",height:65,position:"sticky",top:0,zIndex:50}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{background:"#2b8cee",padding:8,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {Icons.brain({size: 20, color: "#fff"})}
        </div>
        <span style={{fontSize:18,fontWeight:800,letterSpacing:"-0.02em"}}>CCAT Study</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:2}}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setPage(t.id)}
            style={{padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"'Lexend',sans-serif",fontSize:13,fontWeight:page===t.id?700:500,
              background:page===t.id?"#1E293B":"transparent",color:page===t.id?"#2b8cee":"#64748B",transition:"all 0.15s"}}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:36,height:36,borderRadius:18,background:"#2b8cee20",border:"1px solid #2b8cee30",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#2b8cee"}}>
          {sessions?.length > 0 ? sessions.length : "0"}
        </div>
      </div>
    </header>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────
function Dashboard({ sessions, onStart, setPage, accuracy, getCatStats }) {
  const mathStats = getCatStats("Math");
  const verbalStats = getCatStats("Verbal");
  const totalQ = sessions.reduce((a, s) => a + s.total, 0);
  const streak = Math.min(sessions.length, 7); // Simplified streak

  const C = { card: "#0F172A", border: "#1E293B", pri: "#2b8cee" };

  return (
    <div>
      {/* Welcome + Goal Ring */}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24,marginBottom:32,alignItems:"center"}}>
        <div>
          <h1 style={{fontSize:36,fontWeight:900,color:"#fff",marginBottom:12}}>Welcome back!</h1>
          <p style={{fontSize:18,color:"#94A3B8",lineHeight:1.7,maxWidth:480}}>
            {sessions.length > 0 ? `You've completed ${sessions.length} sessions with ${totalQ} questions answered. Keep it up!` : "Start your first practice session to track your progress here."}
          </p>
        </div>
        <div style={{background:C.card,padding:24,borderRadius:16,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:20}}>
          <div style={{position:"relative",width:80,height:80}}>
            <svg width="80" height="80" style={{transform:"rotate(-90deg)"}}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#1E293B" strokeWidth="7"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke={C.pri} strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${(accuracy/100)*213.6} 213.6`}/>
            </svg>
            <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700}}>{accuracy}%</span>
          </div>
          <div>
            <p style={{fontSize:16,fontWeight:700}}>Overall Accuracy</p>
            <p style={{fontSize:13,color:"#64748B"}}>{totalQ} questions</p>
            {accuracy >= 50 && <p style={{fontSize:12,fontWeight:600,color:"#10B981",marginTop:4}}>On track!</p>}
          </div>
        </div>
      </div>

      {/* Hero Action Cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:40}}>
        <button onClick={() => onStart(null)} style={{position:"relative",overflow:"hidden",borderRadius:16,background:C.pri,padding:"20px 24px",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"'Lexend',sans-serif",color:"#fff"}}>
          <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",opacity:0.8}}>Quick Start</span>
          <h3 style={{fontSize:22,fontWeight:900,margin:"4px 0 6px",lineHeight:1.3}}>Full Practice Test</h3>
          <p style={{fontSize:14,opacity:0.9}}>50 questions from all categories</p>
          <div style={{marginTop:12,display:"flex",alignItems:"center",gap:10}}>
            <span style={{background:"#fff",color:C.pri,padding:"8px 18px",borderRadius:10,fontWeight:700,fontSize:14}}>Start Now</span>
          </div>
        </button>
        <button onClick={() => setPage("practice")} style={{position:"relative",overflow:"hidden",borderRadius:16,background:"#10B981",padding:"20px 24px",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"'Lexend',sans-serif",color:"#fff"}}>
          <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",opacity:0.8}}>Targeted</span>
          <h3 style={{fontSize:22,fontWeight:900,margin:"4px 0 6px",lineHeight:1.3}}>Category Practice</h3>
          <p style={{fontSize:14,opacity:0.9}}>Focus on Math or Verbal skills</p>
          <div style={{marginTop:12,display:"flex",alignItems:"center",gap:10}}>
            <span style={{background:"#fff",color:"#10B981",padding:"8px 18px",borderRadius:10,fontWeight:700,fontSize:14}}>Choose Category</span>
          </div>
        </button>
      </div>

      {/* Study Categories */}
      <h2 style={{fontSize:22,fontWeight:900,marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
        {Icons.chart({size: 20, color: "#2b8cee"})} Study Categories
      </h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:40}}>
        <div style={{background:C.card,padding:24,borderRadius:16,borderBottom:"4px solid #4DA6FF"}}>
          <div style={{width:48,height:48,borderRadius:24,background:"#4DA6FF20",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
            {Icons.hash({size: 24, color: "#4DA6FF"})}
          </div>
          <h4 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Math & Logic</h4>
          <p style={{fontSize:13,color:"#64748B",marginBottom:16}}>Rates, percentages, sequences & word problems</p>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
            <span style={{fontWeight:500}}>Mastery</span>
            <span style={{fontWeight:700}}>{mathStats.pct}%</span>
          </div>
          <div style={{height:6,background:"#1E293B",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",background:"#4DA6FF",borderRadius:3,width:`${mathStats.pct}%`,transition:"width 0.5s"}}/>
          </div>
        </div>
        <div style={{background:C.card,padding:24,borderRadius:16,borderBottom:"4px solid #A78BFA"}}>
          <div style={{width:48,height:48,borderRadius:24,background:"#A78BFA20",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
            {Icons.edit({size: 24, color: "#A78BFA"})}
          </div>
          <h4 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Verbal</h4>
          <p style={{fontSize:13,color:"#64748B",marginBottom:16}}>Analogies, sentence completion & vocabulary</p>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
            <span style={{fontWeight:500}}>Mastery</span>
            <span style={{fontWeight:700}}>{verbalStats.pct}%</span>
          </div>
          <div style={{height:6,background:"#1E293B",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",background:"#A78BFA",borderRadius:3,width:`${verbalStats.pct}%`,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>

      {/* Recent Sessions + Quick Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* Recent Sessions */}
        <div style={{background:C.card,padding:24,borderRadius:16,border:`1px solid ${C.border}`}}>
          <h3 style={{fontSize:18,fontWeight:900,marginBottom:20}}>Recent Sessions</h3>
          {sessions.length === 0 ? (
            <p style={{color:"#64748B",fontSize:14}}>No sessions yet. Start practicing!</p>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {sessions.slice(0, 4).map(s => {
                const pct = Math.round((s.correct/s.total)*100);
                const color = pct >= 75 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444";
                return (
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:10,background:"#111827"}}>
                    <div style={{width:40,height:40,borderRadius:20,background:color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color}}>{pct}%</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600}}>{s.category}</div>
                      <div style={{fontSize:11,color:"#64748B"}}>{s.correct}/{s.total} correct</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* Achievements */}
        <div style={{background:C.card,padding:24,borderRadius:16,border:`1px solid ${C.border}`}}>
          <h3 style={{fontSize:18,fontWeight:900,marginBottom:20}}>Achievements</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:10,background:"#111827",opacity:sessions.length>=5?1:0.4}}>
              <div style={{width:40,height:40,borderRadius:20,background:sessions.length>=5?"#F59E0B":"#334155",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icons.trending({size: 18, color: "#fff"})}
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:700}}>Consistency</div>
                <div style={{fontSize:11,color:"#64748B"}}>Complete 5 sessions</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:10,background:"#111827",opacity:accuracy>=80?1:0.4}}>
              <div style={{width:40,height:40,borderRadius:20,background:accuracy>=80?"#2b8cee":"#334155",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icons.check({size: 18, color: "#fff"})}
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:700}}>Sharp Mind</div>
                <div style={{fontSize:11,color:"#64748B"}}>Reach 80% overall accuracy</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:10,background:"#111827",opacity:totalQ>=200?1:0.4}}>
              <div style={{width:40,height:40,borderRadius:20,background:totalQ>=200?"#10B981":"#334155",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {Icons.target({size: 18, color: "#fff"})}
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:700}}>Veteran</div>
                <div style={{fontSize:11,color:"#64748B"}}>Answer 200 questions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRACTICE SELECT ─────────────────────────────────────────────
function PracticeSelect({ onStart, getCatStats }) {
  const [mode, setMode] = useState("relaxed");
  const mathStats = getCatStats("Math");
  const verbalStats = getCatStats("Verbal");

  const getLabel = (pct) => {
    if (pct >= 75) return { text: "Proficient", color: "#10B981", bg: "#10B98120" };
    if (pct >= 40) return { text: "Improving", color: "#F59E0B", bg: "#F59E0B20" };
    if (pct > 0) return { text: "Focus Area", color: "#EF4444", bg: "#EF444420" };
    return { text: "New", color: "#64748B", bg: "#64748B20" };
  };

  const categories = [
    { id: "Math", name: "Number Series & Math", desc: "Rates, percentages, sequences, and word problems", stats: mathStats, icon: Icons.hash },
    { id: "Verbal", name: "Verbal & Logic", desc: "Analogies, vocabulary, sentence completion, and deduction", stats: verbalStats, icon: Icons.edit },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{marginBottom:32}}>
        <h1 style={{fontSize:28,fontWeight:900,marginBottom:8}}>Select Category</h1>
        <p style={{fontSize:15,color:"#64748B"}}>Target specific cognitive skills to improve your overall score.</p>
      </div>

      {/* Mode Toggle */}
      <div style={{marginBottom:32}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#64748B",marginBottom:12}}>Training Environment</div>
        <div style={{display:"flex",maxWidth:360,padding:4,background:"#1E293B",borderRadius:12}}>
          <button onClick={() => setMode("relaxed")}
            style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Lexend',sans-serif",fontSize:13,fontWeight:600,
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all 0.2s",
              background:mode==="relaxed"?"#101922":"transparent",color:mode==="relaxed"?"#2b8cee":"#64748B",
              boxShadow:mode==="relaxed"?"0 1px 3px rgba(0,0,0,0.3)":"none"}}>
            {Icons.book({size: 16, color: mode==="relaxed"?"#2b8cee":"#64748B"})} Relaxed Mode
          </button>
          <button onClick={() => setMode("timed")}
            style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Lexend',sans-serif",fontSize:13,fontWeight:600,
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all 0.2s",
              background:mode==="timed"?"#101922":"transparent",color:mode==="timed"?"#2b8cee":"#64748B",
              boxShadow:mode==="timed"?"0 1px 3px rgba(0,0,0,0.3)":"none"}}>
            {Icons.clock({size: 16, color: mode==="timed"?"#2b8cee":"#64748B"})} Time Attack
          </button>
        </div>
      </div>

      {/* Category Cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:40}}>
        {categories.map(cat => {
          const label = getLabel(cat.stats.pct);
          return (
            <button key={cat.id} onClick={() => onStart(cat.id)}
              style={{display:"flex",flexDirection:"column",padding:24,borderRadius:16,border:"1px solid #1E293B",background:"#0F172A",cursor:"pointer",textAlign:"left",fontFamily:"'Lexend',sans-serif",color:"#E2E8F0",transition:"all 0.2s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{padding:10,borderRadius:10,background:"#2b8cee20"}}>
                  {cat.icon({size: 22, color: "#2b8cee"})}
                </div>
                <span style={{fontSize:10,fontWeight:700,padding:"4px 8px",borderRadius:4,background:label.bg,color:label.color,textTransform:"uppercase"}}>{label.text}</span>
              </div>
              <h3 style={{fontSize:17,fontWeight:700,marginBottom:4}}>{cat.name}</h3>
              <p style={{fontSize:13,color:"#64748B",marginBottom:20,lineHeight:1.6}}>{cat.desc}</p>
              <div style={{marginTop:"auto"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:6}}>
                  <span style={{fontWeight:500}}>Mastery Level</span>
                  <span style={{fontWeight:700}}>{cat.stats.pct}%</span>
                </div>
                <div style={{height:6,background:"#1E293B",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",background:"#2b8cee",borderRadius:3,width:`${cat.stats.pct}%`,transition:"width 0.5s"}}/>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Adaptive Mix */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,padding:24,borderRadius:16,background:"#2b8cee10",border:"1px solid #2b8cee30",flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:48,height:48,borderRadius:24,background:"#2b8cee",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {Icons.brain({size: 22, color: "#fff"})}
          </div>
          <div>
            <h4 style={{fontSize:16,fontWeight:700}}>Adaptive Mix</h4>
            <p style={{fontSize:13,color:"#64748B"}}>Personalized session based on your weakest areas.</p>
          </div>
        </div>
        <button onClick={() => onStart(null)}
          style={{padding:"12px 28px",background:"#2b8cee",color:"#fff",fontWeight:700,borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Lexend',sans-serif",fontSize:14,boxShadow:"0 4px 16px rgba(43,140,238,0.3)"}}>
          Start Smart Session
        </button>
      </div>
    </div>
  );
}

// ─── PRACTICE VIEW ───────────────────────────────────────────────
function PracticeView({ session, setSession, onEnd, onExit }) {
  const { questions, answers, currentQ, startTime, reviewed } = session;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(answers[currentQ] ?? null);
  const [showResult, setShowResult] = useState(reviewed[currentQ] || false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [flagged, setFlagged] = useState({});
  const timerRef = useRef(null);
  const pausedTimeRef = useRef(0);
  const pauseStartRef = useRef(null);

  useEffect(() => {
    if (showBreakdown) {
      clearInterval(timerRef.current);
      pauseStartRef.current = Date.now();
    } else {
      if (pauseStartRef.current) {
        pausedTimeRef.current += Date.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
      timerRef.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - startTime - pausedTimeRef.current) / 1000);
        const remaining = Math.max(0, TOTAL_TIME - elapsed);
        setTimeLeft(remaining);
        if (remaining <= 0) { clearInterval(timerRef.current); onEnd(); }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, showBreakdown]);

  useEffect(() => {
    setSelectedAnswer(answers[currentQ] ?? null);
    setShowResult(reviewed[currentQ] || false);
    setShowBreakdown(false);
  }, [currentQ]);

  const q = questions[currentQ];
  const isCorrect = selectedAnswer === q.correct;
  const catColor = CAT_COLORS[q.category];
  const selectAnswer = (idx) => { if (showResult) return; setSelectedAnswer(idx); setSession(prev => ({...prev, answers: {...prev.answers, [currentQ]: idx}})); };
  const checkAnswer = () => { if (selectedAnswer === null) return; setShowResult(true); setSession(prev => ({...prev, reviewed: {...prev.reviewed, [currentQ]: true}})); };
  const goNext = () => { if (currentQ < questions.length - 1) setSession(prev => ({...prev, currentQ: currentQ + 1})); };
  const goPrev = () => { if (currentQ > 0) setSession(prev => ({...prev, currentQ: currentQ - 1})); };
  const toggleFlag = () => setFlagged(prev => ({...prev, [currentQ]: !prev[currentQ]}));
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeColor = timeLeft < 60 ? "#EF4444" : timeLeft < 180 ? "#F59E0B" : "#2b8cee";
  const progress = Math.round(((currentQ + 1) / questions.length) * 100);

  const getOptionStyle = (idx) => {
    const base = { display: "flex", alignItems: "center", padding: "18px 20px", borderRadius: 12, border: "2px solid #1E293B", background: "#0F172A", cursor: showResult ? "default" : "pointer", transition: "all 0.15s", fontFamily: "'Lexend', sans-serif", color: "#E2E8F0", fontSize: 16, fontWeight: 500, gap: 14, textAlign: "left", width: "100%" };
    if (showResult) {
      if (idx === q.correct) return {...base, borderColor: "#10B981", background: "#10B98110"};
      if (idx === selectedAnswer && idx !== q.correct) return {...base, borderColor: "#EF4444", background: "#EF444410"};
      return {...base, opacity: 0.5};
    }
    if (idx === selectedAnswer) return {...base, borderColor: "#2b8cee", background: "#2b8cee10"};
    return base;
  };

  const getRadioStyle = (idx) => {
    const base = { width: 22, height: 22, borderRadius: 11, border: "2px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" };
    if (showResult && idx === q.correct) return {...base, borderColor: "#10B981", background: "#10B981"};
    if (showResult && idx === selectedAnswer && idx !== q.correct) return {...base, borderColor: "#EF4444", background: "#EF4444"};
    if (idx === selectedAnswer) return {...base, borderColor: "#2b8cee", background: "#2b8cee"};
    return base;
  };

  const isActive = (idx) => (showResult && (idx === q.correct || idx === selectedAnswer)) || idx === selectedAnswer;

  return (
    <div style={{minHeight: "100vh", background: "#101922", color: "#E2E8F0", fontFamily: "'Lexend', sans-serif", display: "flex", flexDirection: "column"}}>
      {/* Header */}
      <header style={{position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #1E293B", background: "rgba(16,25,34,0.9)", backdropFilter: "blur(12px)", padding: "0 16px"}}>
        <div style={{maxWidth: 800, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <div style={{background: "#2b8cee", padding: 6, borderRadius: 8, display: "flex", alignItems: "center"}}>{Icons.brain({size: 18, color: "#fff"})}</div>
            <span style={{fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em"}}>CCAT Master</span>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 16}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
              <span style={{fontSize: 10, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em"}}>Time Remaining</span>
              <span style={{fontSize: 14, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: timeColor}}>{mins}:{secs.toString().padStart(2, "0")}</span>
            </div>
            <button onClick={onExit} style={{padding: 8, borderRadius: 8, background: "#1E293B", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#94A3B8", fontFamily: "'Lexend', sans-serif", fontSize: 13, gap: 4}}>Exit</button>
          </div>
        </div>
      </header>

      <main style={{flex: 1, maxWidth: 800, margin: "0 auto", width: "100%", padding: "32px 16px"}}>
        {/* Progress */}
        <div style={{marginBottom: 40}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10}}>
            <div>
              <span style={{color: "#2b8cee", fontWeight: 700, fontSize: 18}}>Question {currentQ + 1}</span>
              <span style={{color: "#64748B", fontWeight: 500}}> of {questions.length}</span>
            </div>
            <span style={{fontSize: 13, fontWeight: 600, color: "#64748B"}}>{progress}% Complete</span>
          </div>
          <div style={{height: 10, width: "100%", background: "#1E293B", borderRadius: 999, overflow: "hidden"}}>
            <div style={{height: "100%", background: "#2b8cee", borderRadius: 999, transition: "width 0.5s ease", width: `${progress}%`}} />
          </div>
        </div>

        {/* Category + Question */}
        <div style={{marginBottom: 24}}>
          <span style={{display: "inline-block", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: catColor + "20", color: catColor, marginBottom: 16}}>{q.category}</span>
          <h2 style={{fontSize: 22, fontWeight: 600, lineHeight: 1.7, color: "#F1F5F9", letterSpacing: "0.01em"}}>{q.question}</h2>
        </div>

        {/* Options */}
        <div style={{display: "flex", flexDirection: "column", gap: 12, marginBottom: 32}}>
          {q.options.map((opt, idx) => (
            <button key={idx} style={getOptionStyle(idx)} onClick={() => selectAnswer(idx)}>
              <div style={getRadioStyle(idx)}>
                {isActive(idx) && <div style={{width: 8, height: 8, borderRadius: 4, background: "#fff"}} />}
              </div>
              <span style={{flex: 1}}>{opt}</span>
              {showResult && idx === q.correct && <span style={{color: "#10B981", fontWeight: 700, fontSize: 18}}>✓</span>}
              {showResult && idx === selectedAnswer && idx !== q.correct && <span style={{color: "#EF4444", fontWeight: 700, fontSize: 18}}>✗</span>}
            </button>
          ))}
        </div>

        {/* Post-answer */}
        {showResult && (
          <>
            {/* Result Banner */}
            <div style={{display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 20px", borderRadius: 12, border: "1px solid", marginBottom: 24, background: isCorrect ? "#10B98110" : "#EF444410", borderColor: isCorrect ? "#10B981" : "#EF4444"}}>
              <span style={{display:"flex",alignItems:"center"}}>{isCorrect ? Icons.check({size: 22, color: "#10B981"}) : Icons.xCircle({size: 22, color: "#EF4444"})}</span>
              <div>
                <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4, color: isCorrect ? "#10B981" : "#EF4444"}}>
                  {isCorrect ? "Correct!" : `Not quite. The answer is: ${q.options[q.correct]}`}
                </div>
                <div style={{fontSize: 14, color: "#CBD5E1", lineHeight: 1.7}}>{q.explanation}</div>
              </div>
            </div>

            {/* Breakdown toggle */}
            <button onClick={() => setShowBreakdown(!showBreakdown)} style={{display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#2b8cee", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Lexend', sans-serif", padding: "8px 0", marginBottom: 8}}>
              {Icons.trending({size: 16, color: "#2b8cee"})}
              <span>{showBreakdown ? "Hide" : "Show"} Visual Breakdown</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2b8cee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transform: showBreakdown ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s"}}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {showBreakdown && (
              <div style={{padding: 28, borderRadius: 16, background: "#0F1629", border: "1px solid #1E293B", backgroundImage: "radial-gradient(circle at 2px 2px, rgba(43,140,238,0.06) 1px, transparent 0)", backgroundSize: "24px 24px"}}>
                <div style={{fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748B", marginBottom: 20, display: "flex", alignItems: "center", gap: 8}}>
                  <div style={{width: 6, height: 6, borderRadius: 3, background: "#2b8cee"}} />
                  Question Breakdown
                </div>

                {/* Visual */}
                <div style={{padding: 14, borderRadius: 10, border: "1px solid #1E293B", background: "#111827", marginBottom: 12}}>
                  <div style={{fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6, color: "#A78BFA"}}>{Icons.palette({size: 13, color: "#A78BFA"})} Visual</div>
                  <div style={{fontSize: 16, fontFamily: "'JetBrains Mono', monospace", color: "#F8FAFC", letterSpacing: "0.03em", lineHeight: 1.8}}>{q.visual}</div>
                </div>

                {/* Concept + Tip */}
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16}}>
                  <div style={{padding: 14, borderRadius: 10, border: "1px solid #1E293B", background: "#111827"}}>
                    <div style={{fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6, color: "#60A5FA"}}>{Icons.book({size: 13, color: "#60A5FA"})} Concept</div>
                    <div style={{fontSize: 14, color: "#94A3B8", lineHeight: 1.7}}>{q.concept}</div>
                  </div>
                  <div style={{padding: 14, borderRadius: 10, border: "1px solid #1E293B", background: "#111827"}}>
                    <div style={{fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6, color: "#FBBF24"}}>{Icons.lightbulb({size: 13, color: "#FBBF24"})} Memory Tip</div>
                    <div style={{fontSize: 14, color: "#94A3B8", lineHeight: 1.7}}>{q.tip}</div>
                  </div>
                </div>

                {/* AI Tutor */}
                <TutorChat question={q} selectedAnswer={selectedAnswer} isCorrect={isCorrect} />
              </div>
            )}
          </>
        )}

        <div style={{height: 80}} />
      </main>

      {/* Bottom Nav */}
      <div style={{position: "fixed", bottom: 0, left: 0, right: 0, background: "#101922", borderTop: "1px solid #1E293B", padding: "12px 16px", zIndex: 40}}>
        <div style={{maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12}}>
          <button onClick={goPrev} disabled={currentQ === 0} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: currentQ === 0 ? "default" : "pointer", border: "none", fontFamily: "'Lexend', sans-serif", background: "#1E293B", color: "#94A3B8", opacity: currentQ === 0 ? 0.4 : 1}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          {!showResult ? (
            <button onClick={checkAnswer} disabled={selectedAnswer === null} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", border: "none", fontFamily: "'Lexend', sans-serif", flex: "1 1 auto", maxWidth: 260, background: selectedAnswer === null ? "#1E293B" : "#2b8cee", color: selectedAnswer === null ? "#475569" : "#fff", boxShadow: selectedAnswer !== null ? "0 4px 20px rgba(43,140,238,0.3)" : "none"}}>
              Check Answer
            </button>
          ) : (
            <button onClick={toggleFlag} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Lexend', sans-serif", background: "none", border: `2px solid ${flagged[currentQ] ? "#F59E0B" : "#334155"}`, color: flagged[currentQ] ? "#F59E0B" : "#64748B"}}>
              {Icons.alert({size: 16, color: flagged[currentQ] ? "#F59E0B" : "#64748B"})} Flag
            </button>
          )}
          <button onClick={currentQ < questions.length - 1 ? goNext : onEnd} disabled={!showResult} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: !showResult ? "default" : "pointer", border: "none", fontFamily: "'Lexend', sans-serif", background: showResult ? "#2b8cee" : "#1E293B", color: showResult ? "#fff" : "#475569", opacity: showResult ? 1 : 0.4, boxShadow: showResult ? "0 4px 20px rgba(43,140,238,0.3)" : "none"}}>
            {currentQ < questions.length - 1 ? "Next" : "Finish"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS / ANALYSIS ─────────────────────────────────────────
function Results({ sessions }) {
  const C = { card: "#0F172A", border: "#1E293B", pri: "#2b8cee" };

  if (sessions.length === 0) return (
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"100px 20px",textAlign:"center",background:C.card,borderRadius:16,border:`1px solid ${C.border}`}}>
        {Icons.chart({size: 56, color: "#334155"})}
        <h2 style={{fontSize:24,fontWeight:800,color:"#F8FAFC",marginTop:24}}>No Progress Data Yet</h2>
        <p style={{fontSize:15,color:"#64748B",marginTop:10,maxWidth:340}}>Complete a practice test to see your detailed performance analysis here.</p>
      </div>
    </div>
  );

  const totalQ = sessions.reduce((a, s) => a + s.total, 0);
  const totalCorrect = sessions.reduce((a, s) => a + s.correct, 0);
  const overallPct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
  const totalTime = sessions.reduce((a, s) => a + s.timeUsed, 0);
  const avgTime = totalQ > 0 ? Math.round(totalTime / totalQ) : 0;

  const catData = {};
  CATEGORIES.forEach(c => {
    let cc = 0, ct = 0;
    sessions.forEach(s => {
      s.questionIds.forEach((qid, idx) => {
        const q = QUESTIONS.find(qq => qq.id === qid);
        if (q && q.category === c) { ct++; if (s.answers[idx] === q.correct) cc++; }
      });
    });
    catData[c] = { correct: cc, total: ct, pct: ct > 0 ? Math.round((cc / ct) * 100) : 0 };
  });

  const estScore = Math.round((overallPct / 100) * 50);
  const percentile = estScore >= 42 ? "90th+" : estScore >= 35 ? "75-89th" : estScore >= 28 ? "50-74th" : estScore >= 20 ? "25-49th" : "Below 25th";
  const readinessLabel = overallPct >= 80 ? "Exceptional" : overallPct >= 65 ? "Strong" : overallPct >= 50 ? "Average" : overallPct >= 30 ? "Improving" : "Developing";
  const readinessColor = overallPct >= 65 ? "#10B981" : overallPct >= 50 ? "#2b8cee" : overallPct >= 30 ? "#F59E0B" : "#EF4444";

  // Trend data
  const recentSessions = sessions.slice(0, 14).reverse();
  const prevPct = recentSessions.length >= 2 ? Math.round((recentSessions[0].correct / recentSessions[0].total) * 100) : 0;
  const latestPct = recentSessions.length >= 2 ? Math.round((recentSessions[recentSessions.length-1].correct / recentSessions[recentSessions.length-1].total) * 100) : 0;
  const trendUp = latestPct >= prevPct;

  // Weakest category
  const weakCat = CATEGORIES.reduce((w, c) => (!w || catData[c].pct < catData[w].pct) ? c : w, null);

  return (
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      {/* Top: Gauge + Stats Grid */}
      <div style={{display:"grid",gridTemplateColumns:"5fr 7fr",gap:24,marginBottom:32}}>
        {/* Accuracy Ring */}
        <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:32,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <h3 style={{fontSize:16,fontWeight:600,marginBottom:24,alignSelf:"flex-start"}}>Overall Accuracy</h3>
          <div style={{position:"relative",width:180,height:180}}>
            <svg width="180" height="180" style={{transform:"rotate(-90deg)"}}>
              <circle cx="90" cy="90" r="78" fill="none" stroke="#1E293B" strokeWidth="12"/>
              <circle cx="90" cy="90" r="78" fill="none" stroke={C.pri} strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${(overallPct/100)*490} 490`}/>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:44,fontWeight:900}}>{overallPct}%</span>
              <span style={{fontSize:10,fontWeight:600,color:"#64748B",textTransform:"uppercase",letterSpacing:"0.12em"}}>{readinessLabel}</span>
            </div>
          </div>
          <p style={{fontSize:13,color:"#64748B",textAlign:"center",marginTop:20,lineHeight:1.6}}>
            {overallPct >= 75 ? "Excellent performance. You're in the top tier of CCAT candidates." : overallPct >= 50 ? "Solid progress. Keep focusing on your weaker areas." : "Keep practicing daily. Consistency is the key to improvement."}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            { label: "Estimated Score", value: `${estScore}/50`, icon: Icons.target, iconColor: "#2b8cee", iconBg: "#2b8cee15", trend: trendUp ? "+2%" : null, trendColor: "#10B981" },
            { label: "Percentile", value: percentile, icon: Icons.trending, iconColor: "#A78BFA", iconBg: "#A78BFA15", trend: trendUp ? "+5%" : null, trendColor: "#10B981" },
            { label: "Total Questions", value: totalQ.toLocaleString(), icon: Icons.help, iconColor: "#F59E0B", iconBg: "#F59E0B15", trend: `+${Math.min(totalQ, sessions[0]?.total || 0)} Qs`, trendColor: "#64748B" },
            { label: "Avg Time/Q", value: `${avgTime}s`, icon: Icons.clock, iconColor: "#EF4444", iconBg: "#EF444415", trend: avgTime <= 18 ? "On pace" : "Speed up", trendColor: avgTime <= 18 ? "#10B981" : "#F59E0B" },
          ].map(s => (
            <div key={s.label} style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:20,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:10,background:s.iconBg,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {s.icon({size:18,color:s.iconColor})}
                </div>
                {s.trend && (
                  <span style={{fontSize:11,fontWeight:700,color:s.trendColor,display:"flex",alignItems:"center",gap:2}}>
                    {s.trendColor === "#10B981" && Icons.trending({size:12,color:"#10B981"})}
                    {s.trend}
                  </span>
                )}
              </div>
              <div style={{marginTop:14}}>
                <div style={{fontSize:13,color:"#64748B",fontWeight:500,marginBottom:4}}>{s.label}</div>
                <div style={{fontSize:26,fontWeight:800}}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Trajectory Chart */}
      {recentSessions.length > 1 && (
        <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:32,marginBottom:32}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
            <div>
              <h3 style={{fontSize:16,fontWeight:700}}>Score Trajectory</h3>
              <p style={{fontSize:13,color:"#64748B"}}>Last {recentSessions.length} sessions performance</p>
            </div>
            <div style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:4,
              background: trendUp ? "#10B98115" : "#F59E0B15",
              color: trendUp ? "#10B981" : "#F59E0B"}}>
              {trendUp ? Icons.trending({size:12,color:"#10B981"}) : Icons.alert({size:12,color:"#F59E0B"})}
              {trendUp ? "Trending Up" : "Needs Focus"}
            </div>
          </div>
          <div style={{position:"relative",height:200,width:"100%"}}>
            {/* Grid lines */}
            {[0,25,50,75,100].map(v => (
              <div key={v} style={{position:"absolute",left:0,right:0,bottom:`${(v/100)*200}px`,height:1,background:v===0?"#334155":"#1E293B"}}/>
            ))}
            <svg viewBox={`0 0 1000 200`} width="100%" height="200" preserveAspectRatio="none" style={{position:"absolute",inset:0}}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2b8cee" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#2b8cee" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* Area */}
              <path d={`M 0 200 ${recentSessions.map((s,i) => {
                const x = recentSessions.length === 1 ? 500 : (i/(recentSessions.length-1))*1000;
                const y = 200 - Math.round((s.correct/s.total)*200);
                return `L ${x} ${y}`;
              }).join(" ")} L 1000 200 Z`} fill="url(#areaGrad)"/>
              {/* Line */}
              <polyline fill="none" stroke="#2b8cee" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"
                points={recentSessions.map((s,i) => {
                  const x = recentSessions.length === 1 ? 500 : (i/(recentSessions.length-1))*1000;
                  const y = 200 - Math.round((s.correct/s.total)*200);
                  return `${x},${y}`;
                }).join(" ")}/>
              {/* Dots */}
              {recentSessions.map((s,i) => {
                const x = recentSessions.length === 1 ? 500 : (i/(recentSessions.length-1))*1000;
                const y = 200 - Math.round((s.correct/s.total)*200);
                const isLast = i === recentSessions.length - 1;
                return isLast
                  ? <circle key={i} cx={x} cy={y} r="7" fill="#2b8cee"/>
                  : <circle key={i} cx={x} cy={y} r="4.5" fill="#101922" stroke="#2b8cee" strokeWidth="2.5"/>;
              })}
            </svg>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
            {recentSessions.filter((_,i) => i === 0 || i === Math.floor(recentSessions.length/2) || i === recentSessions.length-1).map((s,i,arr) => (
              <span key={i} style={{fontSize:11,color:"#475569",fontWeight:500}}>
                {new Date(s.date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                {i === arr.length-1 ? " (Latest)" : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${CATEGORIES.length},1fr)`,gap:16,marginBottom:32}}>
        {CATEGORIES.map(c => {
          const d = catData[c];
          const catColor = CAT_COLORS[c];
          const label = d.pct >= 75 ? "Proficient" : d.pct >= 50 ? "Improving" : d.pct > 0 ? "Focus Area" : "Not Started";
          const labelColor = d.pct >= 75 ? "#10B981" : d.pct >= 50 ? "#F59E0B" : d.pct > 0 ? "#EF4444" : "#64748B";
          return (
            <div key={c} style={{background:C.card,borderRadius:14,overflow:"hidden",border:`1px solid ${C.border}`,borderTop:`4px solid ${catColor}`,padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div>
                  <h4 style={{fontSize:17,fontWeight:700,marginBottom:2}}>{c === "Math" ? "Math & Logic" : "Verbal Ability"}</h4>
                  <p style={{fontSize:11,color:"#64748B"}}>{c === "Math" ? "Number series, Word problems" : "Analogies, Sentence completion"}</p>
                </div>
                <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,background:labelColor+"15",color:labelColor,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</span>
              </div>
              <div style={{display:"flex",alignItems:"flex-end",gap:8,marginBottom:14}}>
                <span style={{fontSize:38,fontWeight:900}}>{d.pct}%</span>
                <span style={{fontSize:13,fontWeight:500,color:"#64748B",paddingBottom:6}}>Accuracy</span>
              </div>
              <div style={{height:7,background:"#1E293B",borderRadius:4,overflow:"hidden",marginBottom:14}}>
                <div style={{height:"100%",background:d.pct >= 50 ? catColor : labelColor,borderRadius:4,width:`${d.pct}%`,transition:"width 0.5s"}}/>
              </div>
              {d.pct < 50 && d.total > 0 ? (
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#F59E0B",fontWeight:500}}>
                  {Icons.alert({size:14,color:"#F59E0B"})} Needs improvement
                </div>
              ) : (
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#64748B"}}>
                  <span>{d.total} Qs attempted</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Score Interpretation & Advice */}
      <div style={{background:"#2b8cee10",border:"1px solid #2b8cee30",borderRadius:16,padding:32,marginBottom:32}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{width:48,height:48,borderRadius:24,background:"#2b8cee20",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {Icons.brain({size:26,color:"#2b8cee"})}
          </div>
          <div style={{flex:1}}>
            <h3 style={{fontSize:20,fontWeight:700,marginBottom:10}}>Score Interpretation & Advice</h3>
            <p style={{fontSize:14,color:"#94A3B8",lineHeight:1.9,marginBottom:6}}>
              Your current estimated score of <strong style={{color:"#2b8cee"}}>{estScore}</strong> places you in the <strong style={{color:"#2b8cee"}}>{percentile}</strong> percentile.
              {overallPct >= 75
                ? " Your performance is exceptional across categories. Focus on maintaining speed and consistency under test conditions."
                : overallPct >= 50
                ? ` While your overall skills are solid, your ${weakCat} accuracy at ${catData[weakCat]?.pct || 0}% is holding you back.`
                : " Significant improvement is needed. The good news is that consistent daily practice of 15-20 minutes can raise your score dramatically."}
            </p>
            {weakCat && catData[weakCat]?.pct < 75 && (
              <p style={{fontSize:14,color:"#94A3B8",lineHeight:1.9}}>
                <strong style={{color:"#F8FAFC"}}>Personalized Strategy:</strong> For the next few days, focus exclusively on <span style={{textDecoration:"underline",textDecorationColor:"#2b8cee"}}>{weakCat === "Math" ? "number series and word problems" : "analogies and sentence completion"}</span>. Use the AI tutor breakdowns to reinforce concepts you miss.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HISTORY ─────────────────────────────────────────────────────
function History({ sessions }) {
  const [filter, setFilter] = useState("all");
  const C = { card: "#0F172A", border: "#1E293B" };

  const filtered = filter === "all" ? sessions
    : filter === "Full Test" ? sessions.filter(s => s.category === "Full Test")
    : sessions.filter(s => s.category === filter);

  if (sessions.length === 0) return (
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{marginBottom:32}}>
        <h1 style={{fontSize:36,fontWeight:900,color:"#fff",letterSpacing:"-0.02em",marginBottom:8}}>Study History</h1>
        <p style={{fontSize:15,color:"#94A3B8"}}>Track your progress and performance</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"100px 20px",textAlign:"center",background:C.card,borderRadius:16,border:`1px solid ${C.border}`}}>
        {Icons.clipboard({size: 56, color: "#334155"})}
        <h2 style={{fontSize:24,fontWeight:800,color:"#F8FAFC",marginTop:24}}>No Sessions Yet</h2>
        <p style={{fontSize:14,color:"#64748B",marginTop:10}}>Your practice sessions will appear here after you complete one.</p>
      </div>
    </div>
  );

  const totalQ = sessions.reduce((a, s) => a + s.total, 0);
  const totalCorrect = sessions.reduce((a, s) => a + s.correct, 0);
  const overallPct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
  const bestSession = sessions.reduce((best, s) => {
    const p = Math.round((s.correct/s.total)*100);
    const bp = Math.round((best.correct/best.total)*100);
    return p > bp ? s : best;
  }, sessions[0]);
  const bestPct = Math.round((bestSession.correct/bestSession.total)*100);

  const summaryCards = [
    { label: "Total Sessions", value: sessions.length, color: "#2b8cee" },
    { label: "Questions Answered", value: totalQ.toLocaleString(), color: "#10B981" },
    { label: "Overall Accuracy", value: `${overallPct}%`, color: "#F59E0B" },
    { label: "Best Score", value: `${bestPct}%`, color: "#A78BFA" },
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "Full Test", label: "Full Test" },
    { id: "Math", label: "Math" },
    { id: "Verbal", label: "Verbal" },
  ];

  const getCatBadge = (category) => {
    if (category === "Full Test") return { bg: "#2b8cee15", color: "#2b8cee" };
    if (category === "Math") return { bg: "#4DA6FF15", color: "#4DA6FF" };
    return { bg: "#A78BFA15", color: "#A78BFA" };
  };

  const getScoreColor = (pct) => pct >= 85 ? "#10B981" : pct >= 65 ? "#2b8cee" : pct >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      {/* Header */}
      <div style={{marginBottom:32}}>
        <h1 style={{fontSize:36,fontWeight:900,color:"#fff",letterSpacing:"-0.02em",marginBottom:8}}>Study History</h1>
        <p style={{fontSize:15,color:"#94A3B8"}}>Track your progress and performance</p>
      </div>

      {/* Summary Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>
        {summaryCards.map(s => (
          <div key={s.label} style={{position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",gap:8,borderRadius:14,padding:24,background:C.card,border:`1px solid ${C.border}`}}>
            <div style={{position:"absolute",top:0,left:0,width:"100%",height:3,background:s.color}}/>
            <span style={{fontSize:13,fontWeight:500,color:"#64748B"}}>{s.label}</span>
            <span style={{fontSize:28,fontWeight:800}}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28,alignItems:"center"}}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            style={{padding:"8px 20px",borderRadius:999,fontSize:13,fontWeight:filter===f.id?700:500,border:"none",cursor:"pointer",fontFamily:"'Lexend',sans-serif",transition:"all 0.15s",
              background:filter===f.id?"#2b8cee":"#1E293B",color:filter===f.id?"#fff":"#94A3B8",
              boxShadow:filter===f.id?"0 4px 12px rgba(43,140,238,0.25)":"none"}}>
            {f.label}
          </button>
        ))}
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,color:"#64748B",fontSize:13,fontWeight:500}}>
          {Icons.trending({size:14,color:"#64748B"})}
          <span>Newest First</span>
        </div>
      </div>

      {/* Sessions List */}
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:14}}>Recent Sessions</h3>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.map(s => {
          const pct = Math.round((s.correct / s.total) * 100);
          const date = new Date(s.date);
          const scoreColor = getScoreColor(pct);
          const badge = getCatBadge(s.category);
          const mins = Math.floor(s.timeUsed / 60);
          const secs = s.timeUsed % 60;
          const avgSec = s.total > 0 ? (s.timeUsed / s.total).toFixed(1) : 0;
          const circumference = 2 * Math.PI * 24; // r=24
          const offset = circumference - (pct / 100) * circumference;

          return (
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:20,padding:20,borderRadius:14,background:C.card,border:`1px solid ${C.border}`,transition:"all 0.15s"}}>
              {/* Progress Ring */}
              <div style={{position:"relative",width:56,height:56,flexShrink:0}}>
                <svg width="56" height="56" style={{transform:"rotate(-90deg)"}}>
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#1E293B" strokeWidth="4"/>
                  <circle cx="28" cy="28" r="24" fill="none" stroke={scoreColor} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`}/>
                </svg>
                <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700}}>{pct}%</span>
              </div>

              {/* Info */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",background:badge.bg,color:badge.color}}>{s.category}</span>
                  <span style={{fontSize:12,color:"#475569"}}>
                    {date.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} at {date.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}
                  </span>
                </div>
                <h4 style={{fontSize:15,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {s.category === "Full Test" ? "Comprehensive CCAT Practice" : s.category === "Math" ? "Math & Logic Drill" : "Verbal Ability Practice"} #{s.id.toString().slice(-4)}
                </h4>
              </div>

              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32,flexShrink:0,borderLeft:`1px solid ${C.border}`,paddingLeft:24}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <span style={{fontSize:10,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.06em"}}>Score</span>
                  <span style={{fontSize:14,fontWeight:600}}>{s.correct}/{s.total}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <span style={{fontSize:10,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.06em"}}>Time</span>
                  <span style={{fontSize:14,fontWeight:600}}>{mins}:{secs.toString().padStart(2,"0")}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <span style={{fontSize:10,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.06em"}}>Avg</span>
                  <span style={{fontSize:14,fontWeight:600}}>{avgSec}s/q</span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{textAlign:"center",padding:48,color:"#64748B",fontSize:14,background:C.card,borderRadius:14,border:`1px solid ${C.border}`}}>
            No sessions match this filter.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESOURCES ───────────────────────────────────────────────────
function Resources() {
  const tiers = [
    { range: "42-50", pct: "90th+ Percentile", label: "Exceptional", desc: "Top tier candidate for any analytical role.", color: "#10B981" },
    { range: "35-41", pct: "75-89th Percentile", label: "Strong", desc: "Above average performance, very competitive.", color: "#2b8cee" },
    { range: "28-34", pct: "50-74th Percentile", label: "Average", desc: "Meets expectations for most roles.", color: "#94A3B8" },
    { range: "20-27", pct: "25-49th Percentile", label: "Below Average", desc: "May need improvement in specific areas.", color: "#F59E0B" },
    { range: "0-19", pct: "Below 25th Percentile", label: "Needs Development", desc: "Significant practice recommended.", color: "#EF4444" },
  ];

  const strategies = [
    { icon: Icons.palette, color: "#3B82F6", bg: "#3B82F620", title: "Visual Chunking", tips: ["Break problems into visual steps.", "Draw diagrams for spatial questions.", "Use color associations for categories."] },
    { icon: Icons.clock, color: "#F59E0B", bg: "#F59E0B20", title: "Time Boxing", tips: ["Spend max 20 seconds per question.", "If stuck, flag it and move on.", "Come back with fresh eyes later."] },
    { icon: Icons.refresh, color: "#10B981", bg: "#10B98120", title: "Spaced Practice", tips: ["Practice daily in short bursts (15-20 min).", "Space sessions apart rather than cramming."] },
    { icon: Icons.puzzle, color: "#A78BFA", bg: "#A78BFA20", title: "Pattern Recognition", tips: ["Sequences: Check differences, then ratios.", "Verbal: Name the relationship first."] },
    { icon: Icons.target, color: "#EF4444", bg: "#EF444420", title: "Elimination Strategy", tips: ["Cross out obviously wrong answers first.", "Eliminating 1-2 options improves odds."] },
    { icon: Icons.box, color: "#06B6D4", bg: "#06B6D420", title: "Spatial Tricks", tips: ["Use your fingers to trace rotations.", "Fold paper mentally by tracking corners.", "Count faces/edges systematically."] },
  ];

  const C = { card: "#0F172A", border: "#1E293B", pri: "#2b8cee" };

  return (
    <div style={{maxWidth: 900, margin: "0 auto"}}>
      {/* Hero */}
      <div style={{marginBottom: 40}}>
        <h1 style={{fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 12}}>Resources & Strategies</h1>
        <p style={{fontSize: 16, color: "#94A3B8", lineHeight: 1.7, maxWidth: 560}}>
          Master the Criteria Cognitive Aptitude Test with visual strategies designed for high-impact learning.
        </p>
      </div>

      {/* About the CCAT */}
      <div style={{background: "#2b8cee10", border: "1px solid #2b8cee30", borderRadius: 16, padding: 28, marginBottom: 48}}>
        <div style={{display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start"}}>
          <div style={{flex: 1, minWidth: 280}}>
            <h3 style={{fontSize: 18, fontWeight: 700, color: "#2b8cee", marginBottom: 10, display: "flex", alignItems: "center", gap: 8}}>
              {Icons.info({size: 20, color: "#2b8cee"})} About the CCAT
            </h3>
            <p style={{fontSize: 14, color: "#94A3B8", lineHeight: 1.8}}>
              The Criteria Cognitive Aptitude Test measures cognitive ability and problem-solving skills. It's used by thousands of companies as a pre-employment assessment to predict job performance across various roles.
            </p>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, minWidth: 280}}>
            {[
              { label: "Questions", value: "50", icon: Icons.help },
              { label: "Minutes", value: "15", icon: Icons.clock },
              { label: "Per Q", value: "~18s", icon: Icons.trending },
            ].map(s => (
              <div key={s.label} style={{background: "#111827", border: "1px solid #1E293B", borderRadius: 10, padding: "16px 12px", textAlign: "center"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>{s.icon({size: 18, color: "#2b8cee"})}</div>
                <div style={{fontSize: 10, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4}}>{s.label}</div>
                <div style={{fontSize: 22, fontWeight: 700}}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Understanding Your Score */}
      <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 8}}>
        {Icons.chart({size: 20, color: "#2b8cee"})} Understanding Your Score
      </h2>
      <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 48}}>
        {tiers.map(t => (
          <div key={t.range} style={{display: "flex", alignItems: "center", gap: 16, background: "#111827", padding: "16px 20px", borderRadius: 12, borderLeft: `4px solid ${t.color}`}}>
            <div style={{width: 72, textAlign: "center", flexShrink: 0}}>
              <span style={{fontSize: 22, fontWeight: 900, color: t.color}}>{t.range}</span>
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 700, color: t.color}}>{t.pct}</div>
              <div style={{fontSize: 13, color: "#64748B"}}>{t.label} -- {t.desc}</div>
            </div>
            <div style={{width: 100, height: 6, background: "#1E293B", borderRadius: 3, overflow: "hidden", flexShrink: 0}}>
              <div style={{height: "100%", background: t.color, borderRadius: 3, width: t.range === "42-50" ? "95%" : t.range === "35-41" ? "80%" : t.range === "28-34" ? "60%" : t.range === "20-27" ? "35%" : "15%"}} />
            </div>
          </div>
        ))}
      </div>

      {/* Study Strategies */}
      <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 8}}>
        {Icons.lightbulb({size: 20, color: "#2b8cee"})} Study Strategies for Visual Learners
      </h2>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48}}>
        {strategies.map(s => (
          <div key={s.title} style={{background: "#111827", border: "1px solid #1E293B", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 14}}>
            <div style={{display: "flex", alignItems: "center", gap: 10}}>
              <div style={{padding: 8, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center"}}>
                {s.icon({size: 20, color: s.color})}
              </div>
              <h4 style={{fontSize: 16, fontWeight: 700}}>{s.title}</h4>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
              {s.tips.map((tip, i) => (
                <div key={i} style={{display: "flex", gap: 8, fontSize: 13, color: "#94A3B8", lineHeight: 1.6}}>
                  <span style={{color: "#2b8cee", fontWeight: 700, flexShrink: 0}}>+</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Designed for Your Brain */}
      <div style={{background: "#0F172A", borderRadius: 16, overflow: "hidden", marginBottom: 48, position: "relative"}}>
        <div style={{position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, #2b8cee15, transparent 70%)", pointerEvents: "none"}} />
        <div style={{padding: "40px 36px", position: "relative", zIndex: 1}}>
          <div style={{display: "flex", gap: 40, alignItems: "center"}}>
            <div style={{flex: 1}}>
              <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 12}}>Designed for Your Brain</h2>
              <p style={{fontSize: 15, color: "#94A3B8", lineHeight: 1.8, marginBottom: 24}}>
                This app uses high-contrast colors, generous spacing, and visual breakdowns because reading walls of text shouldn't be a barrier to test prep. Every answer comes with a visual representation and a memorable tip to help it stick.
              </p>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10}}>
                {[
                  { icon: Icons.palette, color: "#2b8cee", label: "Color-coded categories" },
                  { icon: Icons.trending, color: "#10B981", label: "Visual breakdowns" },
                  { icon: Icons.lightbulb, color: "#F59E0B", label: "Memory tips" },
                  { icon: Icons.box, color: "#A78BFA", label: "Large well-spaced text" },
                ].map(f => (
                  <div key={f.label} style={{display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "#ffffff08"}}>
                    {f.icon({size: 18, color: f.color})}
                    <span style={{fontSize: 13, fontWeight: 500}}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{width: 160, height: 160, borderRadius: 80, background: "#1E293B", border: "2px solid #2b8cee40", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative"}}>
              <div style={{position: "absolute", inset: -20, borderRadius: "50%", background: "#2b8cee15", filter: "blur(20px)"}} />
              {Icons.brain({size: 56, color: "#2b8cee", style: {position: "relative", zIndex: 1}})}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{textAlign: "center", padding: "24px 0", borderTop: "1px solid #1E293B"}}>
        <p style={{fontSize: 13, color: "#475569"}}>Built for visual thinkers.</p>
      </div>
    </div>
  );
}

// ─── AI TUTOR CHAT ───────────────────────────────────────────────
function TutorChat({ question, selectedAnswer, isCorrect }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    // Reset when question changes
    setOpen(false);
    setMessages([]);
    setInput("");
    setLoading(false);
  }, [question.id]);

  const buildSystemPrompt = () => {
    return `You are a CCAT study tutor helping a visual learner with dyslexia prepare for the Criteria Cognitive Aptitude Test. Your student just answered a question.

QUESTION: ${question.question}
OPTIONS: ${question.options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`).join(" | ")}
STUDENT CHOSE: ${String.fromCharCode(65 + selectedAnswer)}) ${question.options[selectedAnswer]}
CORRECT ANSWER: ${String.fromCharCode(65 + question.correct)}) ${question.options[question.correct]}
RESULT: ${isCorrect ? "CORRECT" : "INCORRECT"}

RULES FOR YOUR RESPONSES:
- Use short sentences and simple words
- Break every solution into numbered steps, one small piece at a time
- Use arrows (->) to show flow between steps
- Use concrete numbers, not abstract descriptions
- Bold key numbers and terms with **asterisks**
- Keep paragraphs to 2-3 sentences max
- If they ask a follow-up, answer it directly then ask if they want to try a similar problem
- Never use emojis
- Be encouraging but not patronizing`;
  };

  const callAPI = async (userMessage, history) => {
    const apiMessages = [];
    
    // Add conversation history
    for (const msg of history) {
      apiMessages.push({ role: msg.role, content: msg.text });
    }
    apiMessages.push({ role: "user", content: userMessage });

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(),
          messages: apiMessages,
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "Sorry, I couldn't generate a response. Try again.";
      return text;
    } catch (err) {
      return "Connection error. Please try again.";
    }
  };

  const handleBreakdown = async () => {
    setOpen(true);
    setLoading(true);
    const prompt = isCorrect
      ? "I got this right but walk me through the solution step by step so I really understand why. Make it visual and clear."
      : "I got this wrong. Walk me through the correct solution step by step. Show me exactly where my thinking went wrong and how to get to the right answer. Make it visual and clear.";
    
    const reply = await callAPI(prompt, []);
    setMessages([
      { role: "user", text: prompt },
      { role: "assistant", text: reply },
    ]);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    const reply = await callAPI(userMsg, messages);
    setMessages([...newMessages, { role: "assistant", text: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-ish renderer: **bold**, numbered lists, arrows
  const renderText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Process bold
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} style={{color: "#F8FAFC"}}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return <div key={i} style={{minHeight: line === "" ? 8 : "auto"}}>{rendered}</div>;
    });
  };

  if (!open) {
    return (
      <button style={styles.tutorButton} onClick={handleBreakdown}>
        {Icons.messageCircle({size: 16, color: "#2b8cee"})}
        <span>Break it down for me</span>
      </button>
    );
  }

  return (
    <div style={styles.tutorContainer}>
      <div style={styles.tutorHeader}>
        {Icons.brain({size: 16, color: "#2b8cee"})}
        <span style={styles.tutorHeaderText}>AI Tutor</span>
        <button style={styles.tutorClose} onClick={() => setOpen(false)}>Collapse</button>
      </div>

      <div style={styles.tutorMessages}>
        {messages.filter(m => m.role === "assistant").map((msg, i) => (
          <div key={i} style={styles.tutorMsg}>
            {renderText(msg.text)}
          </div>
        ))}
        {loading && (
          <div style={styles.tutorLoading}>
            {Icons.loader({size: 16, color: "#2b8cee"})}
            <span>Thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {messages.length > 0 && !loading && (
        <div style={styles.tutorInputWrap}>
          <input
            ref={inputRef}
            style={styles.tutorInput}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up..."
          />
          <button style={styles.tutorSendBtn} onClick={handleSend} disabled={!input.trim()}>
            {Icons.send({size: 16, color: input.trim() ? "#fff" : "#64748B"})}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0B0F1A; color: #E2E8F0; font-family: 'Lexend', sans-serif; }
  button { cursor: pointer; font-family: 'Lexend', sans-serif; border: none; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0B0F1A; }
  ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

const styles = {
  app: { minHeight: "100vh", background: "#0B0F1A", color: "#E2E8F0", fontFamily: "'Lexend', sans-serif", letterSpacing: "0.02em", lineHeight: 1.7 },
  loadingScreen: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0B0F1A" },
  loadingBrain: { marginBottom: 8 },
  loadingText: { color: "#94A3B8", fontSize: 18, marginTop: 16 },

  // Nav
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", background: "#0F1629", borderBottom: "1px solid #1E293B", position: "sticky", top: 0, zIndex: 100, flexWrap: "wrap", gap: 12 },
  navBrand: { display: "flex", alignItems: "center", gap: 10 },
  navLogo: { display: "flex", alignItems: "center" },
  navTitle: { fontSize: 16, fontWeight: 600, color: "#F59E0B" },
  navSub: { fontSize: 11, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase" },
  navTabs: { display: "flex", gap: 4 },
  navTab: { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "transparent", color: "#94A3B8", fontSize: 13, fontWeight: 500, transition: "all 0.2s" },
  navTabActive: { background: "#1E293B", color: "#F59E0B" },
  navTabIcon: { display: "flex", alignItems: "center" },
  navTabLabel: {},

  content: { maxWidth: 960, margin: "0 auto", padding: "24px 16px", minHeight: "calc(100vh - 60px)" },

  // Dashboard
  dashboard: {},
  hero: { textAlign: "center", padding: "40px 20px 32px", position: "relative", overflow: "hidden" },
  heroGlow: { position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 200, background: "radial-gradient(ellipse, #F59E0B15, transparent 70%)", pointerEvents: "none" },
  heroTitle: { fontSize: 32, fontWeight: 700, color: "#F59E0B", marginBottom: 12, position: "relative" },
  heroDesc: { fontSize: 15, color: "#94A3B8", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, position: "relative" },

  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 },
  statCard: { background: "#111827", border: "1px solid #1E293B", borderRadius: 12, padding: "16px 12px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },
  statIcon: { marginBottom: 4, display: "flex", alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: 700, color: "#F8FAFC" },
  statLabel: { fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 },

  startBtn: { display: "flex", alignItems: "center", gap: 16, width: "100%", padding: "18px 24px", borderRadius: 14, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", color: "#fff", marginBottom: 32, transition: "transform 0.2s", fontSize: 14 },
  startIcon: { width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#ffffff20" },
  startTitle: { fontSize: 17, fontWeight: 600 },
  startSub: { fontSize: 12, opacity: 0.8, marginTop: 2 },

  sectionTitle: { fontSize: 20, fontWeight: 600, marginBottom: 16, marginTop: 8, color: "#F8FAFC" },

  catGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 32 },
  catCard: { background: "#111827", border: "1px solid #1E293B", borderRadius: 14, padding: 20, textAlign: "left", transition: "all 0.2s" },
  catHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  catWeight: { fontSize: 12, fontWeight: 600 },
  catName: { fontSize: 15, fontWeight: 600, marginBottom: 4 },
  catStat: { fontSize: 12, color: "#64748B", marginBottom: 10 },
  catMastery: { fontSize: 12, fontWeight: 600, marginTop: 6 },

  progressBar: { height: 6, background: "#1E293B", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3, transition: "width 0.5s ease" },

  readinessCard: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#111827", border: "1px solid #1E293B", borderRadius: 16, padding: "28px 32px", marginBottom: 32, gap: 24, flexWrap: "wrap" },
  readinessTitle: { fontSize: 22, fontWeight: 600, color: "#F8FAFC", marginBottom: 8 },
  readinessDesc: { fontSize: 13, color: "#94A3B8", marginBottom: 16 },
  readinessBtn: { padding: "10px 20px", borderRadius: 10, background: "linear-gradient(135deg, #7C3AED, #6D28D9)", color: "#fff", fontSize: 13, fontWeight: 500 },
  gaugeWrap: { textAlign: "center", flexShrink: 0 },
  gaugeValue: { fontSize: 28, fontWeight: 700, marginTop: -8 },
  gaugeLabel: { fontSize: 12, fontWeight: 600, marginTop: 2 },

  sessionCard: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#111827", border: "1px solid #1E293B", borderRadius: 12, padding: "16px 20px", marginBottom: 10 },
  sessionLeft: {},
  sessionType: { fontSize: 15, fontWeight: 600, color: "#F8FAFC" },
  sessionDate: { fontSize: 12, color: "#64748B", marginTop: 2 },
  sessionRight: { textAlign: "right" },
  sessionPct: { fontSize: 22, fontWeight: 700 },
  sessionScore: { fontSize: 11, color: "#64748B" },

  // Practice
  practiceWrap: { minHeight: "100vh", background: "#0B0F1A", display: "flex", flexDirection: "column" },
  practiceTop: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "#0F1629", borderBottom: "1px solid #1E293B", position: "sticky", top: 0, zIndex: 100, gap: 12 },
  exitBtn: { padding: "8px 14px", borderRadius: 8, background: "#1E293B", color: "#94A3B8", fontSize: 13 },
  progressCircle: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center" },
  progressText: { position: "absolute", fontSize: 10, fontWeight: 600, color: "#94A3B8" },
  timer: { padding: "6px 16px", borderRadius: 20, border: "1px solid", fontSize: 16, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", display: "flex", alignItems: "center", gap: 6 },
  endBtn: { padding: "8px 16px", borderRadius: 8, background: "#DC2626", color: "#fff", fontSize: 13, fontWeight: 500 },

  questionCard: { maxWidth: 720, margin: "24px auto", padding: "0 16px", flex: 1 },
  questionMeta: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  catBadge: { padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 },
  qNum: { fontSize: 12, color: "#64748B" },
  questionText: { fontSize: 22, fontWeight: 600, color: "#F8FAFC", marginBottom: 24, lineHeight: 1.6 },

  optionsWrap: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 },
  option: { display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 12, background: "#111827", border: "1px solid #1E293B", color: "#E2E8F0", fontSize: 16, textAlign: "left", transition: "all 0.15s", position: "relative", fontWeight: 500 },
  optionSelected: { borderColor: "#3B82F6", background: "#1E3A5F20" },
  optionCorrect: { borderColor: "#10B981", background: "#10B98115" },
  optionWrong: { borderColor: "#EF4444", background: "#EF444415" },
  optionLetter: { width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 },
  optionText: { flex: 1 },
  checkMark: { color: "#10B981", fontSize: 20, fontWeight: 700 },
  xMark: { color: "#EF4444", fontSize: 20, fontWeight: 700 },

  explanationWrap: { display: "flex", flexDirection: "column", gap: 14, marginBottom: 32, animation: "fadeIn 0.3s ease" },
  resultBanner: { display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 20px", borderRadius: 12, border: "1px solid" },
  resultTitle: { fontSize: 16, fontWeight: 600, marginBottom: 4 },
  resultDesc: { fontSize: 14, color: "#CBD5E1", lineHeight: 1.7 },

  visualCard: { background: "#0F172A", border: "1px solid #7C3AED30", borderRadius: 12, padding: "16px 20px" },
  visualLabel: { fontSize: 13, fontWeight: 600, color: "#A78BFA", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 },
  visualContent: { fontSize: 17, fontFamily: "'JetBrains Mono', monospace", color: "#F8FAFC", letterSpacing: "0.04em", lineHeight: 1.8, wordBreak: "break-word" },

  conceptCard: { background: "#0F172A", border: "1px solid #3B82F630", borderRadius: 12, padding: "16px 20px" },
  conceptLabel: { fontSize: 13, fontWeight: 600, color: "#60A5FA", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 },
  conceptContent: { fontSize: 14, color: "#CBD5E1", lineHeight: 1.7 },

  tipCard: { background: "#0F172A", border: "1px solid #F59E0B30", borderRadius: 12, padding: "16px 20px" },
  tipLabel: { fontSize: 13, fontWeight: 600, color: "#FBBF24", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 },
  tipContent: { fontSize: 14, color: "#CBD5E1", lineHeight: 1.7 },

  practiceBottom: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#0F1629", borderTop: "1px solid #1E293B", position: "sticky", bottom: 0, gap: 12 },
  navBtn: { padding: "10px 18px", borderRadius: 8, background: "#1E293B", color: "#94A3B8", fontSize: 13, fontWeight: 500 },
  dotNav: { display: "flex", gap: 4, alignItems: "center", justifyContent: "center", flex: 1, flexWrap: "wrap" },
  dot: { width: 10, height: 10, borderRadius: 5, border: "none", transition: "all 0.2s", flexShrink: 0 },
  checkBtn: { padding: "10px 22px", borderRadius: 8, background: "#3B82F6", color: "#fff", fontSize: 14, fontWeight: 600 },
  nextBtn: { padding: "10px 22px", borderRadius: 8, background: "#10B981", color: "#fff", fontSize: 14, fontWeight: 600 },

  // Results
  resultsWrap: {},
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#F8FAFC", marginBottom: 24 },
  readinessTop: { display: "flex", gap: 32, alignItems: "center", background: "#111827", border: "1px solid #1E293B", borderRadius: 16, padding: "28px 32px", marginBottom: 32, flexWrap: "wrap" },
  readinessInfo: { flex: 1 },
  readinessStatus: { fontSize: 14, fontWeight: 600, marginBottom: 8, padding: "4px 14px", borderRadius: 20, background: "#1E293B", display: "inline-flex", alignItems: "center", gap: 6 },
  readinessScore: { fontSize: 20, fontWeight: 600, color: "#F8FAFC", marginBottom: 16 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 },
  miniStat: { background: "#0F172A", borderRadius: 10, padding: "12px 16px", border: "1px solid #1E293B" },
  miniLabel: { fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" },
  miniValue: { fontSize: 20, fontWeight: 700, color: "#F8FAFC", marginTop: 2 },

  trendCard: { background: "#111827", border: "1px solid #1E293B", borderRadius: 14, padding: "20px 24px", marginBottom: 32, overflow: "hidden" },
  trendTitle: { fontSize: 16, fontWeight: 600, color: "#F8FAFC", marginBottom: 16 },
  trendChart: { overflowX: "auto", paddingLeft: 30 },

  catAnalysis: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 32 },
  catAnalysisCard: { background: "#111827", border: "1px solid #1E293B", borderRadius: 14, padding: 18 },
  catAnalysisHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  catAnalysisPct: { fontSize: 24, fontWeight: 700 },
  catAnalysisName: { fontSize: 14, fontWeight: 600, marginBottom: 4 },
  catAnalysisStat: { fontSize: 12, color: "#64748B", marginBottom: 10 },
  catWarning: { fontSize: 11, color: "#F59E0B", marginTop: 10, padding: "6px 10px", background: "#F59E0B10", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 },

  // History
  historyWrap: {},
  historyCount: { fontSize: 13, color: "#64748B", marginBottom: 20 },

  // Resources
  resourcesWrap: {},
  aboutCard: { background: "#111827", border: "1px solid #1E293B", borderRadius: 16, padding: "24px 28px", marginBottom: 32 },
  aboutTitle: { fontSize: 20, fontWeight: 600, color: "#F8FAFC", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 },
  aboutDesc: { fontSize: 14, color: "#94A3B8", lineHeight: 1.8, marginBottom: 20 },
  aboutStats: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  aboutStat: { background: "#0F172A", borderRadius: 10, padding: "14px 16px", border: "1px solid #1E293B" },
  aboutStatVal: { fontSize: 26, fontWeight: 700, color: "#F59E0B" },
  aboutStatLabel: { fontSize: 11, color: "#64748B", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" },

  tiersList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 },
  tierCard: { display: "flex", alignItems: "center", gap: 20, background: "#111827", border: "1px solid #1E293B", borderLeft: "4px solid", borderRadius: 12, padding: "16px 20px" },
  tierRange: { fontSize: 22, fontWeight: 700, minWidth: 70 },
  tierPct: { fontSize: 15, fontWeight: 600, color: "#F8FAFC" },
  tierLabel: { fontSize: 12, color: "#94A3B8", marginTop: 2 },

  strategiesGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 32 },
  strategyCard: { background: "#111827", border: "1px solid #1E293B", borderRadius: 14, padding: 20 },
  strategyIcon: { marginBottom: 8 },
  strategyTitle: { fontSize: 15, fontWeight: 600, color: "#F8FAFC", marginBottom: 6 },
  strategyDesc: { fontSize: 13, color: "#94A3B8", lineHeight: 1.7 },

  dyslexiaCard: { background: "linear-gradient(135deg, #1E1B4B, #0F172A)", border: "1px solid #4F46E530", borderRadius: 16, padding: "28px 32px", marginBottom: 32 },
  dyslexiaTitle: { fontSize: 20, fontWeight: 600, color: "#A78BFA", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 },
  dyslexiaDesc: { fontSize: 14, color: "#CBD5E1", lineHeight: 1.8, marginBottom: 16 },
  dyslexiaTips: { display: "flex", flexDirection: "column", gap: 8 },
  dyslexiaTip: { fontSize: 13, color: "#A78BFA", padding: "8px 14px", background: "#A78BFA10", borderRadius: 8 },

  // Empty state
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" },
  emptyTitle: { fontSize: 22, fontWeight: 600, color: "#F8FAFC", marginTop: 16 },
  emptyDesc: { fontSize: 14, color: "#64748B", marginTop: 8 },

  // AI Tutor
  tutorButton: { display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "14px 18px", borderRadius: 12, background: "#2b8cee10", border: "1px solid #2b8cee30", color: "#2b8cee", fontSize: 14, fontWeight: 600, fontFamily: "'Lexend', sans-serif", cursor: "pointer", transition: "all 0.2s" },
  tutorContainer: { borderRadius: 14, border: "1px solid #1E293B", background: "#0F172A", overflow: "hidden" },
  tutorHeader: { display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#111827", borderBottom: "1px solid #1E293B" },
  tutorHeaderText: { fontSize: 13, fontWeight: 600, color: "#2b8cee", flex: 1 },
  tutorClose: { fontSize: 11, color: "#64748B", background: "none", border: "1px solid #334155", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontFamily: "'Lexend', sans-serif" },
  tutorMessages: { padding: "16px", maxHeight: 400, overflowY: "auto" },
  tutorMsg: { fontSize: 14, color: "#CBD5E1", lineHeight: 1.8, marginBottom: 16, letterSpacing: "0.01em" },
  tutorLoading: { display: "flex", alignItems: "center", gap: 8, color: "#2b8cee", fontSize: 13, padding: "8px 0" },
  tutorInputWrap: { display: "flex", gap: 8, padding: "12px 16px", borderTop: "1px solid #1E293B", background: "#111827" },
  tutorInput: { flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #334155", background: "#111827", color: "#E2E8F0", fontSize: 14, fontFamily: "'Lexend', sans-serif", outline: "none", letterSpacing: "0.02em" },
  tutorSendBtn: { width: 40, height: 40, borderRadius: 10, background: "#2b8cee", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
};
