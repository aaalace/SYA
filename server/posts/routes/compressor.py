from base64 import b64decode, b64encode
from PIL import Image
import os
import moviepy.editor as moviepy
from pydub import AudioSegment


def compressor(content, type, id):
    d_content = b64decode(content)
    if type == 3:
        name = f'{id}.jpg'
        path_from_cwd = f'/images/upload/posts/{id}.jpg'
        path1 = os.getcwd() + path_from_cwd
        with open(path1, 'wb') as img:
            img.write(d_content)
        im = Image.open(path1)
        im = im.convert('RGB')
        im.save(path1, optimize=True, quality=70)
        return {'status': True, 'name': name}
    if type == 2:
        name = f'{id}.mp4'
        path_from_cwd = f'/images/upload/posts/{id}.mp4'
        path2 = os.getcwd() + path_from_cwd
        path1 = os.getcwd() + '/this_file_will_be_deleted1.mp4'
        with open(path1, 'wb') as vid:
            vid.write(d_content)
        # clip = moviepy.VideoFileClip(path1)
        # clip.write_videofile(path1)
        clip = moviepy.VideoFileClip(path1)
        clip.write_videofile(path2)
        os.remove(path1)

        return {'status': True, 'name': name}
    if type == 1:
        name = f'{id}.mp3'
        path_from_cwd = f'/images/upload/posts/{id}.mp3'
        path1 = os.getcwd() + path_from_cwd
        print(path1)
        with open(path1, 'wb') as aud:
            aud.write(d_content)
        sound = AudioSegment.from_file(path1)
        sound.export(path1, format="mp3", bitrate="16k")
        return {'status': True, 'name': name}
