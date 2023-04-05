class DetailsController {

    constructor(userManager, resultsManager, resultController) {

        this.userManager = userManager;
        this.resultsManager = resultsManager;
        this.resultController = resultController;

    }


    render = (party) => {

        location.hash = 'details';

        let cardLeft = getElement('detailsContainerLeft');
        cardLeft.innerHTML = "";

        let img = createEl('img', party.picture);

        let slogan = createEl('span', party.slogan);

        cardLeft.append(img, slogan);

        let cardRight = getElement('detailsContainerRight');
        cardRight.innerHTML = "";

        let leaderName = createEl('h3', party.leader);

        let agitation = createEl('p', party.agitation);

        let buttonsDiv = createEl('div');
        let detailsNotif = createEl("span");

        let voteForUsBtn = createEl('button', 'Vote for Us')
        voteForUsBtn.classList.add('btn', 'btn-primary');

        this.userManager.loggedUser.hasVoted ? voteForUsBtn.disabled = true : voteForUsBtn.disabled = false;

        voteForUsBtn.onclick = (event) => {

            event.preventDefault();

            if (!this.userManager.loggedUser.hasVoted) {

                this.userManager.loggedUser.hasVoted = true;
                localStorage.setItem('loggedUser', JSON.stringify(this.userManager.loggedUser));

                this.userManager.vote(party._id)
                    .then(result => {
                        detailsNotif.innerText = result.message;
                    })
                    .catch(result => {
                        alert(result);
                    })
            }
            else {

                alert('You have voted already');
            }

        }

        let viewResultsBtn = createEl('a', ' View Results');
        viewResultsBtn.classList.add('btn', 'btn-primary');

        viewResultsBtn.onclick = (event) => {

            event.preventDefault();

            this.resultController.render();

        }

        buttonsDiv.append(voteForUsBtn, viewResultsBtn);
        cardRight.append(leaderName, agitation, buttonsDiv, detailsNotif);

    }

}