// variables
const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

// at intialization
getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    // save the reques to api in variable 2.
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    // changing the response that fetched from api request 3.
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
}

// fetch the data by id
async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}
// fetch data by search menu
async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}
// adding the meal
function addMeal(mealData, random = false) {
    console.log(mealData);



    const meal = document.createElement("div");
    meal.classList.add("meal");
    meal.innerHTML = `
    <div class="meal-header">
    ${random
        // fetching the random recipe if true...
            ? `
            <span class="random"> Random Recipe </span>`
            : ""
        }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
        <i class="fas fa-heart"></i>
        </button>
        </div>
        `;
        // to make like button active

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
// check it is favourite meal or not by checking the presence of active class
        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}
// add the fav meals
function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

// pop up the content of meals

async function fetchFavMeals() {
    //clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
    <img
       src="${mealData.strMealThumb}"
       alt="${mealData.strMeal}"
    />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);

}
// show the info of meal
function showMealInfo(mealData) {

    //clean it up
    mealInfoEl.innerHTML = "";

    //update the Meal Info

    const mealEl = document.createElement('div');

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
            );


        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
    />

    <p>
      ${mealData.strInstructions}
    </p>

    <h3>Ingredients:</h3>
    <ul>
      ${ingredients.map((ing) => `
          <li>${ing}</li>
          `
    ).join("")}
    </ul>
    `;

    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove("hidden");

}
// for search button
searchBtn.addEventListener("click", async () => {
    //clean container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);


    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        })
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});

