# Pioneros México - Brand Guidelines

Este documento define la identidad visual, tipografía, colores y componentes del sistema de diseño utilizado en el sitio web de **Pioneros México** (`pioneros.mx`).

## 1. Identidad Visual y Sensación
*   **Concepto:** "Editorial, Profesional, Inspiracional".
*   **Layout:** Uso de contenedores amplios (`max-w-7xl`) con padding generoso.
*   **Estética:** 'Glassmorphism' en el encabezado, tarjetas con bordes extra redondeados (`rounded-[3rem]` o `rounded-3xl`), sombras profundas y uso estratégico de micro-interacciones.

---

## 2. Paleta de Colores
Centralizada en la configuración de Tailwind CSS dentro de los archivos HTML:

### Colores Principales
| Nombre | Hex | Aplicación |
| :--- | :--- | :--- |
| `primary` | `#00599a` | Azul marca, botones secundarios, enlaces destacados. |
| `primary-dark` | `#004070` | Hover en elementos primarios. |
| `navy-deep` | `#002d51` | Títulos principales (`H1`, `H2`), fondos de secciones oscuras. Nota: Se permite el uso de `text-slate-900` para títulos principales sobre fondos claros como alternativa válida. |
| `accent-orange` | `#ff8b2c` | Call-to-Action (CTA) de alta prioridad, acentos visuales. |
| `accent-dark` | `#e67a22` | Hover en elementos de acento (naranja). |

### Colores de Soporte
| Nombre | Hex | Aplicación |
| :--- | :--- | :--- |
| `background-light` | `#ffffff` | Fondo base de la página. |
| `background-alt` | `#f8fafc` | Fondos de sección alternos (`slate-50`). |
| `text-main` | `#1e293b` | Color base de párrafos y cuerpo de texto. |

---

## 3. Tipografía
Se utiliza exclusivamente **Epilogue** de Google Fonts para mantener una estética uniforme y moderna.

*   **Títulos Hero (`H1`)**: `font-black text-5xl md:text-7xl leading-tight`.
*   **Títulos de Sección (`H2`)**: `font-black text-4xl md:text-5xl`.
*   **Subtítulos (`H3`)**: `font-black text-2xl`.
*   **Cuerpo de Texto**: `font-medium text-lg leading-relaxed`.
*   **Botones**: `font-black uppercase tracking-wider`.

---

## 4. Componentes y Efectos de UI

### Botones (Magnetic Design)
Todos los botones de acción principal utilizan una lógica de "botón magnético" definida en `js/main.js`.
*   **Diseño:** Bordes totalmente redondeados (`rounded-full`), sombras proyectadas (`shadow-xl`), y efecto de escala sutil al hacer click (`active:scale-95`).
*   **Hover Unificado:** Todos los botones deben mantener su color de diseño original pero con una transición suave (`duration-300`) y un ligero desplazamiento hacia arriba (`hover:-translate-y-1`) o efecto de escala.

### Tarjetas (Cards)
*   **Estilo:** Fondo blanco, border `slate-100`, `rounded-[3rem]`, `shadow-2xl`.
*   **Interacción:** Opacidad y desplazamiento al entrar en el viewport.

### Animaciones (Reveal on Scroll)
Se utiliza un `IntersectionObserver` para activar la clase `.reveal`.
*   **CSS:** `.reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }`
*   **Active:** `.reveal.active { opacity: 1; transform: translateY(0); }`

### Fondos con Textura (`topo-bg`)
Se utiliza un overlay topográfico (`img/topo2.svg`) con opacidad ultra-baja (`opacity-[0.03]`) y `mix-blend-multiply` para añadir profundidad sin distraer del contenido.

---

## 5. Iconografía
*   **Material Symbols Outlined**: Para iconos funcionales (flechas, verificaciones, stats).
*   **FontAwesome (6.5.1)**: Exclusivamente para enlaces de redes sociales en el footer.

---

## 6. Organización de Imágenes
*   **Álbumes de Equipo:** Las fotos del equipo (Pimex Team) se organizan en grids dinámicos debajo de la sección "Nuestro Equipo".
*   **Familia Global:** Las imágenes de Pioneers International se presentan con un diseño limpio y espaciado que refleja la magnitud de la red global.
