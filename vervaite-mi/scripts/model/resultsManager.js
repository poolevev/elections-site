class ResultManager {

    constructor(detailsManager) {

        this.detailsManager = detailsManager;

    }


    getPartyIds = () => {

        const sessionId = JSON.parse(localStorage.getItem('loggedUser')).sessionId;

        let rawResults;

        return makeAPICall(SERVER_URL + '/results', {

            headers: {
                'identity': sessionId

            }
        })
            .then(res => {

                let totalVoters = res.reduce((acc, curr) => acc + curr.voters, 0)

                console.log("Общо гласували " + totalVoters);

                return res.map(party => {

                    party.voters = Number((party.voters / totalVoters * 100).toFixed(2));
                    console.log(party)
                    return party;

                }).sort((a, b) => b.voters - a.voters)

            })
            .then(result => {
                console.log(result + "result")
                rawResults = result;

                let partyArr = [];

                result.forEach(party => {

                    partyArr.push(this.detailsManager.getDetails(party.partyId));

                });

                return Promise.all(partyArr)
            })
            .then(res => {

                console.log(res);

                for (let i = 0; i < res.length; i++) {

                    rawResults[i].partyId = res[i].name
                }

                return rawResults;
            })



    }




}