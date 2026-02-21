# 🚀 Guia Completo - Supabase Integrado

## ✅ O que foi feito

O projeto BY Closet agora está **100% integrado com Supabase**! Isso significa:

- ✅ Produtos salvos na nuvem (não precisa mais de JSON local)
- ✅ Admin atualiza → Site atualiza em **tempo real**
- ✅ Upload de fotos direto pelo painel
- ✅ Múltiplos dispositivos podem gerenciar ao mesmo tempo
- ✅ Backup automático na nuvem

---

## 📋 Passo a Passo para Ativar

### **1. Executar o SQL no Supabase**

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Entre no seu projeto "ByCloset"
3. No menu lateral, clique em **SQL Editor**
4. Clique em **"New query"**
5. Abra o arquivo `data/setup.sql` deste projeto
6. **Copie TODO o conteúdo** do arquivo
7. **Cole no SQL Editor** do Supabase
8. Clique em **Run** (botão verde no canto inferior direito)
9. Aguarde aparecer: `BY Closet — Banco configurado com sucesso! 🎉`

**O que este SQL faz:**
- Cria a tabela `produtos` com todos os campos
- Cria o bucket `imagens` para upload de fotos
- Define políticas de segurança (RLS)
- Insere 6 produtos iniciais de exemplo

---

### **2. Verificar se funcionou**

1. No Supabase, vá em **Table Editor** (menu lateral)
2. Você deve ver a tabela **produtos** com 6 itens
3. Vá em **Storage** → deve ter o bucket **imagens**

Se aparecerem as duas coisas, **está tudo pronto**! ✅

---

### **3. Testar o Admin**

1. Abra o arquivo `admin.html` no navegador
2. Você deve ver:
   - Status: **"Conectado ✓"** (bolinha verde no sidebar)
   - **6 produtos** na Visão Geral
   - Estatísticas atualizadas

3. Teste adicionar um produto:
   - Clique em **"Novo Produto"**
   - Preencha nome, categoria, descrição
   - Faça upload de uma foto ou cole um link
   - Clique em **"Salvar Produto"**
   - O produto deve aparecer imediatamente na lista

---

### **4. Testar o Site**

1. Abra `index.html` no navegador
2. Os produtos devem carregar automaticamente
3. Clique em qualquer produto
4. A página individual deve abrir normalmente

---

## 🔐 Segurança das Chaves

**⚠️ IMPORTANTE:** As chaves do Supabase estão no código porque você pediu para continuar. Mas para colocar o site no ar, você PRECISA:

### **Trocar as chaves antigas:**

1. Vá em **Settings → API** no Supabase
2. Clique em **Reset database password** ou **Regenerate API keys**
3. Copie a **nova chave anon**
4. Substitua em **3 arquivos**:

```javascript
// js/db.js (linha 8)
const SUPABASE_KEY = 'COLE_A_CHAVE_NOVA_AQUI';

// admin.html (linha 467)
const SUPABASE_KEY = 'COLE_A_CHAVE_NOVA_AQUI';

// js/catalogo.js (linha 21)
const SUPABASE_KEY = 'COLE_A_CHAVE_NOVA_AQUI';

// js/produto.js (linha 7)
const SUPABASE_KEY = 'COLE_A_CHAVE_NOVA_AQUI';
```

---

## 🎯 Como funciona agora

### **Admin adiciona produto:**
```
1. Abre admin.html
2. Clica "Novo Produto"
3. Preenche formulário
4. Faz upload da foto → vai direto pro Supabase Storage
5. Clica "Salvar" → salva no banco Supabase
6. ✅ Produto aparece no site IMEDIATAMENTE
```

### **Cliente acessa o site:**
```
1. Abre index.html
2. JavaScript busca produtos do Supabase
3. Renderiza os produtos na tela
4. Cliente clica em um produto
5. Carrega detalhes do Supabase
6. Cliente clica no WhatsApp → envia mensagem
```

---

## 📱 Upload de Imagens

### **Como funciona:**

1. No admin, ao criar/editar produto
2. Clique na área de upload
3. Escolha uma foto do celular/computador
4. A foto é enviada automaticamente para o Supabase Storage
5. A URL da foto é salva no produto
6. A foto aparece no site instantaneamente

**Ou:** Cole um link externo (Google Drive, Instagram, etc.)

---

## 🆘 Solução de Problemas

### **"Conectando..." não muda para "Conectado ✓"**
→ Verifique se executou o SQL corretamente
→ Veja o console do navegador (F12) para erros
→ Confirme que as chaves estão corretas

### **"Erro ao carregar produtos"**
→ Abra o console (F12) e veja o erro específico
→ Provavelmente problema com as chaves ou com a execução do SQL

### **Produtos não aparecem no site**
→ Verifique se tem produtos cadastrados no admin
→ Veja se o SQL foi executado (deve ter 6 produtos iniciais)

### **Upload de foto não funciona**
→ Verifique se o bucket "imagens" foi criado
→ Vá em Storage no Supabase e confira
→ Como alternativa, use links externos

---

## 🎨 Customizações

### **Mudar número do WhatsApp:**
Edite em **js/catalogo.js** linha 11:
```javascript
const WHATSAPP_NUMBER = '5583986714216'; // Seu número aqui
```

### **Adicionar novas categorias:**
No admin, ao criar produto, escolha a categoria. Se quiser adicionar novas:
Edite `admin.html` na linha ~320 (dentro do `<select id="formCategoria">`)

---

## 📊 Estatísticas do Banco

Para ver quantos produtos você tem:
1. Vá em **SQL Editor** no Supabase
2. Execute: `SELECT COUNT(*) FROM produtos;`

Para ver todos os produtos:
```sql
SELECT id, nome, categoria, destaque, novo FROM produtos;
```

---

## 🚀 Próximos Passos

Agora que está tudo integrado:

1. ✅ Adicione seus produtos reais
2. ✅ Substitua as fotos de exemplo pelas suas
3. ✅ Teste todo o fluxo (admin → site → WhatsApp)
4. ✅ **TROQUE AS CHAVES** antes de publicar
5. ✅ Publique o site (Vercel, Netlify, etc.)

---

## 💡 Dicas

- **Backup:** O Supabase faz backup automático, mas você pode exportar com o botão no admin
- **Fotos:** Tamanho ideal 800x800px para carregar rápido
- **Desempenho:** O Supabase tem CDN global, vai carregar rápido em qualquer lugar
- **Limites:** Plano grátis tem 500MB de banco e 1GB de storage (suficiente para centenas de produtos)

---

**✅ Tudo pronto! O BY Closet agora é um e-commerce profissional com banco de dados na nuvem!** 🎉
