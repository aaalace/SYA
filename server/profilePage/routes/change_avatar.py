from flask import request
import json
import os

from app import db
from posts.routes.compressor import compressor

def change_avatar():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            name = data['media_id']
            path_from_cwd = f'/images/upload/posts/{name}'
            path1 = os.getcwd() + path_from_cwd
            os.remove(path1)
            compressor(data['base'], 3, name.split('.')[0])
            return {'changed': True}
        except Exception as e:
            print(e)
            return {'changed': False}