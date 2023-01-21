import React, { useContext } from "react";

import { ModalContext } from "../modalContext";
import tablesStore from "../store";
import { isEmpty } from "../helpers";

const Row = ({ data, tableId }) => {
    const modalRef = useContext(ModalContext);

    const editRow = () => {
        modalRef?.current?.toggleModal({
            show: true,
            data,
            tableId
        });
    }
    return (
        <tr className='row'>
            <td>{data.name}</td>
            <td>{data.surname}</td>
            <td>{data.age}</td>
            <td>{data.city}</td>
            <td className='row__actions'>
                {!isEmpty(data) &&
                    <>
                        <div className='row__actions__edit' onClick={editRow}>Edit</div>
                        <div className='row__actions__delete' onClick={() => tablesStore.deleteData(data.id, tableId)}>Delete</div>
                    </>
                }
            </td>
        </tr>
    )
}

export default Row;