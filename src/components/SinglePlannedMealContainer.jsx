import { useState, useEffect } from 'react'
import AddPlannedRecipe from './AddPlannedRecipe'
import SinglePlannedMeal from './SinglePlannedMeal'

const SinglePlannedMealContainer = ({ edit, mealType }) => {

  const [deleteButtonStyle, setDeleteButtonStyle] = useState({backgroundColor: '#ef4444'});

  const [recipes, setRecipes] = useState([]);
  const [id, setId] = useState('');

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

  const isFilled = () => {
    if (id != '') {return true;}
    else {return false;}
  };

  const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
  }

  const wholeDivStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <div style={wholeDivStyle}>
    <div className="w-full">
      {isFilled() ? <SinglePlannedMeal id={id} /> : <AddPlannedRecipe mealType={mealType} recipes={recipes} setId={setId} />}
    </div>
    {
      edit && isFilled() ?
      <div style={divStyle} className='ml-2'>
        <button className='bg-red-500 rounded-lg p-1'
        style={deleteButtonStyle}
        onMouseEnter={() => {setDeleteButtonStyle({backgroundColor: 'red'});}}
        onMouseLeave={() => {setDeleteButtonStyle({backgroundColor: '#ef4444'});}}
        onClick={() => {setId('')}}>
        Delete</button>
      </div>
      :
      <></>
      }
    </div>
  )
}

export default SinglePlannedMealContainer