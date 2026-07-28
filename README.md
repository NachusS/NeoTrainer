# NEO Trainer v2.0.1

Web-app responsive de entrenamiento personal en casa, preparada para GitHub Pages.

- **Versión:** 2.0
- **Última modificación:** 28/07/2026 11:11 (Europe/Madrid)
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

### v2.0.1 — 28/07/2026 11:11

- Rediseño completo.
- Animaciones visuales diferenciadas por sexo.
- Perfil y equipamiento doméstico.
- Planning semanal y selector de días corregido.
- 7 Minute Workout.
- Biblioteca técnica con YouTube.


## Corrección 2.0.1
- Arranque protegido frente a datos antiguos o corruptos de `localStorage`.
- Migración automática del perfil guardado.
- Pantalla de recuperación si se produce un error de carga.
- Scripts cargados con `defer` para garantizar que el DOM esté disponible.
- Días iniciales corregidos a lunes, miércoles y viernes.
