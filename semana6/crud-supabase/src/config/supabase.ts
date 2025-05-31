import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kdgqwdggpgzurefxhvob.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZ3F3ZGdncGd6dXJlZnhodm9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzMxNTAsImV4cCI6MjA2MzUwOTE1MH0.1kFqDTNR625qzY0n_AwhpWnzJFt8kdVhdbd5848IERc'


export const supabase = createClient(supabaseUrl, supabaseKey) 