/**
 * PORTAFOLIO INDIVIDUAL — DIÓGENES MIAJA PÉREZ
 * Lógica interactiva: SRS NeuroDeck & Utilidades
 */

document.addEventListener('DOMContentLoaded', () => {
  initSrsDemo();
});

function initSrsDemo() {
  const btnFail = document.getElementById('srsFail');
  const btnHard = document.getElementById('srsHard');
  const btnSuccess = document.getElementById('srsSuccess');
  const btnMaster = document.getElementById('srsMaster');

  const healthBar = document.getElementById('srsHealthBar');
  const healthVal = document.getElementById('srsHealthVal');
  const intervalVal = document.getElementById('srsIntervalVal');

  if (!btnFail || !healthBar || !healthVal || !intervalVal) return;

  btnFail.addEventListener('click', () => {
    healthBar.style.width = '20%';
    healthVal.textContent = '20% (Fallo crítico)';
    healthVal.style.color = '#EF4444';
    intervalVal.textContent = 'Revisión en 10 minutos (Reprogramación inmediata)';
    showToast('Algoritmo SRS: Enlace deteriorado. Reprogramado para hoy.');
  });

  btnHard.addEventListener('click', () => {
    healthBar.style.width = '55%';
    healthVal.textContent = '55% (Dificultad)';
    healthVal.style.color = '#F59E0B';
    intervalVal.textContent = 'Revisión en 1 día (Escalón 1)';
    showToast('Algoritmo SRS: Retención débil. Revisión mañana.');
  });

  btnSuccess.addEventListener('click', () => {
    healthBar.style.width = '85%';
    healthVal.textContent = '85% (Consolidado)';
    healthVal.style.color = '#10B981';
    intervalVal.textContent = 'Revisión en 7 días (Escalón 3)';
    showToast('Algoritmo SRS: Sinapsis consolidada. Intervalo expandido a 7 días.');
  });

  btnMaster.addEventListener('click', () => {
    healthBar.style.width = '100%';
    healthVal.textContent = '100% (Dominio)';
    healthVal.style.color = '#A855F7';
    intervalVal.textContent = 'Revisión en 21 días (Escalón 4 - Memoria LP)';
    showToast('Algoritmo SRS: Dominio absoluto. Almacenado en memoria a largo plazo.');
  });
}

function showToast(message) {
  let toast = document.getElementById('toastBox');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastBox';
    toast.className = 'toast-box';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   PROPUESTA DE OFERTA DE EMPLEO POR EMAIL (DESDE EL CORREO DEL CONTRATANTE)
   ========================================================================== */

function openOfferEmail(candidateName, candidateEmail) {
  const subject = `Oferta de Empleo - ${candidateName}`;
  const body = `Estimado/a ${candidateName},

Nos ponemos en contacto contigo tras revisar tu perfil profesional y proyectos técnicos. Nos gustaría presentarte una propuesta / oferta de empleo para nuestra organización:

• Empresa / Organización: 
• Puesto / Rol: 
• Modalidad de trabajo (Remoto / Híbrido / Presencial): 
• Ubicación: 
• Descripción del proyecto y funciones: 
• Condiciones orientativas / Rango salarial: 

Nos gustaría mantener una primera entrevista o toma de contacto contigo. ¿Qué disponibilidad tendrías para una breve reunión o llamada?

Quedamos a la espera de tus comentarios.

Atentamente,
[Nombre y Apellidos]
[Cargo / Empresa]
[Teléfono / Correo de contacto]`;

  const mailtoUrl = `mailto:${candidateEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Muestra modal con alternativas de correo (Gestor predeterminado, Gmail, Outlook Web, Copiar)
  showOfferEmailModal(candidateName, candidateEmail, subject, body, mailtoUrl);
}

function showOfferEmailModal(name, email, subject, body, mailtoUrl) {
  let modal = document.getElementById('offerEmailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'offerEmailModal';
    modal.className = 'email-modal-backdrop';
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeOfferEmailModal();
    });
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // 1. Render el modal primero
  modal.innerHTML = `
    <div class="email-modal-card glass-panel">
      <div class="top-light-line"></div>
      <button class="email-modal-close" id="btnCloseOfferModal" aria-label="Cerrar">&times;</button>
      
      <div class="email-modal-header">
        <span class="badge-pill">💼 Proponer Oferta de Empleo</span>
        <h3>Enviar Propuesta a ${name}</h3>
        <p>Selecciona cómo prefieres redactar y enviar tu propuesta de empleo:</p>
      </div>

      <div class="email-modal-buttons">
        <button type="button" class="btn-email-option" id="btnMailtoOffer">
          <span class="btn-icon">💻</span>
          <div class="btn-text">
            <strong>Abrir en mi Gestor de Correo</strong>
            <small>Outlook de escritorio, Thunderbird, Apple Mail, Mail de Windows</small>
          </div>
        </button>

        <button type="button" class="btn-email-option" id="btnGmailOffer">
          <span class="btn-icon">🔴</span>
          <div class="btn-text">
            <strong>Redactar en Gmail Web</strong>
            <small>Abre tu Gmail en el navegador con la oferta ya preparada</small>
          </div>
        </button>

        <button type="button" class="btn-email-option" id="btnOutlookOffer">
          <span class="btn-icon">🔵</span>
          <div class="btn-text">
            <strong>Redactar en Outlook / Hotmail Web</strong>
            <small>Abre tu Outlook.com / Microsoft 365 en el navegador</small>
          </div>
        </button>

        <button type="button" class="btn-email-option" id="btnCopyOffer">
          <span class="btn-icon">📋</span>
          <div class="btn-text">
            <strong>Copiar Dirección y Plantilla</strong>
            <small>Copia el texto al portapapeles para pegarlo en cualquier gestor</small>
          </div>
        </button>
      </div>

      <div class="email-modal-footer">
        <span>Destinatario directo: <strong>${email}</strong></span>
      </div>
    </div>
  `;

  // 2. Mostrar modal
  modal.classList.add('active');

  // 3. Conectar eventos DESPUÉS de que el DOM esté listo
  document.getElementById('btnCloseOfferModal').addEventListener('click', closeOfferEmailModal);

  document.getElementById('btnMailtoOffer').addEventListener('click', () => {
    closeOfferEmailModal();
    window.location.href = mailtoUrl;
  });

  document.getElementById('btnGmailOffer').addEventListener('click', () => {
    closeOfferEmailModal();
    window.open(gmailUrl, '_blank', 'noopener');
  });

  document.getElementById('btnOutlookOffer').addEventListener('click', () => {
    closeOfferEmailModal();
    window.open(outlookUrl, '_blank', 'noopener');
  });

  document.getElementById('btnCopyOffer').addEventListener('click', () => {
    const fullText = `Destinatario: ${email}\nAsunto: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      showToast('✅ ¡Plantilla y correo copiados al portapapeles!');
    }).catch(() => {
      showToast('Correo: ' + email);
    });
  });
}

function closeOfferEmailModal() {
  const modal = document.getElementById('offerEmailModal');
  if (modal) modal.classList.remove('active');
}

