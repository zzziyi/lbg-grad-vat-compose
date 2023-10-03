import React from 'react';

const ProductList = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <button onClick={props.valueChanged[0]}>-</button>
            <button onClick={props.valueChanged[1]}>+</button>
        </tr>
    );
}

export default ProductList;