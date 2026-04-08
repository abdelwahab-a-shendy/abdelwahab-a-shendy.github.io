// ==================== MAIN PORTFOLIO FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
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

    // ==================== JOURNEY TABS ====================
    const tabs = document.querySelectorAll('.journey-tab');
    const contents = document.querySelectorAll('.journey-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${target}-content`).classList.add('active');
        });
    });
    
    // ==================== PROJECT SEARCH & FILTER ====================
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
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (noResultsDiv) {
            noResultsDiv.style.display = visibleCount === 0 ? 'flex' : 'none';
        }
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            updateProjectVisibility();
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentSearchTerm = '';
                updateProjectVisibility();
            }
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            currentFilter = filterValue;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateProjectVisibility();
        });
    });

    // ==================== MORE DETAILS DROPDOWN ====================
    document.querySelectorAll('.more-details-btn').forEach(btn => {
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

    // ==================== CTF ACCORDION ====================
    const accordionItems = document.querySelectorAll('#ctfAccordion .accordion-item');
    const expandAllBtn = document.getElementById('expandAllBtn');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                if (!isActive) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }

    if (expandAllBtn) {
        let allExpanded = false;
        expandAllBtn.addEventListener('click', () => {
            accordionItems.forEach(item => {
                if (allExpanded) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
            expandAllBtn.textContent = allExpanded ? 'Expand All' : 'Collapse All';
            allExpanded = !allExpanded;
        });
    }

    // ==================== SCROLL TO TOP BUTTON ====================
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

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, targetId);
            }
        });
    });

    console.log('Portfolio enhancements loaded successfully!');
});