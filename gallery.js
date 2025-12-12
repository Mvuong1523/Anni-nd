// Photo Galaxy Animation
const photos = [
    'images/anh1.jfif',
    'images/anh2.jpg',
    'images/anh3.jpg',
    'images/anh4.jpg',
    'images/anh5.jfif',
    'images/anh6.jpg',
    'images/anh7.jpg'
];

let photoIndex = 0;

// Create rotating photo sphere (empty sphere with glow)
function createPhotoSphere() {
    // Sphere will be filled by flowing photos
}

// Create 3D spiral photos
function create3DPhoto() {
    const photo = document.createElement('div');
    photo.className = 'photo-3d';
    
    const img = document.createElement('img');
    img.src = photos[photoIndex];
    photo.appendChild(img);
    
    // Random orbit parameters
    const orbitRadius = 400 + Math.random() * 300; // 400-700px
    const orbitAngle = Math.random() * 360;
    const orbitHeight = -200 + Math.random() * 400; // Vertical spread
    
    // Set CSS variables for animation
    photo.style.setProperty('--orbit-radius', orbitRadius + 'px');
    photo.style.setProperty('--orbit-angle', orbitAngle + 'deg');
    photo.style.setProperty('--orbit-height', orbitHeight + 'px');
    
    // Random size for depth
    const size = 60 + Math.random() * 80;
    photo.style.setProperty('--photo-size', size + 'px');
    
    // Random animation duration
    const duration = 6 + Math.random() * 4;
    photo.style.animationDuration = duration + 's';
    
    // No delay - start immediately
    photo.style.animationDelay = '0s';
    
    document.getElementById('photoStream').appendChild(photo);
    
    // Create accompanying stars
    createPhotoStars(orbitRadius, orbitAngle, orbitHeight, duration);
    
    // Remove and recreate for infinite loop
    setTimeout(() => {
        photo.remove();
        create3DPhoto();
    }, (duration + 2) * 1000);
    
    photoIndex = (photoIndex + 1) % photos.length;
}

// Create stars that follow photos
function createPhotoStars(orbitRadius, orbitAngle, orbitHeight, duration) {
    const numStars = 4 + Math.floor(Math.random() * 6); // 4-10 stars per photo (reduced)
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'flying-star';
        
        // Offset from photo position - wider spread
        const offsetRadius = orbitRadius + (Math.random() - 0.5) * 200;
        const offsetAngle = orbitAngle + (Math.random() - 0.5) * 90;
        const offsetHeight = orbitHeight + (Math.random() - 0.5) * 150;
        
        star.style.setProperty('--orbit-radius', offsetRadius + 'px');
        star.style.setProperty('--orbit-angle', offsetAngle + 'deg');
        star.style.setProperty('--orbit-height', offsetHeight + 'px');
        
        // Random star size - smaller and more varied
        const starSize = 1 + Math.random() * 3;
        star.style.width = starSize + 'px';
        star.style.height = starSize + 'px';
        
        // Match photo duration with slight variation
        star.style.animationDuration = (duration + (Math.random() - 0.5) * 2) + 's';
        
        // Random bright color
        const colors = [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 220, 230, 1)',
            'rgba(200, 230, 255, 1)',
            'rgba(255, 255, 200, 1)',
            'rgba(230, 200, 255, 1)'
        ];
        star.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random sparkle speed
        star.style.animationDuration = `${duration}s, ${0.5 + Math.random() * 0.8}s`;
        
        document.getElementById('photoStream').appendChild(star);
        
        // Remove after animation
        setTimeout(() => {
            star.remove();
        }, (duration + 2) * 1000);
    }
}

// Create additional light rays
function createAdditionalRays() {
    const sphere = document.getElementById('photoSphere');
    const numRays = 8;
    
    for (let i = 0; i < numRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'extra-ray';
        ray.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg)`;
        sphere.appendChild(ray);
    }
}

// Create stars with depth layers
function createStars() {
    const starsLayer = document.getElementById('starsLayer');
    const numStars = 500; // Much more stars
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Create depth by varying size and opacity
        const depth = Math.random();
        
        if (depth < 0.3) {
            // Far stars - tiny and dim
            star.classList.add('small');
            star.style.opacity = 0.3 + Math.random() * 0.3;
        } else if (depth < 0.7) {
            // Medium distance
            star.classList.add('medium');
            star.style.opacity = 0.5 + Math.random() * 0.3;
        } else {
            // Close stars - bright
            star.classList.add('large');
            star.style.opacity = 0.7 + Math.random() * 0.3;
        }
        
        // Add color variety
        const colorRand = Math.random();
        if (colorRand > 0.7) {
            const colors = [
                'rgba(255, 182, 193, 0.9)', // Pink
                'rgba(173, 216, 230, 0.9)', // Light blue
                'rgba(255, 255, 224, 1)',   // Light yellow
                'rgba(230, 230, 250, 0.9)'  // Lavender
            ];
            star.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        
        starsLayer.appendChild(star);
    }
}

// Create distant galaxies
function createDistantGalaxies() {
    const scene = document.querySelector('.galaxy-scene');
    const numGalaxies = 5;
    
    for (let i = 0; i < numGalaxies; i++) {
        const galaxy = document.createElement('div');
        galaxy.className = 'distant-galaxy';
        galaxy.style.left = Math.random() * 100 + '%';
        galaxy.style.top = Math.random() * 100 + '%';
        galaxy.style.animationDelay = Math.random() * 10 + 's';
        
        // Random rotation
        galaxy.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        scene.appendChild(galaxy);
    }
}

// Initialize
createStars();
createDistantGalaxies();
createPhotoSphere();
createAdditionalRays();

// Create initial burst of 3D photos
const numPhotos = 40; // Reduced for performance
for (let i = 0; i < numPhotos; i++) {
    setTimeout(() => {
        create3DPhoto();
    }, i * 150); // Slower stagger
}
