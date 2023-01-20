import React, { useState, useEffect } from 'react';

import Form from './components/Form';
import Table from './components/Table';
import tablesStore from './store';

function App() {
  const [tableList, setTableList] = useState(tablesStore.initialState);

  useEffect(() => {
    tablesStore.subscribe(setTableList);
    tablesStore.init();
  }, []);

  return (
    <div className="container">
      <Form data={null} />
      {tableList.tables.map(({ id, data }) => (
        <Table key={id} data={data} id={id} />
      ))}
    </div>
  );
}

export default App;
