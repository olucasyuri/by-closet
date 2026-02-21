# BY Closet - E-commerce de Moda Feminina

Website elegante e responsivo para loja de moda feminina, desenvolvido com HTML5, CSS3 e JavaScript puro.

## 🎨 Características

- **Design Minimalista e Elegante**: Paleta de cores em tons bege/rose gold
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos visuais sofisticados
- **Performance Otimizada**: Código limpo e leve
- **SEO Friendly**: Estrutura HTML semântica

## 📁 Estrutura do Projeto

```
by-closet-project/
│
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos CSS
├── js/
│   └── script.js       # Scripts JavaScript
├── images/             # Pasta para imagens locais
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente

1. Faça o download de todos os arquivos
2. Mantenha a estrutura de pastas
3. Abra o arquivo `index.html` em seu navegador

### Opção 2: Deploy Online

Siga o guia de deployment que foi criado anteriormente. Recomendamos:

**Vercel (Recomendado):**
```bash
# Instale o Vercel CLI
npm install -g vercel

# No diretório do projeto, execute:
vercel
```

**Netlify:**
1. Arraste a pasta do projeto para netlify.com/drop
2. Ou conecte via Git no painel do Netlify

## 🎯 Funcionalidades Implementadas

### Header
- ✅ Navegação fixa com efeito de scroll
- ✅ Menu hamburguer para mobile
- ✅ Logo com efeito hover
- ✅ Ícone de carrinho

### Hero Section
- ✅ Layout em duas colunas (texto + imagem)
- ✅ Botão CTA com animação
- ✅ Carousel dots animados
- ✅ Efeito shimmer na imagem

### Seção de Categorias
- ✅ Grid responsivo (3 colunas → 2 → 1)
- ✅ Cards com overlay ao hover
- ✅ Imagens com zoom suave

### Seção Sobre
- ✅ Layout em duas colunas
- ✅ Imagem com animação flutuante
- ✅ Texto informativo

### Footer
- ✅ Três colunas de informações
- ✅ Links de contato com ícones
- ✅ Redes sociais
- ✅ Copyright

## 🎨 Paleta de Cores

```css
--primary-beige: #e8ddd3;
--soft-beige: #f5f0eb;
--text-primary: #2c2c2c;
--text-secondary: #6b6b6b;
--accent-rose: #d4a5a5;
--white: #ffffff;
```

## 🔤 Fontes

- **Cormorant Garamond**: Títulos e logo (Google Fonts)
- **Montserrat**: Textos e navegação (Google Fonts)

## 📱 Responsividade

- **Desktop**: > 1024px (layout completo)
- **Tablet**: 768px - 1024px (ajustes de grid)
- **Mobile**: < 768px (layout em coluna única + menu hamburguer)

## 🛠️ Customização

### Alterar Cores
Edite as variáveis CSS no arquivo `css/style.css`:

```css
:root {
    --primary-beige: #sua-cor;
    --accent-rose: #sua-cor;
    /* ... */
}
```

### Alterar Imagens
Substitua as URLs no `index.html` por suas próprias imagens:

```html
<img src="caminho/para/sua/imagem.jpg" alt="Descrição">
```

### Adicionar Novas Seções
1. Adicione o HTML no `index.html`
2. Estilize no `css/style.css`
3. Adicione funcionalidade no `js/script.js` se necessário

## 💡 Próximos Passos

Para transformar este projeto em um e-commerce completo, você pode:

1. **Adicionar Páginas**:
   - Catálogo de produtos
   - Página de produto individual
   - Carrinho de compras
   - Checkout
   - Login/Cadastro

2. **Integrar Backend**:
   - Node.js + Express
   - Firebase
   - Supabase
   - Strapi (CMS)

3. **Adicionar Funcionalidades**:
   - Sistema de carrinho (localStorage ou backend)
   - Integração com gateway de pagamento (Stripe, PayPal, Mercado Pago)
   - Sistema de busca
   - Filtros de produtos
   - Wishlist
   - Avaliações de produtos

4. **Melhorias de Performance**:
   - Lazy loading de imagens
   - Compressão de assets
   - CDN para imagens
   - Service Worker (PWA)

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar conforme necessário.

## 👨‍💻 Suporte

Para dúvidas ou sugestões, entre em contato.

---

**Desenvolvido com 💖 e elegância**
