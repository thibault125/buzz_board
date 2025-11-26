// Quiz questions in English
const quizData = {
    easy: [
        {
            question: "What does the acronym SEO stand for?",
            options: [
                "Search Engine Optimization",
                "Social Engagement Online", 
                "Site Event Organizer"
            ],
            correct: 0
        },
        {
            question: "Which search engine is the most used worldwide?",
            options: [
                "Bing",
                "Google", 
                "DuckDuckGo"
            ],
            correct: 1
        },
        {
            question: "Which social network belongs to Meta?",
            options: [
                "TikTok",
                "Snapchat", 
                "Instagram"
            ],
            correct: 2
        },
        {
            question: "Paid search engine marketing corresponds to:",
            options: [
                "SEO",
                "SEA"
            ],
            correct: 1
        },
        {
            question: "Traffic coming from newsletters is called:",
            options: [
                "Email traffic",
                "Social traffic"
            ],
            correct: 0
        },
        {
            question: "Which free Google tool analyzes website audience?",
            options: [
                "Google Analytics",
                "Google Trends", 
                "Google Tag Manager"
            ],
            correct: 0
        },
        {
            question: "True or False: Regular publishing improves SEO.",
            options: [
                "True",
                "False"
            ],
            correct: 0
        },
        {
            question: "Which type of traffic comes directly from typing a URL in the search bar?",
            options: [
                "Organic traffic",
                "Direct traffic", 
                "Social traffic"
            ],
            correct: 1
        },
        {
            question: "What is a Call to Action (CTA)?",
            options: [
                "A button or message inviting users to take action",
                "An audience statistic",
                "An automatic advertising banner"
            ],
            correct: 0
        },
        {
            question: "What is a hashtag?",
            options: [
                "A keyword preceded by a # symbol",
                "A sponsored advertisement",
                "An external link to a website"
            ],
            correct: 0
        }
    ],
    hard: [
        {
            question: "Why is the H1/H2/H3 structure important for SEO?",
            options: [
                "Because it allows the site to load faster",
                "Because it helps Google understand the hierarchy and content of the page",
                "Because it automatically increases the number of backlinks"
            ],
            correct: 1
        },
        {
            question: "In Google Analytics, what does the 'bounce rate' measure?",
            options: [
                "The percentage of people who leave the site without interacting",
                "The number of page views per session",
                "The average time spent on a page"
            ],
            correct: 0
        },
        {
            question: "What role does 'internal linking' play on a website?",
            options: [
                "Create automatic ads on site pages",
                "Link pages together to improve navigation and SEO",
                "Speed up server speed"
            ],
            correct: 1
        },
        {
            question: "What is a 'long tail' in SEO and why does it often generate qualified traffic?",
            options: [
                "Short, highly searched keywords",
                "A series of several keywords",
                "Brand-only related keywords"
            ],
            correct: 1
        },
        {
            question: "What is a 'homepage'?",
            options: [
                "The settlement page of a site",
                "The home page of a site",
                "A site analysis"
            ],
            correct: 1
        },
        {
            question: "What is the difference between hot, warm and cold traffic?",
            options: [
                "The level of interest and maturity of the prospect in the buying process",
                "The color of the buttons on the site",
                "The site loading speed"
            ],
            correct: 0
        },
        {
            question: "Define what an omnichannel strategy is.",
            options: [
                "Run multiple email campaigns",
                "Use multiple independent channels",
                "Provide a consistent experience across all interconnected channels"
            ],
            correct: 2
        },
        {
            question: "Explain the benefit of retargeting.",
            options: [
                "Attract only visitors who have never heard of your brand",
                "Target people who have already interacted to increase conversions",
                "Show ads to a very wide audience"
            ],
            correct: 1
        },
        {
            question: "What is A/B testing?",
            options: [
                "Test two versions of an element to identify which performs better",
                "Test two completely opposite advertising channels",
                "Test an online site and an offline site"
            ],
            correct: 0
        },
        {
            question: "What is a backlink?",
            options: [
                "An internal link that points to another page on the same site",
                "A link from an external site to yours, and vice versa",
                "A sponsored link in a Google ad"
            ],
            correct: 1
        }
    ]
};

// Application state
let currentMode = '';
let currentQuestion = null;
let usedQuestions = {
    easy: new Set(),
    hard: new Set()
};

// DOM Elements
const screens = {
    home: document.getElementById('home-screen'),
    question: document.getElementById('question-screen')
};

const elements = {
    easyModeBtn: document.getElementById('easy-mode'),
    hardModeBtn: document.getElementById('hard-mode'),
    rulesBtn: document.getElementById('rules-btn'),
    qrBtn: document.getElementById('qr-btn'),
    modeIndicator: document.getElementById('mode-indicator'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    feedback: document.getElementById('feedback'),
    newQuestionBtn: document.getElementById('new-question-btn'),
    backBtn: document.getElementById('back-btn')
};

// Initialization
function init() {
    // Events
    elements.easyModeBtn.addEventListener('click', () => generateQuestion('easy'));
    elements.hardModeBtn.addEventListener('click', () => generateQuestion('hard'));
    elements.rulesBtn.addEventListener('click', () => window.location.href = 'rules.html');
    elements.qrBtn.addEventListener('click', () => window.location.href = 'qr.html');
    elements.newQuestionBtn.addEventListener('click', () => generateQuestion(currentMode));
    elements.backBtn.addEventListener('click', showHomeScreen);
    
    console.log("Buzz Board quiz application initialized!");
}

// Navigation between screens
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show requested screen
    screens[screenName].classList.add('active');
}

function showHomeScreen() {
    showScreen('home');
    // Reset feedback
    elements.feedback.style.display = 'none';
    elements.feedback.className = 'feedback';
}

// Generate random question
function generateQuestion(mode) {
    currentMode = mode;
    
    // Update mode indicator
    elements.modeIndicator.textContent = `Mode: ${mode === 'easy' ? 'Easy' : 'Hard'}`;
    
    // Get a random unused question
    const availableQuestions = quizData[mode].filter((_, index) => !usedQuestions[mode].has(index));
    
    // If all questions have been used, reset
    if (availableQuestions.length === 0) {
        usedQuestions[mode] = new Set();
        currentQuestion = getRandomQuestion(quizData[mode]);
    } else {
        currentQuestion = getRandomQuestion(availableQuestions);
    }
    
    // Mark question as used
    const originalIndex = quizData[mode].findIndex(q => q.question === currentQuestion.question);
    if (originalIndex !== -1) {
        usedQuestions[mode].add(originalIndex);
    }
    
    // Show question screen
    showScreen('question');
    displayQuestion();
    
    // Reset feedback
    elements.feedback.style.display = 'none';
    elements.feedback.className = 'feedback';
}

function getRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

function displayQuestion() {
    if (!currentQuestion) return;
    
    // Update question text
    elements.questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    elements.optionsContainer.innerHTML = '';
    
    // Add new options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(index));
        elements.optionsContainer.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    // Disable all options
    const allOptions = elements.optionsContainer.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Highlight correct answer and selected answer
    allOptions.forEach((option, index) => {
        if (index === currentQuestion.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Show feedback
    showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
    elements.feedback.textContent = isCorrect 
        ? "✅ Correct! Well done. It's the next player's turn."
        : "❌ Incorrect. The correct answer is shown. It's the next player's turn.";
    
    elements.feedback.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    elements.feedback.style.display = 'block';
}

// Start application when page is loaded
document.addEventListener('DOMContentLoaded', init);