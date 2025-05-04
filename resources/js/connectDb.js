//const dataPath = await Neutralino.storage.getDataPath();
const DB_PATH = NL_CWD + `/resources/data/db.json`;
const CONFIG_PATH = NL_CWD + `/resources/data/appConfig.json`;
let myDB = [];
let myConfig = {};
/*verifica si existe un directorio*/
async function fileExists(path) {
	try {
		await Neutralino.filesystem.getStats(path);
		return true;
	} catch (error) {
		if (error.code === "NE_FS_NOPATHE") {
			return false;
		}
		throw error;
	}
}
/*crea o retorna el directorio para las bases de datos*/
async function getDbPath() {
	if (NL_MODE !== "window") {
		return `${NL_CWD}/`;
	}
	const configDir = `${await Neutralino.os.getEnv("HOME")}/.config/GitUI/`;
	try {
		if (!(await fileExists(configDir))) {
			await Neutralino.filesystem.createDirectory(configDir);
		}
		return configDir;
	} catch (error) {
		txtLog.value = "Error al crear directorio de configuración:" + error;
		return `${NL_CWD}/`;
	}
}
/*la funcion obtiene los datos del archivo db.json usado como base de datos para los commits */
async function getDB() {
	const dbPath = `${await getDbPath()}db.json`;
	try {
		if (await fileExists(dbPath)) {
			let result = await Neutralino.filesystem.readFile(dbPath);
			return JSON.parse(result);
		} else {
			const defaultData = [{ file: "", hash: "" }];
			writeDB(defaultData, "db.json");
			return defaultData;
		}
	} catch (error) {
		txtLog.value = `Error al leer la base de datos:${error}`;
		return null;
	}
}

/*el archivo obtiene los datos de appConfig.json usado para las configuraciones actuales y futuras de la aplicacion*/
async function getAppConfig() {
	const configPath = `${await getDbPath()}appConfig.json`;
	try {
		if (await fileExists(configPath)) {
			let result = await Neutralino.filesystem.readFile(configPath);
			return JSON.parse(result);
		} else {
			const defaultData = { logPanel: false, theme: "dark" };
			writeDB(defaultData, "appConfig.json");
			return defaultData;
		}
	} catch (error) {
		txtLog.value = `Error al leer las configuraciones guardadas:${error}`;
		return null;
	}
}

/*destinado para grabar los datos en los archivos json*/
async function writeDB(db, db_Name) {
	const PATH = `${await getDbPath()}${db_Name}`;
	await Neutralino.filesystem.writeFile(PATH, JSON.stringify(db));
}

/*CRUD agrega un hash con el nombre del archivo*/
function createItem(item) {
	myDB.push(item);
	writeDB(myDB, "db.json");
}
/*CRUD actualiza el hash del archivo seleccionado*/
function updateItem(file, newHash) {
	myDB.map((item) => {
		if (item.file === file) item.hash = newHash;
	});
	writeDB(myDB, "db.json");
}
/*CRUD elimina el objeto especificado*/
function deleteItem(file) {
	const newList = myDB.filter((item) => {
		return item.file != file;
	});
	writeDB(newList, "db.json");
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
