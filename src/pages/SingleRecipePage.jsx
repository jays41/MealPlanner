import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { TbHexagonLetterV, TbMeat } from "react-icons/tb";
import { useState, useEffect } from 'react';

const SingleRecipePage = ({ deleteRecipeSubmit }) => {

  let loading = false;

  const divStyle = {
    whiteSpace: 'pre-line',
    verticalAlign: 'bottom'
  }

  const { id } = useParams();

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const apiURL = `/api/recipes/${id}`;
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


  const onDeleteClick = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (!confirm) {return;}
    deleteRecipeSubmit(recipe.id);
    toast.success('Job deleted successfully');
    navigate('/my-recipes');
  };

  return (    
    <>

    {loading ? <></> : <>
      <section>
      <div className="container m-auto py-6 px-6">
      <Link
        to={`/my-recipes/`}
        className=" text-indigo-500 hover:text-indigo-600 flex items-center"
        >
        <FaArrowLeft className='mr-2' />Back to My Recipes
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
                <div className="inline text-lg mb-1 mr-1">
                {recipe.vegetarian ? <TbHexagonLetterV className='text-green-600'/>:<TbMeat className='text-red-700'/>}
                </div>
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

          {/* <!-- Sidebar --> to fix */}
          <aside>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Actions</h3>
              <Link
                to={`/edit-recipe/${recipe.id}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Recipe
              </Link>
              <button onClick={ () => onDeleteClick(recipe.id) }
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Recipe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    </>}</>
  )
};

export { SingleRecipePage as default }