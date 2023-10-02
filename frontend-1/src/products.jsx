import React from 'react';

const ProductList = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>
                <input type="num" 
                id={"tr-" + props.id}
                value={props.quantity}
                onChange={(event) => { props.valueChanged(+event.target.value); }}
                />
            </td>
        </tr>
    );
}

export default ProductList;