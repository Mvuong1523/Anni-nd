// Kiểm tra đã đăng nhập chưa
const isLoggedIn = sessionStorage.getItem('isLoggedIn');

if (isLoggedIn === 'true') {
    // Đã đăng nhập rồi, bỏ qua password và intro
    document.getElementById('passwordScreen').style.display = 'none';
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('mainContent').classList.add('show');
    const bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.style.display = 'flex';
    document.getElementById('hearts').style.display = 'block';
    
    // Play music if already logged in
    const bgMusicMain = document.getElementById('bgMusicMain');
    if (bgMusicMain) {
        bgMusicMain.volume = 0.5;
        bgMusicMain.play().catch(error => {
            console.log('Music auto-play prevented');
        });
    }
}

// Xử lý password lock
const PASSWORD = '1523';
const pinInputs = document.querySelectorAll('.pin-input');
const passwordScreen = document.getElementById('passwordScreen');
const errorMessage = document.getElementById('errorMessage');

// Auto focus next input
pinInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
        }
        
        // Check password when all 4 digits entered
        if (index === 3 && e.target.value.length === 1) {
            checkPassword();
        }
    });
    
    // Backspace to previous input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            pinInputs[index - 1].focus();
        }
    });
});

let wrongPasswordCount = 0;

function checkPassword() {
    const enteredPassword = Array.from(pinInputs).map(input => input.value).join('');
    const hint = document.getElementById('passwordHint');
    
    if (enteredPassword === PASSWORD) {
        // Lưu trạng thái đã đăng nhập
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Start music on correct password
        const bgMusicMain = document.getElementById('bgMusicMain');
        if (bgMusicMain) {
            bgMusicMain.volume = 0.5;
            bgMusicMain.play().catch(error => {
                console.log('Music auto-play prevented');
            });
        }
        
        // Correct password
        passwordScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            passwordScreen.style.display = 'none';
            // Show intro screen
            const introScreen = document.getElementById('introScreen');
            introScreen.style.display = 'flex';
            // Show hearts
            document.getElementById('hearts').style.display = 'block';
            
            // Start intro timer
            startIntroTimer();
        }, 500);
    } else {
        wrongPasswordCount++;
        
        if (wrongPasswordCount === 1) {
            // Lần 1 sai -> Hiện gợi ý
            hint.style.display = 'block';
            errorMessage.classList.add('show');
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 2000);
            
            // Reset inputs
            pinInputs.forEach(input => {
                input.value = '';
            });
            pinInputs[0].focus();
        } else {
            // Lần 2 sai -> Tha thứ
            showForgiveScreen();
        }
    }
}

// Màn hình tha thứ
function showForgiveScreen() {
    const passwordContent = document.querySelector('.password-content');
    passwordContent.innerHTML = `
        <div class="forgive-content">
            <img src="images/doi.png" alt="Thở dài" class="sigh-image">
            <h2>Tha cho lần này thôi đó</h2>
            <p>Đang đưa em vào...</p>
        </div>
    `;
    
    // Lưu trạng thái đã đăng nhập
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Start music
    const bgMusicMain = document.getElementById('bgMusicMain');
    if (bgMusicMain) {
        bgMusicMain.volume = 0.5;
        bgMusicMain.play().catch(error => {
            console.log('Music auto-play prevented');
        });
    }
    
    // Sau 2 giây thì vào trang chính
    setTimeout(() => {
        passwordScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            passwordScreen.style.display = 'none';
            // Show intro screen
            const introScreen = document.getElementById('introScreen');
            introScreen.style.display = 'flex';
            // Show hearts
            document.getElementById('hearts').style.display = 'block';
            
            // Start intro timer
            startIntroTimer();
        }, 500);
    }, 2000);
}

// Xử lý màn hình câu hỏi
let noClickCount = 0;
function initQuestionScreen() {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const questionScreen = document.getElementById('questionScreen');
    noClickCount = 0;
    
    // Reset button
    btnNo.style.display = 'block';
    btnNo.style.fontSize = '1.2rem';
    btnNo.style.padding = '15px 40px';
    
    function moveNoButton() {
        noClickCount++;
        
        if (noClickCount >= 3) {
            // Sau 3 lần thì ẩn nút Không
            btnNo.style.display = 'none';
            btnYes.style.fontSize = '2rem';
            btnYes.style.padding = '25px 80px';
            return;
        }
        
        // Random vị trí mới
        const container = document.querySelector('.button-container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        btnNo.style.position = 'absolute';
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
        
        // Giảm kích thước
        const newSize = 1.2 - (noClickCount * 0.2);
        btnNo.style.fontSize = newSize + 'rem';
        btnNo.style.padding = (15 - noClickCount * 3) + 'px ' + (40 - noClickCount * 8) + 'px';
        
        // Tăng kích thước nút Có
        const yesSize = 1.2 + (noClickCount * 0.3);
        btnYes.style.fontSize = yesSize + 'rem';
        btnYes.style.padding = (15 + noClickCount * 3) + 'px ' + (40 + noClickCount * 10) + 'px';
    }
    
    // Sự kiện cho nút Không
    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    
    // Sự kiện cho nút Có
    btnYes.addEventListener('click', () => {
        questionScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            questionScreen.style.display = 'none';
            passwordScreen.style.display = 'flex';
            passwordScreen.style.animation = 'fadeIn 0.5s ease-out forwards';
            
            // Reset password inputs
            pinInputs.forEach(input => {
                input.value = '';
                input.style.borderColor = 'white';
            });
            pinInputs[0].focus();
            
            // Hiện gợi ý mật khẩu
            const hint = document.getElementById('passwordHint');
            hint.style.display = 'block';
        }, 500);
    });
}

// Xử lý intro screen
function startIntroTimer() {
    const introScreen = document.getElementById('introScreen');
    
    function hideIntro() {
        // Fade out intro
        introScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            introScreen.style.display = 'none';
            // Show love story animation
            startLoveStoryAnimation();
        }, 500);
    }
    
    // Tự động ẩn intro sau khi loading bar chạy xong (0.5s delay + 3s load = 3.5s + 0.5s buffer)
    setTimeout(hideIntro, 4500);
    
    // Hoặc click để skip intro
    introScreen.addEventListener('click', hideIntro);
}

// Love Story Animation
function startLoveStoryAnimation() {
    const loveStoryScreen = document.getElementById('loveStoryScreen');
    const storyBoy = document.getElementById('storyBoy');
    const boyFlower = document.getElementById('boyFlower');
    const mainContent = document.getElementById('mainContent');
    const bottomNav = document.getElementById('bottomNav');
    
    // Show love story screen
    loveStoryScreen.style.display = 'flex';
    
    // Step 1: Boy walks close to girl (3s)
    storyBoy.style.animation = 'boyWalkClose 3s ease-in-out forwards';
    
    setTimeout(() => {
        // Step 2: Boy is already facing girl, just wait a moment (0.5s)
        setTimeout(() => {
            // Step 3: Flower appears and stays (1s)
            boyFlower.style.display = 'block';
            boyFlower.style.animation = 'flowerAppear 0.5s ease-out forwards';
            
            setTimeout(() => {
                // Step 4: Flower fades out (girl receives it) (1s)
                boyFlower.style.animation = 'flowerFadeOut 1s ease-out forwards';
                
                setTimeout(() => {
                    boyFlower.style.display = 'none';
                    
                    // Step 5: Hearts fly around them (3s)
                    createStoryHearts();
                    
                    // Step 6: Show main content (after 3s)
                    setTimeout(() => {
                        loveStoryScreen.style.animation = 'fadeOut 1s ease-out forwards';
                        setTimeout(() => {
                            loveStoryScreen.style.display = 'none';
                            mainContent.style.display = 'block';
                            mainContent.classList.add('show');
                            if (bottomNav) bottomNav.style.display = 'flex';
                        }, 1000);
                    }, 3000);
                }, 1000);
            }, 1000);
        }, 500);
    }, 3000);
}

function createStoryHearts() {
    const storyHearts = document.getElementById('storyHearts');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '❤️'];
    
    // Create hearts around the couple
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'story-heart';
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Position hearts around center (where couple is)
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const radius = 50 + Math.random() * 100;
            heart.style.left = (50 + Math.cos(angle) * radius / 10) + '%';
            heart.style.top = (50 + Math.sin(angle) * radius / 10) + '%';
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            
            storyHearts.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3500);
        }, i * 120);
    }
}

// Tạo hiệu ứng trái tim bay
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Tạo trái tim mỗi 2 giây
setInterval(createHeart, 2000);

// Hiệu ứng đếm số ngày (có thể tùy chỉnh ngày bắt đầu)
function updateCounter() {
    const startDate = new Date('2023-12-13'); 
    const now = new Date();
    
    const diffInMilliseconds = now - startDate;
    
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(diffInMilliseconds / millisecondsPerDay);
    
    // Hiển thị số ngày với dấu phẩy ngăn cách (ví dụ: 1,234)
    document.getElementById('days').textContent = days.toLocaleString();
}

// Cập nhật counter khi load trang
updateCounter();

// Tự động cập nhật mỗi giờ (3,600,000 ms = 1 giờ)
// Để đảm bảo số ngày cập nhật khi qua ngày mới
setInterval(updateCounter, 3600000);

// Hiệu ứng xuất hiện khi scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Quan sát tất cả timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Animated Story - Create hearts when they meet
setTimeout(() => {
    const storyHearts = document.getElementById('storyHearts');
    if (storyHearts) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'story-heart';
                heart.innerHTML = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
                heart.style.left = (40 + Math.random() * 20) + '%';
                heart.style.bottom = '20%';
                heart.style.animationDelay = (Math.random() * 0.5) + 's';
                storyHearts.appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 200);
        }
    }
}, 8000); // After they meet

// Love Animation Interaction
const personLeft = document.getElementById('personLeft');
const personRight = document.getElementById('personRight');
const heartCenter = document.getElementById('heartCenter');
const floatingHeartsContainer = document.getElementById('floatingHearts');

if (personLeft && personRight && heartCenter) {
    // Click on person to create floating hearts
    [personLeft, personRight, heartCenter].forEach(element => {
        element.addEventListener('click', createFloatingHeart);
    });
    
    // Auto create hearts periodically
    setInterval(createFloatingHeart, 3000);
}

function createFloatingHeart() {
    if (!floatingHeartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
    
    // Random position
    heart.style.left = (30 + Math.random() * 40) + '%';
    heart.style.top = '50%';
    
    floatingHeartsContainer.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 4000);
}


// Question buttons in main content
const btnQuestionNo = document.getElementById('btnQuestionNo');
const btnQuestionYes = document.getElementById('btnQuestionYes');

if (btnQuestionNo && btnQuestionYes) {
    let questionNoCount = 0;
    
    function moveQuestionNoButton() {
        questionNoCount++;
        
        if (questionNoCount >= 3) {
            // Sau 3 lần thì ẩn nút Không
            btnQuestionNo.style.display = 'none';
            btnQuestionYes.style.fontSize = '2rem';
            btnQuestionYes.style.padding = '25px 80px';
            return;
        }
        
        // Random vị trí mới
        const container = document.querySelector('.question-buttons');
        const containerRect = container.getBoundingClientRect();
        const btnRect = btnQuestionNo.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        btnQuestionNo.style.position = 'absolute';
        btnQuestionNo.style.left = randomX + 'px';
        btnQuestionNo.style.top = randomY + 'px';
        
        // Giảm kích thước nút Không
        const newSize = 1.3 - (questionNoCount * 0.2);
        btnQuestionNo.style.fontSize = newSize + 'rem';
        btnQuestionNo.style.padding = (15 - questionNoCount * 3) + 'px ' + (50 - questionNoCount * 10) + 'px';
        
        // Tăng kích thước nút Có
        const yesSize = 1.3 + (questionNoCount * 0.3);
        btnQuestionYes.style.fontSize = yesSize + 'rem';
        btnQuestionYes.style.padding = (15 + questionNoCount * 3) + 'px ' + (50 + questionNoCount * 10) + 'px';
    }
    
    // Sự kiện cho nút Không
    btnQuestionNo.addEventListener('mouseenter', moveQuestionNoButton);
    btnQuestionNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveQuestionNoButton();
    });
    btnQuestionNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveQuestionNoButton();
    });
    
    // Sự kiện cho nút Có
    btnQuestionYes.addEventListener('click', () => {
        // Save music state before leaving
        const bgMusicMain = document.getElementById('bgMusicMain');
        if (bgMusicMain && !bgMusicMain.paused) {
            sessionStorage.setItem('musicTime', bgMusicMain.currentTime);
            sessionStorage.setItem('musicPlaying', 'true');
        }
        
        // Go to gallery
        window.location.href = 'gallery.html';
    });
}
