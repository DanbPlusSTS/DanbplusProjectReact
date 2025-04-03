import {useState} from "react";

function Popup(props) {
    const [row, setRow] = useState(true)

    return (
        <div className="modal fade" id={ props.id } tabIndex="-1" aria-labelledby="payInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{ props.title }</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/*추후 제대로 작성*/}
                            {props.data.map((popup) => (
                                <div className={`mb-3 ${row === popup.key ? 'row' : ''}`}>
                                    <div className="text">
                                        <input className="form-check-input" type="radio" name="vacType" id="vacType_1" value="1" checked="checked"/>
                                        <label className="form-check-label" htmlFor="vacType_1">{ popup.value }</label>
                                    </div>
                                </div>
                            ))}

                        </form>
                    </div>
                    <div className="modal-footer">
                        {/*추후 제대로 작성*/}
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;