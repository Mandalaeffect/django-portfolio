// Navigation toggle for mobile - moved to DOMContentLoaded

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add hover effect for project cards
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px) scale(1.02)';
    });

    project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0) scale(1)';
    });
});


// Particle background effect (simple)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255,255,255,0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Terminal typing effect
function typeTerminalText() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (!terminalOutput) return;

    const commands = [
        { prompt: 'bibek@django:~$', command: 'whoami', output: 'bibek-rayamajhi' },
        { prompt: 'bibek@django:~$', command: 'cat skills.txt', output: 'Python, Django, Machine Learning, Web Development' },
        { prompt: 'bibek@django:~$', command: 'echo "Initializing Django portfolio..."', output: 'Initializing Django portfolio...' },
        { prompt: 'bibek@django:~$', command: 'ls projects/', output: 'ecommerce_website/  share_market_prediction/  face_recognition/\neye_disease_detection/  student_management_api/  college_chatbot/' },
        { prompt: 'bibek@django:~$', command: '', output: '', cursor: true }
    ];

    let currentCommand = 0;
    let currentChar = 0;
    let isTyping = false;

    function typeNext() {
        if (currentCommand >= commands.length) return;

        const cmd = commands[currentCommand];
        let text = '';

        if (currentChar < cmd.prompt.length) {
            text = cmd.prompt.substring(0, currentChar + 1);
            currentChar++;
            isTyping = true;
        } else if (currentChar < cmd.prompt.length + cmd.command.length) {
            text = cmd.prompt + cmd.command.substring(0, currentChar - cmd.prompt.length + 1);
            currentChar++;
            isTyping = true;
        } else if (cmd.output && currentChar < cmd.prompt.length + cmd.command.length + cmd.output.length + 1) {
            const outputStart = currentChar - cmd.prompt.length - cmd.command.length;
            text = cmd.prompt + cmd.command + '\n' + cmd.output.substring(0, outputStart);
            currentChar++;
            isTyping = true;
        } else {
            currentCommand++;
            currentChar = 0;
            isTyping = false;
            setTimeout(typeNext, 1000);
            return;
        }

        // Update terminal content
        const lines = terminalOutput.querySelectorAll('p');
        if (lines.length > currentCommand) {
            const currentLine = lines[currentCommand];
            if (cmd.cursor && currentChar === 0) {
                currentLine.innerHTML = cmd.prompt + ' <span class="cursor">_</span>';
            } else {
                currentLine.innerHTML = text.replace('\n', '<br>') + (isTyping ? '<span class="cursor">_</span>' : '');
            }
        }

        setTimeout(typeNext, isTyping ? 50 : 200);
    }

    // Clear existing content and start typing
    terminalOutput.innerHTML = commands.map(() => '<p></p>').join('');
    setTimeout(typeNext, 1000);
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '1.0';
    canvas.style.backgroundColor = 'red'; // Temporary bright background to see if canvas exists
    document.body.appendChild(canvas);
    console.log('Matrix rain canvas created and added to body');
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
    console.log('Canvas opacity:', canvas.style.opacity);
    console.log('Canvas z-index:', canvas.style.zIndex);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrixArray = matrixChars.split("");

    const fontSize = 24;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i]);

            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += fontSize * 0.8;
        }

        console.log('Matrix rain draw function called');
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = Math.floor(canvas.width / fontSize);
        while (drops.length < newColumns) {
            drops.push(Math.random() * canvas.height);
        }
        while (drops.length > newColumns) {
            drops.pop();
        }
    });
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    typeTerminalText();
    createMatrixRain();
});


// Glitch Effect
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('h1, h2, .hero-title');

    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s infinite';
        });

        element.addEventListener('mouseleave', () => {
            element.style.animation = '';
        });
    });
}

// Enhanced Terminal Typing Animation
function enhanceTerminalTyping() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (!terminalOutput) return;

    const commands = [
        { prompt: 'bibek@ai:~#', command: 'whoami', output: 'bibek-rayamajhi' },
        { prompt: 'bibek@ai:~#', command: 'cat /etc/passwd | grep bibek', output: 'bibek:x:1000:1000:Bibek Rayamajhi,,,:/home/bibek:/bin/bash' },
        { prompt: 'bibek@ai:~#', command: 'ls -la ~/ai_projects/', output: 'drwxr-xr-x 2 bibek bibek 4096 Sep 22 16:00 .\ndrwxr-xr-x 3 bibek bibek 4096 Sep 22 15:45 ..\n-rw-r--r-- 1 bibek bibek 2048 Sep 22 16:00 neural_net.py\n-rw-r--r-- 1 bibek bibek 1536 Sep 22 15:50 vision_model.h5' },
        { prompt: 'bibek@ai:~#', command: 'python3 -c "import tensorflow as tf; print(\'AI Engine Ready!\')"', output: 'AI Engine Ready!' },
        { prompt: 'bibek@ai:~#', command: 'echo "NCON Website: https://nconnnp.org/"', output: 'NCON Website: <a href="https://nconnnp.org/" target="_blank" style="color: #00ff88;">https://nconnnp.org/</a>' },
        { prompt: 'bibek@ai:~#', command: 'echo "College Chatbot: https://megacollegeofmanagement.edu.np/"', output: 'College Chatbot: <a href="https://megacollegeofmanagement.edu.np/" target="_blank" style="color: #00ff88;">https://megacollegeofmanagement.edu.np/</a>' },
        { prompt: 'bibek@ai:~#', command: 'python train_model.py --dataset mnist', output: 'Training neural network on MNIST dataset...\nEpoch 1/10: loss=0.234, accuracy=0.934\nEpoch 2/10: loss=0.098, accuracy=0.967\nModel training complete!' },
        { prompt: 'bibek@ai:~#', command: '', output: '', cursor: true }
    ];

    let currentCommand = 0;
    let currentChar = 0;
    let isTyping = false;

    function typeNext() {
        if (currentCommand >= commands.length) return;

        const cmd = commands[currentCommand];
        let text = '';

        if (currentChar < cmd.prompt.length) {
            text = cmd.prompt.substring(0, currentChar + 1);
            currentChar++;
            isTyping = true;
        } else if (currentChar < cmd.prompt.length + cmd.command.length) {
            text = cmd.prompt + cmd.command.substring(0, currentChar - cmd.prompt.length + 1);
            currentChar++;
            isTyping = true;
        } else if (cmd.output && currentChar < cmd.prompt.length + cmd.command.length + cmd.output.length + 1) {
            const outputStart = currentChar - cmd.prompt.length - cmd.command.length;
            text = cmd.prompt + cmd.command + '\n' + cmd.output.substring(0, outputStart);
            currentChar++;
            isTyping = true;
        } else {
            currentCommand++;
            currentChar = 0;
            isTyping = false;
            setTimeout(typeNext, 1500); // Shorter delay between commands
            return;
        }

        // Update terminal content
        const lines = terminalOutput.querySelectorAll('p');
        if (lines.length > currentCommand) {
            const currentLine = lines[currentCommand];
            if (cmd.cursor && currentChar === 0) {
                currentLine.innerHTML = cmd.prompt + ' <span class="cursor">_</span>';
            } else {
                currentLine.innerHTML = text.replace(/\n/g, '<br>') + (isTyping ? '<span class="cursor">_</span>' : '');
            }
        }

        setTimeout(typeNext, isTyping ? 50 : 300); // Faster typing
    }

    // Start the animation immediately
    terminalOutput.innerHTML = commands.map(() => '<p></p>').join('');
    setTimeout(typeNext, 500);
}

// Cyberpunk Particle Effects
function createCyberParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'cyber-particles';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typewriter effect for hero title
function typeWriterEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const text = "Bibek"; // Focus on first name for clean animation
    let i = 0;

    function typeNext() {
        if (i < text.length) {
            const span = document.createElement('span');
            span.textContent = text.charAt(i);
            span.className = 'letter';
            span.style.animationDelay = `${i * 0.2}s`;
            titleElement.appendChild(span);
            i++;

            // Fixed delay for smooth typing
            setTimeout(typeNext, 200);
        } else {
            // Finished typing, add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '_';
            titleElement.appendChild(cursor);
        }
    }

    // Clear initial content and start
    titleElement.textContent = '';
    setTimeout(typeNext, 1000);
}

// Matrix character cycling effect
function addMatrixCharEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const originalText = titleElement.dataset.text || titleElement.textContent.replace('_', '');
    let interval;

    titleElement.addEventListener('mouseenter', () => {
        clearInterval(interval);
        let charIndex = 0;
        interval = setInterval(() => {
            if (charIndex < originalText.length) {
                const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
                const randomChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const before = originalText.substring(0, charIndex);
                const after = originalText.substring(charIndex + 1);
                titleElement.textContent = before + randomChar + after;
                charIndex++;
            } else {
                clearInterval(interval);
                titleElement.textContent = originalText;
                titleElement.innerHTML += '<span class="cursor">_</span>';
            }
        }, 30);
    });

    titleElement.addEventListener('mouseleave', () => {
        clearInterval(interval);
        titleElement.textContent = originalText;
        titleElement.innerHTML += '<span class="cursor">_</span>';
    });
}

// Scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and major elements
    document.querySelectorAll('section, .project, .skill, .contact-card, .footer-section').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Animated counters for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const targetStr = counter.getAttribute('data-target');
        let target;

        // Handle cases like "100+" by extracting the number
        if (targetStr.includes('+')) {
            target = parseInt(targetStr.replace('+', ''));
        } else {
            target = parseInt(targetStr);
        }

        const increment = target / 50;
        let current = 0;
        const isPercentage = counter.nextElementSibling && counter.nextElementSibling.classList.contains('stat-unit') && counter.nextElementSibling.textContent === '%';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = Math.floor(target) + (targetStr.includes('+') ? '+' : '') + (isPercentage ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (isPercentage ? '%' : '');
            }
        }, 20);
    });
}

// Animate counters after page load
function setupCounterAnimation() {
    // Trigger animation immediately
    animateCounters();
}

// Dynamic coffee cups counter
function startCoffeeCounter() {
    const coffeeElement = document.getElementById('coffee-cups');
    let coffeeCount = 0;

    // Increment coffee cups every 5 seconds (simulating coding sessions)
    setInterval(() => {
        coffeeCount += Math.floor(Math.random() * 3) + 1; // Random increment between 1-3
        coffeeElement.textContent = coffeeCount;
        coffeeElement.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            coffeeElement.style.animation = '';
        }, 500);
    }, 5000); // Every 5 seconds
}

// Animated skill bars
function animateSkillBars() {
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan))';
        progressBar.style.position = 'absolute';
        progressBar.style.bottom = '0';
        progressBar.style.left = '0';
        progressBar.style.borderRadius = '0';

        skill.style.position = 'relative';
        skill.appendChild(progressBar);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.width = '100%';
                    progressBar.style.transition = 'width 2s ease-in-out';
                }
            });
        });

        observer.observe(skill);
    });
}
// Animate numeric counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const targetStr = counter.getAttribute('data-target'); // e.g. "6" or "100+"
        const isPercentage = counter.nextElementSibling && counter.nextElementSibling.classList.contains('stat-unit') && counter.nextElementSibling.textContent.includes('%');
        let target = parseInt(targetStr); // works even for "100+"

        let current = 0;
        const increment = Math.max(1, target / 50); // smooth increment

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = targetStr; // keep "+" if present
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + (isPercentage ? '%' : '');
            }
        }, 50);
    });
}

// Dynamic coffee cups counter
function startCoffeeCounter() {
    const coffeeElement = document.getElementById('coffee-cups');
    if (!coffeeElement) return;

    let coffeeCount = parseInt(coffeeElement.getAttribute('data-target')) || 0;

    setInterval(() => {
        const increment = Math.floor(Math.random() * 3) + 1; // random 1-3 cups
        coffeeCount += increment;
        coffeeElement.textContent = coffeeCount + '+'; // always show "+"
        coffeeElement.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            coffeeElement.style.animation = '';
        }, 500);
    }, 5000);
}

// Trigger counters when #about section is visible
function setupCounterAnimation() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                startCoffeeCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
}

// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCounterAnimation();
});


// Floating elements animation
function addFloatingElements() {
    const floatingElements = document.querySelectorAll('.project, .skill, .contact-card');

    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
    });
}

// Parallax effect for background
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Apply parallax to background elements
        document.querySelectorAll('.hero-bg-pattern, .matrix-bg').forEach(el => {
            el.style.transform = `translateY(${rate * 0.1}px)`;
        });
    });
}

// Loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.classList.add('loaded');
}

// Particle background effect (simple)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255,255,255,0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeTerminalText();
    createMatrixRain();
});

    
    // Animate terminal prompt with typing effect
    function animateTerminalPrompt() {
        const terminalTitle = document.querySelector('.terminal-title');
        if (!terminalTitle) return;
    
        const fullPrompt = 'bibek@django:~#';
        let currentText = '';
        let charIndex = 0;
    
        // Clear initial text
        terminalTitle.textContent = '';
    
        function typeNextChar() {
            if (charIndex < fullPrompt.length) {
                currentText += fullPrompt.charAt(charIndex);
                terminalTitle.textContent = currentText;
    
                // Add blinking cursor effect
                if (charIndex < fullPrompt.length - 1) {
                    setTimeout(() => {
                        terminalTitle.textContent = currentText + '_';
                        setTimeout(() => {
                            terminalTitle.textContent = currentText;
                            charIndex++;
                            setTimeout(typeNextChar, 100);
                        }, 200);
                    }, 100);
                } else {
                    charIndex++;
                    setTimeout(typeNextChar, 100);
                }
            } else {
                // Final cursor blink
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    terminalTitle.textContent = currentText + (blinkCount % 2 === 0 ? '_' : '');
                    blinkCount++;
                    if (blinkCount > 6) {
                        clearInterval(blinkInterval);
                        terminalTitle.textContent = currentText;
                    }
                }, 300);
            }
        }
    
        // Start typing after terminal section becomes visible
        const terminalSection = document.querySelector('#terminal');
        if (terminalSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeNextChar, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
    
            observer.observe(terminalSection);
        } else {
            // Fallback: start after delay
            setTimeout(typeNextChar, 3000);
        }
    }
    
    window.enhanceTerminalTyping = enhanceTerminalTyping;

// Add keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0px) rotate(360deg); }
    }

    .cyber-particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ff88;
        border-radius: 50%;
        animation: cyberFloat linear infinite;
        box-shadow: 0 0 6px #00ff88;
    }

    @keyframes cyberFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        padding: 1rem;
        border-top: 1px solid rgba(0, 255, 136, 0.3);
        backdrop-filter: blur(10px);
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @media (min-width: 769px) {
        .nav-menu.active {
            display: flex !important;
            flex-direction: row !important;
            position: static !important;
            background: transparent !important;
            padding: 0 !important;
            border-top: none !important;
        }
    }
`;
document.head.appendChild(style);