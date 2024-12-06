import './addRecipe.css';
import { Component } from 'react';

export class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ingredients: '',
            directions: '',
            picture: ''
        };
    }

    parseStringByCommas(input) {
        if (typeof input !== "string") {
            return [];
        }
        return input.split(',').map(item => item.trim()).filter(Boolean);
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    submitForm = e => {
        e.preventDefault();
        const { id, addrecipe } = this.props;
        const { name, ingredients, directions, picture } = this.state;
        let recipe = {
            id,
            name,
            ingredients: this.parseStringByCommas(ingredients),
            directions: this.parseStringByCommas(directions),
            picture
        };

        addrecipe(recipe);

        this.setState({
            name: '',
            ingredients: '',
            directions: '',
            picture: ''
        })
    }

    render() {
        const { name, ingredients, directions, picture } = this.state;

        return (
            <>
                <form>
                    <div id="instructionsForUsers">
                        For Ingredients and Directions, be sure to use commas ( , ) to differentiate between steps.
                    </div>
                    <div>
                        Name: <input name="name" value={name} onChange={this.handleChange} />
                    </div>
                    <div>
                        Ingredients: <input className="longText" value={ingredients} name="ingredients" onChange={this.handleChange} />
                    </div>
                    <div>
                        Directions: <input className="longText" value={directions} name="directions" onChange={this.handleChange} />
                    </div>
                    <div>
                        Picture URL: <input value={picture} name="picture" onChange={this.handleChange} />
                    </div>
                    <button id="submitButton" onClick={this.submitForm}>Submit</button>
                </form>
            </>
        );
    }
}