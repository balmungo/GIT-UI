export class AppStatus extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	render() {
		this.shadowRoot.innerHTML = /*html*/ `
  <style>
.group {
	min-height: 6rem;
	width: 15rem;
	border: solid var(--color-5) 1px;
	border-radius: 5px;
}
.icon {
	display: flex;
	align-items: center;
}
.svgFile {
	height: 4rem;
	width: 3rem;
	background-color: var(--color-5);
	border-radius: 5px 0 0 5px;
	margin-right: 1rem;
}
.data {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
} 
  </style>
  <div class="group">
  <div class="icon">
  <img class="svgFile" src="../icons/document.svg" alt="document"/>
  <div class="data">
  <slot name="slot-name"></slot>
  <slot name="slot-x"></slot>
  <slot name="slot-y"></slot>
  </div>
  </div>
  <slot name="slot-acept"></slot>
  </div>
  `;
	}
	connectedCallback() {
		this.render();
	}
}
customElements.define("app-status", AppStatus);
