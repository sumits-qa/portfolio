// ===========================
// BG CANVAS — Circuit Grid Animation
// ===========================
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], animFrame;

  const ACCENT = '#00d4a0';
  const ACCENT2 = '#00aaff';
  const NODE_COUNT = 60;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? ACCENT : ACCENT2
    };
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, randomNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,160,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          const midX = (nodes[i].x + nodes[j].x) / 2;
          ctx.lineTo(midX, nodes[i].y);
          ctx.lineTo(midX, nodes[j].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.shadowColor = n.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  initNodes();
  draw();
  window.addEventListener('resize', () => { resize(); initNodes(); });
})();


// ===========================
// SCROLL REVEAL — Fixed
// ===========================
(function () {
  // Assign animation delay index to skill cards
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.setProperty('--delay', i);
  });

  const revealEls = document.querySelectorAll('.skill-card, .exp-item, .edu-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // Safety net: force show all after 1.2s regardless
  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('visible'));
  }, 1200);
})();


// ===========================
// PROJECT CARDS — stagger fade
// ===========================
(function () {
  const cards = document.querySelectorAll('.project-card');

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      obs.observe(card);
    });

    // Safety net
    setTimeout(() => {
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, 1200);
  } else {
    cards.forEach(card => { card.style.opacity = '1'; });
  }
})();


// ===========================
// NAVBAR ACTIVE HIGHLIGHT
// ===========================
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


// ===========================
// TYPED EFFECT — hero tag
// ===========================
(function () {
  const tag = document.querySelector('.hero-tag');
  if (!tag) return;
  const original = tag.textContent;
  tag.textContent = '';
  let i = 0;

  function type() {
    if (i < original.length) {
      tag.textContent += original[i++];
      setTimeout(type, 60);
    }
  }

  setTimeout(type, 500);
})();