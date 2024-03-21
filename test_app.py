from app import get_cars
import json 
import requests

TEST_URL="http://127.0.0.1:5000/api/cars"

def test_get_cars():
    response = requests.get(url=TEST_URL)
    assert response.status_code == 200
    cars= response.json()
    assert len(cars) > 0
    for car in cars:
        assert car['id'] > 0 and car['car_number'] is not None and car['name'] is not None

def test_add_car_with_missing_required_fields():
    obj={
        "name": "bb"
    }
    response = requests.post(url=TEST_URL, json=obj)
    assert response.status_code == 400
    message= response.json()
    assert message['error'] == 'missing required fields: name, km, phone, description, car_number'

def test_add_car_with_input_validation_failed():
    obj={
        "name" :"bb",
        "car_number": "1234567",
        "km" : "50h742",
        "phone": "05487965874",
        "description": "test"
    }
    response = requests.post(url=TEST_URL, json=obj)
    assert response.status_code == 400
    message= response.json()
    assert message['error'] == 'input validation fields failed: km, phone, car_number'

def test_add_car():
    obj={
        "name" :"bb",
        "car_number": "1234567",
        "km" : "50742",
        "phone": "05487965874",
        "description": "test"
    }
    response = requests.post(url=TEST_URL, json=obj)
    assert response.status_code == 201
  
      