import SinglePlannedMeal from "./SinglePlannedMeal";
import AddPlannedRecipe from "./AddPlannedRecipe";
import SinglePlannedMealContainer from "./SinglePlannedMealContainer";
import SinglePastMeal from "./SinglePastMeal";

const MealPlanDay = ({ day, isActive, date, edit }) => {
  
  return (
    <>
    {!isActive ?
      <div className="bg-white rounded-xl shadow-md relative pl-3 pr-3">
      <div className="p-1">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{date}</div>
          <h3 className="text-xl font-bold">{day}</h3>
        </div>
        <div className="text-gray-600 flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            <h3>Breakfast</h3>
            <SinglePastMeal />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3>Lunch</h3>
            <SinglePastMeal />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3>Dinner</h3>
            <SinglePastMeal />
          </div>
        </div>

      </div>
    </div>
    :
    <div className="bg-white rounded-xl shadow-md relative pl-3 pr-3">
      <div className="p-1">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{date}</div>
          <h3 className="text-xl font-bold">{day}</h3>
        </div>
        <div className="text-indigo-500 flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            <h3>Breakfast</h3>
            <SinglePlannedMealContainer edit={edit} mealType='Breakfast' />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3>Lunch</h3>
            <SinglePlannedMealContainer edit={edit} mealType='Lunch-Dinner'/>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3>Dinner</h3>
            <SinglePlannedMealContainer edit={edit} mealType='Lunch-Dinner'/>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default MealPlanDay