const drawer = document.getElementById("drawer");
const container = document.getElementById("container");
let workDir = NL_CWD; //variable para navegacion de directorios.
const headerLocation = document.getElementById("header-location");
const txtLog = document.getElementById("txtLog");
const btnInit = document.getElementById("btnInit");
const btnFile = document.getElementById("btnFile");
const btnStatus = document.getElementById("btnStatus");
const btnConfig = document.getElementById("btnConfig");
const themeSelector = document.getElementById("theme-selector");
const btnBack = document.getElementById("btnBack");

const textPath = document.getElementById("textPath");
textPath.value = workDir;
/*retorna el mensaje de estado*/
function codeXY(cod) {
	const XY = {
		M: "Modificado",
		T: "Tipo De Archivo Cambiado",
		A: "Agregado",
		D: "Eliminado",
		R: "Renombrado",
		C: "Copiado",
		U: "Actualizado sin fusionar",
		" ": "",
	};
	if (cod === "?") {
		return "No Rastreado";
	}
	if (cod === "!") {
		return "Ingnorado";
	}
	return XY[`${cod}`];
}
/*muestra los archivos y carpetas en la area de trabajo*/
async function showFile() {
	document.getElementById("btnInit").className = "btn";
	headerLocation.textContent = "VER ARCHIVOS";
	const stdOut = await handleSystemShowFile();
	const myFuntion = (item) => {
		if (item === ".git/") {
			document.getElementById("btnInit").className = "hide";
		}
		if (item === "./" || item === "../" || item === ".git/") {
			return null;
		}
		if (item[item.length - 1] === "/") {
			const folder = `
			<button class="btn folder" onclick="openFolder('${item}')">
			<img class="svgFolder" src="../icons/folder.svg" alt="Carpeta" />		
			<span class="info">${item}</span>
			</button>
			`;
			return folder;
		}
		const element = `
	<app-doc>
	<span slot="slot-name" class="span" >${item}</span>
	<button slot="slot-acept" class="btn" onclick="showVersion('${item}')">Mostrar Versiones</button>
	</app-doc>
  `;
		return element;
	};
	insertComponent(stdOut, myFuntion);
}
/*muestra los archivos detectados por git status en la area de trabajo*/
async function showStatus() {
	headerLocation.textContent = "VER ESTADO";
	const stdOut = await handleGitStatus();
	const myFuntion = (item) => {
		const name = item.substr(3);
		/* const Xcod = codeXY(item[0]); */
		const Ycod = codeXY(item[1]);
		const element = `
			<app-status>
			<span slot="slot-name" class="span">${name}</span>
			<span slot="slot-y" class="span ${item[1]}">Dir:${Ycod}</span>
			<button slot="slot-acept" onclick="createFormCommit('${name}')" class="btn">Crear Version</button>
			</app-status>
		`;
		return element;
	};
	insertComponent(stdOut, myFuntion);
}
/*muestra las versiones disponibles de un archivo especificado en el area de trabajo*/
async function showVersion(fileName) {
	const stdOut = await handleGitLogCommit(fileName);
	const actualHash = await getOneItem(fileName);
	const myFuntion = (item) => {
		const info = item.substr(8);
		const hash = item.substr(0, 7);
		let slotImg = "";
		if (hash === actualHash.hash) {
			slotImg = `<img slot="slot-img" class="svgCircle" src="../icons/home.svg" alt="home"/>`;
		} else {
			slotImg = "";
		}
		const element = `
	<app-version>
		<span slot="slot-name" class="title">${fileName}</span>
		<span slot="slot-info" class="span scroll rem-3">${info}</span>
		<button slot="slot-acept" class="btn" onclick="createFormVersion('${hash}','${fileName}','${info}')">Usar Esta Version</button>
		${slotImg}
	</app-version>
	`;
		return element;
	};
	insertComponent(stdOut, myFuntion);
}
/*inserta los elemento html generados en el area de trabajo*/
function insertComponent(stdOut, fn) {
	let fragment = "";
	if (stdOut) {
		for (const item of stdOut) {
			const component = fn(item);
			if (component === null) continue;
			fragment += component;
		}
	}
	container.innerHTML = fragment;
}
/*crea un cuadro de mendaje informativo, por ahora no usado*/
function createFormMessage(fileName) {
	drawer.className = "drawer";
	const template = document.getElementById("form-message");
	const span = template.content.getElementById("info");
	span.textContent = `El archivo ${fileName} no cuenta con versiones.`;
	const clone = template.content.cloneNode(true);
	drawer.appendChild(clone);
}
/*clona un formulario template para los commits de los archivos*/
function createFormCommit(fileName) {
	drawer.className = "drawer";
	const template = document.getElementById("form-commit");
	const legend = template.content.getElementById("title");
	legend.textContent = fileName;
	const hidden = template.content.getElementById("hidden");
	hidden.value = fileName;
	const clone = template.content.cloneNode(true);
	drawer.appendChild(clone);
}
/*clona un formulario template para el mensaje de confirmacion del cambio de version*/
function createFormVersion(hash, fileName, info) {
	drawer.className = "drawer";
	const template = document.getElementById("form-version");
	const legend = template.content.getElementById("title");
	legend.textContent = fileName;
	const hidden = template.content.getElementById("hidden");
	hidden.value = hash;
	const span = template.content.getElementById("info");
	span.textContent = info;
	const clone = template.content.cloneNode(true);
	drawer.appendChild(clone);
}
/*se llama al hacer click en el boton cancelar de los formularion y mensajes */
function cancelForm() {
	drawer.innerHTML = "";
	drawer.className = "hide";
}
/*se llama al hacer click en el boton aceptar del formulario template form-commit*/
function aceptFormCommit() {
	const inpText = document.getElementById("inpText");
	const hidden = document.getElementById("hidden");
	handleGitAdd(hidden.value);
	handleGitCommit(hidden.value, inpText.value);
	createOrUpdate(hidden.value);
	cancelForm();
	showStatus();
}
/*se llama al hacer click en el boton aceptar del formulario template form-version*/
function aceptCheckoutCommit() {
	const fileName = document.getElementById("title").textContent;
	const hash = document.getElementById("hidden").value;
	handleGitCheckoutCommit(hash, fileName);
	updateItem(fileName, hash);
	cancelForm();
	showVersion(fileName);
}
/*se llama al hacer click en el boton aceptar del formulario tempalte form-config*/
function aceptFormConfig() {
	const chkLog = document.getElementById("chkLog");
	myConfig.logPanel = chkLog.checked;
	writeDB(myConfig, CONFIG_PATH);
	cancelForm();
}
/*se llama al hacer click en el boton iniciar*/
function startGitInit() {
	headerLocation.textContent = "INICIADO";
	handleGitInit();
}
/*verifica si el archivo ya cuenta con una version para actualizar el hash
o crear el un nuevo item en la base de datos db.json*/
async function createOrUpdate(fileName) {
	try {
		const hash = await handleGitLogCommit(fileName);
		if (hash.length === 1) {
			createItem({ file: fileName, hash: hash[0].substr(0, 7) });
		}
		if (hash.length > 1) {
			updateItem(fileName, hash[0].substr(0, 7));
		}
	} catch (error) {
		console.log(error);
		txtLog.value = error;
	}
}
/*clona un formulario template para las configuraciones de la aplicacion*/
function createFormConfig() {
	drawer.className = "drawer";
	const template = document.getElementById("form-config");
	const clone = template.content.cloneNode(true);
	drawer.appendChild(clone);
	document.getElementById("chkLog").checked = myConfig.logPanel;
}
/*se llama al seleccionar un tema*/
function selecTheme() {
	const theme = this.value;
	setTheme(theme);
}
/*establece el thema especificado*/
function setTheme(theme) {
	const html = document.documentElement;
	html.setAttribute("data-theme", theme);
	myConfig.theme = theme;
}
/*guarda el tema seleccionado en la configuracion de la aplicacion*/
function saveConfigAppClose() {
	writeDB(myConfig, CONFIG_PATH);
}
/*sale del directorio actual y lo establece como directorio actual*/
async function backDirectory() {
	const stdOut = await handleSystemBackDirectory();
	textPath.value = stdOut;
	workDir = textPath.value;
	showFile();
}
/*ingresa a la carpeta especificada y lo establece como directorio actual*/
async function openFolder(folder) {
	const stdOut = await handleSystemOpenFolder(folder);
	textPath.value = stdOut;
	workDir = textPath.value;
	showFile();
}

showFile();

btnInit.addEventListener("click", startGitInit);
btnFile.addEventListener("click", showFile);
btnStatus.addEventListener("click", showStatus);
btnConfig.addEventListener("click", createFormConfig);
themeSelector.addEventListener("change", selecTheme);
btnBack.addEventListener("click", backDirectory);
