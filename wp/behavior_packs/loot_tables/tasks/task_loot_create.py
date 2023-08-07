import os
import sys
os.chdir(sys.path[0])

task_loots = os.listdir('.')
print(task_loots)

def create_file(path,msg=""):
    """输入文件路径（包括名称），内容。创建文件并写入"""
    file = open(path,'w',encoding='Utf-8')
    file.write(msg)
    file.close
    print(path + "已创建")

for i in range(0,1000):
    i_str = str(i)
    if len(i_str) == 1:
        i_str = '00' + i_str
    elif len(i_str) == 2:
        i_str = '0' + i_str
    name = i_str + '.json'
    if name not in task_loots:
        print(name)
        create_file(name,'{}')