from io import BytesIO
from PIL import Image
import base64
from collections import defaultdict


def middle_color(base):
    base = ''.join(base.split('base64')[1:])
    img = Image.open(BytesIO(base64.b64decode(base)))
    by_color = defaultdict(int)
    for pixel in img.getdata():
        by_color[pixel] += 1
    r = 0
    g = 0
    b = 0
    values = 0
    for key, value in by_color.items():
        values += value
        r += key[0] * value
        g += key[1] * value
        b += key[2] * value
    return [str(r // values), str(g // values), str(b // values)]

