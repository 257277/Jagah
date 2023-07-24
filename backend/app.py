from ssl import CERT_NONE
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
from bson import json_util
from bson import ObjectId
from flask_cors import CORS
import bcrypt
import jwt
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()
app.config["MONGO_URI"] = os.getenv("mongo_url")
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

@app.route("/bookHotel",methods=["POST"])
def bookHotel():
        hoteldata=request.get_json()
        print(hoteldata)
        name=hoteldata.get("name")
        image=hoteldata.get("image")
        bed=hoteldata.get("beds")
        bathroom=hoteldata.get("bathroom")
        price=hoteldata.get("price")
        rating=hoteldata.get("rating")
        userid=hoteldata.get("userid")
        address=hoteldata.get("address")
        obj = {
            "name": name,
            "image": image,
            "bed": bed,
            "bathroom": bathroom,
            "price": price,
            "rating": rating,
            "address":address,
            "status":"booked",
            "userid": userid
            }
            
        mongo.db.bookings.insert_one(obj)
        return jsonify({"message":"Hotel is booked successfull"})
    
@app.route("/booking",methods=["GET"])
def booking():    
     try:
        user_id = request.args.get("userId")
        data = list(mongo.db.bookings.find({"userid": user_id}))
        # Serialize the MongoDB data to JSON using json_util
        json_data = json_util.dumps(data)
        return jsonify({"message": json_data})
     except Exception as e:
        return jsonify({"message": "Error occurred while fetching data", "error": str(e)})

@app.route("/cancelbooking", methods=["POST"])
def cancelbooking():
    try:
        data = request.get_json()  # Get the JSON data from the request
        booking_id = data.get("id")  # Get the booking ID from the request JSON

        # Find and update the booking status to "cancelled"
        mongo.db.bookings.update_one({"_id": ObjectId(booking_id)}, {"$set": {"status": "cancelled"}})

        return jsonify({"message": "Booking is cancelled"})
    except Exception as e:
        return jsonify({"message": "Error occurred while cancelling booking", "error": str(e)})

@app.route("/addproperty", methods=["POST"])
def addproperty():
    try:
        
        data = request.get_json()  # Get the JSON data from the request
        property_image = data.get("image")  # Get the booking ID from the request JSON
        property_name = data.get("name")
        bed=data.get("bed")
        bathroom=data.get("bathroom")
        property_address=data.get("address")
        property_price=data.get("price")
        userid=data.get("userId")
        obj={"image":property_image,"name":property_name,"bathroom":bathroom,"bed":bed,"address":property_address,"price":property_price,"status":"Not Sold","userid": userid,"Sold_To":"None"}
        # Find and update the booking status to "cancelled"
        mongo.db.property.insert_one(obj)

        return jsonify({"message": "Property added successfully"})
    except Exception as e:
        return jsonify({"message": "Error occurred while adding property", "error": str(e)})

@app.route("/buyProperty",methods=["POST"])
def buyproperty():
    try:
        data = request.get_json()  # Get the JSON data from the request
        property_image = data.get("image")  # Get the booking ID from the request JSON
        property_name = data.get("name")
        bed=data.get("bed")
        bathroom=data.get("bathroom")
        property_address=data.get("address")
        property_price=data.get("price")
        soldTo=data.get("userid")
        obj={"image":property_image,"name":property_name,"bathroom":bathroom,"bed":bed,"address":property_address,"price":property_price,"status":"Not Sold","Sold_To":soldTo}
        # Find and update the booking status to "cancelled"
        mongo.db.property.insert_one(obj)

        return jsonify({"message": "Property buy successfully"})
    except Exception as e:
        return jsonify({"message": "Error occurred while buying property", "error": str(e)})

@app.route("/selfProperty", methods=["GET"])
def selfProperty():
    user_id = request.args.get("userId")

    try:
        data = list(mongo.db.property.find({"$or": [{"Sold_To": user_id}, {"userid": user_id}]}))
        json_data = json_util.dumps(data)
        return jsonify({"message": json_data})
    except Exception as e:
        return jsonify({"message": "Error occurred while fetching data", "error": str(e)})
    

@app.route("/DeleteProperty", methods=["POST"])
def deleteProperty():
    property_id = request.args.get("propertyId")
    try:
        # Convert the property_id string to an ObjectId
        obj_id = ObjectId(property_id)
        mongo.db.property.delete_one({"_id": obj_id})
        return jsonify({"message": "Property deleted successfully"})
    except Exception as e:
        return jsonify({"message": "Error occurred while deleting property", "error": str(e)})


if __name__ == "__main__":
    app.run(debug=False, port=5002)
