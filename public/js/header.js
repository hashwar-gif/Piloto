
document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const path = window.location.pathname;
    const isSubdir = path.includes('/academia/') || path.includes('/gameplay/') || path.includes('/views/');
    const base = isSubdir ? '../../' : './';

    // Cargar api.js dinámicamente si no está
    if (!document.getElementById('hashwar-api-script')) {
        const script = document.createElement('script');
        script.id = 'hashwar-api-script';
        script.src = base + 'public/js/api.js';
        document.head.appendChild(script);
    }

    const loggedIn = localStorage.getItem('hashwar_token');
    const userData = JSON.parse(localStorage.getItem('hashwar_user') || 'null');

    const headerHTML = `
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
                        ${loggedIn
                            ? `<a class="btn-logout btn-btc" href="#" id="open-login-modal"><i class="fab fa-bitcoin"></i> ${userData?.username || 'MINERO'}</a>`
                            : `<a class="btn-logout btn-btc" href="#" id="open-login-modal"><i class="fab fa-bitcoin"></i> INICIAR SESIÓN</a>`
                        }
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="svg-wave-header">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path class="wave-bg" d="M0,0 L500,0 L500,80 C350,150 150,-20 0,100 Z"></path>
            <path class="wave-line" d="M500,80 C350,150 150,-20 0,100"></path>
        </svg>
    </div>

    <div class="hash-modal" id="login-modal">
        <div class="hash-modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modal-title">${loggedIn ? 'MI CUENTA' : 'ACCEDER'}</h2>
                <button class="close-modal" id="close-login">&times;</button>
            </div>
            <div id="login-error" style="display:none; text-align:center; padding:10px; margin-bottom:10px; background:rgba(255,0,85,0.2); border:1px solid #ff0055; border-radius:5px; color:#ff0055; font-size:0.85rem;"></div>
            ${loggedIn ? `
            <div id="logged-in-state" style="text-align:center;">
                <p style="margin:20px 0; font-size:1.1rem;">Conectado como <strong style="color:var(--primary);">${userData?.username || 'MINERO'}</strong></p>
                <p style="margin-bottom:2px; color:#aaa; font-size:0.85rem;">${userData?.name || ''} ${userData?.lastName || ''}</p>
                <p style="margin-bottom:5px; color:#88ccff; font-size:0.9rem;"><span id="profile-hash-balance">${(userData?.hashBalance || 0).toLocaleString()}</span> $HASH</p>
                <p style="margin-bottom:5px; color:#666; font-size:0.7rem;" id="profile-email">${userData?.email || ''}</p>
                <p style="margin-bottom:20px; color:#ffaa00; font-size:0.75rem;">Nivel: ${userData?.knowledgeLevel || '?'}</p>
                <button class="form-submit-modal" id="logout-btn" style="background:linear-gradient(135deg,#ff4444,#cc3333);">CERRAR SESIÓN</button>
            </div>
            ` : `
            <form id="login-form-modal">
                <div class="form-group-modal">
                    <label class="form-label-modal">Email</label>
                    <input type="email" class="form-input-modal" id="login-email" required placeholder="tu@email.com">
                </div>
                <div class="form-group-modal">
                    <label class="form-label-modal">Contraseña</label>
                    <input type="password" class="form-input-modal" id="login-password" required placeholder="••••••••">
                </div>
                <button type="submit" class="form-submit-modal">INICIAR OPERACIONES</button>
                <p style="text-align:center; margin-top:20px; font-size:0.8rem; color:#88ccff;">
                    ¿Nuevo minero? <a href="#" id="show-register" style="color:var(--primary-glow); text-decoration:none; font-weight:bold;">CREAR CUENTA</a>
                </p>
            </form>
            <form id="register-form-modal" style="display:none;">
                <div class="form-group-modal">
                    <label class="form-label-modal">Alias de Minero</label>
                    <input type="text" class="form-input-modal" id="register-username" required placeholder="Tu alias en el juego">
                </div>
                <div style="display:flex;gap:10px;">
                    <div class="form-group-modal" style="flex:1;">
                        <label class="form-label-modal">Nombre</label>
                        <input type="text" class="form-input-modal" id="register-name" placeholder="Tu nombre">
                    </div>
                    <div class="form-group-modal" style="flex:1;">
                        <label class="form-label-modal">Apellido</label>
                        <input type="text" class="form-input-modal" id="register-lastname" placeholder="Tu apellido">
                    </div>
                </div>
                <div class="form-group-modal">
                    <label class="form-label-modal">Email</label>
                    <input type="email" class="form-input-modal" id="register-email" required placeholder="tu@email.com">
                </div>
                <div class="form-group-modal">
                    <label class="form-label-modal">Contraseña</label>
                    <input type="password" class="form-input-modal" id="register-password" required placeholder="••••••••">
                </div>
                <div class="form-group-modal">
                    <label class="form-label-modal">Confirmar Contraseña</label>
                    <input type="password" class="form-input-modal" id="register-confirm" required placeholder="••••••••">
                </div>
                <div class="form-group-modal">
                    <label class="form-label-modal">Nivel de Conocimiento en Cripto</label>
                    <select class="form-input-modal" id="register-knowledge" style="appearance:auto;">
                        <option value="1">1 - No sé nada</option>
                        <option value="2">2 - Principiante</option>
                        <option value="3" selected>3 - Intermedio</option>
                        <option value="4">4 - Avanzado</option>
                        <option value="5">5 - Experto</option>
                    </select>
                </div>
                <button type="submit" class="form-submit-modal">REGISTRARSE</button>
                <p style="text-align:center; margin-top:20px; font-size:0.8rem; color:#88ccff;">
                    ¿Ya tienes cuenta? <a href="#" id="show-login" style="color:var(--primary-glow); text-decoration:none; font-weight:bold;">INICIAR SESIÓN</a>
                </p>
            </form>
            `}
        </div>
    </div>
    `;

    headerPlaceholder.innerHTML = headerHTML;

    const modal = document.getElementById('login-modal');
    const openBtn = document.getElementById('open-login-modal');
    const closeBtn = document.getElementById('close-login');

    function showModal() {
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
    }

    function hideModal() {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300);
    }

    async function refreshProfileBalance() {
        const token = localStorage.getItem('hashwar_token');
        if (!token) return;
        try {
            const resp = await fetch('http://localhost:3001/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!resp.ok) return;
            const data = await resp.json();
            const balanceEl = document.getElementById('profile-hash-balance');
            if (balanceEl) balanceEl.textContent = data.user.hashBalance.toLocaleString();
            localStorage.setItem('hashwar_user', JSON.stringify(data.user));
        } catch (e) {
            console.error('Error al refrescar perfil:', e);
        }
    }

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (localStorage.getItem('hashwar_token')) {
                refreshProfileBalance();
            }
            showModal();
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', hideModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    function showError(msg) {
        const err = document.getElementById('login-error');
        if (err) { err.textContent = msg; err.style.display = 'block'; }
    }

    function hideError() {
        const err = document.getElementById('login-error');
        if (err) err.style.display = 'none';
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('hashwar_token');
            localStorage.removeItem('hashwar_user');
            hideModal();
            location.reload();
        });
    }

    const loginForm = document.getElementById('login-form-modal');
    if (loginForm) {
        document.getElementById('show-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            hideError();
            loginForm.style.display = 'none';
            document.getElementById('register-form-modal').style.display = 'block';
            document.getElementById('modal-title').textContent = 'REGISTRARSE';
        });

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideError();
            const btn = loginForm.querySelector('.form-submit-modal');
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            btn.textContent = 'AUTENTICANDO...';
            btn.disabled = true;

            try {
                if (typeof HashwarAPI === 'undefined') {
                    const resp = await fetch('http://localhost:3001/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await resp.json();
                    if (!resp.ok) throw new Error(data.error || 'Error');
                    localStorage.setItem('hashwar_token', data.token);
                    localStorage.setItem('hashwar_user', JSON.stringify(data.user));
                } else {
                    await HashwarAPI.login(email, password);
                }
                hideModal();
                location.reload();
            } catch (err) {
                showError(err.message);
                btn.textContent = 'INICIAR OPERACIONES';
                btn.disabled = false;
            }
        });
    }

    const registerForm = document.getElementById('register-form-modal');
    if (registerForm) {
        document.getElementById('show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            hideError();
            registerForm.style.display = 'none';
            document.getElementById('login-form-modal').style.display = 'block';
            document.getElementById('modal-title').textContent = 'ACCEDER';
        });

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideError();
            const btn = registerForm.querySelector('.form-submit-modal');
            const username = document.getElementById('register-username').value;
            const name = document.getElementById('register-name').value;
            const lastName = document.getElementById('register-lastname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            const knowledgeLevel = document.getElementById('register-knowledge').value;

            if (password !== confirmPassword) {
                showError('Las contraseñas no coinciden');
                return;
            }

            btn.textContent = 'REGISTRANDO...';
            btn.disabled = true;

            try {
                if (typeof HashwarAPI === 'undefined') {
                    const resp = await fetch('http://localhost:3001/api/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, name, lastName, email, password, confirmPassword, knowledgeLevel }),
                    });
                    const data = await resp.json();
                    if (!resp.ok) throw new Error(data.error || 'Error');
                    localStorage.setItem('hashwar_token', data.token);
                    localStorage.setItem('hashwar_user', JSON.stringify(data.user));
                } else {
                    await HashwarAPI.register(username, email, password, confirmPassword, knowledgeLevel, name, lastName);
                }
                hideModal();
                location.reload();
            } catch (err) {
                showError(err.message);
                btn.textContent = 'REGISTRARSE';
                btn.disabled = false;
            }
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
