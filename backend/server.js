require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');


const app = express();

app.use(cors());
app.use(express.json()); 


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Faltam as variáveis SUPABASE_URL ou SUPABASE_KEY no arquivo .env');
  process.exit(1); 
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.send('✅ Backend da CyberLibrary está rodando!');
});

app.get('/games', async (req, res) => {
 
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


app.post('/games', async (req, res) => {
  const { title, platform, genre, score, imageUrl, notes } = req.body;

  const { data, error } = await supabase
    .from('games')
    .insert([{ title, platform, genre, score, imageUrl, notes }])
    .select(); 

  if (error) {
    console.error('Erro ao criar jogo:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});


app.put('/games/:id', async (req, res) => {
  const { id } = req.params; 
  const { title, platform, genre, score, imageUrl, notes } = req.body;

  const { data, error } = await supabase
    .from('games')
    .update({ title, platform, genre, score, imageUrl, notes })
    .eq('id', id) 
    .select();

  if (error) {
    console.error('Erro ao atualizar jogo:', error.message);
    return res.status(500).json({ error: error.message });
  }

  
  if (data.length === 0) {
    return res.status(404).json({ error: 'Jogo não encontrado para atualização' });
  }

  res.json(data[0]);
});


app.delete('/games/:id', async (req, res) => {
  const { id } = req.params; 

  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id); 

  if (error) {
    console.error('Erro ao excluir jogo:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Jogo deletado com sucesso' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});