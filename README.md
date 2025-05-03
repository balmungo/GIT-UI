# GIT U.I.

## Requisitos

es necesario tener instalado GIT ya que esta aplicacion hace uso del mismo ejecutando comandos sus comandos.

## FORMA DE USO

> [!NOTE]  
> El proyecto se enfoca en el manejo de los comandos GIT para el control de versiones, tomandose en cuenta que el **Usuario Final** para el cual esta dirigido no conoce o cuenta con conocimientos especificos sobre programación o temas relacionados.

### Iniciar

el boton inicia el repositorio GIT, una vez iniciado el boton desaparecera confirmando que la ubicacion actual cuenta con el seguimiento.

### Ver Archivos

el boton Archivo mostrara tanto las carpetas como los diferentes archivos dentro de la ubicacion actual, los archivos contaran con su propio boton "Mostrar Versiones".

### Mostrar Versiones

el boton mostrara las diferentes versiones guardadas del archivo siendo que en caso este no cuente con versiones en seguimiento la misma no mostrara nada.
las versiones mostraran el nombre del archivo, asi como la descripcion de las modificaciones realizadas sobre el archivo, ademas que contara con un boton "Usar esta version" para "cambiar" entre las diferentes modificaciones, por ultimo una imagen "home" indicara la version en uso.

### Usar esta Version

el boton usara la version seleccionada, pero antes mostrara un mensaje de confirmacion que asegure la operacion, luego volvera a mostrar los archivos.

### Ver Estado

el boton mostrara los archivos que hayan sido creados, eliminados o modificados, ademas de contar con un boton "Crear version"

### Crear Version

al hacer click mostrara un cuadro de mensaje preguntando "¿Que Cambios Realizaste?" donde en el espacio designado escribiremos el comentario respecto a la modificacion realizada, luego de aceptar se creara la version correspondiente para el archivo.

## FLUJO DE TRABAJO

Se debera crear una carpeta donde almacenaremos y guardaremos nuestro trabajos o documentos a ser controlados, dentro debera estar la aplicacion "Git-UI"

al ser la primera vez se debera iniciar la aplicacion "Git-UI" Y hacer click en "Iniciar".

El Usuario trabajara en su documento como es lo usual siendo que para cuando haya terminado o requiera hacer una gran modificacion sobre su trabajo, sera ahi cuando inicie la aplicacion con el proposito de crear un version del archivo antes de la modificacion.

no es necesario mantener la aplicacion abierta mientras se trabaja en sus proyectos, solo deberia hacerlo cuando haya avanzado en su trabajo y quiera descanzar o pasar a otras actividades.

## COMANDOS USADOS POR LA APLICACION

```shell
cd file.txt && pwd

cd .. && pwd

ls -a -F

git log --oneline

git status --porcelain

git init

git add

git commit -m "" file.txt

git checkout <hash> -- file.txt

```

> este comando no es usado y en cambio se opto por usar el archivos "db.json" para almacenar los hash de cada archivo, con el proposito de identificar la version actual.
> `git rev-parse --short HEAD`

## License

[MIT](LICENSE)
