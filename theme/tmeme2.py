import json

# 读取第一个文件
with open('theme/image_colors.json', 'r') as file1:
    data2 = json.load(file1)

# 读取第二个文件
with open('theme/blocks/id.json', 'r') as file2:
    data1 = json.load(file2)
new_data = {}
for k in data1:
    # 获取"A"中的"name"对应的值
    name = data1[k]["name"]

    # 获取"B"中的值
    texture_value = data1[k]["texture"]

    # 将结果存入新的字典
    new_data[name] = data2[texture_value]

# 将新数据写入新的json文件
with open('theme.json', 'w') as outfile:
    json.dump(new_data, outfile)
