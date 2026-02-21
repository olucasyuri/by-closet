// ===================================
// BY Closet - Produto
// ===================================

const WHATSAPP_NUMBER = '5583986714216';
const SUPABASE_URL    = 'https://qanmqxyfvlqeadvcjswf.supabase.co';
const SUPABASE_KEY    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbm1xeHlmdmxxZWFkdmNqc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzcyNzQsImV4cCI6MjA4NjkxMzI3NH0.YYgr0HxtYhzekcTa97cu-parCGY0gmSrMQHCA-zL7cw';

let produtoAtual       = null;
let tamanhoSelecionado = null;
let corSelecionada     = null;

async function carregarProduto() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { window.location.href = 'index.html'; return; }
    try {
        const { createClient } = supabase;
        const db = createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await db.from('produtos').select('*').eq('id', id).single();
        if (error) throw error;
        produtoAtual = data;
    } catch (e) {
        console.error('Erro:', e);
        window.location.href = 'index.html';
        return;
    }
    renderizarProduto(produtoAtual);
    const db2 = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    carregarProdutosRelacionados(db2, produtoAtual);
    document.getElementById('loading').classList.add('hidden');
}

function renderizarProduto(p) {
    const container = document.getElementById('produtoContainer');
    const imagens   = Array.isArray(p.imagens) ? p.imagens : [p.imagens];

    // Galeria
    var gal = '<div class="produto-galeria"><div class="imagem-principal">'
            + '<img src="' + imagens[0] + '" alt="' + (p.nome||'') + '" id="imagemPrincipal"></div>';
    if (imagens.length > 1) {
        gal += '<div class="thumbnails">';
        for (var t = 0; t < imagens.length; t++) {
            gal += '<div class="thumbnail ' + (t===0?'active':'') + '" onclick="trocarImagem(\'' + imagens[t] + '\',' + t + ')">'
                 + '<img src="' + imagens[t] + '" alt="foto ' + (t+1) + '"></div>';
        }
        gal += '</div>';
    }
    gal += '</div>';

    // Info
    var inf = '<div class="produto-info">'
            + '<span class="produto-categoria">' + (p.categoria||'') + '</span>'
            + '<h1 class="produto-titulo">' + (p.nome||'') + '</h1>';

    if (p.badge) inf += '<span class="produto-badge">' + p.badge + '</span>';

    if (p.preco && p.secao !== 'destaques')
        inf += '<p class="produto-preco-detalhe">R$ ' + parseFloat(p.preco).toFixed(2).replace('.', ',') + '</p>';

    if (p.secao !== 'destaques' && p.estoque !== null && p.estoque !== undefined)
        inf += p.estoque > 0
            ? '<span class="badge-estoque-detalhe disponivel">&#9679; Disponivel em estoque</span>'
            : '<span class="badge-estoque-detalhe indisponivel">&#9679; Fora de estoque</span>';

    inf += '<p class="produto-descricao">' + (p.descricao||'') + '</p>';

    // Opcoes
    inf += '<div class="selecao-opcoes">';
    if (p.tamanhos && p.tamanhos.length > 0) {
        inf += '<div class="opcao-grupo"><span class="opcao-label">Selecione o Tamanho:</span><div class="tamanhos-grid">';
        for (var i = 0; i < p.tamanhos.length; i++) {
            var tam = p.tamanhos[i];
            inf += '<div class="tamanho-opcao">'
                 + '<input type="radio" name="tamanho" id="tam-' + tam + '" value="' + tam + '" onchange="selecionarTamanho(\'' + tam + '\')">'
                 + '<label for="tam-' + tam + '">' + tam + '</label></div>';
        }
        inf += '</div></div>';
    }
    if (p.cores && p.cores.length > 0) {
        inf += '<div class="opcao-grupo"><span class="opcao-label">Selecione a Cor:</span><div class="cores-grid">';
        for (var j = 0; j < p.cores.length; j++) {
            var cor   = p.cores[j];
            var corId = cor.replace(/\s/g,'');
            inf += '<div class="cor-opcao">'
                 + '<input type="radio" name="cor" id="cor-' + corId + '" value="' + cor + '" onchange="selecionarCor(\'' + cor + '\')">'
                 + '<label for="cor-' + corId + '">' + cor + '</label></div>';
        }
        inf += '</div></div>';
    }
    inf += '</div>';

    // Detalhes
    inf += '<div class="produto-detalhes"><h4>Detalhes do Produto:</h4><ul>';
    if (p.detalhes && p.detalhes.length > 0)
        for (var d = 0; d < p.detalhes.length; d++) inf += '<li>' + p.detalhes[d] + '</li>';
    if (p.material) inf += '<li>Material: ' + p.material + '</li>';
    inf += '</ul></div>';

    // Botoes
    inf += '<div class="produto-acoes">'
         + '<button class="btn-sacola-produto" id="btnSacola" onclick="adicionarNaSacolaComOpcoes()">'
         + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
         + '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>'
         + '<line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>'
         + ' Adicionar a Sacola</button>'
         + '<button class="btn-whatsapp-produto" id="btnWhatsApp" onclick="enviarWhatsApp()">'
         + '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">'
         + '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
         + ' Consultar no WhatsApp</button>'
         + '</div>';

    // Compartilhar
    inf += '<div class="compartilhar"><p>Compartilhar:</p><div class="share-buttons">'
         + '<div class="share-btn whatsapp" onclick="compartilharWhatsApp()">'
         + '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></div>'
         + '<div class="share-btn facebook" onclick="compartilharFacebook()">'
         + '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>'
         + '</div></div>';

    inf += '</div>';

    container.innerHTML = '<div class="produto-grid">' + gal + inf + '</div>';
    document.title = (p.nome || 'Produto') + ' - BY Closet';
    window.produtoImagens = imagens;
    atualizarBotoes();
}

function trocarImagem(src, index) {
    document.getElementById('imagemPrincipal').src = src;
    document.querySelectorAll('.thumbnail').forEach(function(el, i) {
        el.classList.toggle('active', i === index);
    });
}

function selecionarTamanho(t) { tamanhoSelecionado = t; atualizarBotoes(); }
function selecionarCor(c)     { corSelecionada     = c; atualizarBotoes(); }

function atualizarBotoes() {
    if (!produtoAtual) return;
    var temT   = produtoAtual.tamanhos && produtoAtual.tamanhos.length > 0;
    var temC   = produtoAtual.cores    && produtoAtual.cores.length    > 0;
    var pronto = (!temT || tamanhoSelecionado) && (!temC || corSelecionada);
    var btnWA  = document.getElementById('btnWhatsApp');
    var btnSac = document.getElementById('btnSacola');
    if (btnWA)  { btnWA.disabled = !pronto; btnWA.style.opacity = pronto ? '1' : '0.5'; }
    if (btnSac) { btnSac.style.opacity = pronto ? '1' : '0.6'; }
}

function adicionarNaSacolaComOpcoes() {
    if (!produtoAtual) { console.error('produtoAtual nulo'); return; }

    var temT = produtoAtual.tamanhos && produtoAtual.tamanhos.length > 0;
    var temC = produtoAtual.cores    && produtoAtual.cores.length    > 0;
    var falta = [];
    if (temT && !tamanhoSelecionado) falta.push('tamanho');
    if (temC && !corSelecionada)     falta.push('cor');
    if (falta.length) { alert('Selecione ' + falta.join(' e ') + ' antes de adicionar a sacola.'); return; }

    var img = Array.isArray(produtoAtual.imagens) ? produtoAtual.imagens[0] : produtoAtual.imagens;

    adicionarNaSacola({
        id:         produtoAtual.id,
        referencia: produtoAtual.referencia || null,
        nome:       produtoAtual.nome,
        tamanho:    tamanhoSelecionado || null,
        cor:        corSelecionada     || null,
        quantidade: 1,
        imagem:     img,
        preco:      produtoAtual.preco || null,
    });

    var btn = document.getElementById('btnSacola');
    if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Adicionado!';
        btn.style.background = '#27ae60';
        btn.style.color = '#fff';
        setTimeout(function() { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 1800);
    }
}

function enviarWhatsApp() {
    if (!produtoAtual) return;
    var temT = produtoAtual.tamanhos && produtoAtual.tamanhos.length > 0;
    var temC = produtoAtual.cores    && produtoAtual.cores.length    > 0;
    if ((temT && !tamanhoSelecionado) || (temC && !corSelecionada)) {
        alert('Selecione tamanho e cor antes de continuar.');
        return;
    }
    var linhaTam   = tamanhoSelecionado ? '\n   Tamanho: *' + tamanhoSelecionado + '*' : '';
    var linhaCor   = corSelecionada     ? '\n   Cor: *' + corSelecionada + '*'         : '';
    var linhaPreco = (produtoAtual.preco && produtoAtual.secao !== 'destaques')
                   ? '\n   Valor: R$ ' + parseFloat(produtoAtual.preco).toFixed(2).replace('.', ',') : '';
    var msg = 'Ola! Tenho interesse nesta peca:\n\n*' + produtoAtual.nome + '*'
            + linhaTam + linhaCor + linhaPreco
            + '\n   Ref: ' + (produtoAtual.referencia || produtoAtual.id)
            + '\n\nGostaria de confirmar disponibilidade e formas de pagamento.'
            + '\n\nImagem: ' + (Array.isArray(produtoAtual.imagens) ? produtoAtual.imagens[0] : produtoAtual.imagens);
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

function compartilharWhatsApp() {
    window.open('https://wa.me/?text=' + encodeURIComponent('Olha essa peca da BY Closet!\n\n' + window.location.href), '_blank');
}
function compartilharFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
}

async function carregarProdutosRelacionados(db, p) {
    try {
        var grid = document.getElementById('relacionadosGrid');
        if (!grid) return;
        var res = await db.from('produtos').select('*').eq('categoria', p.categoria).neq('id', p.id).limit(4);
        if (res.error) throw res.error;
        var lista = res.data || [];
        if (!lista.length) { grid.innerHTML = ''; return; }
        grid.innerHTML = lista.map(function(r) {
            var img = Array.isArray(r.imagens) ? r.imagens[0] : r.imagens;
            return '<div class="relacionado-card" onclick="window.location.href=\'produto.html?id=' + r.id + '\'">'
                 + '<div class="relacionado-imagem"><img src="' + img + '" alt="' + (r.nome||'') + '"></div>'
                 + '<div class="relacionado-info"><h3>' + (r.nome||'') + '</h3><p>' + (r.categoria||'') + '</p></div></div>';
        }).join('');
    } catch(e) { console.error('Relacionados:', e); }
}

function abrirGaleriaFullscreen(i) {}

document.addEventListener('DOMContentLoaded', carregarProduto);
