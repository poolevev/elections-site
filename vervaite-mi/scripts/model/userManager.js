class UserManager {

    loggedUser = null;
    constructor() {
        this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    }
    register = (username, password) => {
        return makeAPICall((SERVER_URL + '/users'), {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                username,
                password,
            }),

        })
    }

    login = (username, password) => {
        return makeAPICall((SERVER_URL + '/login'), {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                username,
                password,
            }),

        }).then(({ hasVoted, sessionId, username }) => {

            localStorage.setItem("loggedUser", JSON.stringify({ hasVoted, sessionId, username }))
            this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        })
    }

    logout = (sessionId) => {
        this.loggedUser = null;
        localStorage.removeItem('loggedUser');

        return makeAPICall(SERVER_URL + '/logout', {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                id: sessionId,
            })

        })


    }

    vote = (partyId) => {

        const sessionId = JSON.parse(localStorage.getItem('loggedUser')).sessionId;

        return makeAPICall(SERVER_URL + `/vote/${partyId}`, {
            method: 'POST',
            headers: {
                'identity': sessionId,
                "Content-type": "application/json"
            }
        })

    }
}