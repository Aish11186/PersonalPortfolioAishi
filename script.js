

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