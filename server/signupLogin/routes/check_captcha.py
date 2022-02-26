import json
from flask import request

def check_captcha():
    if request.method == 'POST':
        data = json.loads(request.data)
        res_state = True
    return {'result': res_state}