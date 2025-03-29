import { useState, useEffect } from 'react';
import ExploreSingleRecipe from '../components/ExploreSingleRecipe';
import { PacmanLoader } from 'react-spinners';

const recipe = {
  name: "Paneer butter masala",
  ingredients: "Paneer, tomatoes, onions, cumin, garlic, ginger, garam masala, rice",
};


const ExplorePage = ({ addRecommendedRecipeSubmit }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadSavedRecipes = async () => {
      const apiURL = '/api/recommendations';
      try {
        const res = await fetch(apiURL);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    loadSavedRecipes();
  }, []);

  const clearRecommendations = async () => {
    const apiURL = "api/recommendations";
    try {
      const response = await fetch(apiURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });
  
      if (!response.ok) {
        throw new Error("Failed to clear recommendations");
      }
  
      console.log("Recommendations cleared");
    } catch (error) {
      console.error("Error clearing recommendations:", error);
    }
  };
   
  const getSingleRecommendation = async (recipe) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/similar_recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error making POST request:", error);
      return [];
    }
  };

  const getAllRecipes = async () => {
    const recommendations = [];
    for (const singleRecipe of recipes) {
      const result = await getSingleRecommendation(singleRecipe);
      recommendations.push(...result); // Append results
    }
    setRecipes(recommendations);
    clearRecommendations();
    recommendations.forEach((recipe) => {addRecommendedRecipeSubmit(recipe)})
  };

  return (
    <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Explore</h2>
    <h3 className="text-3l font-bold text-gray-500 mb-6 text-center">View recipes based on your current locker</h3>
    <button onClick={getAllRecipes}
    className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-center p-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block"
    >Refresh</button>

      {recipes.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <PacmanLoader className="m-auto" />
        </div>
      ) : (
        <div className="relative min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          {recipes.map((recipe) => (
            <ExploreSingleRecipe recipe={recipe} key={recipe.ingredients} />
          ))}
        </div>
        </div>
      )}
    </div>
</section>

  );
};

export default ExplorePage;
