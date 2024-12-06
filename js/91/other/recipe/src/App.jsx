import { Component } from 'react';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import { AddRecipe } from './addRecipe.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      selectedRecipe: 1,
      addRecipe: false,
      buttonText: 'Add New Recipe'
    };
  }

  async componentDidMount() {
    try {
      const r = await fetch('././recipes.json');
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      const recipes = await r.json();
      this.setState({
        recipes
      });
      console.log(recipes);
    } catch (e) {
      console.error(e);
    }
  }

  buttonClicked = () =>{
    const { addRecipe } = this.state;
    this.setState({
      addRecipe: !addRecipe,
      buttonText: (!addRecipe ? 'Remove Form' : 'Add New Recipe')
    });
  }
  recipeSelected = index => {
    this.setState({
      selectedRecipe: index
    });
  }
  addNewRecipe = recipe => {
    console.log(this.state.recipes);

     this.state.recipes.push(recipe);
      this.setState({
      recipes: this.state.recipes
    });
   // }
    
   console.log(this.state.recipes);
  }

  render() {
    console.log(this.state.recipes);
    const { recipes, selectedRecipe, addRecipe, buttonText} = this.state;
   // console.log(this.state.recipes);
    const recipeJsx = this.state.recipes.length ? <Recipe recipe={recipes[selectedRecipe]} /> : <div>loading...</div>;
    console.log(this.state.recipes);
    return (<>
   <div id="newRecipeContainer">
        <button onClick={this.buttonClicked}> {buttonText}
        </button>
        {addRecipe ? <AddRecipe id={3} addrecipe={this.addNewRecipe}/> : null}
      </div>
    
     <div className="container">
        <h1>PCS Recipes</h1>
        <RecipeList recipes={recipes} recipeSelectedHandler={this.recipeSelected}/>
        <hr />
        {recipeJsx}
      </div>
    </>
     
    )
  }
}
