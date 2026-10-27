const SITE = 'https://tig teve.invalid';
const SUPABASE_URL = 'https://yaadlekmivggnavxexee.supabase.co';
const SUPABASE_KEY = 'sb_publishable_g021wrtZ-092l8oHd_RS_w_p53st-5l';
const LOGO = 'https://i.ibb.co/xPhVMZ5/3dfe9250-0ff1-40b7-9881-ddedb589adbe.png';
const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
module.exports = async (req, res) => {
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const origin = host ? `${proto}://${host}` : 'https://example.com';
  const slug = String(req.query.slug || '').replace(/^\/+|\/+$/g, '');
  if (!slug) return res.status(400).send('Falta el slug de la noticia.');
  let n = null;
  try {
    const url = `${SUPABASE_URL}/rest/v1/news?select=title,slug,category,excerpt,body,cover_url,gallery_urls,video_url,created_at&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`;
    const r = await fetch(url, {headers:{apikey:SUPABASE_KEY, Authorization:`Bearer ${SUPABASE_KEY}`}});
    if (r.ok) n = (await r.json())[0] || null;
  } catch (_) {}
  if (!n) {
    res.setHeader('Cache-Control','no-store');
    return res.status(404).send(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Noticia no encontrada | Tigre Teve</title><link rel="icon" href="${LOGO}"><link rel="stylesheet" href="/styles.css"></head><body><main class="wrap article"><h1>Noticia no encontrada</h1><a href="/">Volver a Tigre Teve</a></main></body></html>`);
  }
  const title = n.title || 'Noticias';
  const description = n.excerpt || String(n.body || '').slice(0, 180) || 'Lee esta noticia en Tigre Teve.';
  const image = n.cover_url || LOGO;
  const canonical = `${origin}/noticia/${encodeURIComponent(n.slug)}/`;
  const gallery = Array.isArray(n.gallery_urls) ? n.gallery_urls : [];
  const galleryHtml = gallery.length ? `<h2>Galería de fotos</h2><div class="gallery">${gallery.map((u,i)=>`<a href="${esc(u)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(u)}" alt="Foto ${i+1} de ${esc(title)}"></a>`).join('')}</div>` : '';
  const video = n.video_url ? `<p><a class="share-link" href="${esc(n.video_url)}" target="_blank" rel="noopener">▶ Ver video de la noticia</a></p>` : '';
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Tigre Teve</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}"><link rel="icon" type="image/png" href="${LOGO}"><link rel="shortcut icon" href="${LOGO}"><link rel="apple-touch-icon" href="${LOGO}"><meta property="og:type" content="article"><meta property="og:site_name" content="Tigre Teve"><meta property="og:url" content="${esc(canonical)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${esc(image)}"><meta property="og:image:secure_url" content="${esc(image)}"><meta property="og:image:alt" content="${esc(title)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(image)}"><link rel="stylesheet" href="/styles.css"></head><body><div class="topbar"><div class="wrap">INFORMACIÓN · ACTUALIDAD · COMUNIDAD <span>EL PULSO DE LA NOTICIA</span></div></div><header class="wrap brandrow"><a class="brand" href="/"><img src="${LOGO}" alt="Logo Tigre Teve"><span>TIGRE <b>TEVE</b><small>NOTICIAS · TELEVISIÓN · COMUNIDAD</small></span></a></header><nav><div class="wrap"><a href="/">Inicio</a><a href="/ultimas-noticias/">Últimas noticias</a><a href="/nacionales/">Nacionales</a><a href="/regionales/">Regionales</a><a href="/comunidad/">Comunidad</a><a href="/deportes/">Deportes</a></div></nav><main class="wrap"><article class="article"><a href="/">← Volver al inicio</a><p class="category">${esc(n.category || 'Noticias')}</p><h1>${esc(title)}</h1><p>${esc(description)}</p><img class="cover" src="${esc(image)}" alt="${esc(title)}"><div class="article-share"><button type="button" id="shareStory">↗ Compartir noticia</button><a class="share-link" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}">Compartir en Facebook</a><a class="share-link" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?text=${encodeURIComponent(title+' — '+canonical)}">Enviar por WhatsApp</a></div>${video}<div class="article-copy">${esc(n.body || '').replace(/\n/g,'<br>')}</div>${galleryHtml}</article></main><footer><div class="wrap"><h2>TIGRE <span style="color:#f2c400">TEVE</span></h2><p>Noticias, televisión y comunidad.</p><p>© Tigre Teve</p></div></footer><script>document.getElementById('shareStory').addEventListener('click',async()=>{const data={title:${JSON.stringify(title)},text:${JSON.stringify(description)},url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(location.href);document.getElementById('shareStory').textContent='✓ Enlace copiado'}}catch(e){if(e.name!=='AbortError')window.prompt('Copia el enlace de la noticia:',location.href)}});</script></body></html>`;
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=300');
  return res.status(200).send(html);
};
