class PartiesManager {

    getAll = () => {
        return makeAPICall(SERVER_URL + '/parties', {
            headers: {
                "identity": JSON.parse(localStorage.getItem("loggedUser")).sessionId
            }
        })
    }

    search = (keyword) => {
        return makeAPICall(SERVER_URL + '/parties-search', {
            headers: {
                "identity": JSON.parse(localStorage.getItem("loggedUser")).sessionId,
                'partyName': keyword,
            }
        })

    }
}