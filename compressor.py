from base64 import b64decode, b64encode
from PIL import Image
import os
import moviepy.editor as moviepy
from pydub import AudioSegment


def compressor(content, type):
    # mp4 / mp3 / jpg
    d_content = b64decode(content)
    if type == 3:
        path1 = os.getcwd() + '/this_file_will_be_deleted1.jpg'
        with open(path1, 'wb') as img:
            img.write(d_content)
        im = Image.open(path1)
        path2 = os.getcwd() + '/this_file_will_be_deleted2.jpg'
        im.save(path2, optimize=True, quality=70)
        with open(path2, 'rb') as img:
            out_content = b64encode(img.read())
        os.remove(path1)
        os.remove(path2)
        return out_content
    if type == 2:
        path1 = os.getcwd() + '/this_file_will_be_deleted1.mp4'
        path2 = os.getcwd() + '/this_file_will_be_deleted2.mp4'
        with open(path1, 'wb') as vid:
            vid.write(d_content)
        clip = moviepy.VideoFileClip(path1)
        clip.write_videofile(path2)
        with open(path2, 'rb') as vid:
            out_content = b64encode(vid.read())
        os.remove(path1)
        os.remove(path2)
        return out_content
    if type == 1:
        path1 = os.getcwd() + '/this_file_will_be_deleted1.mp3'
        path2 = os.getcwd() + '/this_file_will_be_deleted2.mp3'
        with open(path1, 'wb') as aud:
            aud.write(d_content)
        sound = AudioSegment.from_file(path1)
        sound.export(path2, format="mp3", bitrate="128k")
        with open(path2, 'rb') as aud:
            out_content = b64encode(aud.read())
        os.remove(path1)
        os.remove(path2)
        return out_content
