# NEO Trainer v2.0

Web-app responsive de entrenamiento personal en casa, preparada para GitHub Pages.

- **Versión:** 2.0
- **Última modificación:** 28/07/2026 10:58 (Europe/Madrid)
- **Web pública:** https://nachuss.github.io/NeoTrainer/

## Características

- Perfil con modelo masculino o femenino.
- Selección de material disponible en casa.
- Alternativas domésticas cuando falta equipamiento.
- Biblioteca visual con animaciones por fotogramas.
- Explicación técnica, errores frecuentes y músculos implicados.
- Enlaces de demostración en YouTube.
- Generador semanal con selección visual de días.
- Entrenamiento intensivo de 7 minutos.
- Guardado local mediante `localStorage`.
- Diseño responsive para móvil, tablet y escritorio.
- Sin frameworks, compilación ni backend.

## Publicación en GitHub Pages

1. Copia todos los archivos en la raíz del repositorio `NeoTrainer`.
2. Haz commit y push a la rama principal.
3. En GitHub abre `Settings → Pages`.
4. Selecciona `Deploy from a branch`, rama principal y carpeta `/root`.
5. La aplicación estará disponible en https://nachuss.github.io/NeoTrainer/

## Estructura

- `index.html`: entrada de la app.
- `styles.css`: diseño responsive y animaciones.
- `data.js`: ejercicios, planes y metadatos.
- `app.js`: navegación, perfil, planificación y renderizado SVG.
- `.nojekyll`: evita el procesamiento de Jekyll.

## Ampliar ejercicios

Añade nuevos objetos al array `exercises` de `data.js`. Para una nueva animación, agrega una secuencia de posiciones en el objeto `poses` de `app.js` y usa su clave en `motion`.

## Historial

### v2.0 — 28/07/2026 10:58

- Rediseño completo.
- Animaciones visuales diferenciadas por sexo.
- Perfil y equipamiento doméstico.
- Planning semanal y selector de días corregido.
- 7 Minute Workout.
- Biblioteca técnica con YouTube.
