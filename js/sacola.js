// ===================================
// BY Closet — Sistema de Sacola
// ===================================

const SACOLA_KEY = 'bycloset_sacola';

// ===================================
// DADOS DA SACOLA
// ===================================
function getSacola() {
    try { return JSON.parse(localStorage.getItem(SACOLA_KEY)) || []; }
    catch { return []; }
}

function salvarSacola(itens) {
    localStorage.setItem(SACOLA_KEY, JSON.stringify(itens));
    atualizarContadorSacola();
}

// ===================================
// ADICIONAR ITEM
// item = { id, nome, cor, tamanho, quantidade, imagem, preco }
// ===================================
function adicionarNaSacola(item) {
    const sacola = getSacola();

    // Chave única: mesmo produto + mesma cor + mesmo tamanho
    const idx = sacola.findIndex(i =>
        i.id === item.id &&
        (i.cor      || '') === (item.cor      || '') &&
        (i.tamanho  || '') === (item.tamanho  || '')
    );

    if (idx >= 0) {
        sacola[idx].quantidade += item.quantidade;
    } else {
        sacola.push(item);
    }

    salvarSacola(sacola);
    mostrarToastSacola(`"${item.nome}" adicionado à sacola 🛍️`);
    atualizarContadorSacola();
}

function removerDaSacola(idx) {
    const sacola = getSacola();
    sacola.splice(idx, 1);
    salvarSacola(sacola);
    renderizarPainelSacola();
}

function alterarQuantidade(idx, delta) {
    const sacola = getSacola();
    sacola[idx].quantidade = Math.max(1, (sacola[idx].quantidade || 1) + delta);
    salvarSacola(sacola);
    renderizarPainelSacola();
}

function limparSacola() {
    salvarSacola([]);
    renderizarPainelSacola();
}

// ===================================
// CONTADOR NO ÍCONE
// ===================================
function atualizarContadorSacola() {
    const sacola = getSacola();
    const total  = sacola.reduce((s, i) => s + (i.quantidade || 1), 0);
    document.querySelectorAll('.sacola-count').forEach(el => {
        el.textContent  = total;
        el.style.display = total > 0 ? 'flex' : 'none';
    });
}

// ===================================
// PAINEL LATERAL (DRAWER)
// ===================================
function abrirSacola() {
    let drawer = document.getElementById('sacolaDrawer');
    if (!drawer) criarDrawer();
    renderizarPainelSacola();
    document.getElementById('sacolaDrawer').classList.add('open');
    document.getElementById('sacolaOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function fecharSacola() {
    document.getElementById('sacolaDrawer')?.classList.remove('open');
    document.getElementById('sacolaOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
}

function criarDrawer() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'sacolaOverlay';
    overlay.onclick = fecharSacola;
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.35);
        z-index:9998;opacity:0;pointer-events:none;transition:opacity 0.3s;
    `;
    overlay.addEventListener('transitionend', () => {
        if (!overlay.classList.contains('open')) overlay.style.pointerEvents = 'none';
    });

    // Drawer
    const drawer = document.createElement('div');
    drawer.id = 'sacolaDrawer';
    drawer.innerHTML = `
        <div class="sacola-header">
            <h2>🛍️ Minha Sacola</h2>
            <button class="sacola-fechar" onclick="fecharSacola()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <div class="sacola-itens" id="sacolaItens"></div>
        <div class="sacola-footer" id="sacolaFooter"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Estilos dinâmicos
    if (!document.getElementById('sacola-styles')) {
        const s = document.createElement('style');
        s.id = 'sacola-styles';
        s.textContent = `
            #sacolaOverlay.open { opacity:1; pointer-events:auto; }

            #sacolaDrawer {
                position:fixed; top:0; right:0; width:420px; max-width:100vw;
                height:100vh; background:#fff; z-index:9999;
                display:flex; flex-direction:column;
                transform:translateX(100%); transition:transform 0.35s cubic-bezier(.4,0,.2,1);
                box-shadow:-8px 0 40px rgba(0,0,0,0.12);
                font-family:'Montserrat',sans-serif;
            }
            #sacolaDrawer.open { transform:translateX(0); }

            .sacola-header {
                display:flex; align-items:center; justify-content:space-between;
                padding:1.5rem 1.75rem; border-bottom:1px solid #f0ebe5;
            }
            .sacola-header h2 {
                font-family:'Cormorant Garamond',serif;
                font-size:1.5rem; font-weight:400; color:#2c2c2c;
            }
            .sacola-fechar {
                background:none; border:none; cursor:pointer;
                color:#6b6b6b; padding:0.25rem; border-radius:6px;
                transition:background 0.2s;
            }
            .sacola-fechar:hover { background:#f5f0eb; }

            .sacola-itens {
                flex:1; overflow-y:auto; padding:1rem 1.75rem;
                display:flex; flex-direction:column; gap:1rem;
            }

            .sacola-item {
                display:flex; gap:1rem; padding:1rem;
                background:#faf7f4; border-radius:12px;
                position:relative;
            }
            .sacola-item-img {
                width:80px; height:80px; object-fit:cover;
                border-radius:8px; flex-shrink:0;
            }
            .sacola-item-info { flex:1; min-width:0; }
            .sacola-item-nome {
                font-size:0.9rem; font-weight:500; color:#2c2c2c;
                margin-bottom:0.25rem; white-space:nowrap;
                overflow:hidden; text-overflow:ellipsis;
            }
            .sacola-item-detalhes {
                font-size:0.78rem; color:#6b6b6b; margin-bottom:0.5rem; line-height:1.5;
            }
            .sacola-item-preco {
                font-family:'Cormorant Garamond',serif;
                font-size:1.1rem; font-weight:600; color:#b07070;
            }
            .sacola-item-qtd {
                display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;
            }
            .sacola-qtd-btn {
                width:26px; height:26px; border-radius:50%;
                border:1px solid #e8ddd3; background:#fff;
                cursor:pointer; font-size:1rem; color:#2c2c2c;
                display:flex; align-items:center; justify-content:center;
                transition:background 0.2s; line-height:1;
            }
            .sacola-qtd-btn:hover { background:#f5f0eb; }
            .sacola-qtd-num {
                font-size:0.9rem; font-weight:500; min-width:20px; text-align:center;
            }
            .sacola-item-remover {
                position:absolute; top:0.5rem; right:0.5rem;
                background:none; border:none; cursor:pointer;
                color:#ccc; font-size:1.1rem; padding:0.2rem;
                transition:color 0.2s;
            }
            .sacola-item-remover:hover { color:#e74c3c; }

            .sacola-vazia {
                text-align:center; padding:3rem 1rem; color:#6b6b6b;
            }
            .sacola-vazia svg { opacity:0.25; margin-bottom:1rem; }
            .sacola-vazia p { font-size:0.9rem; }

            .sacola-footer {
                padding:1.25rem 1.75rem;
                border-top:1px solid #f0ebe5;
                display:flex; flex-direction:column; gap:0.75rem;
            }
            .sacola-total {
                display:flex; justify-content:space-between; align-items:center;
                font-size:0.95rem;
            }
            .sacola-total-label { color:#6b6b6b; }
            .sacola-total-valor {
                font-family:'Cormorant Garamond',serif;
                font-size:1.4rem; font-weight:600; color:#b07070;
            }
            .sacola-total-itens {
                font-size:0.8rem; color:#6b6b6b; text-align:right; margin-top:-0.25rem;
            }
            .btn-enviar-sacola {
                display:flex; align-items:center; justify-content:center; gap:0.6rem;
                width:100%; padding:1rem; border:none; border-radius:10px;
                background:#25D366; color:#fff; font-family:'Montserrat',sans-serif;
                font-size:0.95rem; font-weight:600; cursor:pointer;
                transition:background 0.2s, transform 0.15s;
                letter-spacing:0.3px;
            }
            .btn-enviar-sacola:hover { background:#1ebe5a; transform:translateY(-1px); }
            .btn-limpar-sacola {
                background:none; border:none; color:#6b6b6b;
                font-size:0.78rem; cursor:pointer; text-decoration:underline;
                text-align:center; font-family:inherit;
            }
            .btn-limpar-sacola:hover { color:#e74c3c; }

            /* Ícone sacola no nav */
            .sacola-icon-btn {
                position:relative; background:none; border:none;
                cursor:pointer; padding:0.4rem; border-radius:8px;
                color:var(--text-primary, #2c2c2c);
                transition:color 0.2s, background 0.2s;
                display:flex; align-items:center;
            }
            .sacola-icon-btn:hover { color:var(--accent-rose,#d4a5a5); background:#f5f0eb; }
            .sacola-count {
                position:absolute; top:-4px; right:-4px;
                background:var(--accent-rose,#d4a5a5); color:#fff;
                font-size:0.65rem; font-weight:700;
                width:17px; height:17px; border-radius:50%;
                display:none; align-items:center; justify-content:center;
                font-family:'Montserrat',sans-serif;
            }

    
        /* ── Modal de entrega ── */
        #modalEntrega {
            position: fixed; inset: 0; z-index: 99999;
            display: flex; align-items: flex-end; justify-content: center;
            opacity: 0; pointer-events: none;
            transition: opacity 0.25s;
        }
        #modalEntrega.aberto {
            opacity: 1; pointer-events: all;
        }
        #modalEntrega .me-overlay {
            position: absolute; inset: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(3px);
        }
        #modalEntrega .me-box {
            position: relative; z-index: 1;
            background: #fff;
            border-radius: 20px 20px 0 0;
            width: min(560px, 100vw);
            max-height: 92svh;
            overflow-y: auto;
            padding: 0;
            box-shadow: 0 -8px 40px rgba(0,0,0,0.15);
            transform: translateY(30px);
            transition: transform 0.3s cubic-bezier(.2,.8,.4,1);
        }
        #modalEntrega.aberto .me-box {
            transform: translateY(0);
        }
        .me-header {
            display: flex; align-items: center; justify-content: space-between;
            padding: 1.4rem 1.5rem 1rem;
            border-bottom: 1px solid #f0ebe5;
            position: sticky; top: 0; background: #fff; z-index: 2;
        }
        .me-header h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.35rem; font-weight: 400; color: #2c2c2c; margin: 0;
        }
        .me-fechar {
            background: #f5f0eb; border: none; border-radius: 50%;
            width: 32px; height: 32px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: #888; font-size: 1.1rem; flex-shrink: 0;
        }
        .me-fechar:hover { background: #e8ddd3; }
        .me-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.85rem; }
        .me-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .me-grupo { display: flex; flex-direction: column; gap: 0.3rem; }
        .me-grupo label {
            font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
            letter-spacing: 0.5px; color: #888;
        }
        .me-grupo input {
            padding: 0.75rem 0.9rem;
            border: 1.5px solid #e8ddd3; border-radius: 10px;
            font-family: 'Montserrat', sans-serif; font-size: 0.9rem;
            color: #2c2c2c; outline: none; background: #fff;
            transition: border-color 0.2s;
        }
        .me-grupo input:focus { border-color: #d4a5a5; }
        .me-grupo input::placeholder { color: #c4b5af; }
        .me-grupo.full { grid-column: 1 / -1; }
        .me-obrigatorio { color: #d4a5a5; }
        .me-footer {
            padding: 1rem 1.5rem 1.5rem;
            border-top: 1px solid #f0ebe5;
            display: flex; flex-direction: column; gap: 0.6rem;
        }
        .me-btn-enviar {
            display: flex; align-items: center; justify-content: center; gap: 0.5rem;
            background: #25D366; color: #fff; border: none; border-radius: 50px;
            padding: 1rem; font-size: 0.95rem; font-weight: 600;
            font-family: 'Montserrat', sans-serif; cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            min-height: 52px;
        }
        .me-btn-enviar:hover { background: #1ebe5a; transform: translateY(-1px); }
        .me-btn-voltar {
            background: none; border: none; color: #aaa;
            font-size: 0.82rem; cursor: pointer; text-align: center;
            font-family: inherit; padding: 0.25rem;
        }
        .me-btn-voltar:hover { color: #888; }
        @media (max-width: 480px) {
            .me-row { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
                #sacolaDrawer { width:100vw; border-radius:0; }
                .sacola-header { padding:1.25rem; }
                .sacola-itens { padding:0.75rem 1rem; }
                .sacola-footer { padding:1rem; }
                .btn-enviar-sacola { padding:0.9rem; font-size:0.9rem; min-height:52px; }
                .sacola-item { padding:0.75rem; }
                .sacola-item-img { width:68px; height:68px; }
            }
        `;
        document.head.appendChild(s);
    }
}

// ===================================
// RENDERIZAR PAINEL
// ===================================
function renderizarPainelSacola() {
    const sacola  = getSacola();
    const itensEl = document.getElementById('sacolaItens');
    const footerEl = document.getElementById('sacolaFooter');
    if (!itensEl) return;

    if (sacola.length === 0) {
        itensEl.innerHTML = `
            <div class="sacola-vazia">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <p>Sua sacola está vazia.<br>Adicione produtos para continuar.</p>
            </div>`;
        footerEl.innerHTML = '';
        return;
    }

    itensEl.innerHTML = sacola.map((item, idx) => `
        <div class="sacola-item">
            <img class="sacola-item-img"
                src="${item.imagem || 'https://placehold.co/80x80/f5f0eb/d4a5a5?text=Foto'}"
                onerror="this.src='https://placehold.co/80x80/f5f0eb/d4a5a5?text=Foto'"
                alt="${item.nome}">
            <div class="sacola-item-info">
                <p class="sacola-item-nome">${item.nome}</p>
                <p class="sacola-item-detalhes">
                    ${item.tamanho ? `Tam: <strong>${item.tamanho}</strong>` : ''}
                    ${item.tamanho && item.cor ? ' · ' : ''}
                    ${item.cor ? `Cor: <strong>${item.cor}</strong>` : ''}
                    <br><span style="font-size:0.72rem;color:#aaa;">Ref: ${item.referencia || item.id}</span>
                </p>
                ${item.preco ? `<p class="sacola-item-preco">R$ ${(parseFloat(item.preco) * item.quantidade).toFixed(2).replace('.', ',')}</p>` : ''}
                <div class="sacola-item-qtd">
                    <button class="sacola-qtd-btn" onclick="alterarQuantidade(${idx}, -1)">−</button>
                    <span class="sacola-qtd-num">${item.quantidade}</span>
                    <button class="sacola-qtd-btn" onclick="alterarQuantidade(${idx}, +1)">+</button>
                </div>
            </div>
            <button class="sacola-item-remover" onclick="removerDaSacola(${idx})" title="Remover">×</button>
        </div>
    `).join('');

    // Total
    const totalItens = sacola.reduce((s, i) => s + i.quantidade, 0);
    const temPreco   = sacola.some(i => i.preco);
    const totalValor = sacola.reduce((s, i) => s + (parseFloat(i.preco || 0) * i.quantidade), 0);

    footerEl.innerHTML = `
        ${temPreco ? `
        <div class="sacola-total">
            <span class="sacola-total-label">Total estimado</span>
            <span class="sacola-total-valor">R$ ${totalValor.toFixed(2).replace('.', ',')}</span>
        </div>
        <p class="sacola-total-itens">${totalItens} ${totalItens === 1 ? 'item' : 'itens'} na sacola</p>
        ` : `<p class="sacola-total-itens">${totalItens} ${totalItens === 1 ? 'item' : 'itens'} na sacola</p>`}
        <button class="btn-enviar-sacola" onclick="abrirModalEntrega()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Finalizar pelo WhatsApp
        </button>
        <button class="btn-limpar-sacola" onclick="limparSacola()">Limpar sacola</button>
    `;
}

// ===================================
// ENVIAR PARA WHATSAPP
// ===================================
// ── Modal de entrega ──────────────────────────────
function abrirModalEntrega() {
    const sacola = getSacola();
    if (!sacola.length) return;

    // Criar modal se não existir
    if (!document.getElementById('modalEntrega')) {
        const m = document.createElement('div');
        m.id = 'modalEntrega';
        m.innerHTML =
            '<div class="me-overlay" onclick="fecharModalEntrega()"></div>' +
            '<div class="me-box">' +
                '<div class="me-header">' +
                    '<h3>Dados para Entrega</h3>' +
                    '<button class="me-fechar" onclick="fecharModalEntrega()">×</button>' +
                '</div>' +
                '<div class="me-body">' +
                    '<div class="me-row">' +
                        '<div class="me-grupo">' +
                            '<label>Nome <span class="me-obrigatorio">*</span></label>' +
                            '<input id="meNome" type="text" placeholder="Seu nome">' +
                        '</div>' +
                        '<div class="me-grupo">' +
                            '<label>Sobrenome <span class="me-obrigatorio">*</span></label>' +
                            '<input id="meSobrenome" type="text" placeholder="Seu sobrenome">' +
                        '</div>' +
                    '</div>' +
                    '<div class="me-grupo full">' +
                        '<label>Endereço (Rua / Av.) <span class="me-obrigatorio">*</span></label>' +
                        '<input id="meEndereco" type="text" placeholder="Ex: Rua das Flores, 123">' +
                    '</div>' +
                    '<div class="me-row">' +
                        '<div class="me-grupo">' +
                            '<label>CEP <span class="me-obrigatorio">*</span></label>' +
                            '<input id="meCep" type="text" placeholder="00000-000" maxlength="9" oninput="mascararCep(this)">' +
                        '</div>' +
                        '<div class="me-grupo">' +
                            '<label>Número <span class="me-obrigatorio">*</span></label>' +
                            '<input id="meNumero" type="text" placeholder="Ex: 42">' +
                        '</div>' +
                    '</div>' +
                    '<div class="me-grupo full">' +
                        '<label>Complemento</label>' +
                        '<input id="meComplemento" type="text" placeholder="Ex: Apto 3, Bloco B">' +
                    '</div>' +
                    '<div class="me-grupo full">' +
                        '<label>Ponto de Referência</label>' +
                        '<input id="meReferencia" type="text" placeholder="Ex: Próximo ao mercado X">' +
                    '</div>' +
                '</div>' +
                '<div class="me-footer">' +
                    '<button class="me-btn-enviar" onclick="confirmarEnvioWhatsApp()">' +
                        '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
                        ' Enviar Pedido pelo WhatsApp' +
                    '</button>' +
                    '<button class="me-btn-voltar" onclick="fecharModalEntrega()">← Voltar para a sacola</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(m);
    }

    // Fechar sacola e abrir modal
    fecharSacola();
    setTimeout(function() {
        document.getElementById('modalEntrega').classList.add('aberto');
        document.body.style.overflow = 'hidden';
        document.getElementById('meNome').focus();
    }, 200);
}

function fecharModalEntrega() {
    const m = document.getElementById('modalEntrega');
    if (m) {
        m.classList.remove('aberto');
        document.body.style.overflow = '';
    }
}

function mascararCep(input) {
    var v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5);
    input.value = v;
}

function confirmarEnvioWhatsApp() {
    var nome       = (document.getElementById('meNome').value || '').trim();
    var sobrenome  = (document.getElementById('meSobrenome').value || '').trim();
    var endereco   = (document.getElementById('meEndereco').value || '').trim();
    var cep        = (document.getElementById('meCep').value || '').trim();
    var numero     = (document.getElementById('meNumero').value || '').trim();
    var complemento = (document.getElementById('meComplemento').value || '').trim();
    var referencia  = (document.getElementById('meReferencia').value || '').trim();

    if (!nome || !sobrenome || !endereco || !cep || !numero) {
        // Destacar campos obrigatórios vazios
        ['meNome','meSobrenome','meEndereco','meCep','meNumero'].forEach(function(id) {
            var el = document.getElementById(id);
            if (!el.value.trim()) {
                el.style.borderColor = '#e74c3c';
                el.addEventListener('input', function() { el.style.borderColor = ''; }, { once: true });
            }
        });
        return;
    }

    fecharModalEntrega();
    enviarSacolaWhatsApp(nome + ' ' + sobrenome, endereco, cep, numero, complemento, referencia);
}

// ──────────────────────────────────────────────────
function enviarSacolaWhatsApp(nomeCliente, endereco, cep, numero, complemento, referencia) {
    const sacola = getSacola();
    if (!sacola.length) return;

    const WHATSAPP_NUMBER = (window.BY_CONFIG && window.BY_CONFIG.numero) || '5583986714216';
    const SEP = '━━━━━━━━━━━━━━━━━━━━';

    const lista = sacola.map((item, i) => {
        const partes = [
            (i + 1) + '. *' + item.nome + '*',
            item.tamanho  ? '   Tamanho: *' + item.tamanho + '*' : '',
            item.cor      ? '   Cor: *' + item.cor + '*' : '',
            '   Ref: *' + (item.referencia || item.id) + '*',
            '   Qtd: *' + item.quantidade + (item.quantidade === 1 ? ' unidade' : ' unidades') + '*',
            item.preco    ? '   Valor unit.: *R$ ' + parseFloat(item.preco).toFixed(2).replace('.', ',') + '*' : '',
        ];
        return partes.filter(Boolean).join('\n');
    }).join('\n\n');

    const temPreco   = sacola.some(i => i.preco);
    const totalValor = sacola.reduce((s, i) => s + (parseFloat(i.preco || 0) * i.quantidade), 0);
    const totalItens = sacola.reduce((s, i) => s + i.quantidade, 0);

    const enderecoFormatado = [
        '   Rua/Av.: ' + endereco + ', ' + numero,
        complemento ? '   Complemento: ' + complemento : '',
        '   CEP: ' + cep,
        referencia  ? '   Referência: ' + referencia : '',
    ].filter(Boolean).join('\n');

    const rodape = temPreco
        ? '\n*Total estimado: R$ ' + totalValor.toFixed(2).replace('.', ',') + '* (' + totalItens + (totalItens === 1 ? ' item' : ' itens') + ')'
        : '\n*Total: ' + totalItens + (totalItens === 1 ? ' item' : ' itens') + '*';

    const mensagem = [
        'Ola! Gostaria de finalizar meu pedido pela BY Closet.',
        '',
        SEP,
        '*ITENS DO PEDIDO*',
        SEP,
        lista,
        SEP,
        rodape,
        '',
        SEP,
        '*DADOS DE ENTREGA*',
        SEP,
        '   Cliente: *' + nomeCliente + '*',
        enderecoFormatado,
        SEP,
        '',
        'Aguardo confirmacao de disponibilidade e formas de pagamento. Obrigada!',
    ].join('\n');

    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(mensagem), '_blank');
}

// ===================================
// CRIAR ÍCONE DA SACOLA NO NAV
// ===================================
function injetarIconeSacola() {
    document.querySelectorAll('nav').forEach(nav => {
        // Se já existe um botão de sacola no HTML, só garante o onclick
        const existente = nav.querySelector('.sacola-icon-btn');
        if (existente) {
            existente.onclick = abrirSacola;
            return;
        }

        // Caso não exista, injeta dinamicamente
        const btn = document.createElement('button');
        btn.className = 'sacola-icon-btn';
        btn.setAttribute('aria-label', 'Abrir sacola');
        btn.onclick = abrirSacola;
        btn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span class="sacola-count">0</span>
        `;

        const toggle = nav.querySelector('.mobile-menu-toggle');
        if (toggle) {
            nav.insertBefore(btn, toggle);
        } else {
            nav.appendChild(btn);
        }
    });

    atualizarContadorSacola();
}

// ===================================
// TOAST
// ===================================
function mostrarToastSacola(msg) {
    const t = document.createElement('div');
    t.style.cssText = `
        position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(20px);
        background:#2c2c2c; color:#fff; padding:0.8rem 1.5rem; border-radius:8px;
        font-size:0.85rem; font-family:'Montserrat',sans-serif; z-index:99999;
        opacity:0; transition:all 0.3s; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.2);
    `;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => {
        t.style.opacity = '1';
        t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => t.remove(), 300);
    }, 2800);
}

// ===================================
// INIT
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    injetarIconeSacola();
    criarDrawer();
});
