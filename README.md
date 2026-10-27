# Tigre Teve — sitio web

## Incluye
- Página de inicio con diseño amarillo y negro.
- Secciones independientes: Últimas noticias, Nacionales, Regionales, Comunidad, Deportes y Contacto.
- URL individual por noticia: `/noticia/slug-de-la-noticia/`.
- Panel `/admin/` para crear, editar, publicar y eliminar noticias.
- Foto de portada más varias fotos adicionales por noticia.
- Supabase para base de datos, inicio de sesión y almacenamiento de imágenes.

## Instalar en GitHub y Vercel
1. Descomprime el ZIP y sube todos sus archivos y carpetas a la raíz del repositorio de GitHub.
2. Importa el repositorio en Vercel y despliega como sitio estático.
3. Crea un proyecto Supabase.
4. Ejecuta `supabase-schema.sql` completo en Supabase > SQL Editor.
5. En Supabase > Authentication > Users, crea el usuario administrador.
6. En Supabase > Project Settings > API copia la Project URL y la clave pública publishable/anon.
7. Completa esos dos valores en `supabase-config.js`, guarda y sube el cambio a GitHub.
8. Abre `/admin/`, inicia sesión, completa los datos y selecciona una portada y varias fotos adicionales.

**Seguridad:** no uses ni publiques la clave `service_role` o cualquier clave secreta. Solo debe ponerse en el navegador la clave pública publishable/anon; las políticas RLS de la base de datos controlan el acceso.

## Importante
- Sin configurar Supabase, el sitio muestra noticias de demostración y el panel no guarda contenido en línea.
- Reemplaza los textos de contacto por los datos oficiales del medio.
- El sitio crea páginas visibles por slug, pero las vistas previas enriquecidas de Facebook con título y foto distintos para cada noticia requieren prerenderizado o metadatos sociales dinámicos adicionales.
- La política de administración está planteada para usuarios autenticados. Solo crea cuentas de administrador autorizadas en Supabase.
