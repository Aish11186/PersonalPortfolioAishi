

// FADE OUT
document.querySelectorAll("a").forEach(link => {
    if (link.hostname === window.location.hostname) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.href;
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    }
});
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e) {
    if (this.href && this.target !== "_blank") {
      e.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location = this.href;
      }, 300);
    }
  });
});

// PROJECT CARD TILT
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height/2) / 10;
        const rotateY = (x - rect.width/2) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});

// SCROLL BACKGROUND COLOR TRANSITION
const handleBgTransition = () => {
  if (window.scrollY >= window.innerHeight * 0.4) {
    document.body.classList.add('scrolled-state');
  } else {
    document.body.classList.remove('scrolled-state');
  }
};
window.addEventListener('scroll', handleBgTransition);
window.addEventListener('load', handleBgTransition);

// TEXT SCRAMBLER / CIPHER REVEAL
class TextScrambler {
  constructor(el, speed = 25) {
    this.el = el;
    this.targetText = el.getAttribute('data-text') || el.textContent || '';
    this.speed = speed;
    this.chars = '!<>-_\\/[]{}—=+*^?#________abcdefghijklmnopqrstuvwxyz0123456789';
    this.isAnimating = false;
    this.timeoutId = null;
    this.el.textContent = ' '.repeat(this.targetText.length);
  }

  reset() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isAnimating = false;
    this.el.textContent = ' '.repeat(this.targetText.length);
  }

  scramble() {
    this.reset();
    this.isAnimating = true;
    
    return new Promise((resolve) => {
      const length = this.targetText.length;
      let currentText = Array(length).fill(' ');
      let progress = Array(length).fill(0); // 0: randomizing, 1: locked
      let lockIndex = 0;
      let tickCount = 0;
      
      const tick = () => {
        let isDone = true;
        
        for (let i = 0; i < length; i++) {
          if (progress[i] < 1) {
            isDone = false;
            if (this.targetText[i] === ' ') {
              currentText[i] = ' ';
              progress[i] = 1;
            } else {
              currentText[i] = this.chars[Math.floor(Math.random() * this.chars.length)];
            }
          } else {
            currentText[i] = this.targetText[i];
          }
        }
        
        let htmlOutput = '';
        for (let i = 0; i < length; i++) {
          if (progress[i] < 1) {
            htmlOutput += `<span class="scramble-char">${currentText[i]}</span>`;
          } else {
            htmlOutput += currentText[i];
          }
        }
        this.el.innerHTML = htmlOutput;
        
        tickCount++;
        if (tickCount >= 1) {
          if (lockIndex < length) {
            progress[lockIndex] = 1;
            lockIndex++;
          }
          tickCount = 0;
        }
        
        if (isDone && lockIndex >= length) {
          this.el.textContent = this.targetText;
          this.isAnimating = false;
          resolve();
        } else {
          this.timeoutId = setTimeout(tick, this.speed);
        }
      };
      
      tick();
    });
  }
}

// Initialize Scramble & Card Effects on Load
document.addEventListener('DOMContentLoaded', () => {
  const experiencesSection = document.querySelector('#experiences');
  if (experiencesSection) {
    const heading = experiencesSection.querySelector('.scramble-heading');
    const caption = experiencesSection.querySelector('.scramble-caption');
    const grid = experiencesSection.querySelector('.experience-grid');
    
    let headingScrambler = null;
    let captionScrambler = null;
    
    if (heading) {
      headingScrambler = new TextScrambler(heading, 25);
    }
    if (caption) {
      captionScrambler = new TextScrambler(caption, 15);
    }
    
    // Intersection Observer to trigger scramble
    let isScrambled = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isScrambled) {
            isScrambled = true;
            if (headingScrambler) {
              headingScrambler.scramble().then(() => {
                if (caption) caption.classList.add('visible');
                if (captionScrambler) {
                  captionScrambler.scramble().then(() => {
                    if (grid) grid.classList.add('visible');
                  });
                } else {
                  if (grid) grid.classList.add('visible');
                }
              });
            } else {
              if (caption) caption.classList.add('visible');
              if (grid) grid.classList.add('visible');
            }
          }
        } else {
          // Reset when scrolling back up (or out of view)
          isScrambled = false;
          if (headingScrambler) headingScrambler.reset();
          if (captionScrambler) captionScrambler.reset();
          if (caption) caption.classList.remove('visible');
          if (grid) grid.classList.remove('visible');
        }
      });
    }, { threshold: 0.15 });
    
    observer.observe(experiencesSection);
    
    // Interactive mouse move glow effect for cards
    const cards = experiencesSection.querySelectorAll('.experience-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    });
  }

  // NAV GUIDE HANDWRITTEN EFFECT
  const navGuideSection = document.querySelector('#nav-guide');
  if (navGuideSection) {
    const textWrapper = navGuideSection.querySelector('.nav-guide-text');
    if (textWrapper) {
      const handSpans = prepareHandwriting(textWrapper);
      
      let guideObserved = false;
      const guideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!guideObserved) {
              guideObserved = true;
              startHandwriting(handSpans);
            }
          } else {
            guideObserved = false;
            resetHandwriting(handSpans);
          }
        });
      }, { threshold: 0.15 });
      
      guideObserver.observe(navGuideSection);
    }
  }
});

// ORGANIC INK HANDWRITING HELPER FUNCTIONS
const prepareHandwriting = (container) => {
  const chars = [];
  
  const recurse = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      
      const isFirst = (node.previousSibling === null);
      const isLast = (node.nextSibling === null);
      
      // Collapse all formatting whitespace sequences (spaces, tabs, newlines) to a single space
      text = text.replace(/\s+/g, ' ');
      
      if (isFirst) {
        text = text.replace(/^\s+/, ''); // trim leading space at tag border
      }
      if (isLast) {
        text = text.replace(/\s+$/, ''); // trim trailing space at tag border
      }
      
      if (text.length === 0) return;
      
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'handwritten-char';
        
        if (text[i] === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = text[i];
        }
        
        // Assign a tiny, organic, casual rotation to simulate actual penmanship
        const rot = (Math.random() * 6 - 3).toFixed(1);
        span.style.setProperty('--rot', `${rot}deg`);
        
        fragment.appendChild(span);
        chars.push({
          element: span,
          char: text[i]
        });
      }
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes);
      children.forEach(recurse);
    }
  };
  
  recurse(container);
  return chars;
};

let handwritingTimer = null;
let currentHandwritingIndex = 0;
let isWriting = false;

const startHandwriting = (chars) => {
  isWriting = true;
  currentHandwritingIndex = 0;
  
  chars.forEach(item => {
    item.element.classList.remove('written');
    const parentLink = item.element.closest('.nav-guide-link');
    if (parentLink) {
      parentLink.classList.remove('active-link');
    }
  });
  
  const writeNext = () => {
    if (!isWriting || currentHandwritingIndex >= chars.length) {
      isWriting = false;
      return;
    }
    
    const item = chars[currentHandwritingIndex];
    item.element.classList.add('written');
    
    // Toggle active-link class when the text inside the link begins to appear
    const parentLink = item.element.closest('.nav-guide-link');
    if (parentLink) {
      parentLink.classList.add('active-link');
    }
    
    let delay = 5 + Math.random() * 7; // Even faster letter delay (5ms - 12ms)
    if (item.char === ' ') {
      delay = 12 + Math.random() * 10; // Snappier word space delay
    } else if (['.', ',', ':', ')'].includes(item.char)) {
      delay = 40 + Math.random() * 30; // Snappier punctuation pause
    }
    
    currentHandwritingIndex++;
    handwritingTimer = setTimeout(writeNext, delay);
  };
  
  writeNext();
};

const resetHandwriting = (chars) => {
  isWriting = false;
  if (handwritingTimer) {
    clearTimeout(handwritingTimer);
    handwritingTimer = null;
  }
  chars.forEach(item => {
    item.element.classList.remove('written');
    const parentLink = item.element.closest('.nav-guide-link');
    if (parentLink) {
      parentLink.classList.remove('active-link');
    }
  });
};