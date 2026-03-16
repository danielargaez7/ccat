# CCAT Study

A practice and study tool for the **Criteria Cognitive Aptitude Test (CCAT)** — built for visual learners.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

## Features

- **500+ practice questions** across Math & Logic and Verbal categories
- **Timed practice mode** simulating real CCAT conditions (15 min / 50 questions)
- **Visual breakdowns** for every question — concept maps, memory tips, and step-by-step walkthroughs
- **AI Tutor** powered by Claude — get personalized explanations and ask follow-up questions
- **Progress tracking** with score trajectory charts, category analysis, and percentile estimates
- **Session history** with detailed per-session stats
- **Achievement system** to keep you motivated
- **Designed for accessibility** — high-contrast dark theme, Lexend font, generous spacing, and dyslexia-friendly design

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- An [Anthropic API key](https://console.anthropic.com/) (for the AI Tutor feature)

### Installation

```bash
git clone https://github.com/danielargaez7/ccat.git
cd ccat
npm install
```

### Configuration

Create a `.env` file in the root directory:

```
REACT_APP_ANTHROPIC_API_KEY=your-api-key-here
```

### Run Locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

### Deploy

```bash
npm run build
```

The `build/` folder is ready for deployment to Vercel, Netlify, or any static host.

> **Vercel**: Add `REACT_APP_ANTHROPIC_API_KEY` as an environment variable in your Vercel project settings.

## About the CCAT

The Criteria Cognitive Aptitude Test is a pre-employment assessment used by thousands of companies. It measures problem-solving ability, learning aptitude, and critical thinking across three areas:

| Area | Examples |
|------|----------|
| **Math & Logic** | Number series, word problems, rates, percentages |
| **Verbal** | Analogies, sentence completion, vocabulary |

The real test is **50 questions in 15 minutes** (~18 seconds per question).

## Tech Stack

- **React** — UI framework
- **Claude API** — AI-powered tutoring
- **Lexend + JetBrains Mono** — Typography optimized for readability
