import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const subject = new Subject();

const initialState = {
    tables: [
        { id: 1, data: [] }
    ]
}

let state = initialState;

const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]

const tablesStore = {
    init: () => {
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    copyTable: id => {
        const targetTable = state.tables.find(item => item.id === id)
        const newTable = { ...targetTable }
        newTable.id = uuidv4();
        const insertIndex = state.tables.indexOf(targetTable) + 1;
        const newTables = insert(state.tables, insertIndex, newTable)
        state = {
            tables: newTables,
        };
        subject.next(state);
    },
    deleteTable: id => {
        const newTables = state.tables.filter(item => item.id !== id)
        state = {
            tables: newTables
        }
        subject.next(state);
    },
    addData: data => {
        const changedTables = state.tables.map(table =>
            table.id === 1 ? { ...table, data: [...table.data, data] } : table
        );
        state = {
            tables: changedTables
        }
        subject.next(state);
    },
    editData: (data, tableId) => {
        const changedTables = state.tables.map(table => {
            if (table.id === tableId) {
                const changedData = table.data.map(row => row.id === data.id ? data : row)
                table.data = changedData
            }

            return table
        });
        state = {
            tables: changedTables
        }
        subject.next(state);
    },
    deleteData: (id, tableId) => {
        const changedTables = state.tables.map(table => {
            if (table.id === tableId) {
                const changedData = table.data.filter(row => row.id !== id)
                table.data = changedData
            }

            return table
        });
        state = {
            tables: changedTables
        }
        subject.next(state);
    },
    initialState
};

export default tablesStore;