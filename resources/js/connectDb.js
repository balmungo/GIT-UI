const DB_PATH = NL_PATH + "/resources/data/db.json";
const CONFIG_PATH = NL_PATH + "/resources/data/appConfig.json";
let myDB = [];
let myConfig = {};
/*la funcion obtiene los datos del archivo db.json usado como base de datos para los commits */
async function getDB() {
	try {
		let result = await Neutralino.filesystem.readFile(DB_PATH);
		if (result) {
			return JSON.parse(result);
		} else {
			const defaultData = [{ file: "", hash: "" }];
			writeDB(defaultData, DB_PATH);
			return defaultData;
		}
	} catch (error) {
		txtLog.value = `Error al leer la base de datos:${error}`;
		return null;
	}
}

/*el archivo obtiene los datos de appConfig.json usado para las configuraciones actuales y futuras de la aplicacion*/
async function getAppConfig() {
	try {
		let result = await Neutralino.filesystem.readFile(CONFIG_PATH);
		if (result) {
			return JSON.parse(result);
		}
	} catch (error) {
		txtLog.value = `Error al leer las configuraciones guardadas:${error}`;
		return null;
	}
}

/*destinado para grabar los datos en los archivos json*/
async function writeDB(db, PATH) {
	await Neutralino.filesystem.writeFile(PATH, JSON.stringify(db));
}

/*CRUD agrega un hash con el nombre del archivo*/
function createItem(item) {
	myDB.push(item);
	console.log(myDB);
	writeDB(myDB, DB_PATH);
}
/*CRUD actualiza el hash del archivo seleccionado*/
function updateItem(file, newHash) {
	myDB.map((item) => {
		if (item.file === file) item.hash = newHash;
	});
	writeDB(myDB, DB_PATH);
}
/*CRUD elimina el objeto especificado*/
function deleteItem(file) {
	const newList = myDB.filter((item) => {
		return item.file != file;
	});
	writeDB(newList, DB_PATH);
}
/*CRUD obtiene un objeto y retorna el nombre del archivo*/
function getOneItem(file) {
	const result = myDB.find((item) => {
		return item.file === file;
	});
	return result;
}
/*solo asigna los datos de la base de datos db.json*/
async function readDB() {
	myDB = await getDB();
}
/*solo asigna los datos de appConfig.json*/
async function readAppConfig() {
	myConfig = await getAppConfig();
}
/*se usa para establecer los valores a los inputs del panel de configuraciones y el thema de la aplicacion*/
async function setAppConfig() {
	await readAppConfig();
	const savedTheme = myConfig.theme || "light";
	document.documentElement.setAttribute("data-theme", savedTheme);
	myConfig.logPanel
		? (txtLog.className = "textarea")
		: (txtLog.className = "hide");
}
/*se llama al iniciar la aplicacion*/
function getAllItem() {
	readDB();
	setAppConfig();
}
