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

## Interacciones de v2 y v3

Con un píxel válido se registran eventos personalizados:

- `ProgramaClic`: clic en las fichas del catálogo (Kit de Herramientas, Red Maestra, Escala Estratégica o Recalculando), con parámetros `programa` y `version_sitio`.
- `AutodiagnosticoOpcion`: al seleccionar o cambiar una respuesta en el autodiagnóstico de v3, con parámetros `pregunta`, `opcion` y `version_sitio`. Se envían únicamente valores predefinidos, no texto libre ni datos de contacto. Una persona puede cambiar su respuesta, por lo que los eventos representan selecciones, no personas únicas.
- `AutodiagnosticoCompletado`: envío del autodiagnóstico válido de v3; no es una consulta ni un lead.

La hoja de trabajo no envía sus respuestas. En Meta se deben comprobar los parámetros en Probar eventos y la disponibilidad de desgloses e informes depende de las capacidades de la cuenta. Los clics en fichas no significan compra, mensaje ni inscripción. Hay que instrumentar la plataforma de destino para conocer las compras confirmadas.
