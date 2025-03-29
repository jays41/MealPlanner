import { useState, useEffect } from "react";
import AllRecipes from "../components/AllRecipes";

const MyRecipes = () => {

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Your Recipes
          </h2>
        </div>
        <AllRecipes />
      </section>
    </>
  )
}

export default MyRecipes