export class AppVersion extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	render() {
		this.shadowRoot.innerHTML = /*html*/ `
  <style>
.group-circle {
	min-height: 7rem;
	width: 20rem;
	display: flex;
	align-items: center;
	margin:1rem;
}
.group-circle:hover {
	background-color: var(--color-8);
	border-radius: 5px;
}
.circle{
	display:flex;
	width:5rem;
}
.data {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}
		</style>
  <div class="group-circle">
				<div class="data">
    <slot name="slot-name"></slot>
    <slot name="slot-info"></slot>
    <slot name="slot-acept"></slot>
				</div>
				<div class="circle">
				<slot name="slot-img"></slot>
				</div>
			</div>
  `;
	}
	connectedCallback() {
		this.render();
	}
}
customElements.define("app-version", AppVersion);
