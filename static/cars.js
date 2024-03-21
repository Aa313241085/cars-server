let HOST="http://127.0.0.1:5000/api/cars"

function showCars(){
    axios.get(HOST).then(r=>{
        r.data.cars.map(car,i=>{
            let e=document.createElement("div")
            e.className="car"
            e.innerHTML=car
            e.id=id
            document.getElementById("navbar").appendChild(e)
        })

    })

}