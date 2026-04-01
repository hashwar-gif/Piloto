
document.addEventListener("DOMContentLoaded", function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    // Detectar nivel de profundidad para ajustar rutas relativas
    const path = window.location.pathname;
    // Si estamos en una subcarpeta (como /public/academia/), necesitamos subir dos niveles
    const isSubdir = path.includes('/academia/') || path.includes('/gameplay/') || path.includes('/views/');
    const base = isSubdir ? '../../' : './';

    const currentYear = new Date().getFullYear();

    const footerHTML = `
    <footer class="main-footer">
        <!-- Sección de Certificados y Reconocimientos -->
        <div class="certifications-section">
            <div class="container text-center">
                <h4 class="cert-title">Certificados y reconocimientos por:</h4>
                <div class="certification-logos d-flex justify-content-center flex-wrap gap-4">
                    <div class="cert-logo">
                        <img src="${base}public/img/alca.png" alt="ALCA">
                    </div>
                    <div class="cert-logo">
                        <img src="${base}public/img/ucb.png" alt="UCB">
                    </div>
                    <div class="cert-logo">
                        <img src="${base}public/img/LOGO-CEMSE.png" alt="CEMSE">
                    </div>
                    <div class="cert-logo">
                        <img src="${base}public/img/ita.png" alt="ITA">
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Sección de Ubicación con Mapa -->
        <div class="location-section">
            <div class="container">
                <h4 class="location-title text-center mb-4">
                    <i class="fas fa-map-marker-alt"></i> NUESTRA UBICACIÓN
                </h4>
                <div class="row g-4">
                    <div class="col-lg-8">
                        <div class="map-container shadow">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d568.709423272216!2d-68.12416073173321!3d-16.485372124900177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1768081592720!5m2!1ses-419!2sbo" width="100%" height="350" style="border:0; border-radius:15px;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="location-info-compact p-4 h-100 shadow">
                            <div class="info-item-compact mb-3 d-flex gap-3">
                                <i class="fas fa-city text-info fs-4"></i>
                                <div>
                                    <h5 class="text-info mb-1">La Paz, Bolivia</h5>
                                    <p class="small mb-0 opacity-75">Zona Alto Miraflores</p>
                                    <p class="small mb-0 opacity-75">Av. Tejada Sorzano c/J. de la Cruz Monje Nº22</p>
                                </div>
                            </div>
                            <div class="info-item-compact mb-3 d-flex gap-3">
                                <i class="fas fa-clock text-info fs-4"></i>
                                <div>
                                    <h5 class="text-info mb-1">Horarios</h5>
                                    <p class="small mb-0 opacity-75">Lun-Vie: 9:00 - 18:00</p>
                                    <p class="small mb-0 opacity-75">Sáb: 10:00 - 14:00</p>
                                </div>
                            </div>
                            <div class="info-item-compact mb-4 d-flex gap-3">
                                <i class="fas fa-phone text-info fs-4"></i>
                                <div>
                                    <h5 class="text-info mb-1">Contacto</h5>
                                    <p class="small mb-0 opacity-75">+591 62448181</p>
                                    <p class="small mb-0 opacity-75">info@hashwar.com</p>
                                </div>
                            </div>
                            <a href="https://goo.gl/maps/" target="_blank" class="btn btn-info w-100 fw-bold py-2">
                                <i class="fas fa-directions me-2"></i> CÓMO LLEGAR
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Contenido principal del footer -->
        <div class="container pt-5">
            <div class="row g-5">
                <!-- Columna 1: Sobre HASHWAR -->
                <div class="col-md-6 col-lg-3">
                    <h5 class="footer-col-title mb-4"><i class="fas fa-gamepad me-2"></i> HASHWAR</h5>
                    <p class="small opacity-75 mb-4">La revolución del gaming y la minería de criptomonedas. Únete a nuestra comunidad y comienza a minar mientras juegas.</p>
                    
                    <div class="simple-payment-methods mb-4">
                        <p class="small fw-bold mb-2"><i class="fas fa-credit-card me-2"></i> Aceptamos:</p>
                        <div class="payment-icons-mini d-flex gap-3">
                            <i class="fab fa-usd opacity-75" title="USDT"></i>
                            <i class="fab fa-bitcoin opacity-75" title="Bitcoin"></i>
                            <i class="fab fa-ethereum opacity-75" title="Ethereum"></i>
                            <i class="fab fa-paypal opacity-75" title="PayPal"></i>
                            <i class="fas fa-university opacity-75" title="Transferencia"></i>
                        </div>
                    </div>
                    
                    <div class="social-links d-flex gap-2">
                        <a href="#" class="social-link-shared"><i class="fab fa-tiktok"></i></a>
                        <a href="https://www.instagram.com/hashwarriseoftheminers/" class="social-link-shared"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link-shared"><i class="fab fa-telegram"></i></a>
                        <a href="#" class="social-link-shared"><i class="fab fa-discord"></i></a>
                        <a href="#" class="social-link-shared"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <!-- Columna 2: Enlaces -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="footer-col-title mb-4"><i class="fas fa-bolt me-2"></i> ENLACES</h5>
                    <ul class="list-unstyled footer-links-shared small">
                        <li class="mb-2"><a href="${base}index.html">Inicio</a></li>
                        <li class="mb-2"><a href="${base}gameplay.html">Gameplay</a></li>
                        <li class="mb-2"><a href="${base}paquetes.html">Paquetes</a></li>
                        <li class="mb-2"><a href="${base}quienes_somos.html">Nosotros</a></li>
                        <li class="mb-2"><a href="${base}servicios.html">Servicios</a></li>
                        <li class="mb-2"><a href="${base}contacto.html">Contacto</a></li>
                    </ul>
                </div>
                
                <!-- Columna 3: Legal -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="footer-col-title mb-4"><i class="fas fa-gavel me-2"></i> LEGAL</h5>
                    <ul class="list-unstyled footer-links-shared small">
                        <li class="mb-2"><a href="${base}terminos.html">Términos</a></li>
                        <li class="mb-2"><a href="${base}privacidad.html">Privacidad</a></li>
                        <li class="mb-2"><a href="${base}cookies.html">Cookies</a></li>
                        <li class="mb-2"><a href="${base}aviso_legal.html">Aviso Legal</a></li>
                    </ul>
                </div>
                
                <!-- Columna 4: Newsletter -->
                <div class="col-md-6 col-lg-5">
                    <h5 class="footer-col-title mb-4"><i class="fas fa-envelope me-2"></i> NEWSLETTER</h5>
                    <p class="small opacity-75 mb-3">Recibe las últimas noticias y actualizaciones de HASHWAR.</p>
                    <form class="newsletter-form">
                        <div class="input-group mb-3 shadow-sm">
                            <span class="input-group-text bg-dark border-secondary text-info"><i class="fas fa-at"></i></span>
                            <input type="email" class="form-control bg-dark text-white border-secondary" placeholder="Tu email" required>
                            <button class="btn btn-info fw-bold" type="submit">SUSCRIBIRSE</button>
                        </div>
                    </form>
                    <div class="mt-4">
                        <p class="small mb-2 fw-bold text-info">ESTADO DEL SISTEMA:</p>
                        <div class="d-flex flex-wrap gap-2">
                            <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2"><i class="fas fa-lock me-1"></i> SITIO SEGURO</span>
                            <span class="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-2"><i class="fas fa-bolt me-1"></i> ALTA DISPONIBILIDAD</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Línea divisora -->
            <div class="footer-divider my-5">
                <div class="divider-line"></div>
                <div class="divider-logo"><i class="fas fa-gamepad"></i></div>
            </div>
            
            <!-- Copyright -->
            <div class="copyright-section text-center pb-5">
                <p class="small opacity-50">&copy; ${currentYear} HASHWAR: Rise of the Miners. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
    `;

    footerPlaceholder.innerHTML = footerHTML;
});
