import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';

import tablesStore from "../store";

const Form = ({ data, closeModal, tableId }) => {
    const initialFields = useMemo(() => {
        return {
            id: uuidv4(),
            name: '',
            surname: '',
            age: '',
            city: ''
        }
    }, [])

    const [fields, setFields] = useState({})

    useEffect(() => {
        setFields(data ? data : initialFields)
    }, [data, initialFields])

    const changeValue = (key, value) => {
        setFields({
            ...fields,
            [key]: value
        })
    }

    const hasEmptyProperty = (obj) => {
        for (var key in obj) {
            if (obj[key] === '')
                return true;
        }
        return false;
    }

    const addEditData = () => {
        if (hasEmptyProperty(fields)) {
            alert('Please fill in all fields!')
        } else {
            if (data) {
                tablesStore.editData(fields, tableId);
                closeModal(true);
            } else {
                tablesStore.addData(fields);
                setFields(initialFields);
            }
        }
    }

    return (
        <div className="form">
            <div className="form__container">
                <input
                    type="text"
                    placeholder="Name"
                    value={fields.name}
                    onChange={(e) => {
                        const value = e.target.value;
                        changeValue('name', value)
                    }}
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={fields.surname}
                    onChange={(e) => {
                        const value = e.target.value;
                        changeValue('surname', value)
                    }}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={fields.age}
                    onChange={(e) => {
                        const value = e.target.value;
                        changeValue('age', value)
                    }}
                />
                <select
                    name="cities"
                    id="cities"
                    value={fields.city}
                    onChange={(e) => {
                        const value = e.target.value;
                        changeValue('city', value)
                    }}
                >
                    <option value="" disabled>City</option>
                    <option value="Riga">Riga</option>
                    <option value="Daugavpils">Daugavpils</option>
                    <option value="Jūrmala">Jūrmala</option>
                    <option value="Ventspils">Ventspils</option>
                </select>
                <div className={`btn btn__add ${hasEmptyProperty(fields) ? 'btn__disabled' : ''}`} onClick={addEditData}>{data ? 'EDIT' : 'ADD'}</div>
            </div>
        </div>
    )
}

export default Form;