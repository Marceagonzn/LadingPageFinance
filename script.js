document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // 1. Funcionalidad para las Preguntas Frecuentes (FAQ)
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Cierra todas las otras preguntas abiertas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) { // Si no es el item actual
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null; // Reinicia max-height para cerrar
                }
            });

            // Alternar la clase 'active' para cambiar el ícono y el color
            question.classList.toggle('active');

            // Abrir o cerrar la respuesta
            if (answer.style.maxHeight) {
                // Si ya tiene un maxHeight (está abierto), ciérralo
                answer.style.maxHeight = null;
            } else {
                // Si está cerrado, ábrelo ajustando maxHeight a su altura de desplazamiento
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // ========================================
    // 2. Smooth scroll para enlaces internos y cerrar menú móvil al hacer click
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento de salto predeterminado

            const targetId = this.getAttribute('href'); // Obtiene el ID del destino
            const targetElement = document.querySelector(targetId); // Encuentra el elemento destino

            if (targetElement) {
                // Desplazamiento suave al elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Cierra el menú móvil si está abierto después de hacer clic en un enlace de navegación
            const navbarNav = document.querySelector('.navbar-nav');
            const menuToggle = document.querySelector('.menu-toggle'); // Necesitamos el toggle para cerrar su clase 'active'
            // Comprobamos si el menú está activo y si la pantalla es de tamaño móvil (menor o igual a 768px)
            if (navbarNav.classList.contains('active') && window.innerWidth <= 768) {
                 navbarNav.classList.remove('active');
                 // También quita la clase 'active' del botón de toggle al cerrar el menú
                 if (menuToggle) {
                     menuToggle.classList.remove('active');
                 }
            }
        });
    });

    // ========================================
    // 3. Animaciones al hacer scroll (Intersection Observer)
    // ========================================
    // Selecciona todos los elementos que tienen una de las clases de animación
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in');

    // Opciones para el Intersection Observer
    const observerOptions = {
        root: null, // El viewport es el elemento raíz que se observa
        rootMargin: '0px', // Sin margen adicional alrededor del viewport
        threshold: 0.1 // El callback se ejecutará cuando el 10% del elemento sea visible
    };

    // Crea una nueva instancia de Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible en el viewport, añade la clase 'animated'
                entry.target.classList.add('animated');
                // Deja de observar el elemento una vez que ha sido animado para optimizar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Itera sobre cada elemento a animar y comienza a observarlo
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // 4. Funcionalidad del menú móvil
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle'); // El botón de hamburguesa
    const navbarNav = document.querySelector('.navbar-nav'); // La lista de enlaces de navegación

    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', () => {
            // Alterna la clase 'active' en la lista de navegación para mostrar/ocultar
            navbarNav.classList.toggle('active');
            // Opcional: También puedes alternar una clase 'active' en el botón de toggle para animar su icono
            menuToggle.classList.toggle('active');
        });
    }

    // ========================================
    // 5. Animación de la barra de navegación al cargar la página
    // ========================================
    const navbarBrand = document.querySelector('.navbar-brand a'); // El logo/nombre de la marca
    const navLinks = document.querySelectorAll('.navbar-nav li a'); // Todos los enlaces del menú
    const menuToggleIcon = document.querySelector('.menu-toggle'); // El icono del menú toggle

    // Animación de aparición para el logo de la marca
    if (navbarBrand) {
        navbarBrand.style.opacity = 0; // Inicialmente oculto
        navbarBrand.style.transform = 'translateY(-20px)'; // Posición inicial para el efecto de deslizamiento
        setTimeout(() => {
            // Aplica la transición y el estado final para que aparezca suavemente
            navbarBrand.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            navbarBrand.style.opacity = 1;
            navbarBrand.style.transform = 'translateY(0)';
        }, 300); // Retraso inicial para que la animación del logo comience
    }

    // Animación de aparición secuencial para cada enlace del menú
    navLinks.forEach((link, index) => {
        link.style.opacity = 0; // Inicialmente oculto
        link.style.transform = 'translateY(-20px)'; // Posición inicial para el efecto de deslizamiento
        setTimeout(() => {
            // Aplica la transición y el estado final para que cada enlace aparezca suavemente
            link.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            link.style.opacity = 1;
            link.style.transform = 'translateY(0)';
        }, 400 + (index * 100)); // Retraso acumulativo para una aparición secuencial (400ms inicial + 100ms por cada enlace)
    });

    // Animación de aparición para el icono del menú móvil
    if (menuToggleIcon) {
        menuToggleIcon.style.opacity = 0; // Inicialmente oculto
        setTimeout(() => {
            menuToggleIcon.style.transition = 'opacity 0.5s ease-out';
            menuToggleIcon.style.opacity = 1;
        }, 300); // Aparece junto con el logo
    }

    // ========================================
    // 6. Funcionalidad del botón "Volver al Principio" (Scroll-to-Top)
    // ========================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Muestra u oculta el botón basado en la posición del scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Muestra el botón después de 300px de scroll
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Al hacer clic en el botón, desplázate al principio de la página
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Desplazamiento suave
            });
        });
    }
});