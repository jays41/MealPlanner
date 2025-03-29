import { TbHexagonLetterV, TbMeat } from "react-icons/tb";
import { Link } from 'react-router-dom';

const ExploreSingleRecipe = ({ recipe }) => {

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="flex lg:flex-row justify-between text-gray-600 my-2">{recipe.type}
                <div className='text-green-600'><p>{Math.round(recipe.similarity_score*100)}% similar</p></div></div>
                <h3 className="text-xl font-bold">{recipe.name}</h3>
              </div>
              <div className="text-indigo-500 mb-2 line-clamp-2">
                <h3>Ingredients: {recipe.ingredients}</h3>
              </div>
              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="inline text-lg mb-1 mr-1"></div>
                <Link
                  to={`/recommended-recipe/${recipe.id}`}
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 Read More
                </Link>
              </div>
            </div>
          </div>
    );
};

export default ExploreSingleRecipe