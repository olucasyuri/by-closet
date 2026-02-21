// ===================================
// BY Closet - Destaques JavaScript
// ===================================

var WHATSAPP_NUMBER = (window.BY_CONFIG && window.BY_CONFIG.numero) || '5583986714216';
const SUPABASE_URL = 'https://qanmqxyfvlqeadvcjswf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbm1xeHlmdmxxZWFkdmNqc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzcyNzQsImV4cCI6MjA4NjkxMzI3NH0.YYgr0HxtYhzekcTa97cu-parCGY0gmSrMQHCA-zL7cw';

let slideAtual = 0;
let totalSlides = 0;
let autoplayInterval = null;

function abrirWhatsApp(nomeProduto, imagemUrl) {
    const mensagem = `Olá! Tenho interesse nesta peça em destaque:\n\n*${nomeProduto}*\n\nGostaria de saber mais informações sobre disponibilidade, tamanhos e valores.\n\nImagem: ${imagemUrl}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

// ===================================
// CARROSSEL
// ===================================
function mostrarSlide(index) {
    const slides = document.querySelectorAll('.carrossel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    totalSlides = slides.length;

    if (totalSlides === 0) return;

    if (index >= totalSlides) slideAtual = 0;
    else if (index < 0) slideAtual = totalSlides - 1;
    else slideAtual = index;

    slides.forEach(s => s.classList.remove('active'));
    indicadores.forEach(i => i.classList.remove('active'));

    slides[slideAtual].classList.add('active');
    if (indicadores[slideAtual]) indicadores[slideAtual].classList.add('active');

    const track = document.getElementById('carrosselTrack');
    if (track) track.style.transform = `translateX(-${slideAtual * 100}%)`;
}

function moverCarrossel(direcao) {
    mostrarSlide(slideAtual + direcao);
    pararAutoplay();
    setTimeout(iniciarAutoplay, 10000);
}

function irParaSlide(index) {
    mostrarSlide(index);
    pararAutoplay();
    setTimeout(iniciarAutoplay, 10000);
}

function iniciarAutoplay() {
    autoplayInterval = setInterval(() => mostrarSlide(slideAtual + 1), 5000);
}

function pararAutoplay() {
    clearInterval(autoplayInterval);
}

// Teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moverCarrossel(-1);
    else if (e.key === 'ArrowRight') moverCarrossel(1);
});

// Touch/Swipe
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) moverCarrossel(diff > 0 ? 1 : -1);
});

// ===================================
// CARREGAR DESTAQUES DO SUPABASE
// ===================================
async function carregarDestaques() {
    try {
        const { createClient } = supabase;
        const db = createClient(SUPABASE_URL, SUPABASE_KEY);

        const { data, error } = await db
            .from('produtos')
            .select('*')
            .eq('destaque', true)
            .order('criado_em', { ascending: false });

        if (error) throw error;

        const produtos = data || [];
        renderizarCarrossel(produtos);
        renderizarGaleria(produtos);

        if (produtos.length > 0) {
            mostrarSlide(0);
            iniciarAutoplay();
        } else {
            document.getElementById('carrosselSection').style.display = 'none';
        }

    } catch (err) {
        console.error('Erro ao carregar destaques:', err);
        document.getElementById('carrosselSection').style.display = 'none';
        document.querySelector('.galeria-grid').innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:#6b6b6b;">
                <h3 style="margin-bottom:0.5rem;">Nenhum destaque cadastrado</h3>
                <p>Marque a flag "Em Destaque" em qualquer produto no painel administrativo.</p>
            </div>`;
    }
}

// ===================================
// RENDERIZAR CARROSSEL
// ===================================
function renderizarCarrossel(produtos) {
    const track = document.getElementById('carrosselTrack');
    const indicadoresEl = document.getElementById('carrosselIndicadores');

    if (!produtos || produtos.length === 0) {
        track.innerHTML = '';
        indicadoresEl.innerHTML = '';
        return;
    }

    const whatsappIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

    track.innerHTML = produtos.map((produto, i) => {
        const imagem = Array.isArray(produto.imagens) ? produto.imagens[0] : produto.imagens;
        return `
        <div class="carrossel-slide ${i === 0 ? 'active' : ''}">
            <div class="slide-content">
                <div class="slide-image" style="cursor:pointer;" onclick="window.location.href='produto.html?id=${produto.id}'">
                    <img src="${imagem}" alt="${produto.nome}" onerror="this.src='https://placehold.co/800x600/f5f0eb/d4a5a5?text=Sem+Foto'">
                    ${produto.badge ? `<div class="slide-badge">${produto.badge}</div>` : ''}
                </div>
                <div class="slide-info">
                    <span class="slide-categoria">${produto.categoria || ''}</span>
                    <h2>${produto.nome}</h2>
                    <p class="slide-descricao">${produto.descricao || ''}</p>
                    ${produto.tamanhos && produto.tamanhos.length > 0 ? `
                    <div class="slide-detalhes">
                        <div class="detalhe-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                            <span>Tamanhos: ${produto.tamanhos.join(', ')}</span>
                        </div>
                        ${produto.material ? `<div class="detalhe-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                            <span>${produto.material}</span>
                        </div>` : ''}
                    </div>` : ''}
                    <button class="btn-whatsapp-destaque" onclick="abrirWhatsApp('${produto.nome.replace(/'/g, "\\'")}', '${imagem}')">
                        ${whatsappIcon}
                        Consultar no WhatsApp
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    indicadoresEl.innerHTML = produtos.map((_, i) =>
        `<span class="indicador ${i === 0 ? 'active' : ''}" onclick="irParaSlide(${i})"></span>`
    ).join('');
}

// ===================================
// RENDERIZAR GALERIA
// ===================================
function renderizarGaleria(produtos) {
    const grid = document.getElementById('galeriaGrid');

    if (!produtos || produtos.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:#6b6b6b;">
                <h3 style="margin-bottom:0.5rem;">Nenhum destaque cadastrado</h3>
                <p>Marque a flag "Em Destaque" em qualquer produto no painel administrativo.</p>
            </div>`;
        return;
    }

    grid.innerHTML = produtos.map(produto => {
        const imagem = Array.isArray(produto.imagens) ? produto.imagens[0] : produto.imagens;
        return `
        <div class="galeria-item" onclick="window.location.href='produto.html?id=${produto.id}'" style="cursor:pointer;">
            <img src="${imagem}" alt="${produto.nome}" onerror="this.src='https://placehold.co/600x450/f5f0eb/d4a5a5?text=Sem+Foto'">
            <div class="galeria-overlay">
                <h3>${produto.nome}</h3>
                <p>Ver detalhes</p>
            </div>
        </div>`;
    }).join('');
}

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    carregarDestaques();
    setInterval(carregarDestaques, 30000);
});

console.log('✨ Destaques BY Closet carregados!');
