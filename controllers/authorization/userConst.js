const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,//'us-east-2_dtSlpb6U3',//
    ClientId: process.env.CLIENT_ID//'6orqho1ubfhu8s0j0uge4mk3js'//
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


const getCognitoUser = (login) => {
    let userData = {
        Username: login,
        Pool: userPool
    };
    return new AmazonCognitoIdentity.CognitoUser(userData);
};

const getAuthDetails = (login,password) => {
    let userData = {
        Username: login,
        Password: password
    };
    return new AmazonCognitoIdentity.AuthenticationDetails(userData);
};


export {
    poolData,
    userPool,
    getCognitoUser,
    getAuthDetails
};