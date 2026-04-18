const { execSync } = require('child_process');
const cwd = 'c:/Users/buyse/OneDrive/デスクトップ/Antigravity/lp-baseline-theme';

try {
  execSync('git add .', { cwd });
  execSync('git commit -m "fix: resolve TS errors causing Astro build failure"', { cwd });
  console.log(execSync('git push', { encoding: 'utf-8', cwd }));
} catch(e) {
  console.log(e.stdout ? e.stdout.toString() : e.message);
}
