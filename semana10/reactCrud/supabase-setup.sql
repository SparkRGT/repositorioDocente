-- Crear la tabla movies en Supabase
-- Ejecuta este script en el SQL Editor de tu dashboard de Supabase

CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  url TEXT NOT NULL,
  sinopsis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir operaciones CRUD públicas
-- (En producción, deberías ajustar estas políticas según tus necesidades de seguridad)

-- Política para SELECT (leer)
CREATE POLICY "Permitir lectura pública de movies" 
ON movies 
FOR SELECT 
USING (true);

-- Política para INSERT (crear)
CREATE POLICY "Permitir inserción pública de movies" 
ON movies 
FOR INSERT 
WITH CHECK (true);

-- Política para UPDATE (actualizar)
CREATE POLICY "Permitir actualización pública de movies" 
ON movies 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Política para DELETE (eliminar)
CREATE POLICY "Permitir eliminación pública de movies" 
ON movies 
FOR DELETE 
USING (true);

-- Insertar algunos datos de ejemplo (opcional)
INSERT INTO movies (nombre, url, sinopsis) VALUES
  ('El Padrino', 'https://images.unsplash.com/photo-1489599408542-d5b4de04b957?w=500&h=300&fit=crop', 'La historia de una familia de la mafia italiana en Nueva York.'),
  ('Pulp Fiction', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=300&fit=crop', 'Varias historias entrelazadas de crimen en Los Ángeles.'),
  ('El Señor de los Anillos', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=300&fit=crop', 'Un hobbit emprende un viaje épico para destruir un anillo maligno.')
ON CONFLICT DO NOTHING;

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_movies_updated_at ON movies;
CREATE TRIGGER update_movies_updated_at
    BEFORE UPDATE ON movies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 