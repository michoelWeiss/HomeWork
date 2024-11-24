
export default function Address(prop) {
    const { name = 'Brian J. Wacker', numb = '1357', street = 'Blane Street', city = 'Saint Louis', state = 'MO', zip = '63101', country = 'USA' } = prop;
    return (
        <>
            <h2> {name} </h2>
            <h2> {numb} {street} </h2>
            <h2> {city} {state} {zip} </h2>
            <h2> {country} </h2>
        </>
    )
}