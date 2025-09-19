// ===== Pestañas =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// ===== Función de descarga y vista previa =====
async function downloadTemplate(id, filename, previewEl, previewTextEl) {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const assetUrl = `https://assetdelivery.roblox.com/v1/asset/?id=${id}`;

    try {
        previewTextEl.textContent = 'Cargando...';
        previewEl.style.display = 'none';

        const response = await fetch(proxyUrl + encodeURIComponent(assetUrl));
        if(!response.ok) throw new Error('No se pudo obtener la plantilla');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Mostrar vista previa
        previewEl.src = url;
        previewEl.style.display = 'block';
        previewTextEl.textContent = '';

        // Descargar PNG
        const link = document.createElement('a');
        link.href = url;
        link.download = filename.endsWith('.png') ? filename : filename + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Liberar recursos
        setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch(e) {
        previewTextEl.textContent = 'Error al cargar la plantilla.';
        console.error(e);
        alert('Error: ' + e.message);
    }
}

// ===== Formularios =====
const shirtForm = document.getElementById('shirt-form');
const pantsForm = document.getElementById('pants-form');

shirtForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('shirt-id').value;
    const name = document.getElementById('shirt-name').value || `shirt_${id}`;
    const previewEl = document.getElementById('shirt-preview');
    const previewTextEl = document.getElementById('shirt-preview-text');
    downloadTemplate(id, name + '.png', previewEl, previewTextEl);
});

pantsForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('pants-id').value;
    const name = document.getElementById('pants-name').value || `pants_${id}`;
    const previewEl = document.getElementById('pants-preview');
    const previewTextEl = document.getElementById('pants-preview-text');
    downloadTemplate(id, name + '.png', previewEl, previewTextEl);
});

// ===== Vista previa automática mientras se escribe =====
document.getElementById('shirt-id').addEventListener('input', function() {
    const id = this.value;
    if(id.length > 5) {
        const previewEl = document.getElementById('shirt-preview');
        const previewTextEl = document.getElementById('shirt-preview-text');
        downloadTemplate(id, `shirt_${id}.png`, previewEl, previewTextEl);
    }
});

document.getElementById('pants-id').addEventListener('input', function() {
    const id = this.value;
    if(id.length > 5) {
        const previewEl = document.getElementById('pants-preview');
        const previewTextEl = document.getElementById('pants-preview-text');
        downloadTemplate(id, `pants_${id}.png`, previewEl, previewTextEl);
    }
});

// ===== Scroll suave =====
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    });
});
