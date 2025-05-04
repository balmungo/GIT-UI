Neutralino.init();
/*se llama al cerra la aplicacion */
function onWindowClose() {
	Neutralino.app.exit();
}
/*eventos de la aplicacion */
Neutralino.events.on("windowClose", onWindowClose);
Neutralino.events.on("ready", getAllItem);
/*ejecuta comando shell recibiendo como parametro el comando y la ubicacion, retorna el resultado del comando*/
async function runCommand(command, Dir = NL_CWD) {
	let { stdErr, stdOut } = await Neutralino.os.execCommand(
		`cd ${Dir} && ${command}`
	);
	if (stdErr) {
		txtLog.value = stdErr;
		return null;
	}
	txtLog.value = stdOut;
	return stdOut;
}
/*elimina los saltos de linea y el salto de lina final de la salida del comando */
function cleanOutCommand(stdOut) {
	let result = stdOut;
	result = result.split("\n");
	result.pop();
	return result;
}
/*retorna los commits de un archivo*/
async function handleGitLogCommit(fileName) {
	const stdOut = await runCommand(`git log --oneline ${fileName}`, workDir);
	if (!stdOut) return null;
	return cleanOutCommand(stdOut);
}
/*retorna la cabecera actual*/
async function handleGitHeaderHash() {
	const stdOut = await runCommand(`git rev-parse --short HEAD`, workDir);
	if (!stdOut) return null;
	return cleanOutCommand(stdOut);
}
/*retorna los archivos seguidos por git*/
async function handleGitStatus() {
	const stdOut = await runCommand("git status --porcelain", workDir);
	if (!stdOut) return null;
	return cleanOutCommand(stdOut);
}
/*retorna la lista de archivos visibles y ocultos de la ubicacion especificada con formato para 
identificar entre carpetas archivos y ejecutables
*/
async function handleSystemShowFile() {
	const stdOut = await runCommand("ls -a -F", workDir);
	if (!stdOut) return null;
	return cleanOutCommand(stdOut);
}
/*inicia el repositorio*/
async function handleGitInit() {
	await runCommand("git init", workDir);
}
/*prepara el archivo especificado al area de stage*/
async function handleGitAdd(fileName) {
	await runCommand(`git add ${fileName}`, workDir);
}
/*crea el commit del archivo especificado con su comentario*/
async function handleGitCommit(fileName, text) {
	await runCommand(`git commit -m "${text}" ${fileName}`, workDir);
}
/*cambia entre las versiones mediante el hash y el nombre del archivo*/
async function handleGitCheckoutCommit(hash, fileName) {
	await runCommand(`git checkout ${hash} -- ${fileName}`, workDir);
}
/*retorna la ubicacion anterior*/
async function handleSystemBackDirectory() {
	const stdOut = await runCommand(`cd .. && pwd`, workDir);
	if (!stdOut) return null;
	return stdOut;
}
/*retorna la ubicacion actual despues de ingresar a la carpeta especificada*/
async function handleSystemOpenFolder(folder) {
	const stdOut = await runCommand(`cd ${folder} && pwd`, workDir);
	if (!stdOut) return null;
	return stdOut;
}
