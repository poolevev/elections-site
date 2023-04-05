class LoginController {

    constructor(userManager) {
        this.userManager = userManager;

    }

    render = () => {
        let form = getElement("loginForm");
        let inputUsername = getElement('inputLoginUsername');
        let inputPassword = getElement("inputLoginPassword");
        let notificText = getElement("notifText");
        let logInBtn = getElement("logInBtn");
        let logoutBtn = getElement("logoutBtn");
        let headerLogoutBtn = getElement("headerLogoutBtn");
        let alreadyLogged = getElement("alreadyLogged");
        alreadyLogged.innerText = "";
        notificText.innerText = "";

        if (localStorage.getItem('loggedUser')) {
            logoutBtn.style.display = "inline-block";
            alreadyLogged.innerText = "You are already logged";
            form.style.display = "none";
        } else {
            logoutBtn.style.display = "none";
            form.style.display = "grid";
        };


        form.addEventListener("keyup", () => {
            if (inputUsername.value !== "" && inputPassword.value !== "") {
                logInBtn.disabled = false;
            } else {
                logInBtn.disabled = true;
            }
        }
        );

        logoutBtn.onclick = () => {
            let sessionId = this.userManager.loggedUser.sessionId;
            this.userManager.logout(sessionId);
            location.hash = "details";

        };

        headerLogoutBtn.onclick = () => {
            let sessionId = this.userManager.loggedUser.sessionId;
            this.userManager.logout(sessionId);
            location.hash = "details";

        };


        form.onsubmit = (event) => {

            event.preventDefault();
            const { username: { value: username },
                password: { value: password },
            } = event.currentTarget;

            this.userManager.login(username, password)
                .then(data => {
                    notificText.innerText = "Successfull login";
                    notificText.style.cssText = "font-size : 16px; font-weigth:bold; color : #0C6109; padding-top:5px;";
                    logoutBtn.style.display = "inline-block";
                    location.hash = "listings";
                })
                .catch(error =>
                    notificText.innerText = error.message)
            event.currentTarget.reset();
        }

        form.onclick = () => {
            notificText.innerText = "";
        }
    }


}
