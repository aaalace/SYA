from app import db


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    profile_name = db.Column(db.String, unique=True)
    email = db.Column(db.String)
    birth_date = db.Column(db.String)
    person_name = db.Column(db.String)
    person_surname = db.Column(db.String)
    registration_date = db.Column(db.String)
    salt = db.Column(db.BINARY)
    profile_password = db.Column(db.BINARY)
    