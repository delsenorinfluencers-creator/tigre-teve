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
