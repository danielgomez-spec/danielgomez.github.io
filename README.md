# 💼 Portafolio — Sebastián Gómez

Sitio web personal construido desde cero para mostrar mi trayectoria como estudiante de Ingeniería en Ciencias de la Computación: proyectos, logros académicos y forma de trabajo.

🔗 **Sitio en vivo:** [danielgomez-spec.github.io](https://danielgomez-spec.github.io)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📖 Descripción

Portafolio de 5 páginas construido **sin frameworks**, usando HTML, CSS y JavaScript puro. El objetivo fue practicar fundamentos sólidos de frontend — animaciones, arquitectura de archivos compartidos y experiencia de usuario — sin depender de librerías externas para la lógica de interfaz.

## 📸 Capturas de pantalla

> Agrega aquí 1-2 imágenes del sitio (Home y Proyectos funcionan bien). Puedes arrastrarlas directamente al editor de README en GitHub, o subirlas a una carpeta `screenshots/` y referenciarlas así:
>
> ```markdown
> ![Home](screenshots/home.png)
> ![Proyectos](screenshots/proyectos.png)
> ```

## ✨ Características

- **Diseño responsive** con CSS Grid y Flexbox, sin frameworks de UI
- **Scroll reveal** con `IntersectionObserver` — los elementos aparecen al hacer scroll
- **Contadores animados** en estadísticas (`data-count`)
- **Fondo de partículas conectadas** dibujado en `<canvas>`, con leve interacción al mover el mouse
- **Transición de "cortina"** entre páginas para que la navegación se sienta continua, no como recargas secas
- **Filtrado de proyectos por categoría** (Web, Lógica/Compiladores, Prolog) en JavaScript puro
- **Efecto "máquina de escribir"** en el rol profesional del Home
- **Barras de competencias animadas** en la sección Sobre Mí
- **Formulario de contacto** con validación HTML5 (simulado — ver nota abajo)

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de las 5 páginas |
| CSS3 | Variables CSS, Grid, Flexbox, animaciones y `@keyframes` |
| JavaScript (ES6) | Interactividad, observers, canvas, lógica de filtros |
| Google Fonts | Plus Jakarta Sans, Inter, JetBrains Mono |

## 📁 Estructura del proyecto

```
portafolio/
├── index.html          # Home — hero, stack, stats, preview de proyectos
├── sobre-mi.html        # Biografía, competencias, filosofía de trabajo
├── proyectos.html       # Grid de proyectos con filtro por categoría
├── logros.html          # Timeline académico, materias y certificaciones
├── contacto.html        # Formulario de contacto y redes sociales
├── style.css            # Estilos globales compartidos
└── script.js            # Lógica compartida: menú, scroll reveal, canvas, transiciones
```

## 🚀 Cómo verlo localmente

```bash
git clone https://github.com/danielgomez-spec/danielgomez-spec.github.io.git
cd danielgomez-spec.github.io
```

Luego simplemente abre `index.html` en tu navegador, o usa la extensión **Live Server** de VS Code para recarga automática.

## ⚠️ Nota sobre el formulario de contacto

El formulario en `contacto.html` actualmente **no envía correos reales** — solo simula el envío mostrando un mensaje de confirmación. Para conectarlo a un backend real se puede usar un servicio como [Formspree](https://formspree.io) o [EmailJS](https://www.emailjs.com/).

## 📬 Contacto

- **Email:** daniel.gomez@ejemplo.com
- **GitHub:** [@danielgomez-spec](https://github.com/danielgomez-spec)
- **LinkedIn:** [linkedin.com/in/tu-usuario](https://linkedin.com/in/tu-usuario)

---

© 2026 Sebastián Gómez · Guayaquil, Ecuador
