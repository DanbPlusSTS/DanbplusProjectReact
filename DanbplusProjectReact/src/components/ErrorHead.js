function ErrorHead(props) {

    return (
        <head>
            <meta charSet="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="description" content=""/>
            <meta name="author" content=""/>
            <title>{ props.data.name }</title>
            <link href="resource/css/styles.css" rel="stylesheet"/>
            <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossOrigin="anonymous"></script>
        </head>
    );
}

export default ErrorHead;