const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


function getCognitoUser(login){
    let userData = {
        Username: login,
        Pool: userPool
    };

    return new AmazonCognitoIdentity.CognitoUser(userData);
}

function getAuthDetails(login,password){
    let userData = {
        Username: login,
        Password: password
    };

    return new AmazonCognitoIdentity.AuthenticationDetails(userData);
}

const signIn = async (event) => {
    const data = JSON.parse(event.body);
    const {email, password} = data;

    return new Promise((resolve) => {
        try{
            getCognitoUser(email).authenticateUser(getAuthDetails(email,password),{
                onSuccess: (result) => {
                    const token = {
                        accessToken: result.getAccessToken(),
                        idToken: result.getIdToken(),
                        refreshToken: result.getRefreshToken()
                    };
                    resolve({
                        statusCode: 200,
                        headers: {"Access-Control-Allow-Origin":"*"},
                        body: JSON.stringify(token)
                    });
                },
                onFailure: function(err) {
                    resolve({
                        statusCode: 400,
                        headers: {"Content-Type": "text/plain"},
                        body: err.toString()
                    });
                }
            });
        }catch (err){
            resolve({
                statusCode: 400,
                body: err.toString()
            });
        }
    });
};

export {
    signIn
};