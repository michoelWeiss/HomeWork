import './Recipe.css';
import ListComponent from './ListComponent';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Recipe(props){

  const [state, setState] = useState({pictureShowing: true});

  const togglePicture = () => {
    setState({ pictureShowing: !state.pictureShowing });
  }

  const { name, ingredients, directions, picture } = props.recipe || {};

  const { pictureShowing } = state;

  if (! name) {
    return (<div>loading...</div>)
  }
  return (<>
  <h2>{name}</h2>
        {pictureShowing ? <img src={picture} /> : null}
        <br />
        <button onClick={togglePicture}>{pictureShowing ? 'hide picture' : 'show picture'}</button>
        <ListComponent name="ingredients" list={ingredients} />
        <ListComponent name="directions" list={directions} />
  </>);
}
Recipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string).isRequired

  }).isRequired
};
