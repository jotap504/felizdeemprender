# Meta Pixel en v2 y v3

Las versiones v2 y v3 de este repositorio son HTML estático, no una aplicación Next.js. GitHub Pages sirve la rama `master` directamente: no ejecuta `next build` ni lee variables de entorno del visitante.

El píxel está desactivado mientras el identificador público esté vacío. Para configurarlo, en PowerShell:

```powershell
$env:NEXT_PUBLIC_META_PIXEL_ID = 'IDENTIFICADOR_NUMERICO'
python scripts/configure-meta-pixel.py
```

El script valida el valor y genera `assets/js/meta-pixel-config.js`. Este archivo contiene un identificador público, no un secreto; debe publicarse junto con los archivos de la web. Nunca colocar un token de acceso o credenciales en esta variable. Al trabajar sin identificador, borrar la variable o dejarla vacía y volver a ejecutar el script desactiva el píxel.

El navegador inicializa el píxel una vez por página y envía un evento `PageView` por carga. Las secciones `#...` son anclas de la misma página y no generan vistas adicionales. El código no usa `noscript`, no carga Meta sin un ID válido y no envía respuestas de formularios. La orientación y el ejercicio de v3 se procesan localmente; completarlos no implica un contacto o una compra. Los enlaces conducen a páginas de programas dentro del proyecto y luego a servicios externos. La medición de inscripciones o compras en la otra plataforma requiere instrumentación allí.

Para desarrollo local y GitHub Pages hay que generar la configuración con el ID deseado antes de servir o publicar los archivos; el valor no cambia automáticamente al modificar una variable en GitHub porque este despliegue sirve directamente la rama. El identificador será visible para los visitantes. La versión final requiere decidir qué eventos adicionales se desean y verificar el comportamiento en el administrador de eventos de Meta con el ID real.
