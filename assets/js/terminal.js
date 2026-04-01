// Terminal animation with dynamic lines
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Terminal Commands
    const terminalCmds = [
        { cmd: "whoami", resp: "Abdelwahab Shandy | June 2026 Graduate | SOC Trainee | IT Infrastructure" },
        { cmd: "cat interests.txt", resp: "SOC Analysis | Digital Forensics | Threat Hunting | n8n SOAR | CTF" },
        { cmd: "git status", resp: "Open for hire. Seeking SOC Analyst or Security Engineer roles." },
        { cmd: "echo $status", resp: "Currently: Building Security Labs & Technical Blogging" },
        { cmd: "ls certifications/", resp: "Google Cybersecurity & Information Technology" },   
         ];
    
    const terminalContainer = document.getElementById('dynamicTerminal');
    if (terminalContainer) {
        terminalContainer.innerHTML = '';
        let idx = 0;
        
        function addTerminalLine() {
            if (idx >= terminalCmds.length) {
                const lastDiv = document.createElement('div');
                lastDiv.className = 'terminal-line';
                lastDiv.innerHTML = `<span class="prompt">➜</span> <span class="command">~</span> <span class="blink"></span>`;
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
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // More Details Dropdown
    const moreDetailsBtns = document.querySelectorAll('.more-details-btn');
    
    moreDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            const dropdown = document.getElementById(`${projectId}-details`);
            
            if (dropdown) {
                if (dropdown.style.display === 'none' || dropdown.style.display === '') {
                    dropdown.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
                } else {
                    dropdown.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-ellipsis-h"></i> More Details';
                }
            }
        });
    });
    
    // Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    function updateProjectVisibility(filterValue) {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            updateProjectVisibility(filterValue);
        });
    });
    
    // Dynamic Role Rotation
    const roles = ['SOC Analyst & Engineer', 'Security Researcher', 'Network Security', 'IT Infrastructure Engineer', 'Technical Blogger'];
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
    
    // CV Dropdown
    const cvBtn = document.getElementById('cvBtn');
    const cvDropdown = document.getElementById('cvDropdown');
    
    if (cvBtn && cvDropdown) {
        cvBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cvDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', (e) => {
            if (!cvBtn.contains(e.target) && !cvDropdown.contains(e.target)) {
                cvDropdown.classList.remove('show');
            }
        });
    }
    
    // Terminal Expand
    const expandBtn = document.getElementById('expandTerminal');
    const closeBtn = document.getElementById('closeTerminal');
    const terminalWindow = document.querySelector('.terminal-window');
    
    if (expandBtn && terminalWindow) {
        expandBtn.addEventListener('click', () => {
            terminalWindow.classList.add('expanded');
            if (expandBtn) expandBtn.style.display = 'none';
            if (closeBtn) closeBtn.style.display = 'inline-block';
        });
    }
    
    if (closeBtn && terminalWindow) {
        closeBtn.addEventListener('click', () => {
            terminalWindow.classList.remove('expanded');
            if (expandBtn) expandBtn.style.display = 'inline-block';
            if (closeBtn) closeBtn.style.display = 'none';
        });
    }
});