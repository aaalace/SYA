from email.mime import image
import imp
from flask import request
import json
import bcrypt
import datetime
from app import db
from sqlalchemy import and_
from signupLogin.utils.reg_exceptions import *
from signupLogin.utils.email_checker import email_check
from signupLogin.utils.default_image import default_image

from models.users import Users
from models.users_images import UsersImages


def create_user():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)

            # CREATING USER
            prof_name = data['profile_name']
            prof_pass = data['profile_password']
            prof_rep_pass = data['profile_repeated_password']
            prof_email = data['profile_email']
            pers_name = data['person_name']
            pers_surname = data['person_surname']

            user_exists = Users.query.filter(Users.profile_name == prof_name).first()
            if user_exists:
                raise SameUserExistsException

            if len(prof_name) < 3:
                raise SmallUsernameException

            if len(prof_pass) < 3:
                raise SmallPasswordException

            if prof_pass != prof_rep_pass:
                raise RepeatedPasswordException

            if len(prof_email) == 0:
                raise EmptyEmailException

            if not email_check(prof_email):
                raise NoneEmailException
                
            mails = Users.query.filter(Users.email == prof_email).first()
            if mails:
                raise RegisteredEmailException

            if len(pers_name) == 0:
                raise NullNameException

            if len(pers_surname) == 0:
                raise NullSurnameException

            saltX = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(prof_pass.encode(), saltX)

            dt = datetime.datetime.now()

            user = Users(
                profile_name=data['profile_name'],
                profile_password=hashed_password,
                email=data['profile_email'],
                birth_date= '',
                person_name=data['person_name'],
                person_surname=data['person_surname'],
                salt=saltX,
                registration_date=dt
            )
            db.session.add(user)
            db.session.commit()
            
            # CREATING USER AVATAR
            userImage = UsersImages(
                user_id=user.id,
                image=default_image
            )
            db.session.add(userImage)
            db.session.commit()

            image = UsersImages.query.filter(UsersImages.user_id == user.id).first()

            return {"registered": True,
                    "id": user.id,
                    "avatar": image.image}
        except Exception as e:
            return {"registered": None,
                    "exception": str(e),
                    "exceptionCode": e.errcode()}
