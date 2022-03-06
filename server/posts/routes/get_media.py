from models.media import Media


def get_media(media_id):
    media = Media.query.filter(Media.id == media_id).first()
    return str(media.media_body.tobytes())[2:-1]
