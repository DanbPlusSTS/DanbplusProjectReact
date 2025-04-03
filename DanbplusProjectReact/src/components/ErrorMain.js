import {useEffect, useState} from "react";

function ErrorMain(props) {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        setError(props.data.name)
        if (error === "401") setMessage("Unauthorized \n Access to this resource is denied.")
        else if (error === "404") setMessage("This requested URL was not found on this server.")
        else if (error === "500") setMessage("Internal Server Error")
    }, []);

    return (
        <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <h1 className="display-1">{error}</h1>
                                    <p className="lead">{ message }</p>
                                    <a href="/">
                                        <i className="fas fa-arrow-left me-1"></i>
                                        메인가기
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutError_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">서울 종로구 삼봉로 81 두산위브파빌리온 1218호</div>
                            <div className="text-muted">Copyright &copy; DanbPlus. All rights reserved.</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default ErrorMain;