let HOST = "http://127.0.0.1:5000/api/cars"

const post = () => {
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
        window.location.href = '/'
    }, e => {
        if (e.response.data && e.response.data.error)
            msg.innerHTML = e.response.data.error
        else
            msg.innerHTML = 'error'
    })
}

const showCars = () => {
    let table = document.getElementById('table')
    deleteRows(table)
    appendHeaders(table)

    axios.get(HOST).then(r => {
        r.data.map(x => {
            appendRow(table, x)
        })
    })
}

const deleteRows = (table) => {
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

const appendHeaders = (table) => {
    let tr = document.createElement('tr')
    let id = document.createElement('th')
    id.innerHTML = 'Id'
    let date = document.createElement('th')
    date.innerHTML = 'Date'
    let name = document.createElement('th')
    name.innerHTML = 'Name'
    let car_number = document.createElement('th')
    car_number.innerHTML = 'Car Number'
    let km = document.createElement('th')
    km.innerHTML = 'KM'
    let phone = document.createElement('th')
    phone.innerHTML = 'Phone'
    let description = document.createElement('th')
    description.innerHTML = 'Description'
    let operations = document.createElement('th')
    operations.innerHTML = 'Operations'
    tr.append(id)
    tr.append(date)
    tr.append(name)
    tr.append(car_number)
    tr.append(km)
    tr.append(phone)
    tr.append(description)
    tr.append(operations)

    table.appendChild(tr)
}

const appendRow = (table, car) => {
    let tr = document.createElement('tr')
    let id = document.createElement('td')
    id.innerHTML = car.id
    let date = document.createElement('td')
    date.innerHTML = car.creation_date
    let name = document.createElement('td')
    name.innerHTML = car.name
    let car_number = document.createElement('td')
    car_number.innerHTML = car.car_number
    let km = document.createElement('td')
    km.innerHTML = car.km
    let phone = document.createElement('td')
    phone.innerHTML = car.phone
    let description = document.createElement('td')
    description.innerHTML = car.description

    let operations = document.createElement('td')
    let span = document.createElement('span')

    span.innerHTML = '&#xe014;'
    span.classList.add('glyphicon')
    span.classList.add('pointer')

    span.addEventListener('click', (event) => {
        remove(event, car.id)
    })
    operations.appendChild(span)
    tr.appendChild(id)
    tr.appendChild(date)
    tr.appendChild(name)
    tr.appendChild(car_number)
    tr.appendChild(km)
    tr.appendChild(phone)
    tr.appendChild(description)
    tr.appendChild(operations)

    table.appendChild(tr)
}

const remove = (event, carId) => {
    axios.delete(`${HOST}/${carId}`).then(r => {
        var row = event.target.closest("tr");
        row.remove()
    }, e => {
        debugger
    })
}


