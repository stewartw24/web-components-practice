class Tooltip extends HTMLElement {
    constructor() {
        super(); //calls the constructor of the base class.
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = 'Some dummy default tootip text if text attribute not set.';
        this.attachShadow({ mode: 'open' }); //this adds shadow dom tree
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem
                    z-index: 10;
                    padding: 0.15rem;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }

                :host(.important) {
                    background: var(--color-primary, #ccc);
                    padding: 0.15rem;
                }

                :host-context(p){
                    font-weight: bold;
                }

                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%
                }

            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue == newValue) {
            return;
        }
        if(name === 'text'){
            this._tooltipText = newValue;
        }
    }

    static get oberservedAttributes(){
        return ['text'];
    }

    disconnectedCallback(){
        this.tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this.tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('ws-tooltip', Tooltip);