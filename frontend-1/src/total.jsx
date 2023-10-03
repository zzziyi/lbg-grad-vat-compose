import React from 'react';

const TotalPrice = (props) => {
    return (
        <tr>
            <td>Total Price ({props.type} VAT)</td>
            <td>
                <input
                type="number"
                value={props.value}
                onChange={ props.valueChanged() }
                />
            </td>
        </tr>
    );
}

export default TotalPrice;