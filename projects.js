// Projects Page Scroll & Progress Bar Interaction

document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progressBar");
    const sections = Array.from(document.querySelectorAll(".project-section"));
    
    if (!sections.length) return;

    // 1. UPDATE PROGRESS BAR (matches reference scrollProgress behavior)
    function updateProgress() {
        if (!progressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (scrollHeight <= 0) {
            progressBar.style.width = "100%";
            return;
        }

        // Calculate progress percentage (0% to 100%)
        const progressPercentage = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        progressBar.style.width = `${progressPercentage}%`;
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();

    // 2. ACTIVE SECTION OBSERVER (for smooth visual transitions)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-active");
            } else {
                entry.target.classList.remove("is-active");
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Only project cards receive an index. Interlude sections are intentionally
    // excluded from both card numbering and the heading counter.
    const projectSections = sections.filter(section => !section.classList.contains("project-section--note"));
    const total = projectSections.length;
    const heading = document.querySelector(".projects-page-heading");

    // Small index label above each card title.
    projectSections.forEach((section, idx) => {
        const title = section.querySelector(".card__title");
        if (!title || title.previousElementSibling?.classList.contains("card__index")) return;
        const indexEl = document.createElement("span");
        indexEl.classList.add("card__index");
        const num = String(idx + 1).padStart(2, "0");
        const tot = String(total).padStart(2, "0");
        indexEl.textContent = `${num} / ${tot}`;
        title.parentNode.insertBefore(indexEl, title);
    });

    // Live "01 — 07" counter under the page heading. Updates with the active section.
    let counterEl = null;
    if (heading) {
        counterEl = document.createElement("span");
        counterEl.classList.add("heading-counter");
        counterEl.textContent = `01 — ${String(total).padStart(2, "0")}`;
        heading.appendChild(counterEl);
    }

    const headingCounterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || !counterEl) return;
            const idx = projectSections.indexOf(entry.target);
            if (idx === -1) return;
            const num = String(idx + 1).padStart(2, "0");
            const tot = String(total).padStart(2, "0");
            counterEl.textContent = `${num} — ${tot}`;
        });
    }, { threshold: 0.5 });

    projectSections.forEach((section) => headingCounterObserver.observe(section));

    // 3. ONE-PROJECT-PER-SCROLL INTENTIONAL WHEEL CONTROLLER
    let isScrolling = false;
    let scrollTimeout = null;

    function getCurrentSectionIndex() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        let closestIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;

        sections[index].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 750);
    }

    // Handle mouse wheel for discrete 1-project-per-scroll feel.
    // Interstitial note sections are passed through naturally — they are the breathing space.
    window.addEventListener("wheel", (e) => {
        // Let the browser handle wheel and trackpad input natively. The CSS snap
        // point settles the page after the gesture without interrupting it.
        return;

        // Allow default trackpad micro-gestures if native snap is handling it,
        // but lock multi-step wheel leaps for crisp single-project navigation
        if (Math.abs(e.deltaY) < 25) return;

        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const currentIndex = getCurrentSectionIndex();
        const currentSection = sections[currentIndex];
        if (currentSection && currentSection.classList.contains("project-section--note")) {
            return; // let the user free-scroll past notes
        }

        if (e.deltaY > 0) {
            // Scrolling down
            if (currentIndex < sections.length - 1) {
                e.preventDefault();
                scrollToSection(currentIndex + 1);
            }
        } else if (e.deltaY < 0) {
            // Scrolling up
            if (currentIndex > 0) {
                e.preventDefault();
                scrollToSection(currentIndex - 1);
            }
        }
    }, { passive: false });

    // 4. KEYBOARD NAVIGATION (Arrow keys & Page Up/Down)
    window.addEventListener("keydown", (e) => {
        const target = e.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) {
            return;
        }

        if (["ArrowDown", "PageDown", "Space"].includes(e.code)) {
            const currentIndex = getCurrentSectionIndex();
            if (currentIndex < sections.length - 1) {
                e.preventDefault();
                scrollToSection(currentIndex + 1);
            }
        } else if (["ArrowUp", "PageUp"].includes(e.code)) {
            const currentIndex = getCurrentSectionIndex();
            if (currentIndex > 0) {
                e.preventDefault();
                scrollToSection(currentIndex - 1);
            }
        }
    });
});
