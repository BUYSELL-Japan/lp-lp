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
    document.body.style.overflow = 'hidden'; // 閭梧勹繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺ｮ髦ｲ豁｢
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// 繝｢繝ｼ繝繝ｫ螟匁棧繧ｯ繝ｪ繝・け縺ｧ髢峨§繧・
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
  theme4: 'Tropical',
};

// localStorage 縺九ｉ繝・Φ繝励Ξ繝ｼ繝・D繧貞ｾｩ蜈・ｼ医・繝ｼ繧ｸ繝ｭ繝ｼ繝画凾・・
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('landy_selected_template') || 'theme1';
  _applyTemplateSelection(savedTheme, false);
});

/**
 * 繝・Φ繝励Ξ繝ｼ繝医ｒ驕ｸ謚槭☆繧具ｼ医・繧ｿ繝ｳ onclick 縺九ｉ蜻ｼ縺ｰ繧後ｋ・・
 * @param {string} themeId - 'theme1' | 'theme2' | 'theme3'
 */
window.selectTemplate = function(themeId) {
  localStorage.setItem('landy_selected_template', themeId);
  _applyTemplateSelection(themeId, true);

  // 蟆代＠驕・ｉ縺帙※縺九ｉ繧ｹ繝繝ｼ繧ｺ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ
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
  theme1: 'https://demo-standard.neural-seeds.com',
  theme2: 'https://demo-modern.neural-seeds.com',
  theme3: 'https://demo-elegant.neural-seeds.com',
  theme4: 'https://demo-tropical.neural-seeds.com',
};

function _applyTemplateSelection(themeId, showBar) {
  // 1. 繧ｫ繝ｼ繝峨・selected繧ｯ繝ｩ繧ｹ繧貞・繧頑崛縺・
  document.querySelectorAll('.template-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.theme === themeId);
  });

  const name = TEMPLATE_NAMES[themeId] || themeId;

  // 2. 驕ｸ謚槭ヰ繝ｼ縺ｮ譖ｴ譁ｰ
  const bar = document.getElementById('templateSelectedBar');
  const barText = document.getElementById('templateSelectedText');
  if (bar && barText) {
    barText.textContent = `${name} 繝・・繝槭ｒ驕ｸ謚槭＠縺ｾ縺励◆縲ゅ％縺ｮ縺ｾ縺ｾ荳九・譁咎≡繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ縺ｸ騾ｲ繧薙〒縺上□縺輔＞縲Ａ;
    if (showBar) {
      bar.classList.add('visible');
    } else {
      const saved = localStorage.getItem('landy_selected_template');
      if (saved) bar.classList.add('visible');
    }
  }

  // 3. 譁咎≡繧ｫ繝ｼ繝牙・縺ｮ諠・ｱ繧呈峩譁ｰ
  const pricingThemeName = document.getElementById('pricingThemeName');
  const pricingThemeDemoLink = document.getElementById('pricingThemeDemoLink');
  const mockupImg = document.getElementById('pricingThemeMockup');

  if (pricingThemeName) {
    pricingThemeName.textContent = name;
  }
  if (pricingThemeDemoLink) {
    pricingThemeDemoLink.href = DEMO_URLS[themeId] || 'https://demo-standard.neural-seeds.com';
  }

  // 4. 繝｢繝・け繧｢繝・・逕ｻ蜒上ｒ繝輔ぉ繝ｼ繝峨＠縺ｪ縺後ｉ蛻・ｊ譖ｿ縺・
  if (mockupImg) {
    const previewWindow = mockupImg.closest('.theme-preview-window');

    // 繝輔ぉ繝ｼ繝峨い繧ｦ繝・
    if (previewWindow) previewWindow.classList.add('fade-out');
    mockupImg.style.opacity = '0';
    mockupImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      // 蜈医↓onload繝上Φ繝峨Λ繧定ｨｭ螳壹☆繧・
      mockupImg.onload = () => {
        mockupImg.style.opacity = '1';
        mockupImg.style.transform = 'scale(1)';
        if (previewWindow) previewWindow.classList.remove('fade-out');
      };

      mockupImg.src = `/images/${themeId}_mockup.jpg`;
      mockupImg.alt = `${name} Theme Mockup`;

      // fallback: 逕ｻ蜒上′繧ｭ繝｣繝・す繝･貂医∩縺ｮ蝣ｴ蜷医・onload縺檎匱轣ｫ縺励↑縺・％縺ｨ縺後≠繧・
      if (mockupImg.complete) {
        mockupImg.style.opacity = '1';
        mockupImg.style.transform = 'scale(1)';
        if (previewWindow) previewWindow.classList.remove('fade-out');
      }
    }, 250);
  }
}

/**
 * 迴ｾ蝨ｨ驕ｸ謚槭＆繧後※縺・ｋ繝・Φ繝励Ξ繝ｼ繝・D繧貞叙蠕・
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
      
      // 繝懊ち繝ｳ繧偵Ο繝ｼ繝・ぅ繝ｳ繧ｰ迥ｶ諷九↓縺吶ｋ
      checkoutBtn.style.pointerEvents = 'none';
      checkoutBtn.style.opacity = '0.7';
      const originalText = checkoutBtn.innerHTML;
      checkoutBtn.innerHTML = '蜃ｦ逅・ｸｭ... <div class="spinner"></div>'; // (spinner縺ｮCSS縺ｯ莉ｮ)

      try {
        // 譛磯｡阪°蟷ｴ鬘阪°繧貞愛螳・
        const planType = (!toggle || !toggle.checked) ? 'monthly' : 'yearly';
        
        // 繝・Φ繝励Ξ繝ｼ繝・D繧貞叙蠕・
        const templateId = window.getSelectedTemplate();
        
        // Register繧｢繝励Μ縺ｸ縺ｮURL繧呈ｱｺ螳・
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const registerBaseUrl = isLocal ? 'http://localhost:5173' : 'https://register.neural-seeds.com'; 
        
        // 繝代Λ繝｡繝ｼ繧ｿ繧剃ｻ倅ｸ弱＠縺ｦ繝ｪ繝繧､繝ｬ繧ｯ繝・
        const redirectUrl = `${registerBaseUrl}/?theme=${templateId}&plan=${planType}`;
        window.location.href = redirectUrl;

      } catch (error) {
        console.error("Transition error:", error);
        alert("繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆縲・);
        // 繝懊ち繝ｳ繧貞・縺ｫ謌ｻ縺・
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';
      }
    });
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
      
      // 繝懊ち繝ｳ繧偵Ο繝ｼ繝・ぅ繝ｳ繧ｰ迥ｶ諷九↓縺吶ｋ
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '騾∽ｿ｡荳ｭ...';
      
      try {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        const website = document.getElementById('contact-website').value; // Honeypot

        // LP-Contact-API 縺ｮURL
        const API_URL = "https://t8hdhfyzn7.execute-api.ap-southeast-2.amazonaws.com/prod/contact";

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: "縲伸andy蜈ｬ蠑臭P縲代♀蝠上＞蜷医ｏ縺・,
            message: message,
            website: website,
            targetEmail: "info@neuralseed.tech"
          })
        });

        if (!response.ok) {
          throw new Error("繝阪ャ繝医Ρ繝ｼ繧ｯ繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆");
        }
        
        // 謌仙粥繝｡繝・そ繝ｼ繧ｸ繧定｡ｨ遉ｺ
        messageEl.style.display = 'block';
        contactForm.reset();
        
        // 5遘貞ｾ後↓繝｡繝・そ繝ｼ繧ｸ繧帝國縺・
        setTimeout(() => {
          messageEl.style.display = 'none';
        }, 5000);
      } catch (error) {
        console.error("Submission error:", error);
        alert("繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆縲よ凾髢薙ｒ縺翫＞縺ｦ蜀榊ｺｦ縺願ｩｦ縺励￥縺縺輔＞縲・);
      } finally {
        // 繝懊ち繝ｳ繧貞・縺ｫ謌ｻ縺・
        submitBtn.innerHTML = originalText;
        submitBtn.style.pointerEvents = 'auto';
        submitBtn.style.opacity = '1';
      }
    });
  }
});
