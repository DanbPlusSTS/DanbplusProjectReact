function LayoutAuthMain(props) {

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <h3 className="text-center font-weight-light my-4">{ props.title }</h3>
                                    </div>
                                    <div className="card-body">
                                        {/*component*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*component*/}
                </main>
            </div>
        </div>
    )
}

export default LayoutAuthMain;