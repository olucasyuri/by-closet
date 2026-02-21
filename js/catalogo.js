
// ===================================
// SKELETON LOADING
// ===================================
function mostrarSkeletons() {
    const grid = document.querySelector('.produtos-grid');
    if (!grid) return;
    var sk = '';
    for (var i = 0; i < 6; i++) {
        sk += '<div class="skeleton-card">'
            + '<div class="skeleton-img"></div>'
            + '<div class="skeleton-body">'
            + '<div class="skeleton-line wide"></div>'
            + '<div class="skeleton-line medium"></div>'
            + '<div class="skeleton-line short"></div>'
            + '<div class="skeleton-btns">'
            + '<div class="skeleton-btn"></div>'
            + '<div class="skeleton-btn wide"></div>'
            + '</div>'
            + '</div></div>';
    }
    grid.innerHTML = sk;
}

// ===================================
// BY Closet — Catálogo
// ===================================

var WHATSAPP_NUMBER = (window.BY_CONFIG && window.BY_CONFIG.numero) || '5583986714216';
const SUPABASE_URL    = 'https://qanmqxyfvlqeadvcjswf.supabase.co';
const SUPABASE_KEY    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbm1xeHlmdmxxZWFkdmNqc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzcyNzQsImV4cCI6MjA4NjkxMzI3NH0.YYgr0HxtYhzekcTa97cu-parCGY0gmSrMQHCA-zL7cw';

const PRODUTOS_POR_PAGINA = 12;

let todosProdutos     = [];
let produtosFiltrados = [];
let paginaAtual       = 1;

// ===================================
// UTILITÁRIOS
// ===================================
function detectarSecao() {
    const path = window.location.pathname;
    if (path.includes('pecas'))  return 'pecas';
    if (path.includes('extras')) return 'extras';
    return null;
}

function abrirWhatsApp(nomeProduto, imagemUrl) {
    var msgBase = (window.BY_CONFIG && window.BY_CONFIG.mensagem) || 'Ola! Tenho interesse nesta peca da BY Closet:';
    var WHATSAPP_NUMBER = (window.BY_CONFIG && window.BY_CONFIG.numero) || '5583986714216';
    const msg = msgBase + '\n\n*' + nomeProduto + '*\n\nGostaria de saber mais sobre disponibilidade, tamanhos e valores.\n\nImagem: ' + imagemUrl;
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

// ===================================
// CARREGAR DO SUPABASE
// ===================================
async function carregarProdutos() {
    mostrarSkeletons();
    const secao = detectarSecao();
    try {
        const { createClient } = supabase;
        const db = createClient(SUPABASE_URL, SUPABASE_KEY);
        let query = db.from('produtos').select('*').order('criado_em', { ascending: false });
        if (secao) query = query.eq('secao', secao);
        const { data, error } = await query;
        if (error) throw error;
        todosProdutos = data || [];
    } catch (err) {
        console.error('Supabase erro:', err);
        todosProdutos = [];
        var grid = document.querySelector('.produtos-grid');
        if (grid) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;">'
                + '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e8ddd3" stroke-width="1.5" style="margin-bottom:1rem;display:block;margin-left:auto;margin-right:auto"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
                + '<p style="color:#888;font-size:1rem;margin-bottom:0.5rem">Não foi possível carregar os produtos</p>'
                + '<p style="color:#bbb;font-size:0.85rem;margin-bottom:1.5rem">Verifique sua conexão e tente novamente</p>'
                + '<button onclick="carregarProdutos()" style="background:#d4a5a5;color:#fff;border:none;padding:0.7rem 1.5rem;border-radius:50px;cursor:pointer;font-size:0.85rem;font-weight:500">Tentar novamente</button>'
                + '</div>';
        }
    }

    produtosFiltrados = [...todosProdutos];
    paginaAtual = 1;
    atualizarContadoresFiltros();
    renderizarProdutos();
    renderizarPaginacao();
}

// ===================================
// RENDERIZAR CARDS
// ===================================
function renderizarProdutos() {
    const grid = document.querySelector('.produtos-grid');
    if (!grid) return;

    const inicio = (paginaAtual - 1) * PRODUTOS_POR_PAGINA;
    const fim    = inicio + PRODUTOS_POR_PAGINA;
    const pagina = produtosFiltrados.slice(inicio, fim);

    if (pagina.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:#6b6b6b;">'
            + '<h3 style="font-size:1.2rem;margin-bottom:0.5rem;">Nenhum produto encontrado</h3>'
            + '<p>Tente remover os filtros ou adicione produtos pelo painel administrativo.</p>'
            + '</div>';
        atualizarContador();
        return;
    }

    const whatsappSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

    const sacolaIconSVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>';

    grid.innerHTML = pagina.map(function(produto) {
        const imagem       = Array.isArray(produto.imagens) ? produto.imagens[0] : (produto.imagens || '');
        const nomeEscapado = (produto.nome || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');

        const badgeHtml    = produto.badge
            ? '<div class="produto-badge">' + produto.badge + '</div>'
            : '';

        const precoHtml    = produto.preco
            ? '<p class="produto-preco">R$ ' + parseFloat(produto.preco).toFixed(2).replace('.', ',') + '</p>'
            : '';

        const estoqueHtml  = (produto.estoque !== null && produto.estoque !== undefined)
            ? produto.estoque > 0
                ? '<span class="badge-estoque disponivel">&#9679; Disponivel</span>'
                : '<span class="badge-estoque indisponivel">&#9679; Fora de estoque</span>'
            : '';

        return '<div class="produto-card" style="cursor:pointer;" onclick="window.location.href=\'produto.html?id=' + produto.id + '\'">'
            + '<div class="produto-imagem">'
            + '<img src="' + imagem + '" alt="' + (produto.nome || '') + '" loading="lazy" onerror="this.src=\'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22350%22%20viewBox%3D%220%200%20400%20350%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22350%22%20fill%3D%22%23f5f0eb%22/%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22155%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2236%22%20font-weight%3D%22300%22%20fill%3D%22%23d4a5a5%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%224%22%3EBY%3C/text%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22195%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2222%22%20font-weight%3D%22300%22%20fill%3D%22%23c9a0a0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%223%22%3ECloset%3C/text%3E%0A%20%20%3Cline%20x1%3D%22140%22%20y1%3D%22210%22%20x2%3D%22260%22%20y2%3D%22210%22%20stroke%3D%22%23e8ddd3%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22235%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2211%22%20fill%3D%22%23c4b5af%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221%22%3EImagem%20indisponivel%3C/text%3E%0A%3C/svg%3E\'">'
            + badgeHtml
            + '<div class="produto-acoes-hover">'
            + '<button class="btn-quick-view" onclick="event.stopPropagation(); window.location.href=\'produto.html?id=' + produto.id + '\'" title="Ver Detalhes">'
            + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
            + '</button>'
            + '</div>'
            + '</div>'
            + '<div class="produto-info">'
            + '<h3>' + (produto.nome || '') + '</h3>'
            + precoHtml
            + estoqueHtml
            + '<p class="produto-descricao">' + (produto.descricao || '').substring(0, 80) + ((produto.descricao || '').length > 80 ? '...' : '') + '</p>'
            + '<div class="card-btns">'
            + '<button class="btn-sacola-card btn-sacola-full" onclick="event.stopPropagation(); irParaProdutoSacola(\'' + produto.id + '\')">'
            + sacolaIconSVG + ' Adicionar à Sacola'
            + '</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    }).join('');

    atualizarContador();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// SACOLA — do card vai para a página do produto
// ===================================
function irParaProdutoSacola(id) {
    window.location.href = 'produto.html?id=' + id;
}

// ===================================
// CONTADOR
// ===================================
function atualizarContador() {
    const el = document.querySelector('.produtos-count');
    if (!el) return;
    const total = produtosFiltrados.length;
    if (total === 0) {
        el.innerHTML = 'Nenhum produto encontrado';
        return;
    }
    const inicio = (paginaAtual - 1) * PRODUTOS_POR_PAGINA + 1;
    const fim    = Math.min(paginaAtual * PRODUTOS_POR_PAGINA, total);
    el.innerHTML = 'Mostrando <strong>' + inicio + '&ndash;' + fim + '</strong> de <strong>' + total + '</strong> produto' + (total !== 1 ? 's' : '');
}

// ===================================
// PAGINAÇÃO
// ===================================
function renderizarPaginacao() {
    const container = document.querySelector('.paginacao');
    if (!container) return;

    const totalPaginas = Math.ceil(produtosFiltrados.length / PRODUTOS_POR_PAGINA);

    if (totalPaginas <= 1) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';

    let html = '<button class="paginacao-btn" ' + (paginaAtual === 1 ? 'disabled' : '') + ' onclick="irPagina(' + (paginaAtual - 1) + ')">Anterior</button>';

    for (let i = 1; i <= totalPaginas; i++) {
        if (i === 1 || i === totalPaginas || (i >= paginaAtual - 1 && i <= paginaAtual + 1)) {
            html += '<button class="paginacao-numero ' + (i === paginaAtual ? 'active' : '') + '" onclick="irPagina(' + i + ')">' + i + '</button>';
        } else if (i === paginaAtual - 2 || i === paginaAtual + 2) {
            html += '<span class="paginacao-dots">...</span>';
        }
    }

    html += '<button class="paginacao-btn" ' + (paginaAtual === totalPaginas ? 'disabled' : '') + ' onclick="irPagina(' + (paginaAtual + 1) + ')">Proximo</button>';

    container.innerHTML = html;
}

function irPagina(numero) {
    const totalPaginas = Math.ceil(produtosFiltrados.length / PRODUTOS_POR_PAGINA);
    if (numero < 1 || numero > totalPaginas) return;
    paginaAtual = numero;
    renderizarProdutos();
    renderizarPaginacao();
}

// ===================================
// FILTROS — contagens reais
// ===================================
function atualizarContadoresFiltros() {
    document.querySelectorAll('input[name="categoria"]').forEach(function(input) {
        const qtd   = todosProdutos.filter(function(p) { return p.categoria === input.value; }).length;
        const label = input.closest('label');
        if (!label) return;
        const countEl = label.querySelector('.count');
        if (countEl) countEl.textContent = '(' + qtd + ')';
        label.style.display = qtd === 0 ? 'none' : '';
    });

    document.querySelectorAll('input[name="tamanho"]').forEach(function(input) {
        const tam = input.value.toUpperCase();
        const qtd = todosProdutos.filter(function(p) {
            return Array.isArray(p.tamanhos) && p.tamanhos.some(function(t) { return t.toUpperCase() === tam; });
        }).length;
        const label = input.closest('label');
        if (label) label.style.display = qtd === 0 ? 'none' : '';
    });
}

function aplicarFiltros() {
    const categorias = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(function(c) { return c.value; });
    const tamanhos   = Array.from(document.querySelectorAll('input[name="tamanho"]:checked')).map(function(t) { return t.value.toUpperCase(); });

    produtosFiltrados = todosProdutos.filter(function(p) {
        const passaCat = categorias.length === 0 || categorias.includes(p.categoria);
        const passaTam = tamanhos.length === 0   || (Array.isArray(p.tamanhos) && p.tamanhos.some(function(t) { return tamanhos.includes(t.toUpperCase()); }));
        return passaCat && passaTam;
    });

    paginaAtual = 1;
    renderizarProdutos();
    renderizarPaginacao();
}

// ===================================
// FILTROS MOBILE
// ===================================
function toggleFiltros() {
    const sidebar = document.querySelector('.filtros-sidebar');
    sidebar.classList.toggle('active');
    let overlay = document.querySelector('.filtros-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'filtros-overlay';
        overlay.onclick = toggleFiltros;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('active', sidebar.classList.contains('active'));
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}


// ===================================
// BUSCA POR NOME
// ===================================
var termoBusca = '';

function aplicarBusca(termo) {
    termoBusca = (termo || '').toLowerCase().trim();
    aplicarFiltros();
}

// ===================================
// INIT
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();

    document.querySelectorAll('.filtros-sidebar input[type="checkbox"]').forEach(function(cb) {
        cb.addEventListener('change', aplicarFiltros);
    });

    var limpar = document.querySelector('.limpar-filtros');
    if (limpar) {
        limpar.addEventListener('click', function() {
            document.querySelectorAll('.filtros-sidebar input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
            produtosFiltrados = [...todosProdutos];
            paginaAtual = 1;
            renderizarProdutos();
            renderizarPaginacao();
        });
    }

    var select = document.querySelector('.ordenar-select');
    if (select) {
        select.addEventListener('change', function() {
            var ord = this.value;
            if      (ord === 'nome-az')   produtosFiltrados.sort(function(a,b) { return a.nome.localeCompare(b.nome); });
            else if (ord === 'nome-za')   produtosFiltrados.sort(function(a,b) { return b.nome.localeCompare(a.nome); });
            else if (ord === 'novidades') produtosFiltrados.sort(function(a,b) { return (b.novo ? 1 : 0) - (a.novo ? 1 : 0); });
            else                          produtosFiltrados = [...todosProdutos];
            paginaAtual = 1;
            renderizarProdutos();
            renderizarPaginacao();
        });
    }
});

console.log('Catalogo BY Closet carregado!');
