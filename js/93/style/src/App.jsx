import { useState } from 'react'
import './App.css'

function App() {
  const [state, setState] = useState({
    color: '#4a8bad',
    backgroundColor: '#843c54',
    fontFamily: 'cursive'
  });

  const handleChanges = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <div style={state}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, sed. Aliquid eligendi illum dolor consequatur? Labore nulla ratione aliquam magni,
          iure modi laudantium, delectus doloribus eveniet est sequi, recusandae laborum placeat temporibus nisi nemo ex exercitationem. Quisquam amet eum repellat
          modi dolorum hic maxime labore, consequatur earum sint perferendis distinctio error sequi facere fugiat! Dignissimos voluptate nam doloremque cupiditate
          repellat assumenda illum nesciunt illo odit, eum distinctio veritatis maiores maxime exercitationem nemo. Commodi qui vel sunt culpa. Nobis, praesentium
          in libero iste temporibus corrupti eius culpa aut expedita architecto. Deserunt voluptatem eius veniam similique explicabo repellat atque vel, voluptates
          distinctio! At vitae obcaecati, ex ea quam atque rem numquam blanditiis dolores tempora nam, incidunt et nesciunt quaerat aut repellat ducimus possimus
          quidem doloremque ad suscipit? Facilis nisi possimus exercitationem repudiandae, maiores porro iusto odit obcaecati quasi facere quam ab ex deleniti.
          Laborum et alias, praesentium autem obcaecati assumenda saepe. Animi, sint? Recusandae, possimus fugit! Sapiente ullam quas neque suscipit, a consectetur
          consequuntur natus debitis dolorem ab id incidunt pariatur eum tenetur vitae in repudiandae sunt aspernatur. Similique est doloribus facilis suscipit provident
          excepturi. Nam eaque voluptatibus cumque nemo expedita architecto, iure dolorem animi cum incidunt optio quidem omnis, unde odit hic cupiditate tempora itaque
          velit commodi fuga quis perferendis placeat, quae quibusdam. Doloribus amet dicta, nesciunt autem facilis accusamus ea accusantium dolorum dignissimos facere
          est blanditiis dolorem pariatur quibusdam, veniam sint repellat. Distinctio ad ea, sit consequuntur quibusdam excepturi tempora rerum, qui ab dolores vero dolorem
          molestiae sed nam veniam, natus suscipit! Velit sapiente est, veritatis officiis quae inventore ipsam facilis repellendus rem similique. Odio ad temporibus libero,
          optio ipsam sapiente voluptatem est dicta voluptas illo laudantium corrupti excepturi deserunt enim nostrum nulla tempora, necessitatibus, vitae dolorum provident
          molestias! Ducimus laboriosam, cum sed vitae nesciunt quia consequatur neque asperiores esse.
        </p>
      </div>
      <form>
        Text Color:<input type="color" value={state.color} name='color' onChange={handleChanges} />
        Background Color:<input type="color" value={state.backgroundColor} name='backgroundColor' onChange={handleChanges} />
        Font:<select value={state.fontFamily} name='fontFamily' onChange={handleChanges}>
          <option>serif</option>
          <option>sans-serif</option>
          <option>cursive</option>
          <option>monospace</option>
          <option>fantasy</option>
        </select>
      </form>
    </>
  )
}

export default App
