/* chatbot.js */

// 1. Centralized Portfolio Knowledge Base
const PORTFOLIO_DB = {
    ABOUT: `Hi! My name is **Aishi Tiwari** 👋. I am a Computer Science undergraduate student passionate about building practical software products and researching machine learning solutions that carry real-world impacts. 

I'm currently working on Machine Learning systems research, have won 3 hackathons, and love solving DSA problems. 

Feel free to ask me about my projects, research, education, experience, or skills!`,

    EDUCATION: `Here is Aishi's educational background:
* **Bachelor of Technology (B.Tech) in Computer Science and Engineering**
* **Cumulative GPA**: **9.10 / 10.0**
* **Core Focus Areas**: Data Structures & Algorithms (DSA), Machine Learning, Computer Vision, Systems, and Compiler Design.`,

    EXPERIENCE: `Aishi's industry and research experience includes:

1. **Machine Learning Systems Intern at IIT Delhi** (partnered with Larsen & Toubro)
   * Researching and engineering adaptive routing models for computer vision systems.
   * Designing real-time inference pipelines that dynamically route video frames between multiple specialized vision models.

2. **Machine Learning Intern at NITI Aayog** (Government of India)
   * Engineered an end-to-end ML pipeline using satellite imagery to map infrastructure across 112 districts.
   * The outputs of this model directly assist in national-level policy decisions and district planning.`,

    RESEARCH: `Aishi is highly active in AI and systems research:
* **Adaptive Model Routing for Computer Vision** (IIT Delhi & Larsen & Toubro)
  * Developing routing middleware to optimize computer vision latency and accuracy.
  * Dynamically schedules image frames to specialized deep learning models in real time based on task difficulty.
  * *Research paper is currently in preparation and coming out soon!*`,

    PROJECTS: `Here are some key projects Aishi has built:

* **Helium**: A compiler built in **C++** that generates x86-64 Linux executables using NASM and LD. Hand-wrote a recursive-descent parser, separating lexer, parser, and code generation. Implemented 10+ core language features (functions, conditionals, loops).
* **myRepoMate**: An LLM-powered GitHub repository onboarding tool. Uses prompt-engineering and context retrieval to analyze repository codebase structures and generate custom onboarding guides. Launched to **25+ active developers**.
* **Customer Support Intelligence System**: An ML middleware Flask API that analyzes chatbot logs (sentiment trajectory, repetitions, fallback triggers) to predict optimal human handoff points, mitigating silent customer churn. [GitHub Repository](https://github.com/Aish11186/bot-escalation-system)
* **Emotion Based Playlist Pipeline**: OpenCV and deep learning pipeline achieving **88% accuracy** in classifying facial expressions and mapping them to dynamic playlists. [GitHub Repository](https://github.com/Aish11186/EmotionMusicRecomendationSystem)
* **Amazon Price Tracker**: Web scraper built in Python with a Tkinter GUI and scheduling system, notifying users via email on price drops. [GitHub Repository](https://github.com/Aish11186/AmazonPriceTrackerwithlink)
* **Voicivity**: Civic issue reporting platform (**SIH 2025 Finalist**). Built ML text classification via Hugging Face/Scikit-learn and integrated a Firebase backend for automated issue prioritization.`,

    TECHNICAL_SKILLS: `Aishi's technical skillset includes:

* **Programming Languages**: C++, Python, Assembly (x86-64 NASM)
* **AI / Machine Learning**: Deep Learning, Computer Vision, Natural Language Processing (NLP), Large Language Models (LLMs), Prompt Engineering, OpenCV, Scikit-learn, Hugging Face
* **Developer Tools & Frameworks**: Git/GitHub, Linux compilation, Flask API, Firebase, Web Scraping, Tkinter UI, NASM/LD compiler chains
* **Concepts**: Data Structures & Algorithms (350+ LeetCode problems solved), Systems Routing, Compiler Design`,

    ACHIEVEMENTS: `Aishi's notable achievements and stats:
* **3X Hackathon Winner**
* **Smart India Hackathon (SIH) 2025 Finalist** (with project Voicivity)
* **Top 1500** in Google Big Code Competition
* **Top 8%** in Adobe University Hackathon
* **350+ LeetCode problems solved** with regular contest participation`,

    CONTACT: `Here is how you can connect with Aishi:
* **Email**: [aishitiwari1@gmail.com](mailto:aishitiwari1@gmail.com)
* **Phone**: +91 9354414404
* **LinkedIn**: [linkedin.com/in/aishi-tiwari-90a253345/](https://linkedin.com/in/aishi-tiwari-90a253345/)
* **GitHub**: [github.com/Aish11186](https://github.com/Aish11186)
* **LeetCode**: [leetcode.com/u/Aish1811/](https://leetcode.com/u/Aish1811/)
* **Resume**: [Read Aishi's Resume](https://docs.google.com/document/d/1LC6YdG85i8jWNA55De0WIBDQw75psxawSwsD971S67k/edit?usp=sharing)`
};

// 2. Setup Suggestion Chips and Predefined Answers
const CHIP_ANSWERS = {
    "What projects has Aishi worked on?": PORTFOLIO_DB.PROJECTS,
    "Tell me about her IIT Delhi research": PORTFOLIO_DB.RESEARCH,
    "What are her technical skills?": PORTFOLIO_DB.TECHNICAL_SKILLS,
    "Tell me about her experience": PORTFOLIO_DB.EXPERIENCE
};

// 3. Keyword Matcher
function getPredefinedResponse(userInput) {
    const text = userInput.toLowerCase().trim();

    // Check direct matching with suggestion chips
    if (CHIP_ANSWERS[userInput]) {
        return CHIP_ANSWERS[userInput];
    }

    // Keyword groups
    if (text.includes("project") || text.includes("portfolio") || text.includes("code") || text.includes("helium") || text.includes("repomate")) {
        return PORTFOLIO_DB.PROJECTS;
    }
    if (text.includes("research") || text.includes("iit") || text.includes("iitd") || text.includes("larsen") || text.includes("toubro") || text.includes("l&t")) {
        return PORTFOLIO_DB.RESEARCH;
    }
    if (text.includes("skill") || text.includes("skills") || text.includes("technologies") || text.includes("languages") || text.includes("programming") || text.includes("dsa") || text.includes("leetcode")) {
        return PORTFOLIO_DB.TECHNICAL_SKILLS;
    }
    if (text.includes("experience") || text.includes("internship") || text.includes("intern") || text.includes("niti") || text.includes("aayog") || text.includes("work")) {
        return PORTFOLIO_DB.EXPERIENCE;
    }
    if (text.includes("education") || text.includes("college") || text.includes("gpa") || text.includes("btech") || text.includes("degree") || text.includes("marks")) {
        return PORTFOLIO_DB.EDUCATION;
    }
    if (text.includes("achievement") || text.includes("achievements") || text.includes("hackathon") || text.includes("sih") || text.includes("winner") || text.includes("finalist") || text.includes("google") || text.includes("adobe")) {
        return PORTFOLIO_DB.ACHIEVEMENTS;
    }
    if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("reach") || text.includes("hire") || text.includes("connect") || text.includes("linkedin") || text.includes("github") || text.includes("resume")) {
        return PORTFOLIO_DB.CONTACT;
    }
    if (text.includes("photo") || text.includes("picture") || text.includes("image") || text.includes("face") || text.includes("look like") || text.includes("screenshot")) {
        return "Here is my profile photo:\n\n![Aishi Tiwari](profile.jpg)\n\nHi this is me!";
    }
    if (text.includes("about") || text.includes("aishi") || text.includes("who is") || text.includes("profile") || text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        return PORTFOLIO_DB.ABOUT;
    }

    // Fallback response
    return `I'm currently a frontend-only version of Aishi's AI, so I can only answer a limited set of questions about her portfolio right now. Try asking me about her **projects**, **research**, **skills**, **experience**, or **education**!`;
}

// 4. Custom Simple Markdown Parser
function parseMarkdown(text) {
    // Escape standard HTML
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Bold syntax: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Images: ![label](url)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 200px; border-radius: 8px; display: block; margin: 10px 0; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 4px 16px rgba(0,0,0,0.5);" />');

    // Links: [label](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Split lines for list parsing
    const lines = html.split("\n");
    let insideUl = false;
    let insideOl = false;
    let parsedLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line.startsWith("* ") || line.startsWith("- ")) {
            if (insideOl) {
                parsedLines.push("</ol>");
                insideOl = false;
            }
            if (!insideUl) {
                parsedLines.push("<ul>");
                insideUl = true;
            }
            parsedLines.push("<li>" + line.substring(2) + "</li>");
        } else if (/^\d+\.\s/.test(line)) {
            if (insideUl) {
                parsedLines.push("</ul>");
                insideUl = false;
            }
            if (!insideOl) {
                parsedLines.push("<ol>");
                insideOl = true;
            }
            const cleanContent = line.replace(/^\d+\.\s/, "");
            parsedLines.push("<li>" + cleanContent + "</li>");
        } else {
            if (insideUl) {
                parsedLines.push("</ul>");
                insideUl = false;
            }
            if (insideOl) {
                parsedLines.push("</ol>");
                insideOl = false;
            }
            if (line === "") {
                parsedLines.push("<br>");
            } else {
                parsedLines.push("<p>" + line + "</p>");
            }
        }
    }

    if (insideUl) parsedLines.push("</ul>");
    if (insideOl) parsedLines.push("</ol>");

    return parsedLines.join("\n").replace(/<p><br><\/p>/g, "<br>").replace(/<p><\/p>/g, "");
}

// 5. Initialize Chatbot Component DOM
document.addEventListener("DOMContentLoaded", () => {
    // Prevent duplicate injections
    if (document.getElementById("portfolio-chatbot-root")) return;

    // Create Root Container
    const root = document.createElement("div");
    root.id = "portfolio-chatbot-root";
    document.body.appendChild(root);

    // Inject CSS dynamic import (failsafe if HTML script link is missed)
    if (!document.querySelector('link[href*="chatbot.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "chatbot.css";
        document.head.appendChild(link);
    }

    // HTML Structure Markup
    root.innerHTML = `
        <!-- Floating Button -->
        <div class="chat-btn-container" id="chatBtnContainer">
            <div class="chat-tooltip">Ask Aishi's AI</div>
            <button class="chat-btn" id="chatFloatingBtn">
                <svg viewBox="0 0 24 24">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                </svg>
            </button>
        </div>

        <!-- Scroll/Landing Pointer Note with Squiggly Arrow -->
        <div class="chat-pointer-container" id="chatPointerContainer">
            <div class="chat-pointer-text">Click here to ask about Aishi</div>
            <div class="chat-pointer-arrow">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20,10 Q80,10 80,65" />
                    <path d="M70,55 L80,65 L88,53" />
                </svg>
            </div>
        </div>

        <!-- Chat Window Panel -->
        <div class="chat-window" id="chatWindow">
            <!-- Header bar / Drag zone -->
            <div class="chat-header" id="chatHeader">
                <div class="mac-buttons">
                    <button class="mac-btn close" id="chatCloseBtn" title="Close"></button>
                    <button class="mac-btn minimize" id="chatMinBtn" title="Minimize"></button>
                    <button class="mac-btn maximize" id="chatMaxBtn" title="Reset Position"></button>
                </div>
                <div class="chat-title-wrapper">
                    <svg class="chat-title-icon" viewBox="0 0 24 24">
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                    </svg>
                </div>
                <div class="chat-header-actions">
                    <button class="sidebar-toggle-btn" id="sidebarToggleBtn" title="Toggle Sidebar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="9" y1="3" x2="9" y2="21"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Body Area -->
            <div class="chat-container">
                <!-- Collapsible Sidebar -->
                <aside class="chat-sidebar" id="chatSidebar">
                    <div class="sidebar-nav-container">
                        <button class="new-chat-btn" id="newChatBtn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            <span>New chat</span>
                        </button>
                        <button class="sidebar-nav-item" id="navImagesBtn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 22H18C19.1 22 20 21.1 20 20V9M20 9C20 7.9 19.1 7 18 7H9C7.9 7 7 7.9 7 9V20C7 21.1 7.9 22 9 22Z" />
                                <path d="M5 17H14C15.1 17 16 16.1 16 15V4C16 2.9 15.1 2 14 2H5C3.9 2 3 2.9 3 4V15C3 16.1 3.9 17 5 17Z" />
                                <circle cx="7" cy="6" r="1" />
                                <path d="M5 14L8 10L13 14" />
                            </svg>
                            <span>Images</span>
                        </button>
                        <button class="sidebar-nav-item" id="navLibraryBtn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h2c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18" />
                                <path d="M10 22V4c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h2c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18" />
                                <path d="M16 22V7c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h2c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18" />
                            </svg>
                            <span>Library</span>
                        </button>
                    </div>

                    <!-- Stats counter removed -->

                    <div class="history-section">
                        <div class="history-title">Session History</div>
                        <ul class="history-list" id="historyList">
                            <!-- Populated dynamically -->
                        </ul>
                    </div>

                    <div class="sidebar-footer">
                        <button class="clear-btn" id="clearChatBtn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Clear Conversation
                        </button>

                        <div class="sidebar-footer-menu">
                            <div class="sidebar-footer-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" opacity="0.2"/>
                                    <path d="M12 7a5 5 0 0 1 5 5"/>
                                    <circle cx="12" cy="12" r="2"/>
                                </svg>
                                <span>See plans and pricing</span>
                            </div>
                            <div class="sidebar-footer-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="4" y1="8" x2="20" y2="8" />
                                    <line x1="4" y1="16" x2="20" y2="16" />
                                    <circle cx="8" cy="8" r="2.5" />
                                    <circle cx="16" cy="16" r="2.5" />
                                </svg>
                                <span>Settings</span>
                            </div>
                            <div class="sidebar-footer-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                                <span>Help</span>
                            </div>
                        </div>

                        <div class="sidebar-profile-row">
                            <img src="profile.jpg" alt="Aishi Avatar" class="profile-avatar-img" />
                            <div class="profile-meta-info">
                                <span class="profile-name">Aishi</span>
                                <span class="profile-plan">Free</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Chat Dialog Panels -->
                <main class="chat-main">
                    <div class="messages-container" id="messagesContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Images Page View (hidden by default) -->
                    <div class="chat-images-view" id="chatImagesView" style="display: none;">
                        <div class="chat-images-content">
                            <div class="profile-image-wrapper">
                                <img src="profile.jpg" alt="Aishi Tiwari" class="profile-chat-img" />
                            </div>
                            <div class="profile-image-caption">Hi this is me!</div>
                        </div>
                    </div>

                    <!-- Library Page View (hidden by default) -->
                    <div class="chat-library-view" id="chatLibraryView" style="display: none;">
                        <div class="chat-library-content">
                            <h2 class="library-heading">This is an actualy Books Library for things I read recently that stuck with me</h2>
                            <div class="library-books-list">
                                <div class="library-book-item">
                                    <div class="book-meta">
                                        <span class="book-number">1.</span>
                                        <span class="book-title">A thousand Splendid suns</span>
                                        <span class="book-author">by Khaled Hoseini</span>
                                    </div>
                                    <blockquote class="book-quote">"One could not count the moons that shimmer on her roofs, or the thousand splendid suns that hide behind her walls."</blockquote>
                                </div>
                                <div class="library-book-item">
                                    <div class="book-meta">
                                        <span class="book-number">2.</span>
                                        <span class="book-title">The sapiens trilogy</span>
                                        <span class="book-author">by yuval Noha Harari</span>
                                    </div>
                                    <blockquote class="book-quote">" To get ahead, you must leave your baggage behind, for it it very heavy"</blockquote>
                                </div>
                                <div class="library-book-item">
                                    <div class="book-meta">
                                        <span class="book-number">3.</span>
                                        <span class="book-title">The Bell Jar</span>
                                        <span class="book-author">by syliva Plath</span>
                                    </div>
                                    <blockquote class="book-quote">"I took a deep breath and listened to the old brag of my heart. I am, I am, I am."</blockquote>
                                </div>
                                <div class="library-book-item">
                                    <div class="book-meta">
                                        <span class="book-number">4.</span>
                                        <span class="book-title">The Death of Ivan Ilyich</span>
                                        <span class="book-author">by Leo Tolstoy</span>
                                    </div>
                                    <blockquote class="book-quote">"Where was it? What pain? 'Yes, here it is. Well, what of it? Let the pain be.' 'And death... where is it?'"</blockquote>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Input block -->
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <textarea class="chat-input-field" id="chatInputField" placeholder="Message Aishi's AI..." rows="1"></textarea>
                            <button class="chat-send-btn" id="chatSendBtn" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5"/>
                                    <polyline points="5 12 12 5 19 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="chat-info-note">Prototype v1.0 • Built by Aishi.</div>
                    </div>
                </main>
            </div>
        </div>
    `;

    // DOM Reference caches
    const chatFloatingBtn = document.getElementById("chatFloatingBtn");
    const chatWindow = document.getElementById("chatWindow");
    const chatHeader = document.getElementById("chatHeader");
    const chatCloseBtn = document.getElementById("chatCloseBtn");
    const chatMinBtn = document.getElementById("chatMinBtn");
    const chatMaxBtn = document.getElementById("chatMaxBtn");
    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
    const chatSidebar = document.getElementById("chatSidebar");
    const newChatBtn = document.getElementById("newChatBtn");
    const navImagesBtn = document.getElementById("navImagesBtn");
    const navLibraryBtn = document.getElementById("navLibraryBtn");
    const clearChatBtn = document.getElementById("clearChatBtn");
    const messagesContainer = document.getElementById("messagesContainer");
    const chatImagesView = document.getElementById("chatImagesView");
    const chatLibraryView = document.getElementById("chatLibraryView");
    const chatInputField = document.getElementById("chatInputField");
    const chatSendBtn = document.getElementById("chatSendBtn");
    const statsQAsked = document.getElementById("statsQAsked");
    const historyList = document.getElementById("historyList");

    // Chatbot States
    let isOpen = false;
    let isMaximized = false;
    let messages = [];
    let questionCounter = 0;
    let isTypingResponse = false;
    let sessionHistoryItems = [];

    // ==========================================
    // Core Layout Positioning & Scaling Handlers
    // ==========================================
    function centerChatWindow() {
        if (window.innerWidth <= 768) {
            chatWindow.style.left = "0px";
            chatWindow.style.top = "0px";
            chatWindow.style.width = "100%";
            chatWindow.style.height = "100%";
            chatWindow.style.transform = "none";
            return;
        }

        const width = 850;
        const height = 580;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        chatWindow.style.left = left + "px";
        chatWindow.style.top = top + "px";
        chatWindow.style.width = width + "px";
        chatWindow.style.height = height + "px";
        chatWindow.style.transform = "scale(1)";
    }

    function toggleChatWindow() {
        isOpen = !isOpen;
        localStorage.setItem("portfolio_chat_open", isOpen);

        // Hide the landing page arrow instantly if chat is opened
        updatePointerVisibility();

        if (isOpen) {
            centerChatWindow();
            chatWindow.style.transform = "scale(0)";
            chatWindow.style.opacity = "0";
            chatWindow.offsetHeight; // Reflow trigger
            chatWindow.classList.add("open");
            chatWindow.style.transform = "scale(1)";
            chatWindow.style.opacity = "1";
            chatInputField.focus();
            scrollToBottom();
        } else {
            chatWindow.style.transform = "scale(0)";
            chatWindow.style.opacity = "0";
            setTimeout(() => {
                chatWindow.classList.remove("open");
            }, 300);
        }
    }

    // Window Resizing adjustment
    window.addEventListener("resize", () => {
        if (isOpen) {
            centerChatWindow();
        }
    });

    // ==========================================
    // Draggable Window Logic
    // ==========================================
    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;

    chatHeader.addEventListener("mousedown", (e) => {
        if (isMaximized || window.innerWidth <= 768) return;
        if (e.target.closest(".mac-btn") || e.target.closest(".sidebar-toggle-btn")) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = chatWindow.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        chatWindow.style.transform = "none";
        chatWindow.style.left = initialLeft + "px";
        chatWindow.style.top = initialTop + "px";
        chatWindow.style.right = "auto";
        chatWindow.style.bottom = "auto";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const windowWidth = chatWindow.offsetWidth;
        const windowHeight = chatWindow.offsetHeight;

        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + windowWidth > window.innerWidth) newLeft = window.innerWidth - windowWidth;
        if (newTop + windowHeight > window.innerHeight) newTop = window.innerHeight - windowHeight;

        chatWindow.style.left = newLeft + "px";
        chatWindow.style.top = newTop + "px";
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    // ==========================================
    // Apple Style Window controls
    // ==========================================
    // Close Window
    chatCloseBtn.addEventListener("click", () => {
        toggleChatWindow();
    });

    // Minimize
    chatMinBtn.addEventListener("click", () => {
        toggleChatWindow();
    });

    // Maximize (Resets Position to Center)
    chatMaxBtn.addEventListener("click", () => {
        isMaximized = false;
        centerChatWindow();
    });

    // Sidebar Collapse Trigger
    sidebarToggleBtn.addEventListener("click", () => {
        chatSidebar.classList.toggle("collapsed");
        if (window.innerWidth <= 768) {
            chatSidebar.classList.toggle("active");
        }
        localStorage.setItem("portfolio_chat_sidebar_collapsed", chatSidebar.classList.contains("collapsed"));
    });

    // ==========================================
    // LocalStorage State Management
    // ==========================================
    function loadSavedState() {
        // Retrieve open state
        const savedOpen = localStorage.getItem("portfolio_chat_open") === "true";

        // Retrieve collapsed sidebar state
        const savedSidebarCollapsed = localStorage.getItem("portfolio_chat_sidebar_collapsed") === "true";
        if (savedSidebarCollapsed) {
            chatSidebar.classList.add("collapsed");
        }

        // Retrieve Question Counter
        const savedCounter = localStorage.getItem("portfolio_chat_qcounter");
        if (savedCounter) {
            questionCounter = parseInt(savedCounter, 10);
            if (statsQAsked) statsQAsked.textContent = questionCounter;
        }

        // Retrieve Session History Items list
        const savedSessionHistory = localStorage.getItem("portfolio_chat_session_history");
        if (savedSessionHistory) {
            sessionHistoryItems = JSON.parse(savedSessionHistory);
            renderSessionHistory();
        }

        // Retrieve Messages
        const savedMessages = localStorage.getItem("portfolio_chat_messages");
        if (savedMessages) {
            messages = JSON.parse(savedMessages);
            renderMessages();
        } else {
            // Fresh greeting state
            resetChatToInitial();
        }

        if (savedOpen) {
            toggleChatWindow();
        }
    }

    function saveChatState() {
        localStorage.setItem("portfolio_chat_messages", JSON.stringify(messages));
        localStorage.setItem("portfolio_chat_qcounter", questionCounter);
        localStorage.setItem("portfolio_chat_session_history", JSON.stringify(sessionHistoryItems));
    }

    // ==========================================
    // Render and Message Controls
    // ==========================================
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function resetChatToInitial() {
        messages = [
            {
                sender: "assistant",
                content: "Hi! Ask me anything about Aishi's projects, research, skills, experience, or background.",
                isInitial: true
            }
        ];
        if (navImagesBtn) navImagesBtn.classList.remove("active");
        if (navLibraryBtn) navLibraryBtn.classList.remove("active");
        if (chatImagesView) chatImagesView.style.display = "none";
        if (chatLibraryView) chatLibraryView.style.display = "none";
        messagesContainer.style.display = "flex";
        saveChatState();
        renderMessages();
    }

    function renderMessages() {
        messagesContainer.innerHTML = "";

        messages.forEach((msg, idx) => {
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("message", msg.sender);

            if (msg.sender === "user") {
                msgDiv.innerHTML = `
                    <div class="message-bubble">${parseMarkdown(msg.content)}</div>
                `;
            } else {
                // OpenAI Avatar
                const avatar = `
                    <div class="message-avatar">
                        <svg viewBox="0 0 24 24">
                            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                        </svg>
                    </div>
                `;
                msgDiv.innerHTML = avatar + `
                    <div class="message-content">${parseMarkdown(msg.content)}</div>
                `;
            }
            messagesContainer.appendChild(msgDiv);

            // If greeting message, append suggestions
            if (msg.isInitial) {
                const suggWrapper = document.createElement("div");
                suggWrapper.classList.add("suggestions-wrapper");
                suggWrapper.innerHTML = `
                    <div class="suggestions-grid">
                        <button class="suggestion-chip">What projects has Aishi worked on?</button>
                        <button class="suggestion-chip">Tell me about her IIT Delhi research</button>
                        <button class="suggestion-chip">What are her technical skills?</button>
                        <button class="suggestion-chip">Tell me about her experience</button>
                    </div>
                `;

                // Add event listeners to suggestion chips
                suggWrapper.querySelectorAll(".suggestion-chip").forEach(chip => {
                    chip.addEventListener("click", () => {
                        handleSendMessage(chip.textContent);
                    });
                });

                messagesContainer.appendChild(suggWrapper);
            }
        });

        scrollToBottom();
    }

    function renderSessionHistory() {
        historyList.innerHTML = "";

        if (sessionHistoryItems.length === 0) {
            historyList.innerHTML = `
                <li style="font-size:11px; color:rgba(255,255,255,0.3); text-align:center; padding:10px 0;">No active queries</li>
            `;
            return;
        }

        sessionHistoryItems.forEach((query) => {
            const li = document.createElement("li");
            li.classList.add("history-item");
            li.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>${query}</span>
            `;

            li.addEventListener("click", () => {
                handleSendMessage(query);
            });

            historyList.appendChild(li);
        });
    }

    // ==========================================
    // Streaming Animation & Message Processing
    // ==========================================
    function streamResponse(fullResponseText) {
        isTypingResponse = true;
        chatInputField.disabled = true;
        chatSendBtn.disabled = true;

        // Create Assistant Bubble
        const assistantMsgDiv = document.createElement("div");
        assistantMsgDiv.classList.add("message", "assistant");

        const avatar = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                </svg>
            </div>
        `;

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("message-content");
        contentDiv.innerHTML = `<span class="streaming-char"></span><span class="streaming-cursor"></span>`;

        assistantMsgDiv.innerHTML = avatar;
        assistantMsgDiv.appendChild(contentDiv);
        messagesContainer.appendChild(assistantMsgDiv);
        scrollToBottom();

        const textSpan = contentDiv.querySelector(".streaming-char");
        const cursor = contentDiv.querySelector(".streaming-cursor");

        // Parse complete Markdown to HTML first to avoid partial markdown layout flickering!
        const finalHtml = parseMarkdown(fullResponseText);

        let currentHtml = "";
        let i = 0;
        const typingSpeed = 15; // ms per character

        function typeHtmlStep() {
            if (i >= finalHtml.length) {
                // Done typing
                textSpan.innerHTML = finalHtml;
                if (cursor) cursor.remove();

                // Add complete message object to state list
                messages.push({
                    sender: "assistant",
                    content: fullResponseText
                });

                isTypingResponse = false;
                chatInputField.disabled = false;
                chatInputField.focus();

                adjustInputHeight();
                saveChatState();
                return;
            }

            // Check if we hit an HTML tag, if so print the entire tag instantly to avoid visible raw tag syntax
            if (finalHtml[i] === '<') {
                const tagEnd = finalHtml.indexOf('>', i);
                if (tagEnd !== -1) {
                    currentHtml += finalHtml.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                    textSpan.innerHTML = currentHtml;
                    setTimeout(typeHtmlStep, 0); // Speed run past tag structural nodes
                    return;
                }
            }

            // Append single character
            currentHtml += finalHtml[i];
            i++;
            textSpan.innerHTML = currentHtml;
            scrollToBottom();
            setTimeout(typeHtmlStep, typingSpeed);
        }

        setTimeout(typeHtmlStep, typingSpeed);
    }

    function handleSendMessage(textVal) {
        if (isTypingResponse || !textVal.trim()) return;

        // Transition back to chat dialogue if currently viewing images or library page
        if (chatImagesView) chatImagesView.style.display = "none";
        if (chatLibraryView) chatLibraryView.style.display = "none";
        messagesContainer.style.display = "flex";
        if (navImagesBtn) navImagesBtn.classList.remove("active");
        if (navLibraryBtn) navLibraryBtn.classList.remove("active");

        // Increment stats
        questionCounter++;
        if (statsQAsked) statsQAsked.textContent = questionCounter;

        // Add to history sidebar list
        const cleanQuery = textVal.trim();
        if (!sessionHistoryItems.includes(cleanQuery)) {
            sessionHistoryItems.unshift(cleanQuery); // Add to top
            if (sessionHistoryItems.length > 10) {
                sessionHistoryItems.pop(); // Keep top 10
            }
            renderSessionHistory();
        }

        // Add user message
        messages.push({
            sender: "user",
            content: cleanQuery
        });

        renderMessages();

        // Reset input area height and status
        chatInputField.value = "";
        adjustInputHeight();
        chatSendBtn.disabled = true;
        chatSendBtn.classList.remove("active");

        // Show Thinking Indicator
        const thinkingDiv = document.createElement("div");
        thinkingDiv.id = "thinkingIndicatorBubble";
        thinkingDiv.classList.add("message", "assistant");

        const avatar = `
            <div class="message-avatar">
                <svg viewBox="0 0 16 16">
                    <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.024 3.025v3.737a.52.52 0 0 0 .27.446l3.935 2.247-1.362.776a.05.05 0 0 1-.048 0L5.503 8.575z"/>
                </svg>
            </div>
        `;
        thinkingDiv.innerHTML = avatar + `
            <div class="message-content">
                <div class="thinking-indicator">
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(thinkingDiv);
        scrollToBottom();

        // 500-1000ms thinking delay
        const responseText = getPredefinedResponse(cleanQuery);
        const delay = Math.floor(Math.random() * 500) + 500; // 500ms to 1000ms

        setTimeout(() => {
            // Remove Thinking Indicator
            const bubble = document.getElementById("thinkingIndicatorBubble");
            if (bubble) bubble.remove();

            // Stream response
            streamResponse(responseText);
        }, delay);
    }

    // ==========================================
    // Interactive Elements Event Hooks
    // ==========================================
    // Toggle Button Click
    chatFloatingBtn.addEventListener("click", () => {
        toggleChatWindow();
    });

    // Send Button Click
    chatSendBtn.addEventListener("click", () => {
        handleSendMessage(chatInputField.value);
    });

    // Sidebar Action: New Chat (Resets screen to Greeting)
    newChatBtn.addEventListener("click", () => {
        resetChatToInitial();
        if (navImagesBtn) navImagesBtn.classList.remove("active");
        if (navLibraryBtn) navLibraryBtn.classList.remove("active");

        // Restore standard messages container and hide page views
        if (chatImagesView) chatImagesView.style.display = "none";
        if (chatLibraryView) chatLibraryView.style.display = "none";
        messagesContainer.style.display = "flex";
    });

    if (navImagesBtn) {
        navImagesBtn.addEventListener("click", () => {
            navImagesBtn.classList.add("active");
            if (navLibraryBtn) navLibraryBtn.classList.remove("active");

            // Hide standard messages container and show images page view
            messagesContainer.style.display = "none";
            if (chatLibraryView) chatLibraryView.style.display = "none";
            if (chatImagesView) chatImagesView.style.display = "flex";
        });
    }

    if (navLibraryBtn) {
        navLibraryBtn.addEventListener("click", () => {
            navLibraryBtn.classList.add("active");
            if (navImagesBtn) navImagesBtn.classList.remove("active");

            // Hide standard messages container and show library page view
            messagesContainer.style.display = "none";
            if (chatImagesView) chatImagesView.style.display = "none";
            if (chatLibraryView) chatLibraryView.style.display = "flex";
        });
    }

    // Sidebar Action: Clear Conversation
    clearChatBtn.addEventListener("click", () => {
        resetChatToInitial();
        questionCounter = 0;
        sessionHistoryItems = [];
        if (statsQAsked) statsQAsked.textContent = 0;
        saveChatState();
        renderSessionHistory();
    });

    // Text Area key actions
    function adjustInputHeight() {
        chatInputField.style.height = "auto";
        chatInputField.style.height = (chatInputField.scrollHeight - 10) + "px";
    }

    chatInputField.addEventListener("input", () => {
        adjustInputHeight();
        const valueEmpty = !chatInputField.value.trim();
        chatSendBtn.disabled = valueEmpty;
        if (valueEmpty) {
            chatSendBtn.classList.remove("active");
        } else {
            chatSendBtn.classList.add("active");
        }
    });

    chatInputField.addEventListener("keydown", (e) => {
        // Submit on Enter, line break on Shift+Enter
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (chatInputField.value.trim() && !isTypingResponse) {
                handleSendMessage(chatInputField.value);
            }
        }
    });

    // Scroll/Landing page pointer note visibility logic
    const chatPointerContainer = document.getElementById("chatPointerContainer");
    let pointerTimeout = null;
    let hidePointerAfterTimeout = false;
    let wasAtTop = false;

    function updatePointerVisibility() {
        if (!chatPointerContainer) return;

        const isLanding = !!document.querySelector(".landing-section");
        const isAtTop = window.scrollY <= 50;
        const isChatClosed = !isOpen;
        const isDesktop = window.innerWidth > 768;

        // Handle transition timers when hitting the top or scrolling down
        if (isLanding && isChatClosed && isDesktop) {
            if (isAtTop) {
                if (!wasAtTop) {
                    wasAtTop = true;
                    hidePointerAfterTimeout = false;
                    clearTimeout(pointerTimeout);
                    pointerTimeout = setTimeout(() => {
                        hidePointerAfterTimeout = true;
                        updatePointerVisibility();
                    }, 4000);
                }
            } else {
                if (wasAtTop) {
                    wasAtTop = false;
                    hidePointerAfterTimeout = false;
                    clearTimeout(pointerTimeout);
                }
            }
        } else {
            // Reset state if window state changes or on non-landing views
            wasAtTop = false;
            hidePointerAfterTimeout = false;
            clearTimeout(pointerTimeout);
        }

        // Show note only if landing/top/closed/desktop AND the 4-second display timer is still active
        if (isLanding && isAtTop && isChatClosed && isDesktop && !hidePointerAfterTimeout) {
            chatPointerContainer.classList.add("visible");
        } else {
            chatPointerContainer.classList.remove("visible");
        }
    }

    // Call pointer visibility update initially and bind event hooks
    updatePointerVisibility();
    window.addEventListener("scroll", updatePointerVisibility, { passive: true });
    window.addEventListener("resize", updatePointerVisibility, { passive: true });

    // Load initial states
    loadSavedState();

    // Check visibility after load state is applied
    updatePointerVisibility();
});
