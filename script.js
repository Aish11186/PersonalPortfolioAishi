

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
  // Scramble label/text animations on scroll for minimal-sections
  const minimalSections = document.querySelectorAll('.minimal-section');
  
  minimalSections.forEach(section => {
    const scrambleElements = section.querySelectorAll('.scramble-label, .scramble-text');
    const scramblers = [];
    scrambleElements.forEach(el => {
      scramblers.push(new TextScrambler(el, 20));
    });
    
    let isObserved = false;
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isObserved) {
            isObserved = true;
            section.classList.add('visible');
            scramblers.forEach(s => s.scramble());
          }
        } else {
          isObserved = false;
          section.classList.remove('visible');
          scramblers.forEach(s => s.reset());
        }
      });
    }, { threshold: 0.15 });
    
    sectionObserver.observe(section);
  });
});