# VAMOS — Sitio Web Oficial

Sitio web de **VAMOS — Visionarios Anónimos al Mundo con el Objetivo de Servir Internacional, A.C.**, asociación civil sin fines de lucro dedicada a fortalecer el capital humano de las organizaciones de la sociedad civil (OSC).

**Dominio:** https://vamosinternacional.org

## Stack tecnológico

- **HTML5 estático** + **Tailwind CSS** (vía CDN, con configuración de marca inline)
- **Vanilla JavaScript** — menú móvil, animaciones de scroll (reveal), botones magnéticos, modal del reporte financiero
- **Iconografía:** Material Symbols Outlined y Font Awesome 6.5.1
- **Tipografía:** Epilogue (Google Fonts)
- **Formularios:** Netlify Forms (formulario de contacto con honeypot antispam y envío AJAX)
- **CMS:** Decap CMS en `/admin/` (backend git-gateway con Netlify Identity)
- **Hosting:** Netlify (deploy automático desde GitHub)

## Estructura

```text
/
├── index.html              # Homepage
├── programas.html          # Los 3 programas (con evidencia fotográfica)
├── acerca.html             # Quiénes somos, marco legal, equipo directivo
├── apoya.html              # Donaciones, marco normativo, transparencia
├── contactanos.html        # Formulario de contacto (Netlify Forms)
├── aviso-privacidad.html   # Aviso de privacidad (LFPDPPP)
├── terminos.html           # Términos y condiciones
├── 404.html                # Página de error
├── css/                    # style.css + effects.css (blobs, topo-bg, animaciones)
├── js/main.js              # Interactividad global
├── img/                    # Imágenes optimizadas (uploads/ = media del CMS)
├── admin/                  # Decap CMS (config.yml + index.html)
├── data/                   # Datos editables desde el CMS
├── netlify.toml            # Configuración de Netlify
├── _headers                # Cache-Control y seguridad
├── robots.txt / sitemap.xml
```

## Colores de marca

| Token | Hex |
|---|---|
| `primary` | `#00599a` |
| `navy-deep` | `#002d51` |
| `accent-orange` | `#ff8b2c` |

## Después de cada deploy en Netlify

1. **Formulario de contacto:** activar notificaciones por correo en *Forms → Notifications* hacia `vamosint.ac@gmail.com`.
2. **CMS (/admin/):** requiere Netlify Identity habilitado + Git Gateway (ver instrucciones en `admin/config.yml`).

## Pendientes de contenido

- [ ] Teléfono de contacto (footers muestran "Teléfono pendiente")
- [ ] Imagen Open Graph real en `img/og-image.jpg`
- [ ] Fecha de "Última actualización" en aviso de privacidad y términos
- [ ] Activar bloque de deducibilidad en `apoya.html` **solo** al recibir el oficio de donataria autorizada del SAT (está comentado en el HTML)
- [ ] Validar textos legales con el contador/abogado fiscal

## Datos legales

- **Razón social:** Visionarios Anónimos al Mundo con el Objetivo de Servir Internacional, A.C.
- **RFC:** VAM2404015L1
- **Domicilio fiscal:** Manuel Ojinaga 1824, Col. Santa Rita, 31020 Chihuahua, México
