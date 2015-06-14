(function () {

    // Enter Global Config Values & Instantiate ADAL AuthenticationContext
    window.config = {
        tenant: 'domain.com',
        clientId: '{client-id}',
        postLogoutRedirectUri: window.location.origin,
        cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        endpoints: {
        // Map the location of a request to an API to a the identifier of the associated resource
        // Format: API Url, Resource
            "https://graph.microsoft-ppe.com/": "https://graph.microsoft-ppe.com/",
            "https://graph.microsoft.com/": "https://graph.microsoft.com/"
        }
    };
    var authContext = new AuthenticationContext(config);

    // Check For & Handle Redirect From AAD After Login
    var isCallback = authContext.isCallback(window.location.hash);
    authContext.handleWindowCallback();

    if (isCallback && !authContext.getLoginError()) {
        window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
    }

    // Check Login Status, Update UI
    var user = authContext.getCachedUser();
    if (user) {
        var token = authContext.getCachedToken('https://graph.microsoft.com/');
        if (!token) {
            authContext.acquireToken('https://graph.microsoft.com/', function (err, token) {
                if (err || !token) {
                    console.log(err, token);
                    $('#response').text(JSON.stringify(arguments));
                    return;
                }
                loggedIn(token);
            });
        } else {
            loggedIn(token);
        }
    } else {
        console.log("error");
        authContext.login();
    }

    function loggedIn(token) {
        console.log(token)
        $.ajax({
             type: 'GET',
             url: 'https://graph.microsoft.com/beta/me/messages',
             headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept' : 'application/json; odata.metadata=none',
                }
         }).done(function (data) {
                $('#response').val(JSON.stringify(data, ' ', 4));
         }).fail(function () {
                $('#response').val(JSON.stringify(arguments));
         });
    }

    $('#logout').on('click', function (e) {
        e.preventDefault();
        authContext.logOut();
    })

}());