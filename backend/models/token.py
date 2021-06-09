import datetime
from typing import List

from database.db import db



class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    expires_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    revoked_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user = db.relationship(
        "User", back_populates="tokens"
    )

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()
