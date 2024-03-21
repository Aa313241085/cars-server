let HOST = "http://127.0.0.1:5000/api/cars"

function post() {
    let name = document.getElementById('name').value
    let car_number = document.getElementById('car_number').value
    let km = document.getElementById('km').value
    let phone = document.getElementById('phone').value
    let description = document.getElementById('description').value
    let obj = {
        "name": name === '' ? null : name,
        "car_number": car_number === '' ? null : car_number,
        "km": km === '' ? null : km,
        "phone": phone === '' ? null : phone,
        "description": description === '' ? null : description
    }

    let msg = document.getElementById('msg')
    axios.post(HOST, obj).then(r => {
        msg.innerHTML = 'created'
        let form = document.getElementById('form')
        form.reset()
    }, e => {
        if (e.response.data && e.response.data.error)
            msg.innerHTML = e.response.data.error
        else
            msg.innerHTML = 'error'
    })
}

function showCars() {
    axios.get(HOST).then(r => {
        r.data.map(x => {
            let tr = document.createElement('tr')
            let id = document.createElement('td')
            id.innerHTML = x.id
            let date = document.createElement('td')
            date.innerHTML = x.creation_date
            let name = document.createElement('td')
            name.innerHTML = x.name
            let car_number = document.createElement('td')
            car_number.innerHTML = x.car_number
            let km = document.createElement('td')
            km.innerHTML = x.km
            let phone = document.createElement('td')
            phone.innerHTML = x.phone
            let description = document.createElement('td')
            description.innerHTML = x.description

            tr.appendChild(id)
            tr.appendChild(date)
            tr.appendChild(name)
            tr.appendChild(car_number)
            tr.appendChild(km)
            tr.appendChild(phone)
            tr.appendChild(description)

            let table = document.getElementById('table')
            table.appendChild(tr)
        })
    })
}


