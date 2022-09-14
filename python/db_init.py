from locale import currency
from app import db, create_app
from models import Spending
_app = create_app()
_app.app_context().push()
db.create_all()

mango = Spending(description="Mango", amount=1200, currency="USD")
db.session.add(mango)
banana = Spending(description="Banana", amount=120, currency="HUF")
db.session.add(banana)
db.session.commit()