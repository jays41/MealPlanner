import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewRecipePage = ({ addRecipeSubmit }) => {

  const MAX = 5

    const [name, setName] = useState('');
    const [type, setType] = useState('Breakfast');
    const [ingredients, setIngredients] = useState('');
    const [method, setMethod] = useState('');
    const [difficulty, setDifficulty] = useState('3');
    const [vegetarian, setVegetarian] = useState(false);
    const [madeBefore, setMadeBefore] = useState(false);

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault()
        const ingredientNumber = ingredients.split('\n\n')[0].split('\n').length
        const newRecipe = {
          name,
          type,
          ingredients,
          method,
          difficulty,
          vegetarian,
          madeBefore,
          ingredientNumber,
        }
      
      addRecipeSubmit(newRecipe);
      toast.success('Recipe added successfully');
      return navigate('/my-recipes')
      };

    return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm} >
            <h2 className="text-3xl text-center font-semibold mb-6">Add Recipe</h2>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Meal Type
                </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                value={type}
                onChange={(e) => setType(e.target.value)}>
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
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="e.g. Chicken and Rice"
                required
                />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ingredients"
                className="block text-gray-700 font-bold mb-2"
                >Ingredient List</label>
              <div style={{ color: 'grey' }}>
                <p>Write in the form Quantity, Ingredient</p>
                <p>Put a # in front of optional ingredients</p>
                <p>Write necessary ingredients first, leave a line break and then put spices (common items that you always have at home) and then optional ingredients</p>
              </div>
              <textarea
                id="ingredients"
                name="ingredients"
                className="border rounded w-full py-2 px-3"
                rows="4"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Add any ingredients
e.g. 1/3 cup, white rice"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="method"
                className="block text-gray-700 font-bold mb-2"
                >Method</label>
              <textarea
                id="method"
                name="method"
                className="border rounded w-full py-2 px-3"
                rows="4"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                placeholder="Add the method"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Difficulty: {difficulty}</label>
              <input
                type="range"
                id="difficulty"
                name="difficulty"
                value={difficulty}
                min='1' 
                max={MAX}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                required
                />
            </div>
            <div className="flex mb-4">
              <label htmlFor="checkbox" className="block text-gray-700 font-bold mb-2"></label>
                <input checked={vegetarian} type="checkbox" onChange={(e) => setVegetarian(e.target.checked)} />
                <p style={{ color: 'grey'}} className="ml-1">Tick the box if the meal is vegetarian</p>
            </div>

            <div className="flex mb-4">
              <label htmlFor="checkbox" className="block text-gray-700 font-bold mb-2"></label>
                <input checked={madeBefore} type="checkbox" onChange={(e) => setMadeBefore(e.target.checked)} />
                <p style={{ color: 'grey'}} className="ml-1">Tick the box if you have made this meal before</p>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit">
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewRecipePage