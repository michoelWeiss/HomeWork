//import { Component } from 'react';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import AddRecipe from './addRecipe.jsx';
import { useState, useEffect } from 'react';

export default function App() {

  const [state, setState] =
    useState({
      recipes: [],
      selectedRecipe: 1,
      addRecipe: false,
      buttonText: 'Add New Recipe'
    });

  const buttonClicked = () => {
    setState({ ...state, addRecipe: !state.addRecipe, buttonText: (!state.addRecipe ? 'Remove Form' : 'Add New Recipe') });
  };

  const addNewRecipe = recipe => {
    const tempR = state.recipes;
    tempR.push(recipe);
    setState({ ...state, recipes: tempR });
  };

  const recipeSelected = index => {
    setState({ ...state, selectedRecipe: index });
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const r = await fetch('././recipes.json');
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        const recipes = await r.json();
        setState({ ...state, recipes });
        console.log(recipes);
      } catch (e) {
        console.error(e);
      }
    };

    getRecipe();
  }, []);

  const recipeJsx = state.recipes.length ? <Recipe recipe={state.recipes[state.selectedRecipe]} /> : <div>loading...</div>;
  return (<>
     <div id="newRecipeContainer">
      <button onClick={buttonClicked}> {state.buttonText}
      </button>
      {state.addRecipe ? <AddRecipe id={state.recipes.length > 0 ?
        Math.max(...state.recipes.map(recipe => recipe.id)) + 1 : 1}
        addrecipe={addNewRecipe} /> : null}
    </div>

    <div className="container">
      <h1>PCS Recipes</h1>
      <RecipeList recipes={state.recipes} recipeSelectedHandler={recipeSelected} />
      <hr />
      {recipeJsx}
    </div>
  </>);

}
