import './addRecipe.css';
import { useState } from 'react';

export default function AddRecipe(props) {

    const [state, setState] =
        useState({
            name: '',
            ingredients: '',
            directions: '',
            picture: ''
        });

    const parseStringByCommas = input => {
        if (typeof input !== "string") {
            return [];
        }
        return input.split(',').map(item => item.trim()).filter(Boolean);

    };

    const handleChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const submitForm = e => {
        e.preventDefault();
        const { id, addrecipe } = props;
        const { name, ingredients, directions, picture } = state;

        let recipe = {
            id,
            name,
            ingredients: parseStringByCommas(ingredients),
            directions: parseStringByCommas(directions),
            picture
        };

        addrecipe(recipe);

        setState({
            name: '',
            ingredients: '',
            directions: '',
            picture: ''
        });
    };

    const { name, ingredients, directions, picture } = state;

    return (
        <>
            <form>
                <div id="instructionsForUsers">
                    For Ingredients and Directions, be sure to use commas ( , ) to differentiate between steps.
                </div>
                <div>
                    Name: <input name="name" value={name} onChange={handleChange} />
                </div>
                <div>
                    Ingredients: <input className="longText" value={ingredients} name="ingredients" onChange={handleChange} />
                </div>
                <div>
                    Directions: <input className="longText" value={directions} name="directions" onChange={handleChange} />
                </div>
                <div>
                    Picture URL: <input value={picture} name="picture" onChange={handleChange} />
                </div>
                <button id="submitButton" onClick={submitForm}>Submit</button>
            </form>
        </>
    );
}
