// ===================================
// Landy LP - Rich Interactions
// ===================================

// --- Initialize AOS (Animate on Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  });
});

// --- Header Scroll Effect ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Mobile Menu Toggle ---
const mobileToggle = document.getElementById('mobileMenuToggle');
const navMobile = document.getElementById('navMobile');

mobileToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  mobileToggle.classList.toggle('active');
  
  if (navMobile.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile menu when clicking nav links
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// --- Smooth Scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Parallax Effect on Scroll ---
const parallaxElements = document.querySelectorAll('.parallax-item');
const heroBg = document.querySelector('.hero-bg-img');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Hero Background Parallax
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.4}px)`;
  }
  
  // Custom Element Parallax
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 2;
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Only animate if in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      // Calculate progress of element through viewport (0 to 1)
      const elementHeight = rect.height;
      const scrollTotal = windowHeight + elementHeight;
      const scrollProgress = (windowHeight - rect.top) / scrollTotal;
      
      // Calculate offset: centers the element at progress 0.5
      // yPos = (progress - 0.5) * speed * 50
      const yPos = (scrollProgress - 0.5) * speed * 30;
      el.style.transform = `translateY(${yPos}px)`;
    }
  });
});

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Toggle current
    if (!isExpanded) {
      button.setAttribute('aria-expanded', 'true');
      item.classList.add('active');
    } else {
      button.setAttribute('aria-expanded', 'false');
      item.classList.remove('active');
    }
  });
});

// --- Mouse Move Parallax (Hero Bubbles & Section Graphics) ---
const body = document.querySelector('body');
const bubbles = document.querySelectorAll('.lang-bubble');
const ctaCircles = document.querySelectorAll('.cta-bg-elements .circle');

body.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  // Subtle movement for hero bubbles
  bubbles.forEach((bubble) => {
     // different modifier based on element to create depth
     const mod = bubble.classList.contains('lb-1') ? 15 : 
                 bubble.classList.contains('lb-2') ? -10 : 20;
     
     bubble.style.transform = `translate(${x * mod}px, ${y * mod}px)`;
  });

  // Movement for final CTA background circles
  ctaCircles.forEach((circle, index) => {
     const mod = index === 0 ? -30 : 40;
     circle.style.transform = `translate(${x * mod}px, ${y * mod}px)`;
  });
});

// --- Modal Logic (Legal Documents) ---
window.openModal = function(modalId, event) {
  if (event) event.preventDefault();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 背景スクロールの防止
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// モーダル外枠クリックで閉じる
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ====== Contact Form Submission ======
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const messageEl = document.getElementById('contact-form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // ボタンをローディング状態にする
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '送信中...';
      
      try {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        const website = document.getElementById('contact-website').value; // Honeypot

        // LP-Contact-API のURL
        const API_URL = "https://t8hdhfyzn7.execute-api.ap-southeast-2.amazonaws.com/prod/contact";

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: "【Landy公式LP】お問い合わせ",
            message: message,
            website: website,
            targetEmail: "hello@neural-seeds.com"
          })
        });

        if (!response.ok) {
          throw new Error("ネットワークエラーが発生しました");
        }
        
        // 成功メッセージを表示
        messageEl.style.display = 'block';
        contactForm.reset();
        
        // 5秒後にメッセージを隠す
        setTimeout(() => {
          messageEl.style.display = 'none';
        }, 5000);
      } catch (error) {
        console.error("Submission error:", error);
        alert("エラーが発生しました。時間をおいて再度お試しください。");
      } finally {
        // ボタンを元に戻す
        submitBtn.innerHTML = originalText;
        submitBtn.style.pointerEvents = 'auto';
        submitBtn.style.opacity = '1';
      }
    });
  }
});
