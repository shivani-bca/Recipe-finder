document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const ingredientInput = document.getElementById('ingredient');
  const resultsContainer = document.getElementById('results');
  const loader = document.getElementById('loader');

  // Add event listeners
  searchBtn.addEventListener('click', searchRecipes);
  ingredientInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchRecipes();
    }
  });

  async function searchRecipes() {
    const ingredient = ingredientInput.value.trim();
    
    if (!ingredient) {
      alert('Please enter an ingredient');
      return;
    }
    
    // Show loader
    loader.style.display = 'block';
    resultsContainer.innerHTML = '';
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      
      // Hide loader
      loader.style.display = 'none';
      
      if (data.meals === null) {
        resultsContainer.innerHTML = '<p>No recipes found. Try another ingredient!</p>';
        return;
      }
      
      displayRecipes(data.meals);
    } catch (error) {
      loader.style.display = 'none';
      resultsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
      console.error('Error fetching recipes:', error);
    }
  }

  function displayRecipes(meals) {
    resultsContainer.innerHTML = '';
    
    meals.forEach(meal => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      
      recipeCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="recipe-info">
          <h2>${meal.strMeal}</h2>
          <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
        </div>
      `;
      
      resultsContainer.appendChild(recipeCard);
    });
  }
});