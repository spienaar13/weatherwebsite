console.log("Client side javascript file is loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')
// use a # to specify the HTML text portion that you want to call

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = "loading..."

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = data.error
        } else {
        message1.textContent = data.location
        message2.textContent = data.forecast
        }
    })
})
})