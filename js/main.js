// ============================================
// NAVBAR: Hide on scroll down, show on scroll up
// ============================================
(function () {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });
})();

// ============================================
// MOBILE NAV TOGGLE
// ============================================
(function () {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });
})();

// ============================================
// EXPERIENCE TABS
// ============================================
(function () {
  const tabs = document.querySelectorAll('.exp-tab');
  const panels = document.querySelectorAll('.exp-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
})();

// ============================================
// SCROLL REVEAL: Sections fade in on scroll
// ============================================
(function () {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

// ============================================
// SMOOTH SCROLL for nav links
// ============================================
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ============================================
// ACTIVE NAV LINK highlight on scroll
// ============================================
(function () {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

// ============================================
// SLIDESHOWS: auto-discover numbered images in assets/images/<folder>/
//   <div class="slideshow" data-slideshow="folder" data-alt="..."></div>
//   Probes 1.png, 2.png, ... until a 404, then cycles every 4s.
// ============================================
(function () {
  const INTERVAL_MS = 4000;
  const FADE_MS = 600;
  const MAX_PROBE = 30;

  async function probeImages(folder) {
    const found = [];
    for (let i = 1; i <= MAX_PROBE; i++) {
      const src = `assets/images/${folder}/${i}.png`;
      const ok = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
      if (!ok) break;
      found.push(src);
    }
    return found;
  }

  async function initSlideshow(el) {
    const folder = el.dataset.slideshow;
    const alt = el.dataset.alt || '';
    if (!folder) return;

    const sources = await probeImages(folder);
    if (sources.length === 0) return;

    const imgs = sources.map((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.className = 'slideshow-img' + (i === 0 ? ' active' : '');
      el.appendChild(img);
      return img;
    });

    if (imgs.length < 2) return;

    let current = 0;
    setInterval(() => {
      const next = (current + 1) % imgs.length;
      imgs[current].classList.remove('active');
      imgs[next].classList.add('active');
      current = next;
    }, INTERVAL_MS);
  }

  document.querySelectorAll('.slideshow').forEach(initSlideshow);
})();

// ============================================
// TYPING EFFECT for hero tagline (subtle)
// ============================================
(function () {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;

  // Add blinking cursor after animation completes
  setTimeout(() => {
    tagline.style.borderRight = '2px solid var(--accent)';
    tagline.style.paddingRight = '4px';

    // Remove cursor after a few seconds
    setTimeout(() => {
      tagline.style.borderRight = 'none';
    }, 3000);
  }, 1800);
})();
