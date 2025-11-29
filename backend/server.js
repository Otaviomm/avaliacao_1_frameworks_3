require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// --- IMPORTAÇÕES DO SWAGGER ---
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

// Validação de variáveis
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Faltam as variáveis .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- CONFIGURAÇÃO MANUAL DO SWAGGER (SEM COMENTÁRIOS) ---
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CyberLibrary API',
    version: '1.0.0',
    description: 'Documentação da API (Avaliação 2)',
    contact: { name: 'Desenvolvedor Full Stack' },
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Servidor Local' }
  ],
  components: {
    schemas: {
      Game: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          platform: { type: 'string' },
          genre: { type: 'string' },
          score: { type: 'integer' },
          imageUrl: { type: 'string' },
          notes: { type: 'string' },
        }
      }
    }
  },
  // AQUI DEFINIMOS AS ROTAS DIRETAMENTE PARA NÃO DAR ERRO
  paths: {
    '/': {
      get: {
        summary: 'Verifica status da API',
        responses: {
          200: { description: 'Servidor Online' }
        }
      }
    },
    '/games': {
      get: {
        summary: 'Lista todos os jogos',
        tags: ['Games'],
        responses: {
          200: {
            description: 'Lista de jogos retornada',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Game' } }
              }
            }
          }
        }
      },
      post: {
        summary: 'Cria um novo jogo',
        tags: ['Games'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Game' }
            }
          }
        },
        responses: {
          201: { description: 'Criado com sucesso' },
          500: { description: 'Erro no servidor' }
        }
      }
    },
    '/games/{id}': {
      put: {
        summary: 'Atualiza um jogo',
        tags: ['Games'],
        parameters: [
          { in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID do jogo' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Game' }
            }
          }
        },
        responses: {
          200: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' }
        }
      },
      delete: {
        summary: 'Remove um jogo',
        tags: ['Games'],
        parameters: [
          { in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID do jogo' }
        ],
        responses: {
          200: { description: 'Deletado com sucesso' }
        }
      }
    }
  }
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [], // Deixamos vazio propositalmente para ele usar a definição manual acima
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// --- ROTAS DO SERVIDOR (CÓDIGO LÓGICO) ---

app.get('/', (req, res) => {
  res.send('✅ Backend da CyberLibrary está rodando! Acesse /api-docs');
});

app.get('/games', async (req, res) => {
  const { data, error } = await supabase.from('games').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/games', async (req, res) => {
  const { title, platform, genre, score, imageUrl, notes } = req.body;
  const { data, error } = await supabase.from('games').insert([{ title, platform, genre, score, imageUrl, notes }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { title, platform, genre, score, imageUrl, notes } = req.body;
  const { data, error } = await supabase.from('games').update({ title, platform, genre, score, imageUrl, notes }).eq('id', id).select();
  if (error) return res.status(500).json({ error: error.message });
  if (data.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
  res.json(data[0]);
});

app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('games').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Jogo deletado com sucesso' });
});

// Inicia o Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Documentação Swagger: http://localhost:3000/api-docs`);
});