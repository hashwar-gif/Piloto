
document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    // Detectar nivel de profundidad para ajustar rutas relativas
    const path = window.location.pathname;
    const isSubdir = path.includes('/academia/') || path.includes('/gameplay/') || path.includes('/views/');
    const base = isSubdir ? '../../' : './';

    const headerHTML = `
    <!-- Navbar Bootstrap -->
    <nav class="navbar navbar-expand-xl sticky-top navbar-dark">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="${base}index.html">
                <img src="${base}public/img/logo1OK.png" alt="Logo" width="80" height="60" class="me-2">
                <div class="logo">HASH<span>WAR</span></div>
            </a>

            <button class="navbar-toggler border-info" type="button" data-bs-toggle="collapse" data-bs-target="#hashwarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="hashwarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="${base}index.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="${base}gameplay.html">Gameplay</a></li>
                    <li class="nav-item"><a class="nav-link" href="${base}paquetes.html">Paquetes</a></li>
                    <li class="nav-item"><a class="nav-link" href="${base}quienes_somos.html">Quiénes Somos</a></li>
                    <li class="nav-item"><a class="nav-link" href="${base}servicios.html">Servicios</a></li>
                    <li class="nav-item"><a class="nav-link" href="${base}blog.html">Blog</a></li>
                    <li class="nav-item ms-xl-3">
                        <a class="btn-logout btn-btc" href="#" id="open-login-modal"><i class="fab fa-bitcoin"></i> INICIAR SESIÓN</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Onda Decorativa -->
    <div class="svg-wave-header">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path class="wave-bg" d="M0,0 L500,0 L500,80 C350,150 150,-20 0,100 Z"></path>
            <path class="wave-line" d="M500,80 C350,150 150,-20 0,100"></path>
        </svg>
    </div>

    <!-- Modal de Login (Ventanita Azul) -->
    <div class="hash-modal" id="login-modal">
        <div class="hash-modal-content">
            <div class="modal-header">
                <h2 class="modal-title">ACCEDER</h2>
                <button class="close-modal" id="close-login">&times;</button>
            </div>
            <form id="login-form-modal">
                <div class="form-group-modal">
                    <label class="form-label-modal">Identificador de Minero</label>
                    <input type="text" class="form-input-modal" id="login-email" required placeholder="Email o Alias">
                </div>
                <div class="form-group-modal">
                    <label class="form-label-modal">Código de Acceso</label>
                    <input type="password" class="form-input-modal" id="login-password" required placeholder="••••••••">
                </div>
                <button type="submit" class="form-submit-modal">INICIAR OPERACIONES</button>
                <p style="text-align:center; margin-top:20px; font-size:0.8rem; color:#88ccff;">
                    ¿Nuevo minero? <a href="${base}registro.html" style="color:var(--primary-glow); text-decoration:none; font-weight:bold;">REGÍSTRATE AQUÍ</a>
                </p>
            </form>
        </div>
    </div>
    `;

    headerPlaceholder.innerHTML = headerHTML;

    // --- Lógica del Modal de Login ---
    const modal = document.getElementById('login-modal');
    const openBtn = document.getElementById('open-login-modal');
    const closeBtn = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form-modal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => modal.style.opacity = '1', 10);
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.style.display = 'none', 300);
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.form-submit-modal');
            const originalText = btn.textContent;
            btn.textContent = 'AUTENTICANDO...';
            btn.style.background = '#ff0066';
            
            setTimeout(() => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 300);
                alert('¡Bienvenido minero! Operaciones iniciadas.');
            }, 1200);
        });
    }

    // Marcar enlace activo
    const currentFile = path.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentFile)) {
            link.classList.add('active');
        }
    });
});
