import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sranhamnbunggymdbbhb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyYW5oYW1uYnVuZ2d5bWRiYmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjczMjksImV4cCI6MjA3OTI0MzMyOX0.4uEFTksuD2XvaFAFHBTDVUEvDc7_3WfFJyZE7SIFHXE'

export const supabase = createClient(supabaseUrl, supabaseKey)