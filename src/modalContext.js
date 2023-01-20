import React, { createContext, useRef } from 'react';

import Modal from './components/Modal';

const ModalContext = createContext(null);

const ModalProvider = (props) => {
  const modal = useRef();

  return (
    <ModalContext.Provider value={modal} {...props}>
      <Modal ref={modal}/>
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };