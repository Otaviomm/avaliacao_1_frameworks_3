require('dotenv').config();
console.log("Tentando ler URL:", process.env.SUPABASE_URL);
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Aqui ele lê o arquivo .env para conectar no seu banco
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Rota para testar se está funcionando
app.get('/', (req, res) => {
  res.send('Backend CyberLibrary rodando! 🚀');
});

// --- ROTAS QUE USAM SUAS COLUNAS ---

// 1. LISTAR JOGOS (Usa o SELECT)
app.get('/games', async (req, res) => {
  // Busca todas as colunas da tabela 'games'
  const { data, error } = await supabase.from('games').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 2. CRIAR JOGO (Usa o INSERT com suas colunas)
app.post('/games', async (req, res) => {
  // Recebe os dados do frontend
  const { title, platform, genre, score, imageUrl, notes } = req.body;
  
  // Envia para o Supabase nas colunas certas
  const { data, error } = await supabase
    .from('games')
    .insert([{ title, platform, genre, score, imageUrl, notes }])
    .select();
    
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});