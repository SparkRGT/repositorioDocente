import './style.css'


// function calcular():void{
//   const cantidad:number  = 
//    parseInt(document.querySelector<HTMLInputElement>("#cantidad")?.value!);
//   alert(cantidad*1000);
// }
// document.querySelector<HTMLButtonElement>("#calcular")?.addEventListener
// ("click", ()=>{
//   const cantidad:number  = 
//    parseInt(document.querySelector<HTMLInputElement>("#cantidad")?.value!);
//   alert(cantidad*1000);
// });









// const nombre: string = "Juan";

// type isActive = boolean;

// const IVA: isActive = true;

// interface IDireccion {
//   calle: string;
//   ciudad: string;
// }
// interface IEstudiante {
//   nombre: string;
//   apellido: string;
//   edad: number;
//   foraneo?: boolean;
//   isActive: boolean;
//   direccion: IDireccion;
// }


// const estudiante: IEstudiante = {
//   nombre: "Juan",
//   apellido: "Perez",
//   edad: 20,
//   isActive: true,
//   direccion: {
//     calle: "123",
//     ciudad: "Santiago",
//   }
// } 


// class Estudiante implements IEstudiante {
//   constructor(
//     public nombre: string,
//     public apellido: string,
//     public edad: number,
//     public isActive: boolean,
//     public direccion: IDireccion
//   ) {}
// }
// const estudiantex = new Estudiante("Juan", "Perez", 20, true, {
//   calle: "123",
//   ciudad: "Santiago",
// })


// interface IUsuario{
//   nombre: string;
//   apellido: string;
//   vista: IVista[];
// }
// interface IVista {
//   nombre:string;
//   url:string;
// }


// const listaUsuarios: IUsuario[] = [
//   {
//     nombre: "Juan",
//     apellido: "Perez",
//     vista: [
//       {
//         nombre: "Registrar usuario",
//         url: "https://www.google.com",
//       }
//     ],
//   },
//   {
//     nombre: "Juan",
//     apellido: "Perez",
//     vista: [
//       {
//         nombre: "Insertar usuario",
//         url: "https://www.google.com",
//       },
//       {
//         nombre: "Modificar usuario",
//         url: "https://www.google.com",
//       }
//     ],
//   },

// ]



interface ICliente{
  id: number;
  cedula: string;
  nombre: string;
  facturas?: IFactura[];
}
interface IFactura{
  id: number;
  codigo: string;
  cliente: ICliente;
  total: number;
  fecha: Date;
  detalles?: IDetalleFactura[];
}
interface IProducto{
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  detalles?: IDetalleFactura[];
}
interface IDetalleFactura{
  id: number;
  factura?: IFactura;
  producto: IProducto;
  cantidad: number;
  precio: number;
}



const factura: IFactura = {
  id: 1,
  codigo: "123",
  cliente: {
    id: 1,
    cedula: "123",
    nombre: "Juan",
  },
  total: 100,
  fecha: new Date(),
  detalles: [
    {
      id: 1,
      producto: {
        id: 1,
        nombre: "Producto 1",
        precio: 100,
        stock: 100,
      },
      cantidad: 1,
      precio: 100,
    },
    {
      id: 2,
      producto: {
        id: 2,
        nombre: "Producto 2",
        precio: 200,
        stock: 200,
      },
      cantidad: 2,
      precio: 200,
    }
  ],
}

// console.log(factura["codigo"]);
// console.log(factura.fecha);
// console.log(factura.cliente.nombre);
// console.log(factura.total);

// factura.detalles?.forEach(detalle => {
//   console.log(detalle.producto.nombre);
//   console.log(detalle.cantidad);
//   console.log(detalle.precio);
// });

function insertarDetalle(factura: IFactura, detalle: IDetalleFactura):void{
  factura.detalles?.push(detalle);
}
function generarFacturaHTML(factura: IFactura):string{
  let html=``;
  html+=`<h1>${factura.codigo}</h1>`;
  html+=` <p>Cliente: ${factura.cliente.nombre}</p>`;
  html+=` <p>Total: ${factura.total}</p>`;
  html+=` <p>Fecha: ${factura.fecha}</p>`;
  html+=` <p>Detalles:</p>`;
  factura.detalles?.forEach(detalle => {
    html+=`<p>${detalle.producto.nombre}</p>`;
  });
  return html;
}




document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${generarFacturaHTML(factura)}
`