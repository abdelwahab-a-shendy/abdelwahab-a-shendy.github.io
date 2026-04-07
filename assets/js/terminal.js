// Main JavaScript File - Advanced Features
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== THEME TOGGLE (Dark/Light Mode) ====================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-theme') === 'light') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
    
    // ==================== READING PROGRESS BAR ====================
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // ==================== PROJECT SEARCH FUNCTIONALITY ====================
    const searchInput = document.getElementById('projectSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const noResultsDiv = document.getElementById('noResults');
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let currentSearchTerm = '';
    
    function updateProjectVisibility() {
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = (card.getAttribute('data-title') || card.querySelector('.project-card__title')?.innerText || '').toLowerCase();
            const tech = (card.getAttribute('data-tech') || '').toLowerCase();
            const desc = card.querySelector('.project-card__desc')?.innerText.toLowerCase() || '';
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = currentSearchTerm === '' || 
                title.includes(currentSearchTerm) || 
                tech.includes(currentSearchTerm) || 
                desc.includes(currentSearchTerm);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResultsDiv) {
            noResultsDiv.style.display = visibleCount === 0 ? 'flex' : 'none';
        }
    }
    
    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            updateProjectVisibility();
        });
    }
    
    // Clear search button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentSearchTerm = '';
                updateProjectVisibility();
            }
        });
    }
    
    // Filter buttons handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            currentFilter = filterValue;
            
            // Update active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateProjectVisibility();
        });
    });
    
    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ==================== MORE DETAILS DROPDOWN ====================
    const moreDetailsBtns = document.querySelectorAll('.more-details-btn');
    
    moreDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            const dropdown = document.getElementById(`${projectId}-details`);
            
            if (dropdown) {
                const isVisible = dropdown.style.display === 'block';
                dropdown.style.display = isVisible ? 'none' : 'block';
                this.innerHTML = isVisible ? '<i class="fas fa-ellipsis-h"></i> More Details' : '<i class="fas fa-chevron-up"></i> Show Less';
            }
        });
    });
    
    // ==================== ANIMATED ROLE ROTATION ====================
    const roles = ['SOC Analyst', 'Security Engineer', 'Threat Hunter', 'Technical Writer', 'n8n Automator'];
    let roleIndex = 0;
    const roleElement = document.getElementById('dynamicRole');
    
    if (roleElement) {
        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleElement.style.opacity = '0';
            setTimeout(() => {
                roleElement.textContent = roles[roleIndex];
                roleElement.style.opacity = '1';
            }, 200);
        }, 3000);
    }
    
    // ==================== INTERSECTION OBSERVER (Fade-in animations) ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe project cards and experience items
    document.querySelectorAll('.project-card, .exp-item').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
    
    // ==================== LAZY LOADING FOR IMAGES ====================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==================== TYPEWRITER EFFECT FOR TERMINAL ====================
    // This is already handled in terminal.js, but we add a small enhancement
    const terminalBody = document.getElementById('dynamicTerminal');
    if (terminalBody && terminalBody.children.length === 1) {
        // Terminal will be populated by terminal.js
        console.log('Terminal ready');
    }
    
    // ==================== SCROLL TO TOP BUTTON (Optional enhancement) ====================
    // Create scroll to top button if not exists
    if (!document.querySelector('.scroll-top')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ==================== UPDATE FILTER COUNTS ====================
    function updateFilterCounts() {
        const counts = {
            all: 0,
            security: 0,
            infrastructure: 0,
            programming: 0
        };
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            counts.all++;
            if (category === 'security') counts.security++;
            else if (category === 'infrastructure') counts.infrastructure++;
            else if (category === 'programming') counts.programming++;
        });
        
        // Update count displays
        const allCountSpan = document.getElementById('allCount');
        const securityCountSpan = document.getElementById('securityCount');
        const infrastructureCountSpan = document.getElementById('infrastructureCount');
        const programmingCountSpan = document.getElementById('programmingCount');
        
        if (allCountSpan) allCountSpan.textContent = counts.all;
        if (securityCountSpan) securityCountSpan.textContent = counts.security;
        if (infrastructureCountSpan) infrastructureCountSpan.textContent = counts.infrastructure;
        if (programmingCountSpan) programmingCountSpan.textContent = counts.programming;
    }
    
    updateFilterCounts();
    
    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
        // Press '/' to focus search
        if (e.key === '/' && searchInput && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        // Press 'Escape' to clear search
        if (e.key === 'Escape' && searchInput && searchInput.value) {
            searchInput.value = '';
            currentSearchTerm = '';
            updateProjectVisibility();
        }
    });
    
    // ==================== PRELOAD CRITICAL RESOURCES ====================
    // Preload hero image
    const heroImg = document.querySelector('.profile-img');
    if (heroImg && heroImg.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImg.src;
        document.head.appendChild(link);
    }
    
    console.log('Portfolio enhancements loaded successfully!');
});

    // ==================== TERMINAL TYPEWRITER EFFECT ====================
    const terminalCmds = [
        { cmd: "whoami", resp: "Abdelwahab Shandy | June 2026 Graduate | SOC Analyst | IT Infrastructure" },
        { cmd: "cat interests.txt", resp: "SOC Analysis | Digital Forensics | Threat Hunting | n8n SOAR | CTF" },
        { cmd: "git status", resp: "Open for hire. Seeking SOC Analyst or Security Engineer roles." },
        { cmd: "echo $status", resp: "Currently: Building Security Labs & Technical Blogging" },
        { cmd: "ls certifications/", resp: "CC(ISC2) | Google Cybersecurity | Cisco Junior Cybersecurity Analyst | Google IT Support" },   
    ];
    
    const terminalContainer = document.getElementById('dynamicTerminal');
    if (terminalContainer) {
        // Clear the loading text
        terminalContainer.innerHTML = '';
        
        let idx = 0;
        
        function addTerminalLine() {
            if (idx >= terminalCmds.length) {
                const lastDiv = document.createElement('div');
                lastDiv.className = 'terminal-line';
                lastDiv.innerHTML = `<span class="prompt">➜</span> <span class="command">~</span> <span class="cursor-blink"></span>`;
                terminalContainer.appendChild(lastDiv);
                return;
            }
            
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            lineDiv.innerHTML = `<span class="prompt">➜</span> <span class="command"></span>`;
            terminalContainer.appendChild(lineDiv);
            
            const cmdSpan = lineDiv.querySelector('.command');
            const fullCmd = terminalCmds[idx].cmd;
            let i = 0;
            
            const typeInterval = setInterval(() => {
                if (i < fullCmd.length) {
                    cmdSpan.textContent += fullCmd[i];
                    i++;
                } else {
                    clearInterval(typeInterval);
                    const respP = document.createElement('p');
                    respP.className = 'response';
                    respP.textContent = terminalCmds[idx].resp;
                    lineDiv.appendChild(respP);
                    idx++;
                    setTimeout(addTerminalLine, 400);
                }
            }, 40);
        }
        
        addTerminalLine();
    }