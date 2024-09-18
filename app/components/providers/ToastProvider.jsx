'use client'

import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ToastProvider() {
    
    return (
        <>
        <ToastContainer transition={Flip} />
        </>
    );
}

export default ToastProvider;