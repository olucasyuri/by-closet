-- ===================================
-- BY Closet — Setup Supabase
-- Cole este SQL no SQL Editor do Supabase
-- ===================================

-- 1. CRIAR TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS produtos (
    id          TEXT PRIMARY KEY DEFAULT 'prod-' || extract(epoch from now())::bigint::text,
    nome        TEXT NOT NULL,
    categoria   TEXT NOT NULL,
    descricao   TEXT DEFAULT '',
    imagens     TEXT[] DEFAULT '{}',       -- array de URLs
    tamanhos    TEXT[] DEFAULT '{}',       -- array de tamanhos
    cores       TEXT[] DEFAULT '{}',       -- array de cores
    material    TEXT DEFAULT '',
    badge       TEXT DEFAULT NULL,
    destaque    BOOLEAN DEFAULT false,
    novo        BOOLEAN DEFAULT false,
    em_alta     BOOLEAN DEFAULT false,
    detalhes    TEXT[] DEFAULT '{}',
    criado_em   TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRIGGER para atualizar data automaticamente
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_timestamp
BEFORE UPDATE ON produtos
FOR EACH ROW EXECUTE FUNCTION atualizar_timestamp();

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICA: qualquer pessoa pode LER os produtos (vitrine pública)
CREATE POLICY "Leitura pública de produtos"
ON produtos FOR SELECT
TO anon, authenticated
USING (true);

-- 5. POLÍTICA: apenas usuários autenticados podem ESCREVER
CREATE POLICY "Admin pode inserir produtos"
ON produtos FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admin pode editar produtos"
ON produtos FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Admin pode excluir produtos"
ON produtos FOR DELETE
TO authenticated
USING (true);

-- 6. CRIAR BUCKET DE IMAGENS no Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('imagens', 'imagens', true)
ON CONFLICT DO NOTHING;

-- 7. POLÍTICA do Storage: leitura pública
CREATE POLICY "Imagens públicas"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'imagens');

-- 8. POLÍTICA do Storage: admin faz upload
CREATE POLICY "Admin faz upload de imagens"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'imagens');

CREATE POLICY "Admin deleta imagens"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'imagens');

-- 9. INSERIR PRODUTOS INICIAIS
INSERT INTO produtos (id, nome, categoria, descricao, imagens, tamanhos, cores, material, badge, destaque, novo) VALUES
('prod-001', 'Vestido Longo Elegante', 'vestidos', 'Vestido longo em tecido fluido premium, perfeito para ocasiões especiais.', ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'], ARRAY['PP','P','M','G','GG'], ARRAY['Bege','Preto','Branco'], 'Tecido Fluido Premium', 'Em Destaque', true, false),
('prod-002', 'Blusa Cropped Casual', 'blusas', 'Blusa cropped em malha macia, ideal para o dia a dia.', ARRAY['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800'], ARRAY['P','M','G'], ARRAY['Rose','Bege','Azul'], 'Malha Premium', 'Novo', true, true),
('prod-003', 'Calça Wide Leg Alfaiataria', 'calcas', 'Calça wide leg em alfaiataria premium, elegância garantida.', ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'], ARRAY['36','38','40','42','44'], ARRAY['Preto','Marrom','Bege'], 'Alfaiataria Premium', NULL, false, false),
('prod-004', 'Conjunto Linho Natural', 'conjuntos', 'Conjunto exclusivo em linho natural, perfeito para o verão.', ARRAY['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800'], ARRAY['P','M','G'], ARRAY['Natural','Branco','Areia'], '100% Linho', 'Exclusivo', true, false),
('prod-005', 'Saia Midi Plissada', 'saias', 'Saia midi plissada, versatilidade para diversos looks.', ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'], ARRAY['PP','P','M','G'], ARRAY['Bege','Preto','Azul Marinho'], 'Crepe Plissado', NULL, false, false),
('prod-006', 'Blazer Oversized Premium', 'blazers', 'Blazer oversized em alfaiataria premium, looks elegantes.', ARRAY['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'], ARRAY['P','M','G','GG'], ARRAY['Preto','Bege','Marrom'], 'Alfaiataria Estruturada', 'Novo', true, true);

-- ✅ PRONTO! Banco configurado.
SELECT 'BY Closet — Banco configurado com sucesso! 🎉' AS status;
