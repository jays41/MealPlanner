import { useState, useEffect } from 'react';
import SingleRecipe from './SingleRecipe';

const RecentRecipes = ({ isHomePage }) => {
    
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const apiURL = '/api/recipes?_limit=3';
      try {
        const res = await fetch(apiURL);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        Recent Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
              <SingleRecipe recipe={recipe} key={recipe.id}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentRecipes