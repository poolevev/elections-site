function getElement(id) {
    return document.getElementById(id);
}

function createEl(el, param = null) {
    let element = document.createElement(el);
    if (el === "img") {
        element.src = param;
    } else {
        element.innerText = param;
    }
    return element;
}

function makeAPICall(url, options) {
    return fetch(url, options)
        .then(response => {

            if (response.ok) {

                return new Promise((res, rej) => {
                    response.json()
                        .then(body => res(body))
                        .catch(error => res(error))
                })
            }

            return new Promise((res, rej) => {
                //берем тело ответа ошибки
                response.json().
                    then(body => {
                        rej(new Error(body.message));
                    })

            })

        })
}

function debounce(action, seconds) {
    let timerId = null;
    return function (...event) {
        clearTimeout(timerId);
        timerId = setTimeout(action, seconds, ...event)

    }
}

