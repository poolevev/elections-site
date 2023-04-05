class ResultsController {

    constructor(resultManager) {

        this.resultManager = resultManager;

    }

    render = () => {

        location.hash = 'results';

        let array = this.resultManager.getPartyIds();

        let tableBody = getElement('resultsTable');
        tableBody.innerHTML = "";
        let tableHeadRow = createEl('tr');
        let tableHeadParty = createEl('th', "Party");
        let tableHeadRes = createEl('th', "Result(%)");

        tableHeadRow.append(tableHeadParty, tableHeadRes);
        tableBody.append(tableHeadRow);


        array.then(party => {

            party.forEach(element => {

                let tr = createEl('tr');
                let partyTd = createEl('td', element.partyId);

                let resultTd = createEl('td', element.voters);

                tr.append(partyTd, resultTd);
                tableBody.append(tr);


            });
        })

    }
}