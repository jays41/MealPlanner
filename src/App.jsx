import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MyRecipesPage from './pages/MyRecipes';
import SingleRecipePage from './pages/SingleRecipePage';
import NewRecipePage from './pages/NewRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import RecommendedRecipePage from './pages/RecommendedRecipePage';
import ExplorePage from './pages/ExplorePage';
import MealPlanPage from './pages/MealPlanPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

import React from 'react'


const App = () => {

  const addRecipe = async (newRecipe) => {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe),
  });
    return;
  };
  
  const deleteRecipe = async (id) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
  });
    return;
  }
  
  const updateRecipe = async (recipe) => {
    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe),
  });
    return;
  };

  const addRecommendedRecipe = async (newRecipe) => {
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe),
  });
    return;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/my-recipes' element={<MyRecipesPage />} />
      <Route path='/my-recipes/:id' element={<SingleRecipePage deleteRecipeSubmit={deleteRecipe}x />} />
      <Route path='/new-recipe' element={<NewRecipePage addRecipeSubmit={addRecipe} />} />
      <Route path='/edit-recipe/:id' element={<EditRecipePage editRecipeSubmit={updateRecipe} />} />
      <Route path='/recommended-recipe/:id' element={<RecommendedRecipePage addRecipeSubmit={addRecipe} />} />
      <Route path='/explore' element={<ExplorePage addRecommendedRecipeSubmit={addRecommendedRecipe} />} />
      <Route path='/plan' element={<MealPlanPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  

  return <RouterProvider router={router} />; 
};

export default App