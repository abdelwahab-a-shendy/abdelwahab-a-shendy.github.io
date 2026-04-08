// ==================== CTF ACCORDION ====================
const accordionItems = document.querySelectorAll('#ctfAccordion .accordion-item');
const expandAllBtn = document.getElementById('expandAllBtn');

if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Optional: Close others? Remove this block if you want multiple open
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