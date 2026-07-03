(function () {
  function initialiseSite() {
    const year = document.getElementById('year');

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    const themeButton = document.getElementById('themeToggle');

    if (themeButton) {
      function updateThemeButton() {
        const isDark = document.documentElement.classList.contains('dark');
        themeButton.setAttribute('aria-pressed', String(isDark));
      }

      updateThemeButton();

      themeButton.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        themeButton.setAttribute('aria-pressed', String(isDark));

        try {
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch {}
      });
    }

    const backToTopButton = document.createElement('button');

    backToTopButton.type = 'button';
    backToTopButton.id = 'backToTop';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');

    backToTopButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l-7 7h4v7h6v-7h4z"></path>
      </svg>
    `;

    document.body.appendChild(backToTopButton);

    function updateBackToTopButton() {
      backToTopButton.style.display =
        window.scrollY > 300 ? 'inline-flex' : 'none';
    }

    window.addEventListener('scroll', updateBackToTopButton, {
      passive: true
    });

    updateBackToTopButton();

    backToTopButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseSite, {
      once: true
    });
  } else {
    initialiseSite();
  }
})();
