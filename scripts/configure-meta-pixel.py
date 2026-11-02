"""Generate browser-visible Meta Pixel configuration for this static site."""
import json
import os
import re
import sys
from pathlib import Path

pixel_id = os.environ.get('NEXT_PUBLIC_META_PIXEL_ID', '').strip()
if pixel_id and not re.fullmatch(r'[0-9]{5,25}', pixel_id):
    sys.exit('NEXT_PUBLIC_META_PIXEL_ID debe contener entre 5 y 25 dígitos, o estar vacío.')
output = Path(__file__).resolve().parent.parent / 'assets' / 'js' / 'meta-pixel-config.js'
output.write_text('/* Configuración pública generada: no contiene secretos. */\nwindow.FDE_META_PIXEL_ID = ' + json.dumps(pixel_id) + ';\n', encoding='utf-8')
print('Configuración pública generada: ' + ('píxel configurado' if pixel_id else 'píxel desactivado'))
