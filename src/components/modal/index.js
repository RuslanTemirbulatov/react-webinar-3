import React from 'react';
import "./style.css";


const Modal = ({active, setActive, children}) => {

    const openModal = () => {
        setActive(false);
    }
    
    return (
        <div>
            <div className={active ? "modal active" : "modal"} onClick={openModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;