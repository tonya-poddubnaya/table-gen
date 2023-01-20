import React from 'react';

import Row from './Row';
import tablesStore from '../store';

const Table = ({ data, id }) => {

  const minRows = 7;

  const emptyRowsCount = minRows - data.length;

  const emptyRows = [];
  for (let i = 0; i < emptyRowsCount; i++) {
    emptyRows.push(<Row key={i} data={[]} />);
  }

  const deleteTable = (id) => {
    if (id === 1) {
      alert("You can't delete the main table!")
    } else {
      tablesStore.deleteTable(id)
    }
  }
  return (
    <div className='table'>
      <div className='table__action_row'>
        <div className='btn btn__copy_table' onClick={() => tablesStore.copyTable(id)}>Copy table</div>
        <div className='table__action_row__delete' onClick={() => deleteTable(id)}>&times;</div>
      </div>
      <table>
        <thead className='table__head'>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <Row key={index} data={row} tableId={id} />
          ))}
          {emptyRows}
        </tbody>
      </table>
    </div>
  );
}

export default Table
