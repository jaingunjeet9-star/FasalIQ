# -*- coding: utf-8 -*-
import os

def write_file(rel_path, content):
    full_path = os.path.join('artifacts', 'fasaliq', 'src', rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Wrote {full_path}')

print('Builder template initialized')
