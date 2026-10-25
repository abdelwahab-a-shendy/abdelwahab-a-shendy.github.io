/* ============================================================
   CERT VIEWER — Modal لعرض صور الشهادات
   ============================================================ */

(function () {
  'use strict';

  const CERT_IMAGES = {
    ecir:             { src: './assets/img/certs/ecir.png',             title: 'Certified Incident Responder (eCIR)', issuer: 'INE Security' },
    'google-cybersec':{ src: './assets/img/certs/google-cybersec.png',  title: 'Google Cybersecurity Professional', issuer: 'Google' },
    'google-itsupport':{ src: './assets/img/certs/google-itsupport.png',title: 'Google IT Support Professional', issuer: 'Google' },
    ccep:             { src: './assets/img/certs/ccep.png',             title: 'Certified Cybersecurity Educator (CCEP)', issuer: 'Red Team Leaders' },
    'cybertalents-pentest': { src: './assets/img/certs/cybertalents-pentest.png', title: 'Penetration Testing Bootcamp', issuer: 'CyberTalents · ITI' 
}, 
};

  let modal = null;

  function ensureModal() {
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'modal cert-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="cert-modal__dialog">
        <div class="cert-modal__head">
          <div>
            <p class="cert-modal__issuer"></p>
            <h3 class="cert-modal__title"></h3>
          </div>
          <button class="cert-modal__close" aria-label="Close certificate">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="cert-modal__body">
          <img class="cert-modal__img" alt="">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.cert-modal__close').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    return modal;
  }

  function open(key) {
    const data = CERT_IMAGES[key];
    if (!data) return;

    const m = ensureModal();
    m.querySelector('.cert-modal__issuer').textContent = data.issuer;
    m.querySelector('.cert-modal__title').textContent = data.title;

    const img = m.querySelector('.cert-modal__img');
    img.src = data.src;
    img.alt = data.title;

    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function init() {
    document.querySelectorAll('[data-cert]').forEach(btn => {
      btn.addEventListener('click', () => open(btn.dataset.cert));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();