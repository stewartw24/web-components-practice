class Tooltip extends HTMLElement {
    constructor() {
        super(); //calls the constructor of the base class.
        this._tooltipContainer;
        this._tooltipText = 'Some dummy default tootip text if text attribute not set.';
        this.attachShadow({ mode: 'open' }); //this adds shadow dom tree
        this.shadowRoot.innerHTML = `
            <slot>Some default</slot>
            <span> (?)</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this._tooltipContainer.style.backgroundColor = 'black';
        this._tooltipContainer.style.color = 'white';
        this._tooltipContainer.style.position = 'absolute';
        this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('ws-tooltip', Tooltip);