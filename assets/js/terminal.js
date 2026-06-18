// ==================== TERMINAL TYPEWRITER EFFECT ====================
document.addEventListener('DOMContentLoaded', function() {
    const terminalCmds = [
        { cmd: "whoami", resp: "Abdelwahab Shandy | June 2026 Graduate | SOC Analyst | IT Infrastructure" },
        { cmd: "cat interests.txt", resp: "SOC Analysis | Digital Forensics | Threat Hunting | n8n SOAR | CTF" },
        { cmd: "git status", resp: "Open for hire. Seeking SOC Analyst or Security Engineer roles." },
        { cmd: "echo $status", resp: "Currently: Building Security Labs & Technical Blogging" },
        { cmd: "ls certifications/", resp: "eCIR | Google Cybersecurity | CCEP | Google IT Support" },   
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
});