Siendo mis entidades: cliente, producto, factura, factura_producto donde un cliente tiene muchas facturas, una factura muchos factura_productos, un producto muchos factura_producto. Resolver los siguientes puntos:

1.	Definición de Tipos Básicos:
Declara al menos 5 variables de tipos primitivos (string, number, boolean) relacionadas a tu proyecto (por ejemplo, nombre del producto, stock disponible, etc.).
2.	Creación de Interfaces:
Define al menos 2 interfaces correspondientes a tus entidades del proyecto (ej. Cliente, Producto, Reserva, etc.).
3.	Definición de Clases:
Crea al menos 2 clases basadas en las interfaces anteriores, implementando constructor y al menos un método por clase.
4.	Creación de Arreglos Tipados:
Crea un arreglo por cada entidad y llena con 3 elementos simulados.
5.	Funciones Tipadas:
Implementa al menos 2 funciones:
o	Una para mostrar todos los elementos del arreglo con console.log()
o	Una para filtrar o contar elementos con base en una condición (ej. productos disponibles, usuarios activos)
6.	Uso de tipos especiales:
Utiliza readonly, optional (?) y union types (string | number) dentro de tus interfaces o funciones.
7.	Uso de map() para transformar datos
•	Recorre un arreglo de una entidad (por ejemplo, productos) y genera un nuevo arreglo con otro formato (por ejemplo, sólo los nombres en mayúsculas, o un resumen con nombre y precio).
•	Ejemplo: transformar clientes en un arreglo de correos electrónicos.

8.	Uso de filter() para seleccionar datos
•	Crea filtros para obtener subconjuntos de los datos (ej. productos disponibles, usuarios activos, reservas pendientes).
•	Mostrar en consola el arreglo filtrado.
9.	Uso de reduce() para cálculos acumulativos
•	Calcular totales: suma de precios, cantidad de reservas, promedio de calificaciones, etc.
•	Mostrar el resultado de la operación en consola.
10.	Simular relaciones entre entidades como objetos conectados
•	Por ejemplo: una clase Pedido debe tener un atributo cliente (que es una instancia de la clase Cliente) y un arreglo de Producto.
•	Crear instancias simuladas respetando estas relaciones.
11.	Simular una operación de negocio simple entre entidades
•	Por ejemplo: crear una función que genere un resumen de un pedido, listando el nombre del cliente y los productos incluidos.
•	Otra idea: contar cuántos productos ha comprado un cliente.
12.	Imprimir estructuras anidadas
•	Mostrar en consola la información de un objeto complejo con relaciones anidadas.
•	Por ejemplo: mostrar todos los pedidos con sus productos y cliente responsable.
