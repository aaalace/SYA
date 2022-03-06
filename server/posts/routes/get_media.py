from models.media import Media


def get_media(media_id):
    media = Media.query.filter(Media.id == media_id).first()
    if media.type == 4:
        return media.media_body.tobytes().decode('utf-8')
    return str(media.media_body.tobytes())[2:-1]
