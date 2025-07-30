import os
import json

def process_json_files(root_dir):
    """
    遍历ex_items目录中的所有JSON文件，处理format_version为1.10的文件
    """
    # 遍历ex_items目录及其子目录
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                process_single_json(file_path)

def process_single_json(file_path):
    """
    处理单个JSON文件
    """
    try:
        # 读取JSON文件
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 检查format_version是否为1.10
        if data.get('format_version') == '1.10':
            print(f"处理文件: {file_path}")
            
            # 获取物品ID（去掉命名空间）
            desc = data.get('minecraft:item', {}).get('description', {})
            item_identifier = desc.get('identifier', '')
            if ':' in item_identifier:
                item_id = item_identifier.split(':')[1]  # 去掉命名空间部分
            else:
                item_id = item_identifier

            desc['menu_category'] = {
                "group": "minecraft:itemGroup.name.outside",
                "is_hidden_in_commands": False,
                "category": "nature"
            }

            if ('mineral' in item_id):
                desc['menu_category']['group'] = 'dec:itemGroup.name.ingots'

            if 'register_to_creative_menu' in desc:
                del desc['register_to_creative_menu']
            
            # 确保components存在
            if 'minecraft:item' in data and 'components' in data['minecraft:item']:
                components = data['minecraft:item']['components']
                components['minecraft:hover_text_color'] = "light_purple"
                # 修改cooldown位置
                if 'minecraft:food' in components and 'cooldown_type' in components['minecraft:food'] and 'cooldown_time' in components['minecraft:food']:
                    components['minecraft:cooldown'] = {}
                    components['minecraft:cooldown']['category'] = components['minecraft:food']['cooldown_type']
                    components['minecraft:cooldown']['duration'] = components['minecraft:food']['cooldown_time']
                    del components['minecraft:food']['cooldown_type']
                    del components['minecraft:food']['cooldown_time']

                # 去除render_offset等过期组件
                if 'minecraft:render_offset' in components:
                    del components['minecraft:render_offset']
                if 'minecraft:use_duration' in components:
                    del components['minecraft:use_duration']
                if 'minecraft:max_damage' in components:
                    del components['minecraft:max_damage']
                
                # 添加minecraft:icon组件（如果不存在）
                if 'minecraft:icon' not in components:
                    components['minecraft:icon'] = {
                        "textures": {
                            "default": item_id
                        }
                    }
                    print(f"  添加了icon组件: {item_id}")
                else:
                    # 如果存在minecraft:icon，检查是否有textures.default
                    icon_component = components['minecraft:icon']
                    if 'textures' not in icon_component:
                        icon_component['textures'] = {}
                    if 'default' not in icon_component['textures']:
                        icon_component['textures']['default'] = item_id
                        print(f"  添加了default纹理: {item_id}")
                    else:
                        print(f"  default纹理已存在: {icon_component['textures']['default']}")
                
                # 写回文件
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
            else:
                print(f"  跳过: 缺少minecraft:item或components结构")
    
    except json.JSONDecodeError:
        print(f"  错误: {file_path} 不是有效的JSON文件")
    except Exception as e:
        print(f"  错误处理文件 {file_path}: {str(e)}")

# 使用示例
if __name__ == "__main__":
    # 指定ex_items目录路径
    ex_items_path = r"e:\MCPEAddons\ThePoetryOfWinter\src\TPOW\WPB\ex_items"
    
    if os.path.exists(ex_items_path):
        print("开始处理JSON文件...")
        process_json_files(ex_items_path)
        print("处理完成!")
    else:
        print(f"目录不存在: {ex_items_path}")