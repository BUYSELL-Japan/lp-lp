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


// ====== Pricing Toggle ======
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');
  const priceMonthly = document.getElementById('price-monthly-display');
  const priceYearly = document.getElementById('price-yearly-display');

  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) { // Yearly
        labelYearly.classList.add('active');
        labelMonthly.classList.remove('active');
        priceYearly.classList.remove('hidden');
        priceMonthly.classList.add('hidden');
      } else { // Monthly
        labelMonthly.classList.add('active');
        labelYearly.classList.remove('active');
        priceMonthly.classList.remove('hidden');
        priceYearly.classList.add('hidden');
      }
    });
  }
});

// ====== Template Selection ======
const TEMPLATE_NAMES = {
  theme1: 'Standard',
  theme2: 'Modern',
  theme3: 'Elegant',
};

// localStorage からテンプレートIDを復元（ページロード時）
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('landy_selected_template') || 'theme1';
  _applyTemplateSelection(savedTheme, false);
});

/**
 * テンプレートを選択する（ボタン onclick から呼ばれる）
 * @param {string} themeId - 'theme1' | 'theme2' | 'theme3'
 */
window.selectTemplate = function(themeId) {
  localStorage.setItem('landy_selected_template', themeId);
  _applyTemplateSelection(themeId, true);

  // 少し遅らせてからスムーズスクロール
  setTimeout(() => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      const top = pricingSection.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 300);
};

const DEMO_URLS = {
  theme1: '/demo/theme1',
  theme2: '/demo/theme2',
  theme3: '/demo/theme3',
};

function _applyTemplateSelection(themeId, showBar) {
  // カードのselectedクラスを切り替え
  document.querySelectorAll('.template-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.theme === themeId);
  });

  const name = TEMPLATE_NAMES[themeId] || themeId;

  // 選択バーを表示
  const bar = document.getElementById('templateSelectedBar');
  const barText = document.getElementById('templateSelectedText');
  if (bar && barText) {
    barText.textContent = `${name} テーマを選択しました。このまま下の料金セクションへ進んでください。`;
    if (showBar) {
      bar.classList.add('visible');
    } else {
      // ページロード時は保存済みなら表示
      const saved = localStorage.getItem('landy_selected_template');
      if (saved) bar.classList.add('visible');
    }
  }

  // 料金カードのテーマバッジを更新
  const pricingThemeName = document.getElementById('pricingThemeName');
  const pricingThemeDemoLink = document.getElementById('pricingThemeDemoLink');
  if (pricingThemeName) {
    pricingThemeName.textContent = name;
  }
  if (pricingThemeDemoLink) {
    pricingThemeDemoLink.href = DEMO_URLS[themeId] || '/demo/theme1';
  }
}

/**
 * 現在選択されているテンプレートIDを取得
 */
window.getSelectedTemplate = function() {
  return localStorage.getItem('landy_selected_template') || 'theme1';
};

// ====== Checkout Submission ======
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkout-btn');
  const toggle = document.getElementById('pricing-toggle');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // ボタンをローディング状態にする
      checkoutBtn.style.pointerEvents = 'none';
      checkoutBtn.style.opacity = '0.7';
      const originalText = checkoutBtn.innerHTML;
      checkoutBtn.innerHTML = '処理中... <div class="spinner"></div>'; // (spinnerのCSSは仮)

      try {
        // 月額か年額かを判定
        const planType = (!toggle || !toggle.checked) ? 'monthly' : 'yearly';
        
        // テンプレートIDを取得
        const templateId = window.getSelectedTemplate();
        
        // RegisterアプリへのURLを決定
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const registerBaseUrl = isLocal ? 'http://localhost:5173' : 'https://register.global-reaches.com'; 
        
        // パラメータを付与してリダイレクト
        const redirectUrl = `${registerBaseUrl}/?theme=${templateId}&plan=${planType}`;
        window.location.href = redirectUrl;

      } catch (error) {
        console.error("Transition error:", error);
        alert("エラーが発生しました。");
        // ボタンを元に戻す
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';
      }
    });
  }
});
