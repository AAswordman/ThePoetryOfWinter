import json
import os
import json5

def load_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json5.load(file)

def save_json_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4,)

def update_block_files(blocks_info, ex_blocks_dir):
    for root, _, files in os.walk(ex_blocks_dir):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                block_data = load_json_file(file_path)
                block_id = block_data['minecraft:block']['description']['identifier']
                
                if block_id in blocks_info:
                    block_info = blocks_info[block_id]
                    components = block_data['minecraft:block']['components']
                    
                    # Add minecraft:geometry
                    if 'minecraft:geometry' not in components:
                        components['minecraft:geometry'] = 'minecraft:geometry.full_block'
                    
                    # Add minecraft:material_instances
                    textures = block_info.get('textures', {})
                    if '*' in  components['minecraft:material_instances'] and 'render_method' in components['minecraft:material_instances']['*']:
                        components['minecraft:material_instances']['*'].pop('render_method')
                    
                    # Save the updated block data
                    save_json_file(file_path, block_data)
                    
                    # del blocks_info[block_id]['textures']

def main():
    blocks_info = {}
    blocks_file_path = 'src/TPOW/WPR/blocks.json'
    ex_blocks_dir = 'src/TPOW/WPB/ex_blocks/'

    # Load blocks information from WPR/blocks.json
    blocks_data = load_json_file(blocks_file_path)
    blocks_info = blocks_data
    # for block in blocks_data:
    #     identifier = block['minecraft:description']['identifier']
    #     blocks_info[identifier] = block

    # Update block files in WPB/ex_blocks/
    update_block_files(blocks_info, ex_blocks_dir)
    save_json_file(blocks_file_path, blocks_info)
    print("Block files updated successfully.")
    

if __name__ == '__main__':
    main()