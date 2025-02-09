import { LitElement, html, css } from 'lit';
import "./nasa-image.js";
export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
        background-color: var(--ddd-theme-default-slateMaxLight);
      }
      #searchButton {
        font-size: 20px;
        color: #6c6f70;
        background-color: var(--ddd-theme-default-slateMaxLight);
        padding: var(---ddd-spacing-m4);
        margin: 8px;
        margin-left: 0px;
      }

    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search input</summary>
      <div>
        <input id="input" placeholder="Search NASA images" /> 
        <button id="searchButton" @click=${this.inputChanged}>Search</button>     <!-- search button so NASA doesn't ban the user -->
      </div>
    </details>
    <div class="results">
      ${this.items.map((item, index) => html`
      <!-- gets/returns img info to nasa-image.js -->
      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}"
        imgAltText="${item.data[0].description}"
        imgLink="${item.links[0].href}"
        owner="${item.data[0].secondary_creator}"          
      ></nasa-image>
      `)}
    </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);