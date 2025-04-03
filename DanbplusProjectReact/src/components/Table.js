function Table(props) {

    return (
        <div className="card mb-4">
            <div className="card-header">
                {/*component*/}
            </div>
            <div className="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            {/* map => forEach */}
                            {props.data.map((table) => (
                                <th>{ table.key }</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* map => forEach */}
                            {props.data.map((table) => (
                                <td>{ table.value }</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
