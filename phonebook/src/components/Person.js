import React from 'react'

const Person = ({ person, clickRemove }) => (
    <li>
        {person.name} {person.number}
        <button onClick={clickRemove}>delete</button>
    </li>
)

export default Person