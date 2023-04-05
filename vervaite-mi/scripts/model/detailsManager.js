class DetailsManager {
    getDetails = (partyId) => {

        const sessionId = JSON.parse(localStorage.getItem('loggedUser')).sessionId;

        return makeAPICall(SERVER_URL + `/party/${partyId}`, {
            headers: {
                'identity': sessionId
            }
        })
    }
}