# Carpeta Assets

Esta carpeta está destinada a almacenar los recursos multimedia del sitio web, como imágenes, videos y archivos de audio.

## Estructura recomendada

```
assets/
├── images/     # Para imágenes (jpg, png, gif, etc.)
├── videos/     # Para archivos de video
└── audio/      # Para archivos de audio
```

## Cómo usar las imágenes

1. Coloca tus imágenes en la carpeta `images/`
2. Usa rutas relativas para referenciar las imágenes en tu HTML:
   ```html
   <img src="../assets/images/nombre-de-tu-imagen.jpg" alt="Descripción de la imagen">
   ```

## Formatos recomendados

- Imágenes: .jpg, .png, .gif, .webp
- Videos: .mp4, .webm
- Audio: .mp3, .ogg, .wav

## Tamaños recomendados

- Imágenes pequeñas: 300x200px
- Imágenes medianas: 600x400px
- Imágenes grandes: 1200x800px

## Optimización

Recuerda optimizar tus archivos multimedia antes de subirlos:
- Comprime las imágenes para reducir el tamaño
- Usa formatos modernos como WebP para imágenes
- Considera usar diferentes resoluciones para diferentes dispositivos 