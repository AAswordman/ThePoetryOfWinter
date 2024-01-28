import os
from PIL import Image
from colorthief import ColorThief
import json

# 定义存储图片名和主题色的字典
image_colors = {}
with open('theme/blocks/id.json', 'r') as file2:
    data1 = json.load(file2)
# 遍历abc文件夹中的所有图片
folder_path = 'theme/blocks'
for file in data1:
    filename = data1[file]["texture"]
    print(filename)
    try:
        # 读取图片并获取主题色
        image_path = os.path.join(folder_path, filename)
        color_thief = ColorThief(image_path)
        dominant_color = color_thief.get_color(quality=1)
        image_colors[filename] = dominant_color
    except:
        image_colors[filename] = "#"
    
# 将结果保存为JSON文件
with open('theme/image_colors.json', 'w') as json_file:
    json.dump(image_colors, json_file)