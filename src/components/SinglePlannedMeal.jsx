import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgLayoutGrid } from 'react-icons/cg';
import { TbHexagonLetterV, TbMeat } from "react-icons/tb";
import { Link } from 'react-router-dom';

const SinglePlannedMeal = ({ id }) => {

  const navigate = useNavigate();

  const divStyle = {
    display: 'flex',
  }

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

  return (
    <div className='mb-3 w-full' style={divStyle}>
      <button className="w-full flex bg-white pt-4 pl-2 pr-2 rounded-lg shadow-md text-center md:text-left" onClick={() => navigate(`/my-recipes/${recipe.id}`)}>
          <h1 className="font-bold mb-4">{recipe.name} </h1>
          <div className="inline text-lg mt-1.5 ml-2 mr-1">
            {recipe.vegetarian ? <TbHexagonLetterV className='text-green-600'/>:<TbMeat className='text-red-700'/>}
          </div>
      </button>
    </div>
  )
}

export default SinglePlannedMeal