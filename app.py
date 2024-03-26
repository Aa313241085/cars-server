from flask import Flask, request, send_file, jsonify
import json
import db1 as db1
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db1.setup()

@app.route('/')
def home():
    return send_file("static/home.html")
 
@app.route('/form')
def add_car_form():
    return send_file("static/form.html")

@app.route('/api/cars', methods=['POST'])
def add_car():
    try:
      data = json.loads(request.data)
      name=data.get('name', None)
      km=data.get('km', None)
      phone=data.get('phone', None)
      description=data.get('description', None)
      car_number=data.get('car_number', None)
      if name is None or km is None or phone is None or description is None or car_number is None:
         return json.dumps({'error': 'Missing required fields: Name, KM, Phone, Description, Car Number'}), 400, {'Content-Type':'application/json'}
      if km.isdigit() is False or phone.isdigit() is False or car_number.isdigit() is False:
         return json.dumps({'error': 'Input validation fields failed: KM, Phone, Car Number'}), 400, {'Content-Type':'application/json'}
      sql=f"INSERT INTO cars (CreationDate,Name,CarNumber,KM,Phone,Description) VALUES ('{datetime.datetime.now()}','{name}', '{car_number}', {km}, '{phone}', '{description}')"
      db1.query(sql)
      return {}, 201
    except Exception as ex: 
      error={
      "error": {
         "message": str(ex)
      }}
      return json.dumps(error), 500, {'Content-Type':'application/json'}

    

class Car:
       def __init__(self, id, creationDate, name, car_number, km, phone, description):
          self.id=id
          self.creationDate=creationDate
          self.name=name
          self.car_number=car_number
          self.km=km
          self.phone=phone
          self.decription=description

       def obj(self):
          return {
             "id": self.id,
             "creation_date": self.creationDate,
             "name": self.name,
             "car_number": self.car_number,
             "km": self.km,
             "phone": self.phone,
             "description": self.decription
          }   


@app.route('/api/cars', methods=['GET'])
def get_cars():
    try:
      sql="SELECT * FROM cars"
      res=db1.query(sql)
      arr=[]
      for tpl in res:
         car=Car(*tpl)
         arr.append(car.obj())
      return jsonify(arr) , 200, {'Content-Type':'application/json'}
    except Exception as ex: 
      error={
      "error": {
         "message": str(ex)
      }}
      return json.dumps(error), 500, {'Content-Type':'application/json'}
   
@app.route('/api/cars/<id>', methods=['DELETE'])
def delete_car(id):
    try:
      sql=f"SELECT * FROM cars WHERE Id={id}"
      res=db1.query(sql)
      if len(res) == 0:
         return json.dumps({'error': f'Id {id} does not exist'}), 404, {'Content-Type':'application/json'}
      sql=f"DELETE FROM cars WHERE Id={id}"
      res=db1.query(sql)
      return jsonify('') , 204, {'Content-Type':'application/json'}
    except Exception as ex: 
      error={
      "error": {
         "message": str(ex)
      }}
      return json.dumps(error), 500, {'Content-Type':'application/json'}

 
if __name__ == '__main__':
      app.run(debug=True)