import { TbHexagonLetterV, TbMeat } from "react-icons/tb";
import { Link } from 'react-router-dom';

const SingleRecipe = ({ recipe }) => {

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="flex lg:flex-row justify-between text-gray-600 my-2">{recipe.type}
                {recipe.madeBefore ? <div className='text-green-600'><p>Made Before</p></div> : <div className='text-red-600 lg:flex-row justify-between'><p>Not Made Before</p></div>}</div>
                <h3 className="text-xl font-bold">{recipe.name}</h3>
              </div>
              <div className="text-indigo-500 mb-2">
                <h3>Difficulty: {recipe.difficulty}</h3>
                <h3>Ingredients to buy: {recipe.ingredientNumber}</h3>
              </div>
              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="inline text-lg mb-1 mr-1">
                {recipe.vegetarian ? <TbHexagonLetterV className='text-green-600'/>:<TbMeat className='text-red-700'/>}
                </div>
                <Link
                  to={`/my-recipes/${recipe.id}`}
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 Read More
                </Link>
              </div>
            </div>
          </div>
    );
};

export default SingleRecipe