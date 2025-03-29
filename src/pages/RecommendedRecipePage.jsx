import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { TbHexagonLetterV, TbMeat } from "react-icons/tb";
import { useState, useEffect } from 'react';

const RecommendedRecipePage = ({ addRecipeSubmit }) => {

  let loading = false;

  const divStyle = {
    whiteSpace: 'pre-line',
    verticalAlign: 'bottom'
  }

  const MAX = 5

  const { id } = useParams();

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState([]);

  const [type, setType] = useState('Breakfast');
  const [difficulty, setDifficulty] = useState('3');
  const [vegetarian, setVegetarian] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const apiURL = `/api/recommendations/${id}`;
      try {
        const res = await fetch(apiURL);
        const data = await res.json();
        setRecipe(data);
        loading = true;
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    fetchRecipe();
  }, []);


  const submitForm = (e) => {
    e.preventDefault()
    const name = recipe.name
    const ingredients = recipe.ingredients
    const method = recipe.method
    const madeBefore = false
    const newRecipe = {
      name,
      type,
      ingredients,
      method,
      difficulty,
      vegetarian,
      madeBefore,
    }
  
  addRecipeSubmit(newRecipe);
  toast.success('Recipe added successfully');
  return navigate('/explore')
  };

  return (    
    <>

    {loading ? <></> : <>
      <section>
      <div className="container m-auto py-6 px-6">
      <Link
        to={`/explore/`}
        className=" text-indigo-500 hover:text-indigo-600 flex items-center"
        >
        <FaArrowLeft className='mr-2' />Back to Explore Page
        </Link>
      </div>
    </section>

    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
              <div className="text-gray-500 mb-4">{recipe.type}</div>
              <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
              </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">Ingredients</h3>
              <p style={divStyle}>{recipe.ingredients}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">Method</h3>
              <p style={divStyle}>{recipe.method}</p>
            </div>
          </main>

          <form onSubmit={submitForm}>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">To Complete</h3>

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

            <button onClick={ () => addRecipeSubmit(recipe.id) }
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    </>}</>
  )
};

export { RecommendedRecipePage as default }