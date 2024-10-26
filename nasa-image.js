import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.imgLink = '#';
    this.imgAltText = '';
    this.owner = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        imgLink: { type: String },
        imgAltText: { type: String },
        owner: { type: String },
    };
  }

  static get styles() {
    return [css`

    a {
      text-decoration: none;
    }

    .nasaCard {
      display: inline-block;
      width: 240px;
      height: 240px;
      background-color: var(--ddd-theme-default-slateMaxLight);
      padding: var(---ddd-spacing-m4);
      margin: 8px;
      border: 2px solid black;
      border-radius: var(--ddd-radius-sm);
      overflow: auto;
      color: var(--ddd-theme-default-coalyGray);
    }

    .nasaCard div {
      display: inline-block;
      font-size: 8px;
      font-weight: bold;
    }

    .nasaCard h1 {
      font-size: 24px;
    }

    .nasaCard img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding: 16px;
      width: 200px;
      height: 200px;

    }

    .nasaCard:hover {
      background-color: var(--ddd-theme-default-limestoneGray);
    }

    `];
  }

  render() {
    return html`
    <a href= ${this.imgLink} target="_blank">
      <div class="nasaCard">
        <img src="${this.source}" alt=${this.imgAltText} />
        <h1>${this.title}</h1>
        <slot>Owner: ${this.owner}</slot>
      </div>
    </a>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);