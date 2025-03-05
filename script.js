const btn = document.getElementById("search-btn");
const input = document.getElementById("search"); // Get the input field

function searchRecipes() {
    const searchInput = input.value.trim(); // Get input value
    const recipesDiv = document.getElementById("recipes");
    const notfound = document.getElementById("notfound");

    // Clear previous search results
    recipesDiv.innerHTML = "";
    notfound.style.display = "none";

    if (searchInput === "") {
        notfound.innerHTML = "Please enter a recipe name! 🍽️";
        notfound.style.display = "block";
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (!data.meals) {
                notfound.innerHTML = "Oops! No tasty bites found—try another delicious search! 🍕🔍";
                notfound.style.display = "block";
            } else {
                data.meals.forEach(meal => {
                    const card = document.createElement("div");
                    card.classList.add("recipe-card");
                    card.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <button onclick="viewRecipes('${meal.idMeal}')"> View Recipe</button>
                    `;
                    recipesDiv.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            notfound.innerHTML = "Something went wrong! Please try again later. 🚨";
            notfound.style.display = "block";
        });
}

// **Trigger search when Enter key is pressed inside input field**
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchRecipes(); // Call search function
    }
});

// **Trigger search when clicking the button**
btn.addEventListener("click", searchRecipes);


function viewRecipes(mealId){
    const popupCard = document.getElementById('popup-card');    
    const recipeTitle = document.getElementById('recipe-title');    
    const recipeDetails = document.getElementById('recipe-details');    

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        recipeTitle.innerHTML = meal.strMeal;
        recipeDetails.innerHTML = meal.strInstructions;
        popupCard.style.display = 'block';
    })
    .catch(error => {
        console.error("Yikes! No luck this time—maybe the recipe ran away? 🏃‍♂️💨 Try another tasty hunt! 🍔🔍", error);
    });
}

function closeRecipe(){
    document.getElementById("popup-card").style.display = 'none';
}
