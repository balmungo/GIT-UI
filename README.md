# GIT U.I.

## Requisitos

Es necesario tener instalado GIT ya que esta aplicación hace uso del mismo ejecutando sus comandos.

## FORMA DE USO

> [!NOTE]  
> El proyecto se enfoca en el manejo de los comandos GIT para el control de versiónes, considerando que el **Usuario Final** para el cual está dirigido no conoce o cuenta con conocimientos especificos sobre programación o temas relacionados.

### Iniciar

crea el repositorio GIT, una vez iniciado el botón desaparecerá confirmando que la ubicación actual cuenta con el seguimiento.

### Ver Archivos

mostrará tanto las carpetas como los diferentes archivos dentro de la ubicación actual, los archivos contaran con su propio botón "Mostrar Versiones".

### Mostrar Versiones

mostrará las diferentes versiónes guardadas del archivo siendo que en caso este no cuente con versiónes en seguimiento la misma no mostrará nada.
las versiónes mostrarán:

- El nombre del archivo
- La descripcion de las modificaciones realizadas
- Un botón "Usar esta versión" para "cambiar" entre las diferentes modificaciones
- Un icono "home" que indicara la versión en uso actualmente

### Usar esta Versión

el botón utilizará la versión seleccionada, pero primero mostrará un mensaje de confirmacion que asegure la operación. Luego volverá a mostrar la lista de archivos.

### Ver Estado

el botón mostrará los archivos que hayan sido creados, eliminados o modificados, ademas de contar con un botón "Crear versión"

### Crear Versión

al hacer clic mostrará un cuadro de diálogo preguntando "¿Que Cambios Realizaste?" donde se debe escribir un comentario sobre las modificaciones realizadas. Al aceptar, se creará la versión correspondiente para el archivo.

## FLUJO DE TRABAJO

1. Crear una carpeta donde se almacenarán los documentos a controlar
2. Colocar la aplicación "Git-UI" dentro de esta carpeta
3. Al ser la primera vez, iniciar la aplicación y hacer clic en "Iniciar"

El usuario trabajará en sus documentos como de costumbre. Cuando haya terminado o necesite hacer modificaciones importantes, deberá:

1. Abrir la aplicación
2. Crear una versión del archivo antes de realiza los cambios

No es necesario mantener la aplicación abierta mientras se tranaga en los proyectos, solo cuando se desee guardar una version del progreso actual.

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

> [!NOTE] El comando `git rev-parse --short HEAD`no se usa. En su lugar, se optó por usar el archivo "db.json" para almacenar los hash de cada archivo, con el propòsito de identificar la version actual.

## License

[MIT](LICENSE)
