# apps.members.models
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Spending(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    spent_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    currency = db.Column(db.String(6), nullable=False) #use an enum of some sorts? -Balázs

    def to_dict(self):
        return {
            "id":self.id,
            "description": self.description,
            "amount": self.amount,
            "spent_at": self.spent_at.isoformat(),
            "currency": self.currency,
        }