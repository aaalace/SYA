from flask import request
import json
from sign_up.utils.reg_exceptions import *
from sign_up.utils.email_checker import email_check
from app import db

from models.users import Users

def create_user():
    if request.method == 'POST':
        try:
            data = json.loads(request.data)
            prof_name = data['profile_name']
            prof_pass = data['profile_password']
            prof_rep_pass = data['profile_repeated_password']
            prof_email = data['profile_email']
            pers_name = data['person_name']
            pers_surname = data['person_surname']
            birth_date = data['birth_date']

            uses = Users.query.filter(Users.profile_name == prof_name).all()
            if len(uses) != 0:
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
            
            mails = Users.query.filter(Users.email == prof_email).all()
            if len(mails) > 0:
                raise RegisteredEmailException

            if len(pers_name) == 0:
                raise NullNameException

            if len(pers_surname) == 0:
                raise NullSurnameException

            if len(birth_date) == 0:
                raise NullBirthException

            user = Users(
                    profile_name = data['profile_name'],
                    profile_password = data['profile_password'],
                    email = data['profile_email'],
                    birth_date = data['birth_date'],
                    person_name = data['person_name'],
                    person_surname = data['person_surname'],
                )
            db.session.add(user)
            db.session.commit()
            return {"registered": True}
        except Exception as e:
            return {"registered": None,
                    "exception": str(e),
                    "exceptionCode": e.errcode()}