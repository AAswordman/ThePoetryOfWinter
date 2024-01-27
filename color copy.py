from PIL import Image
import colorsys

img = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
k = 0
a = 256 / 3
k_s = 1 / (256)
for i in range(0, 16):
    for j in range(0, 16):
        color = colorsys.hsv_to_rgb(k,1,1)
        c = Image.new('RGBA', (1, 10), (round(color[0]*255),round(color[1]*255),round(color[2]*255),255))
        coor = (j * 32+8, i * 32)
        img.paste(c, coor)
        img.putpixel((j * 32, i * 32),(255,255,255,1))
        k += k_s
img.save('glyph_E4.png')
