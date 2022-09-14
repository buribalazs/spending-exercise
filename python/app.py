from locale import currency
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from models import db, Spending


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///spendings.sqlite"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    return app


app = create_app()


@app.route("/spendings", methods=["GET", "POST"])
def get_spendings():

    if request.method == "GET":
        currency_filter = request.args["filter"]
        sort = request.args["sort"]
        # todo validate query params!!!! -Balázs

        sort_query = {
            "-date": Spending.spent_at.desc(),
            "date": Spending.spent_at,
            "-amount_in_huf": Spending.amount.desc(),
            "amount_in_huf": Spending.amount,
        }[sort]

        spendings = Spending.query \
            .filter(True if currency_filter=="" else Spending.currency==currency_filter) \
            .order_by(sort_query)\
            .all()

        return jsonify({
                "spendings": [item.to_dict() for item in spendings],
            })

    if request.method == "POST":
        # todo validate data, prevent flood? -Balázs
        dict = request.get_json()
        dict["amount"] = float(dict["amount"]) * 100
        spending = Spending(**dict)
        db.session.add(spending)
        db.session.commit()
        return jsonify({"ok":True})
