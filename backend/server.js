// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// 2. Inicializa o App Express
const app = express();

// 3. Configurações de Middleware
app.use(cors()); // Permite que o Frontend (porta 5173) fale com o Backend (porta 3000)
app.use(express.json()); // Permite que o Backend entenda JSON enviado no corpo da requisição

// 4. Validação das Chaves do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Faltam as variáveis SUPABASE_URL ou SUPABASE_KEY no arquivo .env');
  process.exit(1); // Para o servidor se não tiver configuração
}

// 5. Conexão com o Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// 6. Rota de Teste (Raiz)
app.get('/', (req, res) => {
  res.send('✅ Backend da CyberLibrary está rodando!');
});

// --- ROTAS DO CRUD (JOGOS) ---

// [GET] Listar todos os jogos
app.get('/games', async (req, res) => {
  // Busca todos os jogos e ordena pelos mais recentes
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar jogos:', error.message);
    return res.status(500).json({ error: error.message });
  }
  
  res.json(data);
});

// [POST] Criar um novo jogo
app.post('/games', async (req, res) => {
  const { title, platform, genre, score, imageUrl, notes } = req.body;

  const { data, error } = await supabase
    .from('games')
    .insert([{ title, platform, genre, score, imageUrl, notes }])
    .select(); // .select() é necessário para retornar o item criado

  if (error) {
    console.error('Erro ao criar jogo:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

// [PUT] Atualizar um jogo existente (NECESSITA DO /:id)
app.put('/games/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID da URL
  const { title, platform, genre, score, imageUrl, notes } = req.body;

  const { data, error } = await supabase
    .from('games')
    .update({ title, platform, genre, score, imageUrl, notes })
    .eq('id', id) // Filtra pelo ID correto
    .select();

  if (error) {
    console.error('Erro ao atualizar jogo:', error.message);
    return res.status(500).json({ error: error.message });
  }

  // Se não encontrar o jogo, retorna erro 404
  if (data.length === 0) {
    return res.status(404).json({ error: 'Jogo não encontrado para atualização' });
  }

  res.json(data[0]);
});

// [DELETE] Excluir um jogo (NECESSITA DO /:id)
app.delete('/games/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID da URL

  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id); // Filtra pelo ID correto

  if (error) {
    console.error('Erro ao excluir jogo:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Jogo deletado com sucesso' });
});

// 7. Iniciar o Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});