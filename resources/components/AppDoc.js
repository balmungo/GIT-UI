export class AppDoc extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		//this.shadowRoot.adoptedStyleSheets = [globalStyles];
	}
	render() {
		this.shadowRoot.innerHTML = /*html*/ `
  <style>
			.group-line {
				display: flex;
				width: 17rem;
				border: solid var(--color-5) 3px;
				border-radius: 5px;
				margin-bottom: 1rem;
				padding: 0.5rem;
			}
			.svgFile {
	height: 4rem;
	width: 3rem;
	background-color: var(--color-5);
	border-radius: 5px;
	margin-right: 1rem;
}
.data {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}
		</style>
		<div class="group-line">
			<img class="svgFile" src="../icons/document.svg" alt="document" />
			<div class="data">
				<slot name="slot-name"></slot>
				<slot name="slot-acept"></slot>
			</div>
		</div>
  `;
	}
	connectedCallback() {
		this.render();
	}
}
customElements.define("app-doc", AppDoc);
