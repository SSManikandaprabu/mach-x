import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function getFfmpegPath() {
  const localBin = path.join(rootDir, 'bin', process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg');
  if (fs.existsSync(localBin)) {
    return `"${localBin}"`;
  }
  return 'ffmpeg';
}

const ffmpeg = getFfmpegPath();
const heroVideo = path.join(rootDir, 'assets', 'hero.mp4');
const desktopDir = path.join(rootDir, 'public', 'frames', 'desktop');
const mobileDir = path.join(rootDir, 'public', 'frames', 'mobile');
const posterPath = path.join(rootDir, 'public', 'poster.jpg');

console.log('🚀 Starting MACH-X frame extraction...');
console.log(`Using FFmpeg at: ${ffmpeg}`);

if (!fs.existsSync(heroVideo)) {
  console.error(`❌ Hero video not found at: ${heroVideo}`);
  process.exit(1);
}

// Clean and prepare output directories
for (const dir of [desktopDir, mobileDir]) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.endsWith('.webp')) fs.unlinkSync(path.join(dir, f));
    }
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Ensure public poster
const fallbackPosterCandidate = path.join(rootDir, 'assets', 'Sneaker_laces_itself_on_pedestal_20261027110355.jpg');
if (fs.existsSync(fallbackPosterCandidate) && !fs.existsSync(posterPath)) {
  fs.copyFileSync(fallbackPosterCandidate, posterPath);
  console.log(`📸 Copied fallback poster to ${posterPath}`);
}

// Extract 240 frames Desktop (1920px wide, quality 80)
console.log('⏳ Extracting Desktop frames (1920px WebP @ q=80)...');
try {
  const desktopCmd = `${ffmpeg} -i "${heroVideo}" -vf "fps=240/20.01,scale=1920:-1:flags=lanczos" -c:v libwebp -quality 80 -compression_level 4 "${path.join(desktopDir, 'frame_%04d.webp')}" -y`;
  execSync(desktopCmd, { stdio: 'inherit' });
} catch (err) {
  console.error('Desktop extraction failed:', err);
  process.exit(1);
}

// Extract 240 frames Mobile (960px wide, quality 80)
console.log('⏳ Extracting Mobile frames (960px WebP @ q=80)...');
try {
  const mobileCmd = `${ffmpeg} -i "${heroVideo}" -vf "fps=240/20.01,scale=960:-1:flags=lanczos" -c:v libwebp -quality 80 -compression_level 4 "${path.join(mobileDir, 'frame_%04d.webp')}" -y`;
  execSync(mobileCmd, { stdio: 'inherit' });
} catch (err) {
  console.error('Mobile extraction failed:', err);
  process.exit(1);
}

// Fallback poster extraction if needed
if (!fs.existsSync(posterPath)) {
  console.log('📸 Extracting last frame as poster.jpg...');
  const posterCmd = `${ffmpeg} -sseof -1 -i "${heroVideo}" -update 1 -q:v 2 "${posterPath}" -y`;
  execSync(posterCmd, { stdio: 'inherit' });
}

// Automatically clean AI watermark sparkles from extracted frames
console.log('🧹 Cleaning AI watermark from all extracted frames...');
try {
  execSync('python scripts/remove-watermark.py', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.warn('Watermark removal script notice:', e.message);
}

const desktopCount = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp')).length;
const mobileCount = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp')).length;

console.log(`✅ Extraction complete!`);
console.log(`Desktop frames count: ${desktopCount} in /public/frames/desktop`);
console.log(`Mobile frames count: ${mobileCount} in /public/frames/mobile`);
