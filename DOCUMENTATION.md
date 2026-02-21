# Documentação Técnica - BY Closet

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [HTML - Estrutura](#html---estrutura)
4. [CSS - Estilos](#css---estilos)
5. [JavaScript - Funcionalidades](#javascript---funcionalidades)
6. [Responsividade](#responsividade)
7. [Performance](#performance)
8. [Acessibilidade](#acessibilidade)

---

## Visão Geral

Website institucional/e-commerce para a marca BY Closet, focado em moda feminina elegante e sofisticada.

**Tecnologias:**
- HTML5
- CSS3 (com animações e transitions)
- JavaScript Vanilla (sem dependências)
- Google Fonts (Cormorant Garamond + Montserrat)

**Browser Support:**
- Chrome/Edge: últimas 2 versões
- Firefox: últimas 2 versões
- Safari: últimas 2 versões
- Mobile browsers: iOS Safari, Chrome Mobile

---

## Arquitetura

### Estrutura de Arquivos
```
by-closet-project/
│
├── index.html              # Documento HTML principal
├── css/
│   └── style.css          # Todos os estilos CSS
├── js/
│   └── script.js          # Toda a lógica JavaScript
├── images/                # Imagens locais (vazio por padrão)
├── .gitignore            # Arquivos ignorados pelo Git
└── README.md             # Documentação do usuário
```

### Fluxo de Carregamento
1. Browser carrega HTML
2. HTML requisita CSS e fontes do Google
3. Renderização inicial da página
4. JavaScript carrega e adiciona interatividade
5. Animações ativadas conforme scroll

---

## HTML - Estrutura

### Semântica
O HTML utiliza tags semânticas para melhor SEO e acessibilidade:

```html
<header>       → Cabeçalho e navegação
<nav>          → Menu de navegação
<section>      → Seções principais de conteúdo
<footer>       → Rodapé com informações
```

### Seções Principais

#### 1. Header / Navigation
```html
<header>
  <nav>
    <div class="logo">       → Logotipo da marca
    <ul class="nav-links">   → Menu de navegação
    <div class="mobile-menu-toggle">  → Menu hamburguer (mobile)
    <div class="cart-icon">  → Ícone do carrinho
  </nav>
</header>
```

**Características:**
- Fixed positioning para ficar sempre visível
- Backdrop blur para efeito glassmorphism
- Links com smooth scroll para âncoras internas

#### 2. Hero Section
```html
<section class="hero">
  <div class="hero-content">
    <div class="hero-text">           → Texto e CTA
    <div class="hero-image">          → Imagem principal
  </div>
  <div class="carousel-dots">         → Indicadores de carousel
</section>
```

**Características:**
- Layout flexbox para responsividade
- Imagens de alta qualidade do Unsplash
- Carousel dots para futura implementação de slider

#### 3. Categories Section
```html
<section class="categories">
  <div class="category-grid">
    <div class="category-card">       → Card de categoria
      <img>                           → Imagem da categoria
      <div class="category-overlay">  → Overlay com texto
    </div>
  </div>
</section>
```

**Características:**
- CSS Grid para layout responsivo
- Hover effects com overlay
- Placeholder para futura integração com backend

#### 4. About Section
```html
<section class="about">
  <div class="about-content">
    <div class="about-text">   → Texto sobre a marca
    <div class="about-image">  → Imagem institucional
  </div>
</section>
```

#### 5. Footer
```html
<footer>
  <div class="footer-content">
    <div class="footer-section"> × 3  → 3 colunas de informações
  </div>
  <div class="footer-bottom">         → Copyright
</footer>
```

---

## CSS - Estilos

### Metodologia
- **CSS Variables** para temas e cores
- **Mobile-first approach** nos media queries
- **BEM-like naming** para classes (modificado)
- **Animations** em CSS puro (sem bibliotecas)

### Variáveis CSS
```css
:root {
    --primary-beige: #e8ddd3;
    --soft-beige: #f5f0eb;
    --text-primary: #2c2c2c;
    --text-secondary: #6b6b6b;
    --accent-rose: #d4a5a5;
    --white: #ffffff;
    --light-shadow: rgba(0, 0, 0, 0.08);
}
```

### Animações Implementadas

#### 1. slideDown (Header)
```css
@keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
```
**Uso:** Entrada do header ao carregar página

#### 2. fadeInLeft / fadeInRight (Hero)
```css
@keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}
```
**Uso:** Entrada do conteúdo hero

#### 3. shimmer (Hero Image)
```css
@keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}
```
**Uso:** Efeito de brilho na imagem do hero

#### 4. floatImage (About)
```css
@keyframes floatImage {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
```
**Uso:** Animação flutuante suave

### Efeitos de Hover

#### Buttons
```css
.cta-button::before {
    /* Slide-in background effect */
    transition: left 0.4s ease;
}
```

#### Category Cards
```css
.category-card:hover {
    transform: translateY(-10px);  /* Lift effect */
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.category-card:hover img {
    transform: scale(1.08);  /* Zoom effect */
}
```

#### Navigation Links
```css
.nav-links a::after {
    /* Underline animation */
    width: 0;
    transition: width 0.3s ease;
}
.nav-links a:hover::after {
    width: 100%;
}
```

---

## JavaScript - Funcionalidades

### 1. Mobile Menu Toggle
```javascript
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}
```
**Funcionalidade:** Abre/fecha menu em dispositivos móveis

### 2. Scroll Reveal
```javascript
function revealOnScroll() {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
```
**Funcionalidade:** Revela elementos conforme usuário faz scroll

### 3. Carousel Dots Animation
```javascript
setInterval(() => {
    dots[currentDot].classList.remove('active');
    currentDot = (currentDot + 1) % dots.length;
    dots[currentDot].classList.add('active');
}, 4000);
```
**Funcionalidade:** Anima os dots indicadores a cada 4 segundos

### 4. Smooth Scroll
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
```
**Funcionalidade:** Scroll suave ao clicar em links âncora

### 5. Header Hide/Show on Scroll
```javascript
window.addEventListener('scroll', () => {
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
});
```
**Funcionalidade:** Esconde header ao rolar para baixo, mostra ao rolar para cima

---

## Responsividade

### Breakpoints

#### Desktop (> 1024px)
- Layout completo em 3 colunas
- Hero em duas colunas (texto + imagem)
- Todas as animações ativas

#### Tablet (768px - 1024px)
```css
@media (max-width: 1024px) {
    .category-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .about-content {
        grid-template-columns: 1fr;
    }
}
```

#### Mobile (< 768px)
```css
@media (max-width: 768px) {
    .nav-links {
        /* Menu hamburguer ativado */
        position: fixed;
        left: -100%;
    }
    .hero-content {
        flex-direction: column;
    }
    .category-grid {
        grid-template-columns: 1fr;
    }
}
```

### Estratégias de Responsividade
1. **Flexbox e Grid** para layouts fluidos
2. **Relative units** (rem, %, vw/vh)
3. **Media queries** para ajustes específicos
4. **Touch-friendly** targets (mínimo 44x44px)
5. **Readable font sizes** em todos os dispositivos

---

## Performance

### Otimizações Implementadas

1. **CSS**
   - Uso de `transform` e `opacity` para animações (GPU-accelerated)
   - Evita `layout thrashing`
   - Seletores específicos (não genéricos)

2. **JavaScript**
   - Event delegation quando possível
   - Debounce em scroll events (não implementado mas recomendado)
   - Lazy loading para imagens (futuro)

3. **Assets**
   - Fontes do Google Fonts com `preconnect`
   - Imagens externas otimizadas (Unsplash)
   - SVG para ícones (melhor que PNG)

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90

---

## Acessibilidade

### Implementado
- ✅ Estrutura HTML semântica
- ✅ Alt text em todas as imagens
- ✅ Contraste adequado de cores (WCAG AA)
- ✅ Links com `aria-label` onde necessário
- ✅ Navegação por teclado funcional

### A Implementar
- ⏳ Skip to main content link
- ⏳ ARIA landmarks
- ⏳ Focus indicators customizados
- ⏳ Teste com screen readers
- ⏳ Redução de movimento (prefers-reduced-motion)

---

## Próximas Melhorias

### Curto Prazo
1. Implementar carousel funcional no hero
2. Adicionar lazy loading para imagens
3. Sistema de tema claro/escuro
4. Melhorar acessibilidade (ARIA)

### Médio Prazo
1. Integração com CMS (Strapi, Contentful)
2. Sistema de busca de produtos
3. Carrinho de compras funcional
4. Área de login/cadastro

### Longo Prazo
1. PWA (Progressive Web App)
2. Backend completo (Node.js + MongoDB)
3. Pagamentos online
4. Sistema de avaliações
5. Wishlist e favoritos

---

**Última atualização:** Fevereiro 2026
