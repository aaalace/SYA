import datetime
import sqlalchemy
from sqlalchemy import orm
from .db_session import SqlAlchemyBase


class Comms(SqlAlchemyBase):
    __tablename__ = 'comms'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    content = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    created_date = sqlalchemy.Column(sqlalchemy.DateTime,
                                     default=datetime.datetime.now)

    user_id = sqlalchemy.Column(sqlalchemy.Integer,
                                sqlalchemy.ForeignKey("users.id"))
    # post_id = sqlalchemy.Column(sqlalchemy.Integer,
    #                             sqlalchemy.ForeignKey("posts.id"))
    post_id = sqlalchemy.Column(sqlalchemy.Integer, nullable=False,
     index=True)
    user = orm.relation('User')
    # post = orm.relation('Post')