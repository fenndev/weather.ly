import Page from "../classes/Page"

export default class SearchPage implements Page {

    pageElement: HTMLElement;
    
    constructor() {
        this.generatePage();
    }
    
    public generatePage(): HTMLElement {
        // Create form element
        const form = document.createElement("form");

        // Create label element
        const label = document.createElement("label");
        label.setAttribute("for", "search-input");
        label.textContent = "Enter a location: ";

        // Create input element
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "search-input");
        input.setAttribute("placeholder", "Enter search term...");

        // Create submit button
        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Search");

        // Append elements to form
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(submit);

        this.pageElement = form;

        return form;
    }

    public removePage(): void { this.pageElement.parentNode?.removeChild(this.pageElement) }
}