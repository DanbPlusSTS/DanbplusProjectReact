function Main(props) {

    return (
        <main>
            <div className="container-fluid px-4">
                <h1 className="mt-4">
                    { props.title }
                </h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        { props.content}
                    </li>
                </ol>
            </div>
            {/*component*/}
        </main>
    );
}

export default Main;