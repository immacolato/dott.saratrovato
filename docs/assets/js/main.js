// Funzione per gestire il padding dinamico del body
function adjustBodyPadding() {
    // TEMPORANEAMENTE DISABILITATO per permettere CSS statico più compatto
    // const header = document.querySelector('header');
    // if (header) {
    //     const headerHeight = header.offsetHeight;
    //     document.body.style.paddingTop = `${headerHeight}px`;
    // }
}

// Funzione per mostrare una pagina e gestire lo stato attivo
function showPage(pageId) {
    // Nascondi tutte le pagine
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active-page');
    });

    // Mostra la pagina selezionata
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active-page');
        if (pageId === 'contatti') {
            initEnhancedMap();
        }
    }

    // Aggiorna lo stato attivo dei link di navigazione
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.getElementById('nav-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active');
        document.title = `Dott.ssa Sara Trovato - ${activeLink.textContent.trim()}`;
    }

    // Chiudi il menu mobile e mostra subito l'hamburger
    const mobileMenu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (window.innerWidth < 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        const iconHamburger = button?.querySelector('.icon-hamburger');
        const iconClose = button?.querySelector('.icon-close');
        
        if (iconHamburger && iconClose) {
            // Ripristina le icone
            iconClose.classList.add('is-hidden');
            iconHamburger.classList.remove('is-hidden');
            
            // Chiudi menu
            mobileMenu.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                if (overlay) overlay.classList.add('hidden');
            }, 320);
            button.setAttribute('aria-expanded', 'false');
            
            // Rimuovi effetto blur dal body e padding compensativo
            document.body.classList.remove('menu-open-blur');
            document.body.style.paddingRight = '';
            
            setTimeout(adjustBodyPadding, 50);
        }
    }

    window.scrollTo(0, 0);
}

// Inizializzazione della mappa
let map = null;
function initEnhancedMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    if (mapElement.clientHeight === 0) mapElement.style.height = '300px';
    const studioLocation = [45.0650343, 7.6922580];
    if (map !== null) {
        map.invalidateSize();
        return;
    }
    map = L.map('map', { zoomControl: false, scrollWheelZoom: false }).setView(studioLocation, 16);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '©OpenStreetMap, ©CartoDB', maxZoom: 19 }).addTo(map);
    const customIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `<div class="relative flex items-center justify-center" style="width: 24px; height: 24px;"><span class="absolute w-5 h-5 rounded-full bg-indigo-600 z-10"></span><span class="absolute w-5 h-5 rounded-full bg-indigo-400 opacity-50 animate-ping"></span></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24]
    });
    L.marker(studioLocation, {icon: customIcon}).addTo(map).bindPopup(`<div class="text-center p-2"><strong class="block text-lg">Studio Dott.ssa Sara Trovato</strong><span class="block text-gray-600">Via Maria Vittoria 40 Bis</span><span class="block text-gray-600">10123 Torino</span><a href="https://maps.google.com/maps?daddr=45.0650343,7.6922580" target="_blank" class="block mt-2 text-sm text-indigo-600 hover:underline">Indicazioni stradali</a></div>`, { closeButton: false, className: 'custom-popup', maxWidth: 220 });
    setTimeout(() => map.invalidateSize(), 100);
}

// Funzioni del modal
function closeModal() { 
    document.getElementById('successModal').style.display = 'none'; 
}

function showSuccessModal(event) {
    event.preventDefault();
    const form = event.target;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }})
    .then(response => {
        if (response.ok) {
            document.getElementById('successModal').style.display = 'block';
            form.reset();
        } else { alert('Si è verificato un errore.'); }
    }).catch(() => alert('Si è verificato un errore.'));
}

// === BOTTONE TORNA SU ===
const backToTopBtn = document.getElementById('back-to-top');

// Mostra/nasconde il bottone in base allo scroll
function toggleBackToTop() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) { // Mostra dopo 300px di scroll
        backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
    }
}

// FAQ Accordion Functionality
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');
    
    // Chiudi tutte le altre FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            otherAnswer.classList.add('hidden');
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle della FAQ corrente
    if (isOpen) {
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    }
}

// === COOKIE MANAGEMENT ===
// Configurazione categorie cookie
const cookieCategories = {
    necessary: true,        // Cookie tecnici (sempre attivi)
    analytics: false,       // Google Analytics
    marketing: false,       // Cookie pubblicitari/remarketing
    preferences: false      // Cookie di preferenze
};

// Funzione per caricare Google Analytics solo se accettato
function loadGoogleAnalytics() {
    if (getCookieConsent('analytics')) {
        console.log('Google Analytics caricato');
        
        // Implementazione GA4 con ID reale
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-0N59K37F5G');
        
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0N59K37F5G';
        script.async = true;
        document.head.appendChild(script);
    }
}

// Funzione per caricare Meta Pixel (Facebook) solo se accettato
function loadMetaPixel() {
    if (getCookieConsent('marketing')) {
        console.log('Meta Pixel caricato');
        
        // Implementazione Meta Pixel - SOSTITUISCI 'YOUR_PIXEL_ID' con il tuo Pixel ID
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', 'YOUR_PIXEL_ID'); // CAMBIA QUESTO con il tuo Pixel ID
        fbq('track', 'PageView');
    }
}

// Funzione per verificare il consenso per categoria
function getCookieConsent(category) {
    const consent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
    return consent[category] === true;
}

// Funzione per salvare le preferenze cookie
function setCookieConsent(categories) {
    localStorage.setItem('cookieConsent', JSON.stringify(categories));
    localStorage.setItem('cookieChoice', 'set');
    
    // Carica i servizi basati sul consenso
    if (categories.analytics) {
        loadGoogleAnalytics();
    }
    if (categories.marketing) {
        loadMetaPixel();
    }
}

// Event listener principale che si avvia al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    adjustBodyPadding();

    // Mostra la home page di default
    showPage('home');

    // Gestore per il pulsante del menu mobile - ANIMAZIONE MIGLIORATA
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const iconHamburger = mobileMenuButton.querySelector('.icon-hamburger');
    const iconClose = mobileMenuButton.querySelector('.icon-close');
    
    function toggleMobileMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        // Animazione sincrona delle icone
        if (isHidden) {
            // Nascondi hamburger e mostra X
            iconHamburger.classList.add('is-hidden');
            iconClose.classList.remove('is-hidden');
            
            // Mostra menu e overlay
            mobileMenu.classList.remove('hidden');
            setTimeout(() => mobileMenu.classList.add('open'), 10); // Piccolo delay per la transizione CSS
            mobileMenuOverlay.classList.remove('hidden');
            setTimeout(() => mobileMenuOverlay.classList.add('open'), 10);
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            
            // Calcola la larghezza della scrollbar prima di nasconderla
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            // Blocca lo scroll del body e aggiungi effetto blur al contenuto
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`; // Compensa la scrollbar
            document.body.classList.add('menu-open-blur');
        } else {
            // Mostra hamburger e nascondi X
            iconClose.classList.add('is-hidden');
            iconHamburger.classList.remove('is-hidden');
            
            // Nascondi menu e overlay
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.remove('open');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenuOverlay.classList.add('hidden');
            }, 320); // Timeout coordinato con la transizione CSS
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            // Ripristina lo scroll del body e rimuovi effetto blur
            document.body.style.overflow = '';
            document.body.style.paddingRight = ''; // Rimuovi il padding compensativo
            document.body.classList.remove('menu-open-blur');
        }
        
        setTimeout(adjustBodyPadding, 50);
    }
    
    // Event listener per il pulsante principale
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Event listener specifici per le icone per assicurare funzionamento anche con click diretto
    iconHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    iconClose.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Chiudi menu mobile cliccando sull'overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Gestore per i link di navigazione - CORRETTO E MIGLIORATO
    function setupNavigationLinks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            // Rimuovi eventuali listener esistenti
            link.removeEventListener('click', handleNavLinkClick);
            // Aggiungi il nuovo listener
            link.addEventListener('click', handleNavLinkClick);
        });
    }
    
    function handleNavLinkClick(e) {
        e.preventDefault();
        const pageId = this.id.replace('nav-', '');
        showPage(pageId);
        
        // Chiudi il menu mobile su dispositivi mobili
        if (window.innerWidth < 1024) {
            closeMobileMenu();
        }
    }
    
    function closeMobileMenu() {
        if (!mobileMenu.classList.contains('hidden')) {
            // Aggiungi classe "closing" per animazione immediata
            mobileMenu.classList.add('closing');
            mobileMenu.classList.remove('open');
            
            // Cambia icone immediatamente
            iconClose.classList.add('is-hidden');
            iconHamburger.classList.remove('is-hidden');
            
            // Chiudi overlay immediatamente
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('open');
                mobileMenuOverlay.classList.add('hidden');
            }
            
            // Nascondi il menu dopo un brevissimo ritardo per permettere l'animazione CSS
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('closing');
            }, 50); // Molto più veloce
            
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            // Ripristina lo scroll del body e rimuovi effetto blur immediatamente
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.classList.remove('menu-open-blur');
            
            setTimeout(adjustBodyPadding, 25); // Più veloce
        }
    }
    
    setupNavigationLinks();
    
    // Gestore per i link interni (es. pulsanti "Scopri di più", logo)
    document.querySelectorAll('a[data-page]').forEach(link => {
        // Event listener per click normale
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Feedback visivo immediato per tutti i dispositivi
            if (link.classList.contains('header-logo')) {
                addTapFeedback(link);
            }
            
            showPage(pageId);
        });
        
        // Event listener aggiuntivo per touch su mobile per migliorare la responsività
        link.addEventListener('touchend', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Feedback visivo specifico per touch
            if (link.classList.contains('header-logo')) {
                addTapFeedback(link);
            }
            
            showPage(pageId);
        }, { passive: false });
    });

    // Funzione per aggiungere feedback visivo al tap
    function addTapFeedback(element) {
        // Aggiungi classe per feedback visivo
        element.classList.add('tap-feedback');
        
        // Rimuovi la classe dopo l'animazione
        setTimeout(() => {
            element.classList.remove('tap-feedback');
        }, 300);
    }

    // Chiude il menu se si clicca fuori
    document.addEventListener('click', (e) => {
        // Chiudi menu mobile se clic fuori da menu, hamburger e overlay
        if (window.innerWidth < 1024) {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuButton.contains(e.target) && 
                (!mobileMenuOverlay || !mobileMenuOverlay.contains(e.target))) {
                
                closeMobileMenu();
            }
        }
    });

    // Event listener per lo scroll (Back to Top button)
    window.addEventListener('scroll', toggleBackToTop);
    
    // Click per tornare in alto
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Aggiungi gestore per il link FAQ nel menu
    const faqNavLink = document.getElementById('nav-faq');
    if (faqNavLink) {
        faqNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('faq');
        });
    }

    // Gestione FAQ interattive
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const faqAnswer = this.parentElement.querySelector('.faq-answer');
            const faqIcon = this.querySelector('.faq-icon');
            
            // Toggle risposta
            if (faqAnswer.classList.contains('hidden')) {
                // Chiudi tutte le altre FAQ
                document.querySelectorAll('.faq-answer').forEach(answer => {
                    if (answer !== faqAnswer) {
                        answer.classList.add('hidden');
                    }
                });
                document.querySelectorAll('.faq-icon').forEach(icon => {
                    if (icon !== faqIcon) {
                        icon.classList.remove('rotate-180');
                    }
                });
                
                // Apri questa FAQ
                faqAnswer.classList.remove('hidden');
                faqIcon.classList.add('rotate-180');
            } else {
                // Chiudi questa FAQ
                faqAnswer.classList.add('hidden');
                faqIcon.classList.remove('rotate-180');
            }
        });
    });

    // === COOKIE BANNER MANAGEMENT ===
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const customizeBtn = document.getElementById('customize-cookies');
    const savePrefsBtn = document.getElementById('save-preferences');
    const closeBannerBtn = document.getElementById('close-cookie-banner');
    const cookieDetails = document.getElementById('cookie-details');
    const analyticsToggle = document.getElementById('analytics-toggle');
    const marketingToggle = document.getElementById('marketing-toggle');
    const contactFloating = document.querySelector('.contact-floating');
    const cookieSettingsTab = document.getElementById('cookie-settings-tab');
    const openCookieSettingsBtn = document.getElementById('open-cookie-settings');
    
    // Funzione per attivare/disattivare l'event listener del click fuori
    let clickOutsideListener = null;
    
    function enableClickOutside() {
        // Rimuovi il listener esistente se presente
        if (clickOutsideListener) {
            document.removeEventListener('click', clickOutsideListener);
        }
        
        // Crea nuovo listener
        clickOutsideListener = function(event) {
            const bannerIsVisible = !cookieBanner.classList.contains('translate-y-full');
            
            // Verifica se il click è fuori dal banner e dai suoi elementi interattivi
            if (bannerIsVisible && 
                !cookieBanner.contains(event.target) && 
                !event.target.closest('#cookie-banner') &&
                !event.target.closest('#cookie-settings-tab')) {
                
                // Usa la stessa logica intelligente della X
                closeCookieBanner();
            }
        };
        
        // Aggiungi il nuovo listener con un piccolo delay
        setTimeout(() => {
            document.addEventListener('click', clickOutsideListener);
        }, 100);
    }
    
    function disableClickOutside() {
        if (clickOutsideListener) {
            document.removeEventListener('click', clickOutsideListener);
            clickOutsideListener = null;
        }
    }
    
    // Funzione per gestire lo spostamento dei bottoni floating
    function updateFloatingButtonsPosition() {
        const bannerIsVisible = !cookieBanner.classList.contains('translate-y-full');
        const customizationIsVisible = !cookieDetails.classList.contains('hidden');
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (contactFloating) {
            contactFloating.classList.toggle('cookie-banner-visible', bannerIsVisible && !customizationIsVisible);
            contactFloating.classList.toggle('cookie-customization-visible', bannerIsVisible && customizationIsVisible);
        }
        
        // Gestisce anche il bottone torna su
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('cookie-banner-visible', bannerIsVisible && !customizationIsVisible);
            backToTopBtn.classList.toggle('cookie-customization-visible', bannerIsVisible && customizationIsVisible);
        }
    }
    
    // Funzione per mostrare/nascondere la linguetta
    function updateCookieSettingsTab() {
        const bannerIsVisible = !cookieBanner.classList.contains('translate-y-full') && !cookieBanner.classList.contains('hidden');
        if (cookieSettingsTab) {
            if (bannerIsVisible) {
                // Nascondi immediatamente la linguetta quando il banner è visibile
                cookieSettingsTab.classList.add('hidden');
                cookieSettingsTab.classList.remove('delayed-appear');
            } else {
                // Mostra la linguetta con animazione ritardata quando il banner NON è visibile
                cookieSettingsTab.classList.remove('hidden');
                cookieSettingsTab.classList.add('delayed-appear');
            }
        }
    }
    
    // Funzione per riaprire il banner
    function reopenCookieBanner() {
        // Ripristina le preferenze salvate nei toggle
        const currentConsent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
        
        if (analyticsToggle) analyticsToggle.checked = currentConsent.analytics || false;
        if (marketingToggle) marketingToggle.checked = currentConsent.marketing || false;
        
        // Mostra il banner
        cookieBanner.classList.remove('translate-y-full');
        cookieBanner.classList.remove('hidden');
        updateFloatingButtonsPosition();
        updateCookieSettingsTab();
        
        // Riattiva il click fuori dal banner
        enableClickOutside();
    }
    
    // Funzione per chiudere il banner con logica intelligente
    function closeCookieBanner() {
        // Se le opzioni personalizzate sono visibili, salva lo stato corrente degli switch
        const customizationIsVisible = !cookieDetails.classList.contains('hidden');
        
        if (customizationIsVisible) {
            // Salva le scelte correnti degli switch
            const preferences = {
                necessary: true,
                analytics: analyticsToggle ? analyticsToggle.checked : false,
                marketing: marketingToggle ? marketingToggle.checked : false,
                preferences: false
            };
            setCookieConsent(preferences);
        } else {
            // Se non ha personalizzato nulla, comportamento di default (rifiuta)
            rejectCookies();
            return; // Evita il doppio salvataggio
        }
        
        // Nascondi le opzioni personalizzate e reset dei pulsanti
        cookieDetails.classList.add('hidden');
        savePrefsBtn.classList.add('hidden');
        if (customizeBtn) customizeBtn.textContent = 'Personalizza cookie';
        
        cookieBanner.classList.add('translate-y-full');
        setTimeout(() => {
            updateFloatingButtonsPosition();
            updateCookieSettingsTab();
        }, 500);
        
        // Disattiva il click fuori dal banner
        disableClickOutside();
    }
    
    // Funzione per rifiutare cookie (solo necessari)
    function rejectCookies() {
        // Reset dei toggle prima di salvare
        if (analyticsToggle) analyticsToggle.checked = false;
        if (marketingToggle) marketingToggle.checked = false;
        
        setCookieConsent({
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
        });
        
        // Nascondi le opzioni personalizzate e reset dei pulsanti
        cookieDetails.classList.add('hidden');
        savePrefsBtn.classList.add('hidden');
        if (customizeBtn) customizeBtn.textContent = 'Personalizza cookie';
        
        cookieBanner.classList.add('translate-y-full');
        cookieBanner.classList.add('hidden');
        setTimeout(() => {
            updateFloatingButtonsPosition();
            updateCookieSettingsTab();
        }, 500);
        
        // Disattiva il click fuori dal banner
        disableClickOutside();
    }
    
    // Controlla se l'utente ha già scelto
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (!cookieChoice) {
        // Mostra il banner dopo 2 secondi
        setTimeout(() => {
            cookieBanner.classList.remove('hidden');
            cookieBanner.classList.remove('translate-y-full');
            updateFloatingButtonsPosition();
            updateCookieSettingsTab();
            
            // Attiva il click fuori dal banner dopo che diventa visibile
            enableClickOutside();
        }, 2000);
    } else {
        // Se ha già dato il consenso, mostra la linguetta con ritardo e carica i servizi
        setTimeout(() => {
            updateCookieSettingsTab();
        }, 1000);
        loadGoogleAnalytics();
        loadMetaPixel();
    }
    
    // Funzione per gestire personalizzazione cookie
    function toggleCookieCustomization() {
        const isCurrentlyHidden = cookieDetails.classList.contains('hidden');
        
        if (isCurrentlyHidden) {
            // Mostra le opzioni personalizzate
            cookieDetails.classList.remove('hidden');
            savePrefsBtn.classList.remove('hidden');
            if (customizeBtn) customizeBtn.textContent = 'Nascondi opzioni';
        } else {
            // Nascondi le opzioni personalizzate
            cookieDetails.classList.add('hidden');
            savePrefsBtn.classList.add('hidden');
            if (customizeBtn) customizeBtn.textContent = 'Personalizza cookie';
        }
        
        // Aggiorna posizione bottoni floating quando personalizzazione cambia
        updateFloatingButtonsPosition();
    }
    
    // Personalizza cookie
    if (customizeBtn) {
        customizeBtn.addEventListener('click', toggleCookieCustomization);
    }
    
    // Pulsante X per chiudere il banner
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', closeCookieBanner);
    }
    
    // Linguetta per riaprire il banner
    if (openCookieSettingsBtn) {
        openCookieSettingsBtn.addEventListener('click', reopenCookieBanner);
    }
    
    // Accetta tutti
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            setCookieConsent({
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            });
            
            // Nascondi le opzioni personalizzate e reset dei pulsanti
            cookieDetails.classList.add('hidden');
            savePrefsBtn.classList.add('hidden');
            if (customizeBtn) customizeBtn.textContent = 'Personalizza cookie';
            
            cookieBanner.classList.add('translate-y-full');
            cookieBanner.classList.add('hidden');
            // Aggiorna posizione bottoni floating e linguetta dopo animazione
            setTimeout(() => {
                updateFloatingButtonsPosition();
                updateCookieSettingsTab();
            }, 500);
            
            // Disattiva il click fuori dal banner
            disableClickOutside();
        });
    }
    
    // Solo necessari
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            rejectCookies();
        });
    }
    
    // Salva preferenze personalizzate
    if (savePrefsBtn) {
        savePrefsBtn.addEventListener('click', function() {
            const preferences = {
                necessary: true,
                analytics: analyticsToggle.checked,
                marketing: marketingToggle.checked,
                preferences: false
            };
            
            setCookieConsent(preferences);
            
            // Nascondi le opzioni personalizzate e reset dei pulsanti
            cookieDetails.classList.add('hidden');
            savePrefsBtn.classList.add('hidden');
            if (customizeBtn) customizeBtn.textContent = 'Personalizza cookie';
            
            cookieBanner.classList.add('translate-y-full');
            cookieBanner.classList.add('hidden');
            // Aggiorna posizione bottoni floating e linguetta dopo animazione
            setTimeout(() => {
                updateFloatingButtonsPosition();
                updateCookieSettingsTab();
            }, 500);
            
            // Disattiva il click fuori dal banner
            disableClickOutside();
        });
    }
});

// Aggiorna il padding del body al ridimensionamento della finestra
window.addEventListener('resize', adjustBodyPadding);

// Chiudi menu mobile su resize se si passa a desktop e ripristina scroll
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});

// Chiudi menu mobile con tasto Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});
