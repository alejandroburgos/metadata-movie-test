# Metadata Movies

Metadata Movies es una aplicación web que permite a los usuarios buscar y visualizar detalles de películas en 2D y 3D. La aplicación utiliza React para la interfaz de usuario, Redux para la gestión del estado, y Three.js para renderizar gráficos en 3D.

## Características

- **Búsqueda de Películas**: Los usuarios pueden buscar películas por título.
- **Visualización en 2D y 3D**: Las películas se pueden visualizar en una lista 2D o en un carrusel 3D interactivo.
- **Detalles de Películas**: Al seleccionar una película, se muestra una página con detalles como el título, año, calificación de IMDb y sinopsis.
- **Favoritos**: Los usuarios pueden filtrar las películas para ver solo sus favoritas.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Redux**: Biblioteca para la gestión del estado de la aplicación.
- **Three.js**: Biblioteca de JavaScript para crear y mostrar gráficos animados en 3D.
- **React-Three-Fiber**: Biblioteca para integrar Three.js con React.
- **PrimeReact**: Biblioteca de componentes de UI para React.
- **Sass**: Preprocesador CSS para estilos.

## Estructura del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
  - `components/`: Componentes reutilizables de la aplicación.
  - `pages/`: Páginas principales de la aplicación.
  - `redux/`: Archivos relacionados con Redux (slices y store).
  - `styles/`: Archivos de estilos globales.
  - `utils/`: Utilidades y funciones auxiliares.
- `public/`: Archivos públicos y estáticos.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Inicia la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para el mejor rendimiento.

### `npm test`

Inicia el corredor de pruebas en el modo de observación interactivo.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `npm start` para iniciar la aplicación en modo de desarrollo.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
