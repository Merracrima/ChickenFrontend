const BASE_URL = 'http://88.99.208.101:8001';

function foo(method, pfad, body, token, farmName = 'Mark1') {
    if (method === 'GET' || method === 'HEAD') {
        return fetch(BASE_URL + pfad, {
            mode: "no-cors",
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Farmname': farmName
            }
        });
    }
    return fetch(BASE_URL + pfad, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Farmname': farmName
        }
    });
}

export default foo;