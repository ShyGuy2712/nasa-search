import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.imgLink = '#';
    this.imgAltText = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        imgLink: { type: String },
        imgAltText: { type: String },
    };
  }

  static get styles() {
    return [css`
    

    .image {
      display: inline-block;
    }

    .image div {
      display: inline-block;
      max-width: 240px;
      font-size: 16px;
      font-weight: bold;
    }

    .image img {
      display: block;
      width: 240px;
      height: 240px;
    }

    .image:hover {
      background-color: grey;  /* needs to be DDD colors */
    }

    `];
  }

  render() {
    return html`
    <div class="image">
      <a href= ${this.imgLink} target="_blank">     
        <img src="${this.source}" alt=${this.imgAltText} />
      </a>
        <div>${this.title}</div>
    </div>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);