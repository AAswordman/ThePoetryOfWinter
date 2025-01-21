import os
import json
import re

def read_json_file(file_path):
    """读取并返回JSON文件内容"""
    f = None
    with open(file_path, 'r', encoding='utf-8') as file:
        # 处理// ... /n 格式非json内容
        json_str1 = re.sub(re.compile('(//[\\s\\S]*?\n)'), '', file.read())
        # 处理/*** ... */ 格式非json内容
        json_str2 = re.sub(re.compile('(/\*\*\*[\\s\\S]*?/)'), '', json_str1)
        f = json.loads(json_str2)
        b = f["minecraft:block"]
        comp = b["components"]
        if "minecraft:creative_category" in comp:
            b["description"]["menu_category"] = comp["minecraft:creative_category"]
            comp.pop("minecraft:creative_category")
        else:
            b["description"]["menu_category"] = {
                "group": "itemGroup.name.outside",
                "category": "construction"
            }
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(f, file, ensure_ascii=False, indent=4)
            

def process_directory(directory_path):
    """遍历目录中的所有JSON文件并打印其内容"""
    # 遍历目录
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                try:
                    data = read_json_file(file_path)
                    print(f"Content of {file_path}:")
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON from {file_path}: {e}")
                except Exception as e:
                    print(f"An error occurred while processing {file_path}: {e}")
        # for d in dirs:
        #     process_directory(os.path.join(root, d))

# 指定要遍历的目录
directory_to_process = 'D:/eclipse/file/root/ThePoetryOfWinter/src/TPOW/WPB/blocks'

# 调用函数
process_directory(directory_to_process)