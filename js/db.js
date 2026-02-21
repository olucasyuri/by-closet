// ===================================
// BY Closet — Conexão Supabase
// ===================================
// ⚠️ TROQUE AS CHAVES ANTES DE PUBLICAR!

const SUPABASE_URL = 'https://qanmqxyfvlqeadvcjswf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbm1xeHlmdmxxZWFkdmNqc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzcyNzQsImV4cCI6MjA4NjkxMzI3NH0.YYgr0HxtYhzekcTa97cu-parCGY0gmSrMQHCA-zL7cw';

// Inicializar cliente
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ===================================
// PRODUTOS — CRUD COMPLETO
// ===================================

const Produtos = {

    // Buscar todos
    async listar() {
        const { data, error } = await db
            .from('produtos')
            .select('*')
            .order('criado_em', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Buscar por ID
    async buscarPorId(id) {
        const { data, error } = await db
            .from('produtos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Buscar destaques
    async listarDestaques() {
        const { data, error } = await db
            .from('produtos')
            .select('*')
            .eq('destaque', true)
            .order('criado_em', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Buscar por categoria
    async listarPorCategoria(categoria) {
        const { data, error } = await db
            .from('produtos')
            .select('*')
            .eq('categoria', categoria);

        if (error) throw error;
        return data;
    },

    // Criar novo produto
    async criar(produto) {
        const { data, error } = await db
            .from('produtos')
            .insert([produto])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Editar produto
    async editar(id, produto) {
        const { data, error } = await db
            .from('produtos')
            .update(produto)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Excluir produto
    async excluir(id) {
        const { error } = await db
            .from('produtos')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};

// ===================================
// IMAGENS — UPLOAD
// ===================================

const Imagens = {

    // Fazer upload de imagem
    async upload(arquivo) {
        const extensao = arquivo.name.split('.').pop();
        const nomeUnico = `produtos/${Date.now()}.${extensao}`;

        const { data, error } = await db.storage
            .from('imagens')
            .upload(nomeUnico, arquivo, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Retornar URL pública
        const { data: urlData } = db.storage
            .from('imagens')
            .getPublicUrl(nomeUnico);

        return urlData.publicUrl;
    },

    // Excluir imagem
    async excluir(url) {
        const caminho = url.split('/storage/v1/object/public/imagens/')[1];
        if (!caminho) return;

        const { error } = await db.storage
            .from('imagens')
            .remove([caminho]);

        if (error) throw error;
    }
};

console.log('✅ Supabase conectado — BY Closet');
