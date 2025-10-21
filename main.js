// Nmap Command Builder - Main JavaScript
class NmapCommandBuilder {
    constructor() {
        this.command = '';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeParticles();
        this.updateCommand();
    }
    
    setupEventListeners() {
        // Scan type changes
        document.querySelectorAll('input[name="scanType"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateCommand());
        });
        
        // Timing changes
        document.querySelectorAll('input[name="timing"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateCommand());
        });
        
        // Target host input
        document.getElementById('targetHost').addEventListener('input', () => this.updateCommand());
        
        // Port type changes
        document.querySelectorAll('input[name="portType"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const customPorts = document.getElementById('customPorts');
                if (e.target.value === 'custom') {
                    customPorts.classList.remove('hidden');
                } else {
                    customPorts.classList.add('hidden');
                }
                this.updateCommand();
            });
        });
        
        // Custom ports input
        document.getElementById('customPorts').addEventListener('input', () => this.updateCommand());
        
        // Checkboxes
        ['serviceDetection', 'osDetection', 'skipDiscovery', 'showOpen'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.updateCommand());
        });
        
        // NSE Script selection
        document.getElementById('nseScript').addEventListener('change', () => this.updateCommand());
        
        // Output format changes
        document.querySelectorAll('input[name="outputFormat"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateCommand());
        });
        
        // Verbosity changes
        document.querySelectorAll('input[name="verbosity"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateCommand());
        });
        
        // Copy command button
        document.getElementById('copyCommand').addEventListener('click', () => this.copyCommand());
        
        // Quick examples
        document.querySelectorAll('.quick-example').forEach(example => {
            example.addEventListener('click', (e) => {
                const command = e.currentTarget.dataset.command;
                this.loadExample(command);
            });
        });
        
        // Mobile menu
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            // Mobile menu functionality would go here
            alert('Mobile menu - navigate to other pages');
        });
    }
    
    updateCommand() {
        let command = 'nmap';
        
        // Scan type
        const scanType = document.querySelector('input[name="scanType"]:checked').value;
        command += ` ${scanType}`;
        
        // Timing
        const timing = document.querySelector('input[name="timing"]:checked').value;
        if (timing) command += ` ${timing}`;
        
        // Port configuration
        const portType = document.querySelector('input[name="portType"]:checked').value;
        if (portType === 'all') {
            command += ' -p-';
        } else if (portType === 'custom') {
            const customPorts = document.getElementById('customPorts').value;
            if (customPorts) {
                command += ` -p ${customPorts}`;
            }
        }
        
        // Additional options
        if (document.getElementById('serviceDetection').checked) {
            command += ' -sV';
        }
        
        if (document.getElementById('osDetection').checked) {
            command += ' -O';
        }
        
        if (document.getElementById('skipDiscovery').checked) {
            command += ' -Pn';
        }
        
        if (document.getElementById('showOpen').checked) {
            command += ' --open';
        }
        
        // NSE Script
        const nseScript = document.getElementById('nseScript').value;
        if (nseScript) {
            command += ` ${nseScript}`;
        }
        
        // Output format
        const outputFormat = document.querySelector('input[name="outputFormat"]:checked').value;
        if (outputFormat) {
            command += ` ${outputFormat} output.txt`;
        }
        
        // Verbosity
        const verbosity = document.querySelector('input[name="verbosity"]:checked').value;
        if (verbosity) {
            command += ` ${verbosity}`;
        }
        
        // Target host
        const targetHost = document.getElementById('targetHost').value;
        if (targetHost) {
            command += ` ${targetHost}`;
        }
        
        this.command = command;
        this.displayCommand();
    }
    
    displayCommand() {
        const output = document.getElementById('commandOutput');
        
        if (!this.command || this.command === 'nmap') {
            output.innerHTML = '<span class="syntax-comment"># Configure your scan options above to generate command</span>';
            return;
        }
        
        // Syntax highlighting
        let highlighted = this.command
            .replace(/^(nmap)/, '<span class="syntax-command">$1</span>')
            .replace(/(-[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="syntax-flag">$1</span>')
            .replace(/(\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b|\b[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}\b)/g, '<span class="syntax-target">$1</span>');
        
        output.innerHTML = highlighted;
        
        // Animate the command update
        anime({
            targets: output,
            scale: [0.95, 1],
            opacity: [0.7, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    copyCommand() {
        if (!this.command || this.command === 'nmap') {
            this.showNotification('Please configure a command first', 'warning');
            return;
        }
        
        navigator.clipboard.writeText(this.command).then(() => {
            this.showNotification('Command copied to clipboard!', 'success');
            
            // Animate copy button
            const btn = document.getElementById('copyCommand');
            anime({
                targets: btn,
                scale: [1, 1.1, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        }).catch(() => {
            this.showNotification('Failed to copy command', 'error');
        });
    }
    
    loadExample(command) {
        // Parse the example command and update the UI
        const parts = command.split(' ');
        const target = parts[parts.length - 1];
        
        // Set target host
        document.getElementById('targetHost').value = target;
        
        // Reset all options
        this.resetForm();
        
        // Parse command options
        for (let i = 1; i < parts.length - 1; i++) {
            const part = parts[i];
            
            switch (part) {
                case '-sS':
                    document.querySelector('input[value="-sS"]').checked = true;
                    break;
                case '-sT':
                    document.querySelector('input[value="-sT"]').checked = true;
                    break;
                case '-sU':
                    document.querySelector('input[value="-sU"]').checked = true;
                    break;
                case '-A':
                    document.querySelector('input[value="-A"]').checked = true;
                    break;
                case '-T4':
                    document.querySelector('input[value="-T4"]').checked = true;
                    break;
                case '-p-':
                    document.querySelector('input[value="all"]').checked = true;
                    break;
                case '-Pn':
                    document.getElementById('skipDiscovery').checked = true;
                    break;
                case '-sV':
                    document.getElementById('serviceDetection').checked = true;
                    break;
                case '-O':
                    document.getElementById('osDetection').checked = true;
                    break;
                case '--open':
                    document.getElementById('showOpen').checked = true;
                    break;
                default:
                    if (part.startsWith('-p')) {
                        document.querySelector('input[value="custom"]').checked = true;
                        document.getElementById('customPorts').value = part.substring(2);
                        document.getElementById('customPorts').classList.remove('hidden');
                    }
            }
        }
        
        this.updateCommand();
        this.showNotification('Example loaded!', 'success');
    }
    
    resetForm() {
        // Reset all form elements to defaults
        document.querySelector('input[value="-sS"]').checked = true;
        document.querySelector('input[value="-T3"]').checked = true;
        document.querySelector('input[value="default"]').checked = true;
        document.getElementById('customPorts').classList.add('hidden');
        document.getElementById('customPorts').value = '';
        document.getElementById('serviceDetection').checked = false;
        document.getElementById('osDetection').checked = false;
        document.getElementById('skipDiscovery').checked = false;
        document.getElementById('showOpen').checked = false;
        document.getElementById('nseScript').value = '';
        document.querySelector('input[value=""]').checked = true; // output format
        document.querySelectorAll('input[name="verbosity"]')[0].checked = true;
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
        
        // Style based on type
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-600', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-600', 'text-white');
                break;
            case 'warning':
                notification.classList.add('bg-amber-600', 'text-white');
                break;
            default:
                notification.classList.add('bg-cyan-600', 'text-white');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    initializeAnimations() {
        // Initialize Splitting.js for text animations
        Splitting();
        
        // Typewriter effect for hero
        new Typed('#typed-text', {
            strings: [
                'Interactive Network Scanner',
                'Professional Security Tool',
                'Advanced Reconnaissance',
                'Ethical Hacking Assistant'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '_'
        });
        
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('fade-in')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutQuad',
                delay: anime.stagger(100)
            });
        } else if (element.classList.contains('slide-in-left')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 600,
                easing: 'easeOutQuad',
                delay: anime.stagger(100)
            });
        } else if (element.classList.contains('slide-in-right')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateX: [50, 0],
                duration: 600,
                easing: 'easeOutQuad',
                delay: anime.stagger(100)
            });
        }
    }
    
    initializeParticles() {
        // Simple particle system for background
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('particleBg');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        
        container.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new NmapCommandBuilder();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Glow effect on hover for panels
    document.querySelectorAll('.glass').forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            anime({
                targets: panel,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        panel.addEventListener('mouseleave', () => {
            anime({
                targets: panel,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});