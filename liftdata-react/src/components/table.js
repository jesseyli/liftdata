import React from 'react';

const headerRender = header => <th key={header} scope="col">{header}</th>;

const rowRender = ({ exercise, weight, unit, sets, reps }, index) => (
    <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{exercise}</td>
        <td>{`${weight} ${unit}`}</td>
        <td>{sets}</td>
        <td>{reps}</td>
    </tr>
);

const Table = ({ logs, headers }) => (
    <table className="table">
        <thead className="thead-light">
            <tr>
                <th scope="col">#</th>
                {
                    headers.map(headerRender)
                }
            </tr>
        </thead>
        <tbody>
            {
                logs.map(rowRender)
            }
        </tbody>
    </table>
)

export default Table;