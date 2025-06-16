const approuter = require('@sap/approuter');
const jwtDecode = require('jwt-decode').jwtDecode;
const ar = approuter();

ar.beforeRequestHandler
    .use('/info', async (req, res) => {
        const { user } = req
        const token = jwtDecode(user.token.accessToken);
        const o = {
            "now": new Date().toString(),
            "sessionTimeout": ""+req.routerConfig.sessionTimeout,
            "token-auth": new Date(token.auth_time * 1000).toString(),
            "token-iat": new Date(token.iat * 1000).toString(),
            "token-exp": new Date(token.exp * 1000).toString(),
            "receivedAt": new Date(req._receivedAt).toString()
        }
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(o));
    });

ar.start();