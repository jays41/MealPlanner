import { useState, useEffect } from 'react';
import SingleRecipe from './SingleRecipe';
import { useNavigate } from "react-router-dom";

const AllRecipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [mealType, setMealType] = useState('Any');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);

  const searchConditionsMet = (recipe) => {
    if (!showFilters) {return true;}
    if (mealType != 'Any') {
      if (recipe.type != mealType) {return false;}
    }
    if (searchTerm != '') {
      if (!recipe.name.includes(searchTerm)) {return false;}
    }
    if (isVegetarian) {
      if (!recipe.vegetarian) {return false;}
    }
    return true;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const apiURL = '/api/recipes';
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

  const navigate = useNavigate();


  return (
    <div className="container-xl lg:container m-auto">
    <div>
    { !showFilters ? <>
    <button onClick={ () => setShowFilters(true) }
    className="flex bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block">
    Filter Results
    </button>

    <br/>
    </>
    :
    <div>
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form>
            <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Filter Results</h2>
            <div className="mb-4">
                <label htmlFor="mealType" className="block text-gray-700 font-bold mb-2"
                >Meal Type
                </label>
              <select
                id="mealType"
                name="mealType"
                className="border rounded w-full py-2 px-3"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}>
                <option value="Any">Any</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch-Dinner">Lunch / Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Drink">Drink</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Name</label>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="e.g. Chicken and Rice"
                />
            </div>
            <div className="flex mb-4">
              <label htmlFor="checkbox" className="block text-gray-700 font-bold mb-2"></label>
                  <input checked={isVegetarian} type="checkbox" onChange={(e) => setIsVegetarian(e.target.checked)} />
                  <p style={{ color: 'grey' }} className='ml-1'>Tick to show only vegetarian meals</p>
            </div>
          </form>
          <button onClick={ () => setShowFilters(false) }
    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block">
    Hide Filters
    </button>
        </div>
    </div>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
    <button className="bg-white rounded-xl shadow-md relative text-indigo-500 text-xl font-bold p-4"
        onClick={() => navigate('/new-recipe')}
        >+</button>
      {
        recipes.filter(searchConditionsMet)
        .map((recipe) => (
          <SingleRecipe recipe={recipe} key={recipe.id} />
        ))
      }
    </div>
  </div>
    
  )
}

export default AllRecipes