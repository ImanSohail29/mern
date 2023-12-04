import { Fragment } from "react";
import "../../src/styling/chat.css";
const UserChatComponent=()=>{
    return (
        <>
        <input type="checkbox" id="check"></input>
        <label className="chat-btn" htmlFor="check">
            <i className="bi bi-chat-right-dots chat-icon position-relative">
            <span className="position-absolute top-10 start-100 translate-middle border border-light rounded-circle bg-danger p-2"></span></i>
            <i className="bi bi-x-square close-icon"></i>
        </label>
        <div className="chat-wrapper">
            <div className="chat-header">
                <h6>Let's chat online</h6>
            </div>
            <div className="chat-form">
            <div className="chat-msg">
                {Array.from({length:20}).map((_,id)=>{
                    return(
                    <Fragment key={id}>
                    <p>
                     <b>You wrote:</b>Hello world! This is a toast message.
                     </p>
                     <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                         <b>Support wrote:</b> Hello, world! This is a toast message.
                     </p>
                    </Fragment>
                    )
                     
                })}
           
        </div>
        <textarea id="clientChatMsg" className="form-control" placeholder="Your Text Message"></textarea>
        <button className="btn btn-success">Send</button>
        </div>
        </div>
       
        </>
    )
};
export default UserChatComponent;