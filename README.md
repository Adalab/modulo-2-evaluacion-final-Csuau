# Buscador series Anime

Aplicación web de búsqueda de series de anime, que nos permite des/marcar las series como favoritas y guardarlas en local storage.

La aplicación de búsqueda de serie anime consta de dos partes:

1. Un campo de texto y un botón para buscar series por su título.

2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

## Búsqueda

Al clickar sobre botón buscar, debe conectarse con la Api concatenando el valor del imput y devolver tarjeta con título e imagen de la serie.

## Favoritos

La usuaria puede marcar sus series favoritas.

Aparecerán identificadas en la lista de resultados con fondo blanco y marco violeta.

En la izquierda de la pantalla aparecerá el listado de favoritos tanto al ir seleccionando como al recargar la página,ya que son guardados en local Storage.

### Borrar favoritos

Se pueden borrar las series favoritas tanto desde el listado de resultados como de favoritos.

Para eliminarlos desde resultado es tan sencillo cómo hacer click en serie seleccionada.

Para eliminarlos de favoritos podemos hacerlo de uno en uno haciendo click en la X situada arriba a la derecha de la etiqueta o vaciar lista con el botón Eliminar favoritos situado al final del listado.
