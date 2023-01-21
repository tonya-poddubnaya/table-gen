import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

import Form from "./Form";

const Modal = forwardRef(({ test }, ref) => {

    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        data: {},
        tableId: ''
    });

    useImperativeHandle(ref, () => ({
        toggleModal({ show, data, tableId }) {
            setVisible(show);
            setFormData({
                data,
                tableId
            });
        }
    }));

    const modalRef = useRef();

    const onClose = () => {
        setVisible(false);
    }

    return (
        <>
            <div
                className="modal"
                id="modal"
                ref={modalRef}
                style={{ display: `${visible ? '' : 'none'}` }}
            >
                <Form data={formData.data ? formData.data : {}} closeModal={onClose} tableId={formData.tableId} />
            </div>
            <div className="layout" style={{ display: `${visible ? 'block' : 'none'}` }} onClick={onClose} />
        </>
    );
});

Modal.displayName = 'Modal';
export default Modal;