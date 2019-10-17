
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

const templateIngredients = (food) => {
    return`
    <div class="container">
        <h3>${food.name}</h3>
        <div>${food.ethnicity} ${food.category}</div><br>
        <div>Ingredients: ${food.ingredients}</div><br>
        <div>Countries: ${food.countries}</div><br>
        <div>Calories: ${food.calories}</div><br>
        <div>Fat: ${food.fat}</div><br>
        <div>Sugars: ${food.sugars}</div><br>
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
            // insertHTML(template(food))  // this is code from the first exercise
            
            // fetching the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {

                    console.log(productInfo)

                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.countries = "no countries listed"
                    }
                    if (productInfo.product.nutriments.energy) {
                        food.calories = productInfo.product.nutriments.energy
                    } else {
                        food.calories = "no calorie value listed"
                    }

                    console.log("fat", productInfo.product.nutriments.fat)

                    if (productInfo.product.nutriments.fat) {
                        food.fat = productInfo.product.nutriments.fat
                    } else {
                        food.fat = "no fat listed"
                    }
                    if (productInfo.product.nutriments.sugars) {
                        food.sugars = productInfo.product.nutriments.sugars
                    } else {
                        food.sugars = "no sugars listed"
                    }

                    insertHTML(templateIngredients(food))
                })
        })
        return parsedFoods
    })
    // .then(test => {
    //     console.log("test", test)        
    // })



