import Keycloak from 'keycloak-js';

const keycloakSetting = {
    url: 'https://keycloak.onlyjosh.de',
    realm: 'chicken',
    clientId: 'chicken-frontend'
};

export default new Keycloak(keycloakSetting);