import MealPlanDay from "../components/MealPlanDay"
import { useState, useEffect } from 'react';

const MealPlanPage = () => {

  const [editMode, setEditMode] = useState(false);

  const [daysToPlan, setDaysToPlan] = useState(7);

  const daysToPlanArray = Array(daysToPlan).fill().map((_, index) => index + 1);


  const buttonStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let currentDate = new Date();

  const handleChange = (e) => {
    const val = parseInt(e.currentTarget.value, 10);
    const min_val = Math.max(val, 1);
    if (!isNaN(val)) {
      setDaysToPlan(Math.min(28, min_val));
    }
  };

  const active = (index) => {
    if (index < currentDate.getDay()) {return false;}
    else {return true;}
  };

  const getDate = (index) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (index - currentDate.getDay()));
    return newDate.toLocaleDateString();
  };

  return (
    <>
      <ol>
        <li>Clean up how variables are being passed to container component</li>
        <li>Add the email shopping list functionality - user has to say how many days they are shopping for</li>
      </ol>
      <section className="bg-blue-50 px-4 py-10 w-full">
      <div className="container-xl lg:container">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Plan Your Meals
          </h2>
      <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2"
            >Days to plan for</label>
          <input
            type="number"
            id="days"
            name="days"
            value={daysToPlan}
            onChange={handleChange}
            className="border rounded py-2 px-3 mb-2"
            placeholder="Enter a number between 1 and 28"
            required
            />
      <button
          style={buttonStyle}
          onClick={() => {}}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-center p-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block">
            Create Shopping List
          </button>
      <button
        style={buttonStyle}
        onClick={(e) => {setEditMode(!editMode)}}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center p-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block">
          {editMode ? 'Stop editing plan' : 'Edit plan'}
      </button>
            </div>

      <div className="flex grid grid-cols-7 md:grid-cols-7 gap-3 w-auto m-auto">
      {daysToPlanArray.map((i) => (<MealPlanDay day={days[i%7]}  isActive={active(i)} date={getDate(i)} edit={editMode}/>))}
      </div>
      </div>
      </section>
    </>
  )
}

export default MealPlanPage