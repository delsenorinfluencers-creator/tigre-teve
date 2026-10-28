# Tigre Teve — sitio web actualizado

## Incluye
- Diseño amarillo y negro con logo de Tigre Teve.
- Portada con espacio para señal en vivo (requiere el enlace oficial del stream).
- Secciones independientes: noticias, nacionales, regionales, comunidad, deportes, programación, servicios y contacto.
- Noticias con URL individual por slug, portada y galería de varias fotos.
- Panel `/admin/` para iniciar sesión, crear, editar, publicar y eliminar noticias.
- Configuración de Supabase incluida con Project URL y publishable key pública proporcionadas para este proyecto.

## Antes de publicar
1. Sube el contenido de este ZIP a la raíz del repositorio GitHub.
2. En Vercel, despliega el repositorio como sitio estático.
3. En Supabase Authentication > Users, crea el usuario administrador autorizado.
4. Comprueba que la tabla `news` tenga las columnas usadas por el sitio y las políticas RLS apropiadas.
5. En Storage, el bucket `noticias-fotos` debe ser público para servir URLs de imágenes; las políticas de INSERT/UPDATE/DELETE deben limitarse al bucket y a usuarios autenticados autorizados.
6. Prueba `/admin/` y crea una noticia de prueba.

## Seguridad y notas
- La publishable key `sb_publishable_...` está diseñada para uso en el navegador. No incluyas nunca `service_role` ni claves secretas en archivos públicos.
- La seguridad real depende de las políticas RLS de la tabla y de Storage. Las políticas que solo exigen `authenticated` permiten escribir a cualquier usuario autenticado; crea únicamente cuentas autorizadas y revisa las condiciones de cada política.
- Las secciones Programación y Servicios son páginas base; la gestión dinámica de programas, clientes, publicidad y clima todavía no está conectada a tablas ni a proveedores externos.
- El reproductor en vivo es un espacio reservado: necesita el enlace/embed oficial del canal.
- Las tarjetas de demostración solo se muestran cuando no se pueden consultar las noticias. Si ves noticias de ejemplo, revisa la conexión y RLS.
- Reemplaza los datos de contacto y las tarjetas de clientes de ejemplo por información oficial.

## Actualización: compartir noticias y videos
- Las noticias muestran botones para compartir usando el menú nativo del dispositivo, copiar el enlace cuando no esté disponible y compartir en Facebook o WhatsApp.
- El panel permite imagen de portada por URL o archivo, varias fotos adicionales, enlace de video, resumen, contenido, slug y publicación inmediata.
- Para habilitar el campo de video en una base ya existente, ejecuta en Supabase SQL Editor: `ALTER TABLE public.news ADD COLUMN IF NOT EXISTS video_url text;`


### Icono y compartir noticias
- El logo de Tigre Teve se utiliza como favicon, icono de acceso y marca en todas las páginas.
- Las URLs `/noticia/<slug>/` se sirven con metadatos Open Graph y Twitter generados en servidor para que Facebook, WhatsApp y otras plataformas puedan leer el titular, el resumen y la foto de portada.
- La función usa la clave pública de Supabase y solo consulta noticias publicadas; las políticas RLS deben permitir lectura pública de noticias publicadas.

## Estructura de la página de inicio
La portada muestra primero las últimas noticias de cualquier categoría, en bloques de tres con el botón “Ver más noticias”. Después aparece la señal en vivo junto a la programación y, más abajo, las secciones por ubicación/categoría: Aguachica, Gamarra, Región, Nacionales, Comunidad y Deportes. Para que las categorías locales se llenen automáticamente, usa esos nombres en el campo `category` al publicar desde el panel.


## Señal en vivo
La portada incorpora el reproductor oficial de OpenCaster: `https://new.opencaster.com/player/embed?user=tigre_teve`. Si el proveedor impide la reproducción embebida en algún navegador, usa el enlace directo a la señal.
