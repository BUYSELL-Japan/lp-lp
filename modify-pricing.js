const fs = require('fs');
const path = 'c:/Users/buyse/OneDrive/デスクトップ/Antigravity/LP-LP/index.html';
let text = fs.readFileSync(path, 'utf8');

// Replace pricing layout with monthly/yearly
const toggleHtml = `
        <div class="pricing-toggle-container">
          <span class="toggle-label active" id="label-monthly">月額払い</span>
          <label class="toggle-switch">
            <input type="checkbox" id="pricing-toggle">
            <span class="slider round"></span>
          </label>
          <span class="toggle-label" id="label-yearly">年額払い <span class="discount-badge">20% OFF🔥</span></span>
        </div>
`;

if (!text.includes('pricing-toggle-container')) {
  text = text.replace(/<div class="pricing-layout">/, toggleHtml + '\n        <div class="pricing-layout">');
}

const newPriceBox = `<div class="price-box">
              <div class="price-initial">
                <span>初期費用</span>
                <span class="strike">¥50,000</span>     
                <span class="val">¥0</span>
              </div>        
              
              <!-- Monthly Pricing -->
              <div class="price-display" id="price-monthly-display">
                <span class="currency">¥</span>
                <span class="number">2,980</span>       
                <span class="period">/月 (税込)</span>
              </div>        

              <!-- Yearly Pricing -->
              <div class="price-display hidden" id="price-yearly-display">
                <div class="old-price">通常 ¥35,760</div>
                <div class="current-price">
                  <span class="currency">¥</span>
                  <span class="number">28,600</span>       
                  <span class="period">/年 (税込)</span>
                </div>
                <div class="savings">✨ 年間 ¥7,160 おトク！</div>
              </div>
            </div>`;

// Use regex to replace existing price box
const priceBoxRegex = /<div class="price-box">[\s\S]*?<div class="price-monthly">[\s\S]*?<\/div>[\s\S]*?<\/div>/;
text = text.replace(priceBoxRegex, newPriceBox);

fs.writeFileSync(path, text, 'utf8');
console.log('Done replacing pricing UI');

// Update CSS
const cssPath = 'c:/Users/buyse/OneDrive/デスクトップ/Antigravity/LP-LP/style.css';
let cssText = fs.readFileSync(cssPath, 'utf8');

if (!cssText.includes('.pricing-toggle-container')) {
  cssText += `
/* ================== Pricing Additions ================== */
.pricing-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}

.toggle-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-label.active {
  color: #0f172a;
}

.discount-badge {
  background: #ff4b4b;
  color: white;
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 20px;
  margin-left: 5px;
  animation: pulse-glow 2s infinite;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #3b82f6;
  background-image: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: 15px;
}

.price-display.hidden {
  display: none !important;
}

.current-price {
  font-size: 3rem;
  font-weight: 900;
  color: #0f172a;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.old-price {
  text-decoration: line-through;
  color: #94a3b8;
  font-size: 1.1rem;
  margin-bottom: -5px;
  text-align: center;
}

.savings {
  color: #10b981;
  font-size: 0.95rem;
  font-weight: 700;
  margin-top: 5px;
  background: #ecfdf5;
  padding: 5px 10px;
  border-radius: 8px;
  display: inline-block;
}
`;
  fs.writeFileSync(cssPath, cssText, 'utf8');
  console.log('Done updating CSS');
}

// Update JS
const jsPath = 'c:/Users/buyse/OneDrive/デスクトップ/Antigravity/LP-LP/main.js';
let jsText = fs.readFileSync(jsPath, 'utf8');

if (!jsText.includes('pricing-toggle')) {
  jsText += `

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
`;
  fs.writeFileSync(jsPath, jsText, 'utf8');
  console.log('Done updating JS');
}
