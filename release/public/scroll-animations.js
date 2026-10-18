// Scroll Animations Controller for Sre Murugan Sons

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function attachAnimations() {
    // 1. Hero Section Animations
    const heroTitle = document.querySelector('h1');
    if (heroTitle && !heroTitle.classList.contains('scroll-reveal-left')) {
      heroTitle.classList.add('scroll-reveal-left');
      revealObserver.observe(heroTitle);

      // Hero subtitle & bullets
      const heroContent = heroTitle.parentElement;
      if (heroContent) {
        const paragraphs = heroContent.querySelectorAll('p, ul, div');
        paragraphs.forEach((p, idx) => {
          p.classList.add('scroll-reveal-left', `stagger-${Math.min(idx + 1, 6)}`);
          revealObserver.observe(p);
        });
      }
    }

    // 2. Hero Storefront Image Card
    const storeImages = document.querySelectorAll('img[src*="store-hero"], img[src*="murugan"]');
    storeImages.forEach(img => {
      const card = img.closest('div.relative') || img.parentElement;
      if (card && !card.classList.contains('scroll-reveal-right')) {
        card.classList.add('scroll-reveal-right', 'float-storefront');
        revealObserver.observe(card);
      }
    });

    // 3. Trust Statistics Badges Strip (the 6 badges: Premium Quality, Direct Mill, etc.)
    const trustSection = document.querySelector('div[class*="grid-cols-2"], div[class*="grid-cols-3"], div[class*="grid-cols-6"]');
    if (trustSection) {
      const badges = trustSection.children;
      Array.from(badges).forEach((badge, idx) => {
        if (!badge.classList.contains('scroll-reveal-scale')) {
          badge.classList.add('scroll-reveal-scale', `stagger-${(idx % 6) + 1}`, 'card-hover-lift');
          revealObserver.observe(badge);
        }
      });
    }

    // 4. Shop by Category Section & Cards
    const categoryHeadings = document.querySelectorAll('h2, h3');
    categoryHeadings.forEach(h => {
      if (!h.classList.contains('scroll-reveal')) {
        h.classList.add('scroll-reveal');
        revealObserver.observe(h);
      }
    });

    // Category and Product Cards
    const cards = document.querySelectorAll('div[class*="rounded-"], a[class*="rounded-"]');
    cards.forEach((card, idx) => {
      // Check if it has an image or heading inside
      if (card.querySelector('img') && !card.classList.contains('scroll-reveal')) {
        card.classList.add('scroll-reveal', `stagger-${(idx % 6) + 1}`, 'card-hover-lift');
        revealObserver.observe(card);
      }
    });

    // 5. Floating Call & WhatsApp Action Buttons ONLY
    const floatBtns = document.querySelectorAll('a.rounded-full[href^="tel:"], a[aria-label="Call Owner"], a[aria-label="WhatsApp Us"]');
    floatBtns.forEach(btn => {
      if (!btn.classList.contains('btn-pulse')) {
        btn.classList.add('btn-pulse');
      }
    });
  }

  // Initial scan
  setTimeout(attachAnimations, 200);

  // Watch for dynamic React mounts
  const mutationObserver = new MutationObserver(() => {
    attachAnimations();
  });

  const root = document.getElementById('root') || document.body;
  mutationObserver.observe(root, { childList: true, subtree: true });
}
