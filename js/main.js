/* ============================================================
   WhatsPosh.com — Main JavaScript
   Interactive features: Nav, Quiz, Vault, Outfit Gen, Fabric
   ============================================================ */

'use strict';

/* =========================================================
   1. NAV — sticky + mobile menu
   ========================================================= */
(function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');

  if (!nav) return;

  // Sticky scroll class
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu open/close
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    };

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }
})();

/* =========================================================
   2. SCROLL REVEAL
   ========================================================= */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* =========================================================
   3. WHAT'S POSH TODAY? — day-based rotation
   ========================================================= */
(function initToday() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = new Date();
  const dayIndex = today.getDay();

  const outfits = [
    { title: 'Monochrome Camel', desc: 'Camel coat + turtleneck + wide-leg trousers. One shade, total authority.' },
    { title: 'Navy Precision', desc: 'Navy blazer, ivory silk blouse, tailored navy trousers. Weekend sharpness.' },
    { title: 'The Grey Uniform', desc: 'Charcoal knit + grey wide-leg + white trainers. Quiet power dressing.' },
    { title: 'Ivory & Texture', desc: 'Boucle jacket, cream trousers, pointed mules. Texture creates depth.' },
    { title: 'All-Black Architecture', desc: 'Black roll-neck, tailored black coat, straight jeans. Undeniable.' },
    { title: 'Earthy Tones', desc: 'Rust silk blouse, chocolate trousers, cognac loafers. Seasonal warmth.' },
    { title: 'The White Uniform', desc: 'White shirt, white jeans, nude flats. Purity of intention.' },
  ];

  const etiquettes = [
    { title: 'The Art of the Pause', desc: 'Before responding to anything charged: breathe, pause, then speak. The pause is power.' },
    { title: 'Graceful Declines', desc: '"That doesn\'t work for me" — four words. No explanation required. No guilt needed.' },
    { title: 'Thank You Notes', desc: 'A handwritten note after a dinner. Three sentences. It will be remembered for years.' },
    { title: 'Phone Presence', desc: 'Phone face-down at the table. Every time. It signals: you are my priority.' },
    { title: 'Hosting a Table', desc: 'Seat guests with intention. Mix energies. Consider who brings out the best in whom.' },
    { title: 'The Elegant Exit', desc: 'Leave before you\'re ready to leave. Parties end better when you\'re still at your peak.' },
    { title: 'Correcting Gracefully', desc: '"I think you might mean..." is always kinder than "Actually, you\'re wrong."' },
  ];

  const beauties = [
    { title: 'Skin First', desc: 'Today: SPF, one serum, tinted moisturiser. Skin calmness is the foundation of everything.' },
    { title: 'Brow Discipline', desc: 'Brushed, defined, natural. Your brows frame your intelligence. Treat them accordingly.' },
    { title: 'The Red Lip Rule', desc: 'One bold element, everything else stripped back. Never compete with your own lip.' },
    { title: 'Hair Calm', desc: 'A polished low bun signals self-possession. Five minutes, ten years of elegance.' },
    { title: 'Fragrance Layering', desc: 'Body lotion + eau de parfum on pulse points. Scent should whisper, never announce.' },
    { title: 'Nail Simplicity', desc: 'Nude, deep burgundy, or clean natural. The less decision-making, the more refinement.' },
    { title: 'The No-Makeup Look', desc: 'Corrector, blush, mascara, tinted balm. Less is a skill. Master it.' },
  ];

  const finds = [
    { title: 'Cashmere Under £80', desc: 'Uniqlo premium cashmere turtleneck. Fabric quality that outperforms its price tag.' },
    { title: 'The Perfect White Shirt', desc: 'A crisp oversized Oxford for under £60. The backbone of every wardrobe.' },
    { title: 'Leather Loafers, Smart', desc: 'Dune London horsebit loafers. The shape of heritage, the price of reason.' },
    { title: 'Silk Scarf Dupe', desc: 'Liberty print scarves at Marks & Spencer. Colour, pattern, and price aligned.' },
    { title: 'Linen for Summer', desc: 'Mango linen blend trousers under £45. Wear them everywhere. Iron minimally.' },
    { title: 'Evening Bag Edit', desc: 'A structured satin minaudière, under £70. Timeless, not trendy.' },
    { title: 'The Gold Watch Moment', desc: 'Tissot Everytime. Investment dressing for those who understand proportions.' },
  ];

  const cultures = [
    { title: 'Film: Portrait of a Lady on Fire', desc: 'Restraint as passion. Every frame a lesson in what isn\'t said. Watch it twice.' },
    { title: 'Book: The Rules of Civility', desc: 'Amor Towles on New York, ambition, and the performance of becoming.' },
    { title: 'Artist: Kehinde Wiley', desc: 'Baroque grandeur meets contemporary Black portraiture. Power reframed.' },
    { title: 'Music: Nina Simone Live', desc: '\'I Put a Spell on You\' — study the composure, the drama, the complete control.' },
    { title: 'Visit: The Musée d\'Orsay', desc: 'Impressionism in architecture as beautiful as the works. Book early, dress well.' },
    { title: 'Read: Ibram X. Kendi', desc: '\'How to Be an Antiracist\' — intellectual elegance and moral precision.' },
    { title: 'Listen: Chet Baker', desc: '\'Almost Blue\' — the sound of beautiful melancholy. Sunday morning essential.' },
  ];

  const todayLabel = document.querySelector('.today__date-label');
  if (todayLabel) todayLabel.textContent = `${days[dayIndex]}'s Posh Drop`;

  const updateCard = (selector, data) => {
    const card = document.querySelector(selector);
    if (!card) return;
    const titleEl = card.querySelector('.today__card__title');
    const descEl  = card.querySelector('.today__card__desc');
    if (titleEl) titleEl.textContent = data.title;
    if (descEl)  descEl.textContent  = data.desc;
  };

  updateCard('.today__card--outfit',    outfits[dayIndex]);
  updateCard('.today__card--etiquette', etiquettes[dayIndex]);
  updateCard('.today__card--beauty',    beauties[dayIndex]);
  updateCard('.today__card--find',      finds[dayIndex]);
  updateCard('.today__card--culture',   cultures[dayIndex]);
})();

/* =========================================================
   4. POSH ARCHETYPE QUIZ
   ========================================================= */
(function initQuiz() {
  const quizContainer = document.querySelector('.quiz__container');
  if (!quizContainer) return;

  const archetypes = {
    classicist: {
      title: 'The Classicist',
      desc: 'You gravitate toward the enduring. Your wardrobe is a collection of decisions, not impulses. Restraint isn\'t a limitation — it\'s your signature.',
      traits: ['Timeless', 'Precise', 'Restrained', 'Considered'],
      palette: 'Ivory · Navy · Camel · Stone',
      silhouette: 'Tailored & Structured',
      fragrance: 'Chypre · Aldehyde',
    },
    continental: {
      title: 'The Continental',
      desc: 'You understand that elegance is a mindset borrowed from no single culture. Your taste is global, understated, and always a step ahead of the room.',
      traits: ['Cosmopolitan', 'Understated', 'Refined', 'Effortless'],
      palette: 'Charcoal · Cream · Bordeaux · Chocolate',
      silhouette: 'Fluid & Architectural',
      fragrance: 'Woody · Leather',
    },
    intellectual: {
      title: 'The Intellectual',
      desc: 'For you, style is a form of thinking. Your choices are deliberate, your references are wide, and your aesthetic communicates before you speak.',
      traits: ['Deliberate', 'Cerebral', 'Original', 'Layered'],
      palette: 'Black · White · Rust · Sage',
      silhouette: 'Oversized & Intentional',
      fragrance: 'Green · Vetiver · Tobacco',
    },
    sensualist: {
      title: 'The Sensualist',
      desc: 'Texture, drape, and fabric speak your language. You dress from the inside out — how it feels determines how it looks. Comfort and elegance are not opposites.',
      traits: ['Tactile', 'Warm', 'Intuitive', 'Expressive'],
      palette: 'Terracotta · Warm Ivory · Amber · Blush',
      silhouette: 'Draped & Soft',
      fragrance: 'Amber · Vanilla · Oud',
    },
  };

  const questions = [
    {
      q: 'When you get dressed, your first instinct is:',
      opts: [
        { text: 'Reach for something I know always works', archetype: 'classicist' },
        { text: 'Build an outfit around one perfect piece', archetype: 'continental' },
        { text: 'Think about who I want to feel like today', archetype: 'intellectual' },
        { text: 'Choose whatever feels right against my skin', archetype: 'sensualist' },
      ],
    },
    {
      q: 'Your ideal wardrobe is described as:',
      opts: [
        { text: 'A curated capsule — nothing unnecessary', archetype: 'classicist' },
        { text: 'Understated pieces from places I\'ve been', archetype: 'continental' },
        { text: 'Eclectic, personal, conversation-starting', archetype: 'intellectual' },
        { text: 'Soft, luxurious, beautifully made things', archetype: 'sensualist' },
      ],
    },
    {
      q: 'At an elegant dinner, you\'re most likely to:',
      opts: [
        { text: 'Observe before speaking — then speak precisely', archetype: 'classicist' },
        { text: 'Circulate effortlessly, at ease in any group', archetype: 'continental' },
        { text: 'Find the most interesting person and go deep', archetype: 'intellectual' },
        { text: 'Focus on the food, the atmosphere, the warmth', archetype: 'sensualist' },
      ],
    },
    {
      q: 'Your relationship with trends is:',
      opts: [
        { text: 'Indifferent. If it\'s classic, it\'s always relevant', archetype: 'classicist' },
        { text: 'I notice them, adopt only what suits me', archetype: 'continental' },
        { text: 'I watch them analytically — what do they say?', archetype: 'intellectual' },
        { text: 'I\'m drawn to textures and fabrics, not trends', archetype: 'sensualist' },
      ],
    },
    {
      q: 'A posh home to you means:',
      opts: [
        { text: 'Symmetry, clean lines, nothing out of place', archetype: 'classicist' },
        { text: 'Thoughtful objects gathered over time, from life', archetype: 'continental' },
        { text: 'Books everywhere. Art that makes you think', archetype: 'intellectual' },
        { text: 'Cashmere throws, candles, flowers — pure comfort', archetype: 'sensualist' },
      ],
    },
    {
      q: 'Your posh superpower is:',
      opts: [
        { text: 'Impeccable consistency — you never look wrong', archetype: 'classicist' },
        { text: 'Effortless sophistication — you make it look natural', archetype: 'continental' },
        { text: 'Distinctive presence — you always have a perspective', archetype: 'intellectual' },
        { text: 'Irresistible warmth — people feel at ease around you', archetype: 'sensualist' },
      ],
    },
  ];

  let scores = { classicist: 0, continental: 0, intellectual: 0, sensualist: 0 };
  let currentStep = 0;

  const progressDots = quizContainer.querySelector('.quiz__progress');
  const stepsWrap    = quizContainer.querySelector('.quiz__steps');
  const resultWrap   = quizContainer.querySelector('.quiz__result');

  // Build dots
  if (progressDots) {
    progressDots.innerHTML = questions.map((_, i) =>
      `<div class="quiz__dot${i === 0 ? ' active' : ''}" data-i="${i}"></div>`
    ).join('');
  }

  // Build steps
  if (stepsWrap) {
    stepsWrap.innerHTML = questions.map((q, i) => `
      <div class="quiz__step${i === 0 ? ' active' : ''}" data-step="${i}">
        <p class="quiz__question">${q.q}</p>
        <div class="quiz__options">
          ${q.opts.map(opt => `
            <button class="quiz__option" data-archetype="${opt.archetype}">${opt.text}</button>
          `).join('')}
        </div>
      </div>
    `).join('');

    stepsWrap.querySelectorAll('.quiz__option').forEach(btn => {
      btn.addEventListener('click', () => {
        const archetype = btn.dataset.archetype;
        scores[archetype]++;

        // Visual feedback
        btn.classList.add('selected');
        btn.closest('.quiz__step').querySelectorAll('.quiz__option').forEach(b => {
          b.disabled = true;
          if (b !== btn) b.style.opacity = '0.4';
        });

        setTimeout(() => {
          currentStep++;
          if (currentStep < questions.length) {
            showStep(currentStep);
          } else {
            showResult();
          }
        }, 380);
      });
    });
  }

  function showStep(i) {
    const allSteps = stepsWrap.querySelectorAll('.quiz__step');
    const allDots  = progressDots ? progressDots.querySelectorAll('.quiz__dot') : [];

    allSteps.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
    });

    allDots.forEach((d, idx) => {
      d.classList.toggle('active', idx === i);
      d.classList.toggle('done', idx < i);
    });
  }

  function showResult() {
    // Find winning archetype
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const data = archetypes[winner];

    if (stepsWrap) stepsWrap.style.display = 'none';
    if (progressDots) progressDots.style.display = 'none';

    if (resultWrap) {
      resultWrap.hidden = false;
      resultWrap.innerHTML = `
        <p class="quiz__result-archetype">Your Posh Archetype</p>
        <h3 class="quiz__result-title">${data.title}</h3>
        <p class="quiz__result-desc">${data.desc}</p>
        <div class="quiz__result-traits">
          ${data.traits.map(t => `<span class="quiz__trait">${t}</span>`).join('')}
        </div>
        <div class="quiz__result-extras">
          <p style="font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:0.3rem;letter-spacing:0.08em;text-transform:uppercase;font-size:0.7rem;">Your Palette</p>
          <p style="color:var(--gold-light);font-family:var(--font-head);font-size:1.1rem;margin-bottom:1.25rem;">${data.palette}</p>
          <p style="font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:0.3rem;letter-spacing:0.08em;text-transform:uppercase;font-size:0.7rem;">Signature Silhouette</p>
          <p style="color:var(--gold-light);font-family:var(--font-head);font-size:1.1rem;margin-bottom:1.25rem;">${data.silhouette}</p>
          <p style="font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:0.3rem;letter-spacing:0.08em;text-transform:uppercase;font-size:0.7rem;">Fragrance Family</p>
          <p style="color:var(--gold-light);font-family:var(--font-head);font-size:1.1rem;margin-bottom:2rem;">${data.fragrance}</p>
        </div>
        <div class="quiz__result-actions">
          <a href="#style" class="btn btn--primary">Explore Your Style Guide</a>
          <a href="#access" class="btn btn--secondary">Build Your Capsule</a>
        </div>
        <p class="quiz__retake" role="button" tabindex="0" id="quiz-retake">Retake quiz →</p>
      `;

      document.getElementById('quiz-retake')?.addEventListener('click', resetQuiz);
      document.getElementById('quiz-retake')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') resetQuiz();
      });
    }
  }

  function resetQuiz() {
    scores = { classicist: 0, continental: 0, intellectual: 0, sensualist: 0 };
    currentStep = 0;

    if (resultWrap) resultWrap.hidden = true;
    if (stepsWrap)  stepsWrap.style.display = '';
    if (progressDots) progressDots.style.display = '';

    stepsWrap?.querySelectorAll('.quiz__option').forEach(b => {
      b.disabled = false;
      b.style.opacity = '';
      b.classList.remove('selected');
    });

    showStep(0);
  }
})();

/* =========================================================
   5. ETIQUETTE VAULT — search + filter
   ========================================================= */
(function initVault() {
  const searchInput = document.querySelector('.vault__search');
  const filterBtns  = document.querySelectorAll('.vault__filter');
  const items       = document.querySelectorAll('.vault__item');
  const emptyMsg    = document.querySelector('.vault__empty');

  if (!searchInput || !items.length) return;

  let activeFilter = 'all';

  function filterVault() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    items.forEach(item => {
      const title   = item.querySelector('.vault__item-title')?.textContent.toLowerCase() || '';
      const preview = item.querySelector('.vault__item-preview')?.textContent.toLowerCase() || '';
      const cat     = item.dataset.cat || '';

      const matchesSearch = !query || title.includes(query) || preview.includes(query);
      const matchesFilter = activeFilter === 'all' || cat === activeFilter;

      const visible = matchesSearch && matchesFilter;
      item.hidden = !visible;
      if (visible) visibleCount++;
    });

    if (emptyMsg) emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  searchInput.addEventListener('input', filterVault);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      filterVault();
    });
  });
})();

/* =========================================================
   6. OUTFIT FORMULA GENERATOR
   ========================================================= */
(function initOutfitGen() {
  const btns    = document.querySelectorAll('.outfit-gen__btn');
  const display = document.querySelector('.outfit-gen__display');

  if (!btns.length || !display) return;

  const formulas = {
    'three-piece': {
      title: 'The Three-Piece Uniform',
      sub: 'The simplest system for effortless dressing, every day.',
      pieces: [
        { num: 'Piece 01', item: 'The Foundation', note: 'Tailored trousers or a clean straight skirt. Your neutral base.' },
        { num: 'Piece 02', item: 'The Layer',      note: 'A structured blazer, knit, or tailored jacket. Always fitted.' },
        { num: 'Piece 03', item: 'The Base',       note: 'A simple top — silk, cotton, or cashmere. Always tucked.' },
      ],
      rules: [
        'All three pieces should share a tonal family',
        'One piece may carry texture — the rest stay calm',
        'Shoes should extend the leg line, not interrupt it',
        'One accessory maximum — make it count',
      ],
    },
    monochrome: {
      title: 'Monochrome + Texture',
      sub: 'One colour. Multiple materials. Total authority.',
      pieces: [
        { num: 'Tone 01', item: 'Bottom',  note: 'Wide-leg or straight trousers in your chosen colour.' },
        { num: 'Tone 02', item: 'Middle',  note: 'A knit, shirt, or blouse — slightly different texture.' },
        { num: 'Tone 03', item: 'Top',     note: 'A coat, blazer, or long cardigan in the same family.' },
      ],
      rules: [
        'Camel, navy, grey, ivory, and black work best',
        'Mix matte and sheen within the same colour',
        'White shoes or nude shoes extend the monochrome',
        'This formula always reads expensive — always',
      ],
    },
    structured: {
      title: 'Structured + Soft',
      sub: 'The balance of tension. Hard meets yielding.',
      pieces: [
        { num: 'Hard', item: 'Structure',   note: 'A blazer, leather jacket, or tailored coat.' },
        { num: 'Soft', item: 'Drape',       note: 'A silk blouse, fluid trousers, or a bias-cut skirt.' },
        { num: 'Base', item: 'The Thread',  note: 'One colour or metal that ties both registers together.' },
      ],
      rules: [
        'Never let both elements compete — one must lead',
        'The structured piece sets the silhouette',
        'A heel or pointed flat with soft pieces; a flat with structured',
        'Less jewellery when the outfit already has tension',
      ],
    },
    daytownight: {
      title: 'Day-to-Night',
      sub: 'One outfit. Two contexts. No changing required.',
      pieces: [
        { num: 'Day',   item: 'The Base Look',    note: 'Trousers, a good blouse or knit. Day-appropriate and complete.' },
        { num: 'Night', item: 'The Swap',         note: 'Swap flats for a heel or mule. Add one piece of jewellery.' },
        { num: 'Key',   item: 'The Bag Edit',     note: 'Switch a tote for a small structured bag. Instant evening.' },
      ],
      rules: [
        'The base look must be sophisticated enough for both contexts',
        'Hair up in the day. Hair down or changed for evening',
        'Add a fragrance at the transition moment',
        'Confidence is the final accessory — and it\'s free',
      ],
    },
  };

  function renderFormula(key) {
    const f = formulas[key];
    if (!f) return;

    display.innerHTML = `
      <h3 class="outfit-gen__formula-title">${f.title}</h3>
      <p class="outfit-gen__formula-sub">${f.sub}</p>
      <div class="outfit-gen__pieces">
        ${f.pieces.map(p => `
          <div class="outfit-piece">
            <p class="outfit-piece__num">${p.num}</p>
            <p class="outfit-piece__item">${p.item}</p>
            <p class="outfit-piece__note">${p.note}</p>
          </div>
        `).join('')}
      </div>
      <div class="outfit-gen__rules">
        ${f.rules.map(r => `<p class="outfit-rule">${r}</p>`).join('')}
      </div>
    `;
    display.style.animation = 'none';
    display.offsetHeight; // reflow
    display.style.animation = '';
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFormula(btn.dataset.formula);
    });
  });

  // Init with first
  btns[0]?.classList.add('active');
  renderFormula(btns[0]?.dataset.formula || 'three-piece');
})();

/* =========================================================
   7. FABRIC DECODER — tabs
   ========================================================= */
(function initFabric() {
  const tabs   = document.querySelectorAll('.fabric__tab');
  const panels = document.querySelectorAll('.fabric__panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.querySelector(`.fabric__panel[data-fabric="${tab.dataset.fabric}"]`);
      if (target) target.classList.add('active');
    });
  });

  // Activate first
  tabs[0]?.classList.add('active');
  panels[0]?.classList.add('active');
})();

/* =========================================================
   8. NEWSLETTER FORM
   ========================================================= */
(function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter__form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter__input');
      const btn   = form.querySelector('.btn');

      if (!input?.value.includes('@')) {
        input?.focus();
        return;
      }

      if (btn) {
        btn.textContent = 'You\'re in. ✦';
        btn.disabled = true;
        btn.style.background = 'var(--sage)';
      }
      if (input) input.disabled = true;
    });
  });
})();

/* =========================================================
   9. SMOOTH ACTIVE NAV HIGHLIGHT
   ========================================================= */
(function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

/* =========================================================
   10. LANGUAGE PERSISTENCE
   ========================================================= */
(function initLang() {
  const langLinks = document.querySelectorAll('.nav__lang a, .mobile-menu__lang a');
  const current = window.location.pathname.startsWith('/es/') ? 'es'
                : window.location.pathname.startsWith('/fr/') ? 'fr'
                : 'en';

  langLinks.forEach(a => {
    const lang = a.dataset.lang;
    if (lang === current) a.classList.add('active');
  });
})();
