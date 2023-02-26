// This function creates or updates an input element with the given ID and value
function createOrUpdateInputElement(id, value) {
    const inputElement = document.getElementById(id) || (() => {
        const newElement = document.createElement('input');
        newElement.setAttribute('type', 'hidden');
        newElement.setAttribute('id', id);
        document.body.appendChild(newElement);
        return newElement;
    })();

    inputElement.setAttribute('value', value);
    inputElement.dispatchEvent(new Event('input'));
}

// This function is called when a message is received from the extension
function process_message(request, sender, sendResponse) {
    // Call the createOrUpdateInputElement function for the formula bar input
    createOrUpdateInputElement('from-ext-t-formula-bar-input', request.t_formula_bar_input);
    // Call the createOrUpdateInputElement function for the name box input
    createOrUpdateInputElement('from-ext-t-name-box', request.t_name_box);
    // Send a response to the extension with a status code
    sendResponse({ sidePanelRx: "OK" });
}

// This function is called when a mutation is observed in the document
const observer_callback = (mutationList, observer) => {
    // Check if the document body is available
    if (document.body) {
        // Add a message listener to handle messages from the extension
        chrome.runtime.onMessage.addListener(process_message);
        // Stop observing mutations
        observer.disconnect();
    };
}

// Options for the mutation observer (which mutations to observe)
const observer_options = { attributes: true, childList: true, subtree: true };

// Create a mutation observer instance linked to the observer callback function
const observer = new MutationObserver(observer_callback);

// Start observing the document for configured mutations
observer.observe(document, observer_options);