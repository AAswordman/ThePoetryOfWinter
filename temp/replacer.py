import re
import json

def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def write_file(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def generate_lang_json(matches):
    lang = {}
    for i, match in enumerate(matches, start=1):
        key = f"menuUIMsgBailan{i+264}"
        lang[key] = match[1:-1]
    return lang

def main(input_file, output_file, lang_file):
    # 读取输入文件
    content = read_file(input_file)
    
    # 定义正则表达式
    pattern = r'"(?:.(?!"))*[\u4e00-\u9fa5]+(?:(?!").)*"'
    
    # 查找所有匹配项
    matches = re.findall(pattern, content)
    
    # 生成lang JSON
    lang = generate_lang_json(matches)
    
    # 将lang JSON保存到文件
    with open(lang_file, 'w', encoding='utf-8') as f:
        json.dump(lang, f, ensure_ascii=False, indent=4)
    
    # 替换匹配项
    def replacement(match):
        nonlocal counter
        key = f"menuUIMsgBailan{counter}"
        counter += 1
        return f'lang.{key}'
    
    counter = 265
    new_content = re.sub(pattern, replacement, content)
    
    # 写入输出文件
    write_file(output_file, new_content)

if __name__ == "__main__":
    input_file = './temp/input.txt'  # 输入文件路径
    output_file = './temp/output.txt'  # 输出文件路径
    lang_file = './temp/lang.json'  # 生成的lang JSON文件路径
    
    main(input_file, output_file, lang_file)