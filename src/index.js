const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/*

Authentication schema:

1) User provides email and password to /users/login, if it exists, a token is generated and added to the user's token list
2) The user and token are sent to the client. The client stores the token and sends it when issuing a request
3) The user attempts to access a route to perform an operation: before it does, a middleware function, auth, runs to
test if the user is authenticated
    3.1) Extracts the token from the header
    3.2) Extracts the id from the token
    3.3) Verifies if there is a user with the id and containing that token
    3.4) If there is, run the handler (next)


*/




