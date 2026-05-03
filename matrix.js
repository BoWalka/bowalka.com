// Matrix Rain Effect - Dark Theme with Custom Emojis
// Optimized for Mobile & Desktop

const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.12';
canvas.style.pointerEvents = 'none';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');

// Responsive font size based on screen width
const getFontSize = () => {
    return window.innerWidth < 768 ? 12 : 16; // Smaller on mobile
};

let fontSize = getFontSize();
let columns = 0;
let drops = [];

// Custom emoji set: laughing yeet 😂, okay hand 👌, 100 💯
// Plus Bowalka branding and Japanese katakana for matrix effect
const chars = 'Bowalka Designs アイウエオカキクケコサシスセソタチツテト\n🤣 👌 💯 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');

// Initialize drops array
const initDrops = () => {
    columns = Math.ceil(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start above screen at random positions
    }
};

function resizeCanvas() {
    // Adjust for device pixel ratio on high-DPI screens (mobile/desktop)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    
    fontSize = getFontSize();
    initDrops();
}

// Initial setup
resizeCanvas();

// Draw matrix effect
function draw() {
    // Fade effect with trail
    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    // Rainbow gradient color for each character
    const time = Date.now() / 100;
    const baseHue = (time * 0.5) % 360;
    
    for (let i = 0; i < drops.length; i++) {
        // Randomly select character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Color cycling
        const hue = (baseHue + i * 2) % 360;
        const saturation = 70 + Math.sin(time * 0.1 + i) * 20;
        const lightness = 55 + Math.cos(time * 0.15 + i) * 15;
        
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.font = `${fontSize}px 'Courier New', monospace`;
        
        // Add slight shadow for depth
        ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.shadowBlur = 4;
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset shadow
        ctx.shadowBlur = 0;

        // Move drop down, with random reset
        if (drops[i] * fontSize > canvas.height / (window.devicePixelRatio || 1) + fontSize && Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i] += 0.5 + (window.innerWidth < 768 ? 0.3 : 0.7); // Slower on mobile for better readability
    }
}

// Animation loop with optimized frame rate
let lastTime = 0;
const optimalFPS = 60;
const frameDelay = 1000 / optimalFPS;

function animate(timestamp) {
    if (timestamp - lastTime >= frameDelay) {
        draw();
        lastTime = timestamp;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Handle resize events (mobile rotation, desktop resize)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 150); // Debounce for performance
});

// Pause animation when tab is inactive (battery saving on mobile)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animate);
    } else {
        requestAnimationFrame(animate);
    }
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(resizeCanvas, 200);
});
