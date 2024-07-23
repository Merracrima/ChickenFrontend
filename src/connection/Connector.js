const BASE_URL = 'https://chicken.onlyjosh.de';

function foo(method, pfad, body, token, farmName = 'Mark1') {
    if (method === 'GET' || method === 'HEAD') {
        return fetch(BASE_URL + pfad, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Farmname': farmName
            }
        }).then(value => value.json());
    }
    return fetch(BASE_URL + pfad, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Farmname': farmName
        }
    }).then(value => value.json());;
}

export default foo;