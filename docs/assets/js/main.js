// Funzione per gestire il padding dinamico del body
function adjustBodyPadding() {
    // const header = document.querySelector('header');
    // if (header) {
    //     const headerHeight = header.offsetHeight;
    //     document.body.style.paddingTop = `${headerHeight}px`;
    // }
}

// Funzione per aggiungere interattività alla timeline
function setupTimelineInteractivity() {
    const timelineItems = document.querySelectorAll('.timeline-item-mobile, .timeline-item');
    const timelineInfoBox = document.getElementById('timeline-info');
    const timelineInfoContent = document.getElementById('timeline-info-content');
    
    // Definisci le informazioni dettagliate per ogni step
    const timelineSteps = {
        1: {
            title: "Primo Incontro - Conoscenza Reciproca",
            content: "Durante questo primo incontro ci prendiamo il tempo necessario per conoscerci. Ti ascolto senza giudizio mentre mi racconti la tua storia, le tue preoccupazioni e cosa ti ha portato a cercare supporto psicologico. Insieme valutiamo se il mio approccio può esserti d'aiuto e se c'è una buona sintonia per iniziare un percorso."
        },
        2: {
            title: "Definizione Obiettivi - Il Tuo Piano Personalizzato",
            content: "Sulla base di quanto emerso nel primo incontro, lavoriamo insieme per definire obiettivi chiari e realistici. Creo un piano terapeutico personalizzato che rispetti i tuoi tempi e le tue esigenze specifiche. Questo è il momento in cui disegniamo la 'mappa' del nostro viaggio insieme."
        },
        3: {
            title: "Lavoro Attivo - Strumenti e Tecniche",
            content: "È la fase centrale del percorso, dove utilizziamo tecniche cognitive costruttiviste per lavorare sui pensieri, emozioni e comportamenti. Ogni seduta è un passo verso i tuoi obiettivi, con esercizi pratici, homework terapeutici e un supporto costante per sviluppare nuove competenze."
        },
        4: {
            title: "Consolidamento - Rafforziamo i Progressi",
            content: "Quando iniziamo a vedere i primi miglioramenti, lavoriamo per consolidare i progressi raggiunti. Ti aiuto a sviluppare strategie per mantenere i cambiamenti positivi nel tempo e a prepararti ad affrontare autonomamente le sfide future."
        },
        5: {
            title: "Autonomia - Indipendenza e Crescita",
            content: "L'obiettivo finale è la tua autonomia. A questo punto hai acquisito gli strumenti necessari per gestire le situazioni difficili da solo/a. Il percorso si conclude gradualmente, ma la porta rimane sempre aperta per eventuali 'sedute di richiamo' se dovessi averne bisogno."
        }
    };
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            const stepInfo = timelineSteps[step];
            
            if (stepInfo && timelineInfoBox && timelineInfoContent) {
                timelineInfoContent.innerHTML = `
                    <h3 class="text-xl font-semibold text-indigo-800 mb-3">${stepInfo.title}</h3>
                    <p class="text-gray-700 leading-relaxed">${stepInfo.content}</p>
                `;
                
                timelineInfoBox.classList.remove('hidden');
                
                // Scroll smooth verso il box informativo
                setTimeout(() => {
                    timelineInfoBox.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
        
        // Aggiungi effetto hover migliorato
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Gestisci anche i dot della timeline desktop
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const parentItem = this.closest('.timeline-item');
            if (parentItem) {
                const step = parentItem.getAttribute('data-step');
                const stepInfo = timelineSteps[step];
                
                if (stepInfo && timelineInfoBox && timelineInfoContent) {
                    timelineInfoContent.innerHTML = `
                        <h3 class="text-xl font-semibold text-indigo-800 mb-3">${stepInfo.title}</h3>
                        <p class="text-gray-700 leading-relaxed">${stepInfo.content}</p>
                    `;
                    
                    timelineInfoBox.classList.remove('hidden');
                    
                    setTimeout(() => {
                        timelineInfoBox.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                }
            }
        });
    });
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

    // Chiudi il menu mobile immediatamente durante la navigazione per migliore UX
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth < 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        // Chiusura immediata durante navigazione - evita menu in sospeso
        const button = document.getElementById('mobile-menu-button');
        const overlay = document.getElementById('mobile-menu-overlay');
        const iconHamburger = button?.querySelector('.icon-hamburger');
        const iconClose = button?.querySelector('.icon-close');
        
        if (iconHamburger && iconClose) {
            // Ripristina le icone immediatamente
            iconClose.classList.add('is-hidden');
            iconHamburger.classList.remove('is-hidden');
            
            // Chiudi tutto immediatamente senza animazione
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('open', 'closing');
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('open', 'closing');
            }
            button.setAttribute('aria-expanded', 'false');
            
            // CRITICO: Reset completo stili body per garantire scroll funzionante
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.classList.remove('menu-open-blur');
            
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
            const otherButton = item.querySelector('.faq-question');
            otherAnswer.classList.add('hidden');
            otherIcon.style.transform = 'rotate(0deg)';
            otherButton.classList.remove('active'); // Rimuovi classe active
        }
    });
    
    // Toggle della FAQ corrente
    if (isOpen) {
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        button.classList.remove('active'); // Rimuovi classe active
    } else {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        button.classList.add('active'); // Aggiungi classe active
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
    
    // Inizializza l'interattività della timeline
    setupTimelineInteractivity();

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
            // CHIUSURA ANIMATA - Per chiusura manuale del menu (click su hamburger)
            closeMobileMenu(false); // false = animazione fluida
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
            closeMobileMenu(false); // false = animazione fluida per click overlay
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
        
        // La chiusura del menu è già gestita in showPage() con chiusura immediata
    }
    
    // Funzione utility per reset completo stili body - Risolve problemi di scroll
    function resetBodyStyles() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.classList.remove('menu-open-blur');
        // Reset qualsiasi altra proprietà che potrebbe interferire con lo scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.bottom = '';
    }
    
    function closeMobileMenu(immediate = false) {
        if (!mobileMenu.classList.contains('hidden')) {
            if (immediate) {
                // CHIUSURA IMMEDIATA per navigazione - migliore UX
                
                // Cambia icone immediatamente
                iconClose.classList.add('is-hidden');
                iconHamburger.classList.remove('is-hidden');
                
                // Nascondi tutto immediatamente senza animazione
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open', 'closing');
                
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('hidden');
                    mobileMenuOverlay.classList.remove('open', 'closing');
                }
                
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                
                // CRITICO: Reset completo stili body per chiusura immediata
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.classList.remove('menu-open-blur');
            } else {
                // CHIUSURA ANIMATA FLUIDA - per chiusura manuale
                
                // Cambia icone immediatamente
                iconClose.classList.add('is-hidden');
                iconHamburger.classList.remove('is-hidden');
                
                // Avvia animazione di chiusura
                mobileMenu.classList.add('closing');
                mobileMenu.classList.remove('open');
                
                // Chiudi overlay con animazione sincronizzata
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('closing');
                    mobileMenuOverlay.classList.remove('open');
                }
                
                // Dopo l'animazione (250ms), nascondi completamente
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('closing');
                    
                    if (mobileMenuOverlay) {
                        mobileMenuOverlay.classList.add('hidden');
                        mobileMenuOverlay.classList.remove('closing');
                    }
                }, 250); // Coordinato con la durata CSS dell'apertura per fluidità
                
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
            
            // CRITICO: Ripristina lo scroll del body immediatamente per evitare blocchi
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.classList.remove('menu-open-blur');
            
            // Regola body padding dopo l'animazione
            setTimeout(() => adjustBodyPadding(), 160);
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
                
                closeMobileMenu(false); // false = animazione fluida per click fuori
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

// === ANIMAZIONI E INTERATTIVITÀ ===

// Osservatore per animazioni on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Attiva contatori animati se presente
            const counters = entry.target.querySelectorAll('.counter-number');
            counters.forEach(counter => {
                animateCounter(counter);
            });
        }
    });
}, observerOptions);

// Funzione per animare i contatori
function animateCounter(element) {
    if (element.classList.contains('counting')) return;
    
    const target = parseInt(element.getAttribute('data-target'));
    const isPercentage = element.textContent.includes('%');
    const hasPlus = element.textContent.includes('+');
    
    element.classList.add('counting');
    
    let current = 0;
    const increment = target / 30; // 30 frame per animazione fluida
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) {
            element.textContent = displayValue + '%';
        } else if (hasPlus) {
            element.textContent = displayValue + '+';
        } else {
            element.textContent = displayValue;
        }
    }, 50);
}

// Quiz Interattivo
let currentQuestion = 1;
const totalQuestions = 3;
let quizAnswers = {};

function initQuiz() {
    const nextButton = document.getElementById('quiz-next');
    const prevButton = document.getElementById('quiz-prev');
    const submitButton = document.getElementById('quiz-submit');
    
    if (!nextButton) return;
    
    // Funzione per andare avanti nel quiz
    function proceedQuiz() {
        const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
        const selectedAnswer = currentQ.querySelector('input[type="radio"]:checked');
        
        if (!selectedAnswer) {
            alert('Seleziona una risposta prima di continuare');
            return;
        }
        
        quizAnswers[`q${currentQuestion}`] = selectedAnswer.value;
        
        if (currentQuestion < totalQuestions) {
            showQuizQuestion(currentQuestion + 1);
        } else {
            showQuizResult();
        }
    }
    
    nextButton.addEventListener('click', proceedQuiz);
    
    // Aggiungi listener per il tasto Enter
    document.addEventListener('keydown', function(e) {
        // Verifica se siamo in una domanda del quiz attiva
        const activeQuestion = document.querySelector('.quiz-question.active');
        if (activeQuestion && e.key === 'Enter') {
            e.preventDefault();
            
            if (currentQuestion < totalQuestions) {
                proceedQuiz();
            } else {
                // Ultimo step - submit
                const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
                const selectedAnswer = currentQ.querySelector('input[type="radio"]:checked');
                
                if (!selectedAnswer) {
                    alert('Seleziona una risposta prima di continuare');
                    return;
                }
                
                quizAnswers[`q${currentQuestion}`] = selectedAnswer.value;
                showQuizResult();
            }
        }
    });
    
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 1) {
            showQuizQuestion(currentQuestion - 1);
        }
    });
    
    submitButton.addEventListener('click', () => {
        const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
        const selectedAnswer = currentQ.querySelector('input[type="radio"]:checked');
        
        if (!selectedAnswer) {
            alert('Seleziona una risposta prima di continuare');
            return;
        }
        
        quizAnswers[`q${currentQuestion}`] = selectedAnswer.value;
        showQuizResult();
    });
}

function showQuizQuestion(questionNumber) {
    // Nascondi tutte le domande
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    
    // Mostra la domanda corrente
    const question = document.querySelector(`.quiz-question[data-question="${questionNumber}"]`);
    if (question) {
        question.classList.add('active');
        currentQuestion = questionNumber;
        
        // Aggiorna pulsanti
        const nextButton = document.getElementById('quiz-next');
        const prevButton = document.getElementById('quiz-prev');
        const submitButton = document.getElementById('quiz-submit');
        
        prevButton.classList.toggle('hidden', currentQuestion === 1);
        
        if (currentQuestion === totalQuestions) {
            nextButton.classList.add('hidden');
            submitButton.classList.remove('hidden');
        } else {
            nextButton.classList.remove('hidden');
            submitButton.classList.add('hidden');
        }
    }
}

function showQuizResult() {
    // Nascondi domande e pulsanti
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    document.getElementById('quiz-next').classList.add('hidden');
    document.getElementById('quiz-prev').classList.add('hidden');
    document.getElementById('quiz-submit').classList.add('hidden');
    
    // Calcola risultato
    const result = calculateQuizResult();
    
    // Mostra risultato
    const resultDiv = document.getElementById('quiz-result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = result.content;
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function calculateQuizResult() {
    const scores = { cognitive: 0, practical: 0, growth: 0 };
    
    // Analizza risposte
    if (quizAnswers.q1 === 'analytic') scores.cognitive += 2;
    if (quizAnswers.q1 === 'practical') scores.practical += 2;
    if (quizAnswers.q1 === 'emotional') scores.growth += 1;
    
    if (quizAnswers.q2 === 'overthinking') scores.cognitive += 2;
    if (quizAnswers.q2 === 'patterns') scores.cognitive += 1;
    if (quizAnswers.q2 === 'growth') scores.growth += 2;
    
    if (quizAnswers.q3 === 'tools') scores.practical += 2;
    if (quizAnswers.q3 === 'understanding') scores.cognitive += 2;
    if (quizAnswers.q3 === 'change') scores.growth += 2;
    
    // Determina risultato principale
    const maxScore = Math.max(scores.cognitive, scores.practical, scores.growth);
    
    if (scores.cognitive === maxScore) {
        return {
            type: 'cognitive',
            content: `
                <div class="text-center mb-4">
                    <h3 class="text-base sm:text-xl font-bold text-green-600 m-0 flex items-center justify-center gap-2">
                        <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        Perfetto Match!
                    </h3>
                </div>
                <p class="text-sm sm:text-base text-gray-700 mb-4 text-center">La terapia cognitivo costruttivista è ideale per te! Il tuo approccio analitico e la voglia di comprendere profondamente i tuoi schemi mentali si allineano perfettamente con questo metodo.</p>
                <div class="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                    <h4 class="font-semibold text-green-800 mb-2 text-sm sm:text-base text-center">Cosa potrai ottenere:</h4>
                    <ul class="text-green-700 text-xs sm:text-sm space-y-1">
                        <li>• Comprensione approfondita dei tuoi pattern di pensiero</li>
                        <li>• Strumenti per riconoscere e modificare pensieri disfunzionali</li>
                        <li>• Sviluppo di nuove prospettive più funzionali</li>
                    </ul>
                </div>
            `
        };
    } else if (scores.practical === maxScore) {
        return {
            type: 'practical',
            content: `
                <div class="text-center mb-4">
                    <h3 class="text-base sm:text-xl font-bold text-blue-600 m-0 flex items-center justify-center gap-2">
                        <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        Ottima Compatibilità!
                    </h3>
                </div>
                <p class="text-sm sm:text-base text-gray-700 mb-4 text-center">Il mio approccio cognitivo costruttivista include molti elementi pratici che apprezzerai. Combineremo comprensione teorica con strategie concrete.</p>
                <div class="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                    <h4 class="font-semibold text-blue-800 mb-2 text-sm sm:text-base text-center">Cosa potrai ottenere:</h4>
                    <ul class="text-blue-700 text-xs sm:text-sm space-y-1">
                        <li>• Tecniche immediate per gestire ansia e stress</li>
                        <li>• Esercizi pratici da usare nella vita quotidiana</li>
                        <li>• Strategie concrete per risolvere problemi specifici</li>
                    </ul>
                </div>
            `
        };
    } else {
        return {
            type: 'growth',
            content: `
                <div class="text-center mb-4">
                    <h3 class="text-base sm:text-xl font-bold text-purple-600 m-0 flex items-center justify-center gap-2">
                        <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        Crescita Personale!
                    </h3>
                </div>
                <p class="text-sm sm:text-base text-gray-700 mb-4 text-center">Il tuo interesse per la crescita personale si sposa benissimo con l'approccio cognitivo costruttivista. Potrai esplorare nuove versioni di te stesso.</p>
                <div class="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                    <h4 class="font-semibold text-purple-800 mb-2 text-sm sm:text-base text-center">Cosa potrai ottenere:</h4>
                    <ul class="text-purple-700 text-xs sm:text-sm space-y-1">
                        <li>• Maggiore consapevolezza di te stesso</li>
                        <li>• Sviluppo del tuo potenziale personale</li>
                        <li>• Costruzione di nuove narrazioni di vita più soddisfacenti</li>
                    </ul>
                </div>
            `
        };
    }
}

// Timeline Interattiva
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item, .timeline-item-mobile');
    const timelineInfo = document.getElementById('timeline-info');
    const timelineInfoContent = document.getElementById('timeline-info-content');
    
    if (!timelineItems.length) return;
    
    const timelineData = {
        1: {
            title: "Primo Incontro - La Conoscenza",
            duration: "50 minuti",
            details: "Durante il primo colloquio ascolterò attentamente la tua storia, comprenderò le tue difficoltà attuali e valuteremo insieme se posso esserti d'aiuto. È un momento libero da giudizi, dove puoi esprimerti in totale libertà.",
            what: "Cosa aspettarti: Un ambiente accogliente, ascolto attivo, prime impressioni condivise"
        },
        2: {
            title: "Definizione del Percorso",
            duration: "2-3 sedute",
            details: "Insieme stabiliremo obiettivi chiari e realistici per il tuo percorso. Definiremo la frequenza degli incontri e il metodo di lavoro più adatto alle tue esigenze specifiche.",
            what: "Cosa aspettarti: Piano terapeutico personalizzato, obiettivi condivisi, tempistiche definite"
        },
        3: {
            title: "Lavoro Terapeutico Attivo",
            duration: "Variabile",
            details: "Questa è la fase centrale dove lavoriamo insieme sui tuoi obiettivi. Utilizzeremo tecniche cognitive, esercizi pratici e strumenti personalizzati per affrontare le tue difficoltà.",
            what: "Cosa aspettarti: Sessioni strutturate, compiti a casa, progressi graduali ma concreti"
        },
        4: {
            title: "Consolidamento dei Progressi",
            duration: "Alcune sedute",
            details: "Rafforziamo i risultati ottenuti e prepariamo strumenti di autonomia. È il momento di stabilizzare i cambiamenti e prevenire eventuali ricadute.",
            what: "Cosa aspettarti: Consolidamento delle abilità acquisite, preparazione all'autonomia"
        },
        5: {
            title: "Autonomia e Chiusura",
            duration: "Quando sei pronto",
            details: "Raggiungi l'autonomia nel gestire le situazioni quotidiane con i nuovi strumenti acquisiti. La porta rimane sempre aperta per supporto futuro se necessario.",
            what: "Cosa aspettarti: Indipendenza, fiducia nelle tue capacità, supporto disponibile"
        }
    };
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const step = item.getAttribute('data-step');
            const data = timelineData[step];
            
            if (data && timelineInfo && timelineInfoContent) {
                timelineInfoContent.innerHTML = `
                    <div class="space-y-2 md:space-y-4">
                        <h3 class="text-lg md:text-xl font-bold text-gray-800">${data.title}</h3>
                        <div class="flex items-center gap-2 text-indigo-600">
                            <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm md:text-base font-medium">Durata: ${data.duration}</span>
                        </div>
                        <p class="text-gray-700 text-sm md:text-base leading-relaxed">${data.details}</p>
                        <div class="bg-white p-2 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div class="flex items-start gap-2">
                                <svg class="w-3 h-3 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-sm md:text-base text-gray-600">${data.what}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                timelineInfo.classList.remove('hidden');
                
                // Miglior centraggio: scroll con offset per centrare meglio
                setTimeout(() => {
                    const timelineInfoRect = timelineInfo.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const isMobile = window.innerWidth <= 768;
                    
                    if (isMobile) {
                        // Su mobile, centraggio ottimale nella viewport
                        const viewportCenter = viewportHeight / 2;
                        const boxCenter = timelineInfoRect.height / 2;
                        const idealOffset = Math.max(20, viewportCenter - boxCenter);
                        const targetScrollY = window.scrollY + timelineInfoRect.top - idealOffset;
                        
                        window.scrollTo({
                            top: Math.max(0, targetScrollY),
                            behavior: 'smooth'
                        });
                    } else {
                        // Su desktop, centraggio ottimale
                        const offset = (viewportHeight - timelineInfoRect.height) / 2;
                        const targetScrollY = window.scrollY + timelineInfoRect.top - offset;
                        
                        window.scrollTo({
                            top: Math.max(0, targetScrollY),
                            behavior: 'smooth'
                        });
                    }
                }, 100);
                
                // Highlight dell'item selezionato
                timelineItems.forEach(ti => ti.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

// Aggiorna il padding del body al ridimensionamento della finestra
window.addEventListener('resize', adjustBodyPadding);

// Chiudi menu mobile su resize se si passa a desktop e ripristina scroll
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu(true); // true = immediato per resize finestra
    }
});

// Chiudi menu mobile con tasto Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu(false); // false = animazione fluida per tasto Escape
    }
});

// Inizializza tutto quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza animazioni on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateObserver.observe(el);
    });
    
    // Inizializza quiz
    initQuiz();
    
    // Inizializza timeline
    initTimeline();
    
    // Aggiungi classe CSS per quiz attivo
    const quizStyle = document.createElement('style');
    quizStyle.textContent = `
        .quiz-question {
            display: none;
        }
        .quiz-question.active {
            display: block;
        }
        .quiz-option:hover {
            background-color: #f8fafc;
            border-color: #6366f1;
        }
        .quiz-option input:checked + span {
            color: #6366f1;
            font-weight: 500;
        }
        .timeline-item {
            cursor: pointer;
        }
        .timeline-item.active .timeline-content > div {
            background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
            border: 2px solid #6366f1;
        }
        .timeline-item:hover .timeline-content > div {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(quizStyle);
    
    // === INTERATTIVITÀ AREE DI INTERVENTO ===
    // Gestione hover/click delle card aree di intervento nella sezione servizi
    document.querySelectorAll('.intervention-card').forEach(card => {
        const details = card.querySelector('.intervention-details');
        
        card.addEventListener('mouseenter', () => {
            if (details) {
                details.classList.remove('hidden');
                details.classList.add('block');
                card.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (details) {
                details.classList.add('hidden');
                details.classList.remove('block');
                card.style.transform = 'translateY(0)';
            }
        });
        
        // Per mobile: click per mostrare/nascondere dettagli
        card.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isHidden = details.classList.contains('hidden');
                
                // Nascondi tutti gli altri dettagli
                document.querySelectorAll('.intervention-details').forEach(detail => {
                    if (detail !== details) {
                        detail.classList.add('hidden');
                        detail.classList.remove('block');
                    }
                });
                
                // Toggle questo dettaglio
                if (isHidden) {
                    details.classList.remove('hidden');
                    details.classList.add('block');
                } else {
                    details.classList.add('hidden');
                    details.classList.remove('block');
                }
            }
        });
    });
});
