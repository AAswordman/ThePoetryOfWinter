from PIL import Image
import colorsys

img = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
k = 0
k_s = 255 / (8 * 16-1)
for i in range(0, 8):
    for j in range(0, 16):
        color = colorsys.hsv_to_rgb(1,0,1)
        c = Image.new('RGBA', (9, 10), (round(color[0]*255),round(color[1]*255),round(color[2]*255),max(1,round(k))))
        coor = (j * 32, i * 32)
        img.paste(c, coor)
        # img.putpixel((j * 32, i * 32),(255,255,255,1))
        k += k_s
k=0
for i in range(8, 16):
    for j in range(0, 16):
        color = colorsys.hsv_to_rgb(1,1,0)
        c = Image.new('RGBA', (9, 10), (round(color[0]*255),round(color[1]*255),round(color[2]*255),max(1,round(k))))
        coor = (j * 32, i * 32)
        img.paste(c, coor)
        # img.putpixel((j * 32, i * 32),(255,255,255,1))
        k += k_s
img.save('glyph_E4.png')
