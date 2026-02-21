// ===================================
// BY Closet - Sistema de Favoritos
// ===================================

const FAVORITOS_KEY = 'bycloset_favoritos';

// ===================================
// OBTER FAVORITOS
// ===================================
function getFavoritos() {
    const favoritos = localStorage.getItem(FAVORITOS_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
}

// ===================================
// SALVAR FAVORITOS
// ===================================
function salvarFavoritos(favoritos) {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    atualizarContadorFavoritos();
}

// ===================================
// VERIFICAR SE É FAVORITO
// ===================================
function isFavorito(produtoId) {
    const favoritos = getFavoritos();
    return favoritos.includes(produtoId);
}

// ===================================
// TOGGLE FAVORITO
// ===================================
function toggleFavorito(produtoId) {
    let favoritos = getFavoritos();
    const btn = event.currentTarget;
    
    if (isFavorito(produtoId)) {
        // Remover dos favoritos
        favoritos = favoritos.filter(id => id !== produtoId);
        btn.classList.remove('favorited');
        
        // Animação de remoção
        btn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
        
        mostrarNotificacao('Removido dos favoritos', 'info');
    } else {
        // Adicionar aos favoritos
        favoritos.push(produtoId);
        btn.classList.add('favorited');
        
        // Animação de coração
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 300);
        
        mostrarNotificacao('Adicionado aos favoritos ❤️', 'success');
    }
    
    salvarFavoritos(favoritos);
}

// ===================================
// ATUALIZAR CONTADOR
// ===================================
function atualizarContadorFavoritos() {
    const favoritos = getFavoritos();
    const contadores = document.querySelectorAll('.favoritos-count');
    
    contadores.forEach(contador => {
        contador.textContent = favoritos.length;
        
        if (favoritos.length > 0) {
            contador.style.display = 'flex';
        } else {
            contador.style.display = 'none';
        }
    });
}

// ===================================
// NOTIFICAÇÕES
// ===================================
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remover notificação anterior se existir
    const notifAnterior = document.querySelector('.notificacao');
    if (notifAnterior) {
        notifAnterior.remove();
    }
    
    // Criar notificação
    const notif = document.createElement('div');
    notif.className = `notificacao notificacao-${tipo}`;
    notif.textContent = mensagem;
    
    // Estilos inline
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notif);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Adicionar animações CSS
if (!document.getElementById('notif-styles')) {
    const style = document.createElement('style');
    style.id = 'notif-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Atualizar contador ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarContadorFavoritos);
