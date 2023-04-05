class ListingsController {
    constructor(partiesManager, detailsManager, detailsController, userManager) {
        this.partiesManager = partiesManager;
        this.detailsManager = detailsManager;
        this.detailsController = detailsController;
        this.userManager = userManager;
    }

    render = () => {
        let inputSearch = getElement("searchPartiesInput");
        let partiesContainer = getElement("partiesContainer");
        partiesContainer.innerHTML = "";
        inputSearch.oninput = debounce((event) => {
            const keyword = event.target.value;

            this.partiesManager.search(keyword).then(parties => {
                partiesContainer.innerHTML = "";
                this.renderParties(parties, partiesContainer)
            })
        }, 500);

        this.partiesManager.getAll().then(data => {
            this.renderParties(data, partiesContainer);
        })
    }
    //render cards
    renderParties = (list, container) => {

        container.innerHTML = "";

        list.forEach(partie => {

            let card = document.createElement("div");
            let voteBtn = createEl("button", "Vote");
            let detailsBtn = createEl("button", "Details");
            voteBtn.classList.add("btn", "btn-primary");
            detailsBtn.classList.add("btn", "btn-primary");
            voteBtn.id = "voteBtn";
            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${partie.picture}" alt = "..." >
                    <div class="card-body">
                        <h5 class="card-title">${partie.name}</h5>
                        <p class="card-text">o${partie.slogan}</p>
                    </div>
              </div>`

            this.userManager.loggedUser.hasVoted ? voteBtn.disabled = true : voteBtn.disabled = false;

            detailsBtn.onclick = (event) => {

                event.preventDefault();

                this.detailsManager.getDetails(partie.id)
                    .then(result => {

                        this.detailsController.render(result);

                    })

                location.hash = 'details';
            }

            voteBtn.onclick = (event) => {

                event.preventDefault();

                if (!this.userManager.loggedUser.hasVoted) {

                    this.userManager.loggedUser.hasVoted = true;
                    localStorage.setItem('loggedUser', JSON.stringify(this.userManager.loggedUser));

                    this.userManager.vote(partie.id)
                        .then(result => {
                            alert(result.message);
                            voteBtn.disabled = true;
                            setTimeout(() => {
                                location.hash = "results";
                            }, 1000);
                        })
                        .catch(result => {
                            alert(result);
                        })
                }
                else {
                    alert('You have already voted!');
                }

            }
            card.append(detailsBtn, voteBtn);
            container.append(card);
        })

    }
}