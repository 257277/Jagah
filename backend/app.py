from ssl import CERT_NONE
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
from flask_cors import CORS
import bcrypt
import jwt

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://rahulSharma:rahulSharma@cluster0.so3yn.mongodb.net/Atithi"
mongo = PyMongo(app, ssl_cert_reqs=CERT_NONE)

@app.route("/", methods=["GET"])
def home():
    return "Welcome to my API2"

@app.route("/register", methods=["POST"])
def register():
    # Get the registration data from the request
    registration_data = request.get_json()
    name = registration_data.get("name")
    email = registration_data.get("email")
    password = registration_data.get("password")
    phone=registration_data.get("phone")
    address=registration_data.get("address")
    print(name,email,password,phone,address)
    # Check if the required fields are provided
    if not name or not email or not password:
        return jsonify({"message": "Missing required fields"})

    # Check if the user already exists in the database
    existing_user =mongo.db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "User already exists"})

    # Hash the password before storing it in the database
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Create a new user document
    new_user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "phone":phone,
        "address":address
        
    }

    # Insert the new user into the database
    mongo.db.users.insert_one(new_user)

    return jsonify({"message": "Registration successful"})

@app.route("/login", methods=["POST"])
def login():
    # Get the login data from the request
    login_data = request.get_json()
    email = login_data.get("email")
    password = login_data.get("password")

    # Check if the required fields are provided
    if not email or not password:
        return jsonify({"message": "Missing required fields"})

    # Check if the user exists in the database
    user = mongo.db.users.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password"})

    # Check if the password is correct
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"message": "Invalid email or password"})

    # Generate a JWT token with the user's email and an expiration time
    token_payload = {
        "email": user["email"],
        "exp": datetime.utcnow() + timedelta(days=1)  # Token expiration time (1 day in this example)
    }
    token = jwt.encode(token_payload, "Atithi", algorithm="HS256")

    # Get the user's id
    user_id = str(user["_id"])

    # Return the response with the id and token included
    return jsonify({"message": "Login successful", "name": user["name"], "id": user_id, "token": token})




if __name__ == "__main__":
    app.run(debug=False, port=5002)
