// ===================================
// BY Closet — Modais Institucionais
// ===================================

var MODAIS_CONTENT = {

    privacidade: {
        titulo: 'Política de Privacidade',
        icone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        conteudo: [
            {
                subtitulo: 'Coleta de Dados',
                texto: 'A BY Closet coleta apenas as informações necessárias para o atendimento ao cliente: nome, telefone e e-mail fornecidos voluntariamente através de formulários de contato ou pelo WhatsApp. Não realizamos coleta automática de dados sensíveis.'
            },
            {
                subtitulo: 'Uso das Informações',
                texto: 'Seus dados são utilizados exclusivamente para: responder suas solicitações e dúvidas, processar pedidos, enviar informações sobre produtos de seu interesse e melhorar nosso atendimento. Nunca compartilhamos, vendemos ou cedemos seus dados a terceiros sem seu consentimento, exceto quando exigido por lei.'
            },
            {
                subtitulo: 'Armazenamento e Segurança',
                texto: 'As informações são armazenadas de forma segura e mantidas pelo período necessário para cumprimento das finalidades descritas ou conforme exigido pela legislação vigente, respeitando a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).'
            },
            {
                subtitulo: 'Seus Direitos (LGPD)',
                texto: 'Em conformidade com a LGPD, você tem direito a: confirmar a existência de tratamento dos seus dados, acessar seus dados, corrigir dados incompletos ou incorretos, solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, e revogar o consentimento a qualquer momento. Para exercer esses direitos, entre em contato conosco pelo WhatsApp ou e-mail.'
            },
            {
                subtitulo: 'Cookies',
                texto: 'Nosso site pode utilizar cookies estritamente necessários para seu funcionamento. Não utilizamos cookies para rastreamento publicitário de terceiros.'
            },
            {
                subtitulo: 'Contato',
                texto: 'Dúvidas sobre nossa Política de Privacidade? Entre em contato: contato@bycloset.com | (83) 98671-4216'
            }
        ]
    },

    trocas: {
        titulo: 'Trocas e Devoluções',
        icone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/><path d="M3 12h4l3 9L14 3l3 9h4"/></svg>',
        conteudo: [
            {
                subtitulo: 'Prazo para Troca ou Devolução',
                texto: 'De acordo com o Art. 49 do Código de Defesa do Consumidor (Lei nº 8.078/1990), em compras realizadas fora do estabelecimento comercial (pelo WhatsApp, internet ou catálogo), você tem direito de se arrepender e devolver o produto em até 7 dias corridos a partir do recebimento, sem necessidade de justificativa.'
            },
            {
                subtitulo: 'Condições para Troca',
                texto: 'Para solicitar troca ou devolução, o produto deve estar: sem uso, com etiqueta original, na embalagem original quando possível, e sem sinais de avaria causados pelo cliente. Produtos com defeito de fabricação têm prazo de reclamação de 90 dias conforme Art. 26 do CDC.'
            },
            {
                subtitulo: 'Defeito de Fabricação',
                texto: 'Produtos com vício (defeito) oculto têm garantia legal de 90 dias para produtos não duráveis e 30 dias para semiduráveis, conforme o CDC. Identificado o defeito, você pode escolher entre: substituição do produto, abatimento proporcional do preço ou restituição do valor pago.'
            },
            {
                subtitulo: 'Como Solicitar',
                texto: 'Entre em contato conosco pelo WhatsApp (83) 98671-4216 ou pelo e-mail contato@bycloset.com informando: número do pedido, motivo da troca/devolução e fotos do produto (quando aplicável). Nossa equipe retornará em até 2 dias úteis com as instruções.'
            },
            {
                subtitulo: 'Reembolso',
                texto: 'Aprovada a devolução, o reembolso será realizado pela mesma forma de pagamento utilizada na compra, em até 10 dias úteis. Em caso de troca, o novo produto será enviado após confirmação do retorno do item original.'
            },
            {
                subtitulo: 'Frete de Devolução',
                texto: 'Em caso de defeito de fabricação ou erro nosso, o frete de devolução é por nossa conta. Em caso de arrependimento (Art. 49 CDC), o frete de retorno fica a cargo do consumidor, salvo negociação prévia.'
            }
        ]
    },

    pagamento: {
        titulo: 'Formas de Pagamento',
        icone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
        conteudo: [
            {
                subtitulo: 'PIX',
                especial: 'pix',
                texto: 'Pagamento instantâneo com aprovação imediata. Disponível 24h por dia, 7 dias por semana. Ao finalizar o pedido pelo WhatsApp, nossa equipe enviará a chave PIX para pagamento. Confirme sempre a identidade do destinatário antes de realizar a transferência.',
                destaque: 'Desconto especial para pagamentos via PIX — consulte nossa equipe!'
            },
            {
                subtitulo: 'Cartão de Crédito',
                especial: 'credito',
                texto: 'Aceitamos os principais cartões de crédito do mercado. O parcelamento e as condições são combinados diretamente com nossa equipe pelo WhatsApp de acordo com o valor do pedido.',
                bandeiras: ['Visa', 'Mastercard', 'Elo', 'Hipercard', 'American Express']
            },
            {
                subtitulo: 'Cartão de Débito',
                especial: 'debito',
                texto: 'Pagamento à vista no débito com aprovação imediata. Aceitamos as principais bandeiras. Disponível para retirada presencial ou conforme combinado com nossa equipe.',
                bandeiras: ['Visa', 'Mastercard', 'Elo']
            },
            {
                subtitulo: 'Dúvidas sobre Pagamento',
                texto: 'Nossa equipe está disponível para tirar dúvidas e orientar sobre a melhor forma de pagamento para você. Entre em contato pelo WhatsApp (83) 98671-4216.'
            }
        ]
    }

};

// ===================================
// ABRIR MODAL
// ===================================
function abrirModal(tipo) {
    var dados = MODAIS_CONTENT[tipo];
    if (!dados) return;

    // Remove modal anterior se existir
    var anterior = document.getElementById('byModal');
    if (anterior) anterior.remove();

    // Montar conteúdo
    var corpo = '';
    for (var i = 0; i < dados.conteudo.length; i++) {
        var bloco = dados.conteudo[i];
        var extra = '';

        if (bloco.bandeiras) {
            extra = '<div class="modal-bandeiras">';
            for (var b = 0; b < bloco.bandeiras.length; b++) {
                extra += '<span class="modal-bandeira">' + bloco.bandeiras[b] + '</span>';
            }
            extra += '</div>';
        }
        if (bloco.destaque) {
            extra += '<div class="modal-destaque">' + bloco.destaque + '</div>';
        }

        var iconBloco = '';
        if (bloco.especial === 'pix')     iconBloco = '<span class="modal-bloco-icon pix">PIX</span>';
        if (bloco.especial === 'credito') iconBloco = '<span class="modal-bloco-icon card">Crédito</span>';
        if (bloco.especial === 'debito')  iconBloco = '<span class="modal-bloco-icon card">Débito</span>';

        corpo += '<div class="modal-bloco">'
               + '<h4>' + bloco.subtitulo + iconBloco + '</h4>'
               + '<p>' + bloco.texto + '</p>'
               + extra
               + '</div>';
    }

    var modal = document.createElement('div');
    modal.id = 'byModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = '<div class="modal-overlay" onclick="fecharModal()"></div>'
        + '<div class="modal-box">'
        + '<div class="modal-topo">'
        + '<div class="modal-topo-icone">' + dados.icone + '</div>'
        + '<h2 class="modal-titulo">' + dados.titulo + '</h2>'
        + '<button class="modal-fechar" onclick="fecharModal()" aria-label="Fechar">'
        + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        + '</button>'
        + '</div>'
        + '<div class="modal-corpo">' + corpo + '</div>'
        + '<div class="modal-rodape">'
        + '<p>Duvidas? Fale conosco</p>'
        + '<a class="modal-btn-wa" href="https://wa.me/5583986714216" target="_blank">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
        + ' Falar no WhatsApp'
        + '</a>'
        + '</div>'
        + '</div>';

    document.body.appendChild(modal);

    // Animar entrada
    requestAnimationFrame(function() {
        modal.classList.add('modal-visivel');
    });

    // Fechar com ESC
    document.addEventListener('keydown', _modalEscHandler);
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    var modal = document.getElementById('byModal');
    if (!modal) return;
    modal.classList.remove('modal-visivel');
    setTimeout(function() { if (modal.parentNode) modal.remove(); }, 300);
    document.removeEventListener('keydown', _modalEscHandler);
    document.body.style.overflow = '';
}

function _modalEscHandler(e) {
    if (e.key === 'Escape') fecharModal();
}

// Injetar CSS dos modais dinamicamente
(function() {
    if (document.getElementById('modal-styles')) return;
    var s = document.createElement('style');
    s.id = 'modal-styles';
    s.textContent = `
        #byModal {
            position: fixed; inset: 0; z-index: 99999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.25s ease;
        }
        #byModal.modal-visivel { opacity: 1; }

        .modal-overlay {
            position: absolute; inset: 0;
            background: rgba(0,0,0,0.55);
            backdrop-filter: blur(4px);
        }

        .modal-box {
            position: relative; z-index: 1;
            background: #fff;
            border-radius: 18px;
            width: min(680px, 94vw);
            max-height: 88vh;
            display: flex; flex-direction: column;
            box-shadow: 0 24px 80px rgba(0,0,0,0.22);
            transform: translateY(20px);
            transition: transform 0.3s cubic-bezier(.2,.8,.4,1);
            overflow: hidden;
        }
        #byModal.modal-visivel .modal-box { transform: translateY(0); }

        .modal-topo {
            display: flex; align-items: center; gap: 1rem;
            padding: 1.75rem 2rem;
            border-bottom: 1px solid #f0ebe5;
            background: linear-gradient(135deg, #faf7f4 0%, #fff 100%);
            flex-shrink: 0;
        }
        .modal-topo-icone {
            width: 52px; height: 52px; border-radius: 14px;
            background: #f5f0eb; display: flex;
            align-items: center; justify-content: center;
            color: #b07070; flex-shrink: 0;
        }
        .modal-titulo {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.6rem; font-weight: 400;
            color: #2c2c2c; flex: 1; margin: 0;
        }
        .modal-fechar {
            background: none; border: none; cursor: pointer;
            color: #aaa; padding: 0.4rem; border-radius: 8px;
            transition: background 0.2s, color 0.2s; flex-shrink: 0;
        }
        .modal-fechar:hover { background: #f5f0eb; color: #2c2c2c; }

        .modal-corpo {
            overflow-y: auto; padding: 1.75rem 2rem;
            display: flex; flex-direction: column; gap: 1.5rem;
            flex: 1;
        }
        .modal-corpo::-webkit-scrollbar { width: 5px; }
        .modal-corpo::-webkit-scrollbar-track { background: #faf7f4; }
        .modal-corpo::-webkit-scrollbar-thumb { background: #e8ddd3; border-radius: 10px; }

        .modal-bloco {
            padding: 1.25rem 1.5rem;
            border-radius: 12px;
            background: #faf7f4;
            border-left: 3px solid #e8ddd3;
            transition: border-color 0.2s;
        }
        .modal-bloco:hover { border-left-color: #d4a5a5; }

        .modal-bloco h4 {
            font-size: 0.9rem; font-weight: 600;
            color: #2c2c2c; margin-bottom: 0.6rem;
            text-transform: uppercase; letter-spacing: 0.5px;
            display: flex; align-items: center; gap: 0.6rem;
        }
        .modal-bloco p {
            font-size: 0.9rem; color: #555;
            line-height: 1.7; margin: 0;
        }

        .modal-bloco-icon {
            font-size: 0.7rem; font-weight: 700;
            padding: 0.2rem 0.55rem; border-radius: 20px;
            letter-spacing: 0.5px;
        }
        .modal-bloco-icon.pix {
            background: #e6f7f0; color: #1a8c50;
        }
        .modal-bloco-icon.card {
            background: #e8f0fb; color: #1a4fa0;
        }

        .modal-bandeiras {
            display: flex; flex-wrap: wrap; gap: 0.4rem;
            margin-top: 0.85rem;
        }
        .modal-bandeira {
            font-size: 0.72rem; font-weight: 600;
            padding: 0.25rem 0.65rem; border-radius: 20px;
            background: #fff; border: 1px solid #e8ddd3;
            color: #6b6b6b; letter-spacing: 0.3px;
        }

        .modal-destaque {
            margin-top: 0.85rem;
            padding: 0.65rem 1rem;
            background: linear-gradient(135deg, #e6f7f0, #d4f0e4);
            border-radius: 8px;
            color: #1a6b40; font-size: 0.82rem; font-weight: 500;
        }

        .modal-rodape {
            padding: 1.25rem 2rem;
            border-top: 1px solid #f0ebe5;
            display: flex; align-items: center;
            justify-content: space-between; gap: 1rem;
            background: #fff; flex-shrink: 0;
        }
        .modal-rodape p {
            font-size: 0.85rem; color: #888; margin: 0;
        }
        .modal-btn-wa {
            display: flex; align-items: center; gap: 0.5rem;
            background: #25D366; color: #fff;
            padding: 0.65rem 1.25rem; border-radius: 50px;
            font-size: 0.85rem; font-weight: 600;
            text-decoration: none;
            transition: background 0.2s, transform 0.15s;
            white-space: nowrap;
        }
        .modal-btn-wa:hover { background: #1ebe5a; transform: translateY(-1px); }

        @media (max-width: 480px) {
            .modal-topo { padding: 1.25rem 1.25rem; }
            .modal-corpo { padding: 1.25rem; gap: 1rem; }
            .modal-rodape { flex-direction: column; text-align: center; }
            .modal-btn-wa { width: 100%; justify-content: center; }
            .modal-titulo { font-size: 1.3rem; }
        }
    `;
    document.head.appendChild(s);
})();
