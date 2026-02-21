// ===================================
// BY Closet — Config Global
// Lê configurações salvas pelo admin e aplica no site
// ===================================

(function() {
    var DEFAULTS = {
        numero:    '5583986714216',
        mensagem:  'Ola! Tenho interesse nesta peca da BY Closet:',
        nome:      'BY Closet',
        instagram: '@BYCLOSET.CO',
        email:     'contato@bycloset.com'
    };

    window.BY_CONFIG = {
        numero:    localStorage.getItem('by_whatsapp_numero')    || DEFAULTS.numero,
        mensagem:  localStorage.getItem('by_whatsapp_mensagem')  || DEFAULTS.mensagem,
        nome:      localStorage.getItem('by_loja_nome')          || DEFAULTS.nome,
        instagram: localStorage.getItem('by_loja_instagram')     || DEFAULTS.instagram,
        email:     localStorage.getItem('by_loja_email')         || DEFAULTS.email,
    };

    // Atualizar footer de atendimento se existir na página
    document.addEventListener('DOMContentLoaded', function() {
        // Telefone
        var spans = document.querySelectorAll('.contact-item span');
        spans.forEach(function(span) {
            var txt = span.textContent.trim();
            // Detectar pelo conteúdo original: número
            if (/^\(\d{2}\)/.test(txt) || /^\d{10,}/.test(txt.replace(/\D/g, ''))) {
                var n = BY_CONFIG.numero;
                var fmt = '(' + n.slice(2,4) + ') ' + n.slice(4,9) + '-' + n.slice(9);
                span.textContent = fmt;
            }
            // Email
            if (txt.includes('@') && txt.includes('.') && !txt.startsWith('@')) {
                span.textContent = BY_CONFIG.email;
            }
            // Instagram
            if (txt.startsWith('@')) {
                span.textContent = BY_CONFIG.instagram.startsWith('@')
                    ? BY_CONFIG.instagram.toUpperCase()
                    : '@' + BY_CONFIG.instagram.toUpperCase();
            }
        });
    });
})();
