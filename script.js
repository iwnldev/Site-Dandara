document.addEventListener('DOMContentLoaded', () => {
  
  // Filtros do portfólio
  const filterButtons = document.querySelectorAll('.filters button');
  const items = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.getAttribute('data-filter');

      items.forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close-lightbox");

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
    });
  });

  closeBtn?.addEventListener('click', () => lightbox.classList.remove("show"));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove("show");
  });

  // ScrollReveal
  function scrollReveal() {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add('show');
      }
    });
  }
  window.addEventListener('scroll', scrollReveal);
  scrollReveal();

  // Menu - Rolagem suave
  document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Destaque do menu na rolagem
  function highlightMenu() {
    const scrollY = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.menu a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightMenu);
  highlightMenu();
});

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa todos os carrosséis
  document.querySelectorAll('.carrossel-container').forEach(container => {
    const track = container.querySelector('.carrossel-track');
    const items = container.querySelectorAll('.carrossel-track img');
    const btnAnterior = container.querySelector('.anterior');
    const btnProximo = container.querySelector('.proximo');
    let currentIndex = 0;
    const itemWidth = items[0].clientWidth;

    function updateCarrossel() {
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    btnProximo.addEventListener('click', () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarrossel();
      }
    });

    btnAnterior.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarrossel();
      }
    });

    // Desativa botões nos extremos
    function checkButtons() {
      btnAnterior.style.opacity = currentIndex === 0 ? 0.5 : 1;
      btnProximo.style.opacity = currentIndex === items.length - 1 ? 0.5 : 1;
    }
    
    checkButtons();
  });
});


