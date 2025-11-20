import { createClient } from '@supabase/supabase-js'

// Use as mesmas chaves aqui (em produção, use variáveis de ambiente)
const supabaseUrl = 'SUA_URL_DO_SUPABASE'
const supabaseKey = 'SUA_CHAVE_ANON_DO_SUPABASE'

export const supabase = createClient(supabaseUrl, supabaseKey)