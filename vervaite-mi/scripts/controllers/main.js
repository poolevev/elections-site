class ViewController {

    constructor() {
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
            this.disableHeader();
        });
        window.addEventListener('load', () => {
            this.handleHashChange();
            this.disableHeader();
        });

        this.userManager = new UserManager();
        this.partiesManager = new PartiesManager();
        this.detailsManager = new DetailsManager();
        this.resultManager = new ResultManager(this.detailsManager);

        this.registerController = new RegisterController(this.userManager);
        this.loginController = new LoginController(this.userManager);
        this.resultsController = new ResultsController(this.resultManager);
        this.detailsController = new DetailsController(this.userManager, this.resultManager, this.resultsController);
        this.listingsController = new ListingsController(this.partiesManager, this.detailsManager, this.detailsController, this.userManager);
    }

    disableHeader = () => {
        let header = getElement("headerEl");
        let welcomeUser = getElement("welcomeUser");
        if (this.userManager.loggedUser) {
            header.style.display = "block";
            welcomeUser.innerText = this.userManager.loggedUser.username;
        } else {
            header.style.display = "none";
        }
    }

    handleHashChange = () => {
        const hash = location.hash.slice(1) || PAGE_IDS[0];

        if (hash === 'details' || hash === 'results' || hash === 'listings') {
            if (!this.userManager.loggedUser) {
                location.hash = 'login';
                return;
            }
        }

        if (!PAGE_IDS.includes(hash)) {
            location.hash = "errorPage";
            return;
        }

        PAGE_IDS.forEach(pageId => {
            let page = getElement(pageId);
            hash === pageId ? page.style.display = "block" :
                page.style.display = "none";

        })

        switch (hash) {
            case "register":
                this.registerController.render();
                break;

            case "login":
                this.loginController.render();
                break;

            case "listings":
                this.listingsController.render();
                break;

        }
    }


}

let viewController = new ViewController();
