/**
 * ============================================================================
 * PORTFÓLIO PESSOAL — LUCAS FERNANDES DA SILVA
 * script.js — Lógica de Interações, Navegação e Configurações Centrais
 * ============================================================================
 */

// Strict Mode para garantir código limpo e seguro
'use strict';

/* ==========================================================================
   CONFIGURAÇÕES GERAIS DO PROJETO (ALTERE SEUS DADOS AQUI)
   ========================================================================== */
const PORTFOLIO_CONFIG = {
  /**
   * ========================================================================
   * ATENÇÃO, LUCAS: INSIRA A URL DO SEU PERFIL DO GITHUB NO CAMPO ABAIXO:
   * Substitua 'https://github.com/SEU-USUARIO' pelo link real do seu GitHub.
   * Todos os botões e links do site utilizarão este endereço automaticamente.
   * ========================================================================
   */
  githubUrl: 'https://github.com/SEU-USUARIO',

  /**
   * Link oficial do projeto de TCC CelsLife
   */
  tccUrl: 'https://celslife.com.br/',

  /**
   * Informações do Desenvolvedor
   */
  developerName: 'Lucas Fernandes da Silva'
};

/* ==========================================================================
   INICIALIZAÇÃO QUANDO O DOM ESTIVER PRONTO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initTechCardInteraction();
  initScrollSpy();
  initProjectLinks();
  
  // Log informativo no console do desenvolvedor
  console.log(
    `%c Portfólio carregado com sucesso: ${PORTFOLIO_CONFIG.developerName} %c`,
    'background: #398BFF; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    ''
  );
});

/* ==========================================================================
   1. HEADER DINÂMICO AO ROLAR A PÁGINA
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Execução inicial
}

/* ==========================================================================
   2. MENU MOBILE RESPONSIVO (HAMBÚRGUER)
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  // Alterna abertura e fechamento
  const toggleMenu = () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  // Fecha o menu explicitamente
  const closeMenu = () => {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  mobileToggle.addEventListener('click', toggleMenu);

  // Fecha ao clicar em qualquer link de navegação
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. NAVEGAÇÃO SUAVE E ATUALIZAÇÃO DO LINK ATIVO
   ========================================================================== */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });

          // Atualiza estado visual do link ativo
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });
}

/* ==========================================================================
   4. EFEITO INTERATIVO NO TECH CARD (HERO)
   ========================================================================== */
function initTechCardInteraction() {
  // Verifica se o usuário prefere redução de movimento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const card = document.querySelector('.tech-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6; // Máximo 6 graus
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

/* ==========================================================================
   5. OBSERVAÇÃO DE SEÇÕES E MENU ATIVO (SCROLL SPY)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   6. CONFIGURAÇÃO DINÂMICA DE LINKS (TCC E GITHUB CENTRALIZADO)
   ========================================================================== */
function initProjectLinks() {
  // Vincula o link do GitHub configurado em PORTFOLIO_CONFIG
  const githubButtons = document.querySelectorAll('#btn-view-github, .btn-github, [data-github-link]');
  githubButtons.forEach(btn => {
    btn.setAttribute('href', PORTFOLIO_CONFIG.githubUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Vincula o link do TCC CelsLife
  const tccBtn = document.getElementById('btn-tcc-celslife');
  if (tccBtn) {
    tccBtn.setAttribute('href', PORTFOLIO_CONFIG.tccUrl);
    tccBtn.setAttribute('target', '_blank');
    tccBtn.setAttribute('rel', 'noopener noreferrer');
  }
}
