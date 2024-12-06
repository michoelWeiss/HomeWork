import React from 'react'

export default function RecipeList(props) {
  const { recipes, recipeSelectedHandler } = props;
  return (
    recipes.length
      ? recipes.map((r, index) => <h2 key={r.id} onClick={
        () => recipeSelectedHandler(index)
      }>{r.name}</h2>)
      : <div>loading....</div>
  )
}
