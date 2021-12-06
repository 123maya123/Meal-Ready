import React from 'react';
import classes from './Modal.module.css';
import  ReactDOM  from 'react-dom';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/> 
}
const ModalOverLay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    )
}
const portalElement = document.getElementById('overlays');
//as we added this below line in index.html : <div id="overlays"></div> 

const Modal= (props) => {
    return(
      <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)} 
        {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)} 
    </React.Fragment>
    )
    
}
export default Modal;
//here we will have special markup

//we wanna use React portal for both my backDrop so that the things behind react overlay which blocks
//interaction with rest of page n i also wanna render modal over lay n Backdrop with react portal

//to render a portal we need to go to public Folder there the  index.html file add a line above Root div

//now go to cart component  i.e. Cart.js n wrap return with modal