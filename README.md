# NEO Trainer v4.2.0

Aplicación web estática preparada para GitHub Pages.

## Instalación por paquetes

1. Descomprime `NeoTrainer_v4.2.0_APP_CORE.zip` en la raíz del repositorio.
2. Descomprime `NeoTrainer_v4.2.0_IMAGES_MALE.zip` en esa misma raíz.
3. Descomprime `NeoTrainer_v4.2.0_IMAGES_FEMALE.zip` en esa misma raíz.
4. Conserva las rutas y nombres de archivo.
5. Publica la rama desde GitHub Pages.

## Resolución de imágenes

La aplicación consulta los manifiestos:

- `js/images-male.js`
- `js/images-female.js`

Cada clave enlaza un ejercicio con su archivo real. Se admiten WebP, JPG, JPEG, PNG y SVG. WebP es el formato recomendado para fotografías realistas.

```javascript
window.NEO_IMAGES['female/squat'] = 'assets/exercises/female/squat.webp';
window.NEO_IMAGES['female/squat-start'] = 'assets/exercises/female/squat-start.webp';
window.NEO_IMAGES['female/squat-end'] = 'assets/exercises/female/squat-end.webp';
```

## Convención de nombres

Cada ejercicio utiliza tres recursos:

- `<id>.webp`: tarjeta, calendario y recomendaciones.
- `<id>-start.webp`: posición inicial.
- `<id>-end.webp`: posición final.

Cada sexo incluye además `avatar.webp`.

Los SVG incluidos actúan como respaldo hasta que se sustituyan por fotografías realistas con los mismos nombres o se actualice el manifiesto.

## Autor

Creada por [@NachusS](https://nachuss.github.io/).
