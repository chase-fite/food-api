
// this program fetches some food data from our local
// json database, formats, and inserts that data as HTML
// into the DOM

const foodList = document.querySelector(".foodList")
const template = (food) => {
    return`
    <div class="container">
        <h3>${food.name}</h3>
        <div>${food.ethnicity}</div>
        <div>${food.category}</div>
    </div>
    `
}

const insertHTML = (template) => {
    foodList.innerHTML += template
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            insertHTML(template(food))
        })
    })