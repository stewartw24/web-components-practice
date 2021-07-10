class Tooltip extends HTMLElement {
    constructor(){
        super(); //calls the constructor of the base class.
        
    }

    connectedCallback(){
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        this.appendChild(tooltipIcon);
    }
}

customElements.define('ws-tooltip', Tooltip);