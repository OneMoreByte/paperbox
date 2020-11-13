#!/usr/bin/env python3

import pywal
import sys
import tempfile
import json

name = sys.argv[1]
picture = sys.argv[2]
data = []
with tempfile.TemporaryDirectory() as dir:
    for b in pywal.colors.list_backends():
        output = pywal.colors.get(sys.argv[2], backend=b, cache_dir=dir)
        temp = {
            'name': f"{name}-{b}",
            'background': output['special']['background'],
            'foreground': output['special']['foreground'],
            'cursor': output['special']['cursor'],
            'colors': [
                output['colors']['color0'],
                output['colors']['color1'],
                output['colors']['color2'],
                output['colors']['color3'],
                output['colors']['color4'],
                output['colors']['color5'],
                output['colors']['color6'],
                output['colors']['color7'],
                output['colors']['color8'],
                output['colors']['color9'],
                output['colors']['color10'],
                output['colors']['color11'],
                output['colors']['color12'],
                output['colors']['color13'],
                output['colors']['color14'],
                output['colors']['color15']
            ]
        }
        data.append(temp)


print(json.dumps(data))
