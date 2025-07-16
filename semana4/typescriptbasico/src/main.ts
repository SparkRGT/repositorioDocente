import './style.css'

// ===== PUNTO 1: TIPOS BÁSICOS =====
// Definición de tipos primitivos para el sistema
type ProductName = string;
type ProductPrice = number;
type ProductStock = number;
type CustomerEmail = string;
type IsActive = boolean;

// ===== PUNTO 2: INTERFACES =====
// Definición de interfaces para las entidades principales
interface IProduct {
    id: number;
    name: ProductName;
    price: ProductPrice;
    stock: ProductStock;
    isAvailable: IsActive;
}

interface ICustomer {
    id: number;
    name: string;
    email: CustomerEmail;
    isActive: IsActive;
    readonly createdAt: Date;
}

interface IInvoice {
    id: number;
    customerId: number;
    date: Date;
    total: number;
    items?: IInvoiceProduct[];
}

interface IInvoiceProduct {
    id: number;
    invoiceId: number;
    productId: number;
    quantity: number;
    price: number;
}

// ===== PUNTO 3: CLASES =====
// Implementación de clases con constructores y métodos
class Product implements IProduct {
    constructor(
        public id: number,
        public name: ProductName,
        public price: ProductPrice,
        public stock: ProductStock,
        public isAvailable: IsActive
    ) {}

    updateStock(newStock: number): void {
        this.stock = newStock;
        this.isAvailable = newStock > 0;
    }
}

class Customer implements ICustomer {
    readonly createdAt: Date;

    constructor(
        public id: number,
        public name: string,
        public email: CustomerEmail,
        public isActive: IsActive
    ) {
        this.createdAt = new Date();
    }

    getCustomerInfo(): string {
        return `${this.name} (${this.email}) - ${this.isActive ? 'Activo' : 'Inactivo'}`;
    }
}

// ===== PUNTO 4: ARREGLOS TIPADOS =====
// Creación de arreglos con datos de ejemplo
const products: Product[] = [
    new Product(1, "Laptop", 999.99, 10, true),
    new Product(2, "Smartphone", 499.99, 15, true),
    new Product(3, "Tablet", 299.99, 0, false)
];

const customers: Customer[] = [
    new Customer(1, "Juan Pérez", "juan@email.com", true),
    new Customer(2, "María García", "maria@email.com", true),
    new Customer(3, "Carlos López", "carlos@email.com", false)
];

const invoices: IInvoice[] = [
    { id: 1, customerId: 1, date: new Date(), total: 1499.98, items: [] },
    { id: 2, customerId: 2, date: new Date(), total: 499.99, items: [] },
    { id: 3, customerId: 1, date: new Date(), total: 299.99, items: [] }
];

// Ejemplos de objetos literales tipados
const configuracionSistema = {
    empresa: {
        nombre: "TechStore",
        ruc: "12345678901",
        direccion: "Av. Principal 123",
        telefono: "555-0123"
    },
    impuestos: {
        iva: 0.12,
        retencion: 0.02,
        otros: 0.01
    },
    categorias: [
        { id: 1, nombre: "Electrónicos", descripcion: "Productos electrónicos" },
        { id: 2, nombre: "Accesorios", descripcion: "Accesorios para dispositivos" },
        { id: 3, nombre: "Software", descripcion: "Licencias y programas" }
    ],
    estados: {
        activo: "ACTIVO",
        inactivo: "INACTIVO",
        pendiente: "PENDIENTE"
    }
} as const;

const metadatosFactura = {
    tiposDocumento: {
        factura: "FACTURA",
        notaCredito: "NOTA_CREDITO",
        notaDebito: "NOTA_DEBITO"
    },
    estadosPago: {
        pendiente: "PENDIENTE",
        pagado: "PAGADO",
        vencido: "VENCIDO"
    },
    metodosPago: {
        efectivo: "EFECTIVO",
        tarjeta: "TARJETA",
        transferencia: "TRANSFERENCIA"
    }
} as const;

// ===== PUNTO 5: FUNCIONES TIPADAS =====
// Ejemplos de funciones tipadas
function displayAllItems<T>(items: T[]): void {
    console.log('Items:', items);
}

// Función con tipos genéricos y restricciones
function calcularTotal<T extends { price: number; quantity?: number }>(items: T[]): number {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

// Función con tipos de unión
function formatearPrecio(precio: number | string): string {
    const numPrecio = typeof precio === 'string' ? parseFloat(precio) : precio;
    return `$${numPrecio.toFixed(2)}`;
}

// Función con tipos de retorno específicos
function buscarClientePorId(id: number): Customer | undefined {
    return customers.find(cliente => cliente.id === id);
}

// Función con parámetros opcionales
function actualizarStock(producto: Product, cantidad: number, esIncremento: boolean = true): void {
    const nuevoStock = esIncremento ? producto.stock + cantidad : producto.stock - cantidad;
    producto.updateStock(nuevoStock);
}

// Función con tipos de callback
type CallbackResultado<T> = (resultado: T) => void;
function procesarFactura(factura: IInvoice, callback: CallbackResultado<string>): void {
    const resumen = `Factura #${factura.id} - Total: $${factura.total}`;
    callback(resumen);
}

// ===== PUNTO 6: TIPOS ESPECIALES =====
// Uso de readonly and optional types in the interfaces

// ===== PUNTO 7: USO DE MAP() =====
// Transformación de datos usando map
function getProductNames(products: Product[]): string[] {
    return products.map(product => product.name.toUpperCase());
}

// ===== PUNTO 8: USO DE FILTER() =====
// Filtrado de datos usando filter
function getActiveCustomers(customers: Customer[]): Customer[] {
    return customers.filter(customer => customer.isActive);
}

// ===== PUNTO 9: USO DE REDUCE() =====
// Cálculos acumulativos usando reduce
function calculateTotalInventory(products: Product[]): number {
    return products.reduce((total, product) => total + product.stock, 0);
}

// ===== PUNTO 10: RELACIONES ENTRE ENTIDADES =====
// Simulación de relaciones entre entidades usando un objeto literal
const sistemaFacturacion = {
    clientes: [
        {
            id: 1,
            name: "Juan Pérez",
            email: "juan@email.com",
            isActive: true,
            createdAt: new Date(),
            facturas: [
                {
                    id: 1,
                    fecha: new Date(),
                    total: 1499.98,
                    items: [
                        {
                            producto: {
                                id: 1,
                                name: "Laptop",
                                price: 999.99,
                                stock: 10,
                                isAvailable: true
                            },
                            cantidad: 1,
                            subtotal: 999.99
                        },
                        {
                            producto: {
                                id: 2,
                                name: "Smartphone",
                                price: 499.99,
                                stock: 15,
                                isAvailable: true
                            },
                            cantidad: 1,
                            subtotal: 499.99
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "María García",
            email: "maria@email.com",
            isActive: true,
            createdAt: new Date(),
            facturas: [
                {
                    id: 2,
                    fecha: new Date(),
                    total: 499.99,
                    items: [
                        {
                            producto: {
                                id: 2,
                                name: "Smartphone",
                                price: 499.99,
                                stock: 15,
                                isAvailable: true
                            },
                            cantidad: 1,
                            subtotal: 499.99
                        }
                    ]
                }
            ]
        }
    ],
    productos: [
        {
            id: 1,
            name: "Laptop",
            price: 999.99,
            stock: 10,
            isAvailable: true,
            facturas: [1]
        },
        {
            id: 2,
            name: "Smartphone",
            price: 499.99,
            stock: 15,
            isAvailable: true,
            facturas: [1, 2]
        },
        {
            id: 3,
            name: "Tablet",
            price: 299.99,
            stock: 0,
            isAvailable: false,
            facturas: []
        }
    ]
};

// Función para mostrar las relaciones
function mostrarRelaciones(sistema: typeof sistemaFacturacion): string {
    return `
        Total Clientes: ${sistema.clientes.length}
        Total Productos: ${sistema.productos.length}
        Total Facturas: ${sistema.clientes.reduce((acc, cliente) => acc + cliente.facturas.length, 0)}
        
        Relaciones por Cliente:
        ${sistema.clientes.map(cliente => `
            Cliente: ${cliente.name}
            - Facturas: ${cliente.facturas.length}
            - Total Compras: $${cliente.facturas.reduce((acc, factura) => acc + factura.total, 0).toFixed(2)}
        `).join('\n')}
        
        Relaciones por Producto:
        ${sistema.productos.map(producto => `
            Producto: ${producto.name}
            - Aparece en ${producto.facturas.length} facturas
            - Stock actual: ${producto.stock}
        `).join('\n')}
    `;
}

// ===== PUNTO 11: OPERACIÓN DE NEGOCIO =====
// Operaciones de negocio con cálculos y análisis
interface AnalisisVentas {
    totalVentas: number;
    promedioVenta: number;
    productoMasVendido: {
        nombre: string;
        cantidad: number;
        totalVendido: number;
    };
    clienteMasFrecuente: {
        nombre: string;
        totalCompras: number;
        promedioCompra: number;
    };
    productosSinStock: string[];
}

function realizarAnalisisVentas(sistema: typeof sistemaFacturacion): AnalisisVentas {
    // Calcular total de ventas
    const totalVentas = sistema.clientes.reduce((total, cliente) => 
        total + cliente.facturas.reduce((sum, factura) => sum + factura.total, 0), 0);

    // Calcular promedio de venta
    const totalFacturas = sistema.clientes.reduce((total, cliente) => total + cliente.facturas.length, 0);
    const promedioVenta = totalVentas / totalFacturas;

    // Encontrar producto más vendido
    const ventasPorProducto = new Map<string, { cantidad: number; total: number }>();
    sistema.clientes.forEach(cliente => {
        cliente.facturas.forEach(factura => {
            factura.items.forEach(item => {
                const producto = item.producto;
                const actual = ventasPorProducto.get(producto.name) || { cantidad: 0, total: 0 };
                ventasPorProducto.set(producto.name, {
                    cantidad: actual.cantidad + item.cantidad,
                    total: actual.total + item.subtotal
                });
            });
        });
    });

    const productoMasVendido = Array.from(ventasPorProducto.entries())
        .map(([nombre, datos]) => ({
            nombre,
            cantidad: datos.cantidad,
            totalVendido: datos.total
        }))
        .reduce((max, actual) => 
            actual.cantidad > max.cantidad ? actual : max,
            { nombre: '', cantidad: 0, totalVendido: 0 });

    // Encontrar cliente más frecuente
    const comprasPorCliente = sistema.clientes.map(cliente => ({
        nombre: cliente.name,
        totalCompras: cliente.facturas.reduce((sum, factura) => sum + factura.total, 0),
        promedioCompra: cliente.facturas.reduce((sum, factura) => sum + factura.total, 0) / cliente.facturas.length
    }));

    const clienteMasFrecuente = comprasPorCliente.reduce((max, cliente) => 
        cliente.totalCompras > max.totalCompras ? cliente : max,
        { nombre: '', totalCompras: 0, promedioCompra: 0 });

    // Encontrar productos sin stock
    const productosSinStock = sistema.productos
        .filter(producto => producto.stock === 0)
        .map(producto => producto.name);

    return {
        totalVentas,
        promedioVenta,
        productoMasVendido,
        clienteMasFrecuente,
        productosSinStock
    };
}

function generarReporteVentas(analisis: AnalisisVentas): string {
    return `
        === REPORTE DE VENTAS ===
        
        Ventas Totales: $${analisis.totalVentas.toFixed(2)}
        Promedio por Venta: $${analisis.promedioVenta.toFixed(2)}
        
        Producto Más Vendido:
        - Nombre: ${analisis.productoMasVendido.nombre}
        - Cantidad Vendida: ${analisis.productoMasVendido.cantidad}
        - Total Vendido: $${analisis.productoMasVendido.totalVendido.toFixed(2)}
        
        Cliente Más Frecuente:
        - Nombre: ${analisis.clienteMasFrecuente.nombre}
        - Total en Compras: $${analisis.clienteMasFrecuente.totalCompras.toFixed(2)}
        - Promedio por Compra: $${analisis.clienteMasFrecuente.promedioCompra.toFixed(2)}
        
        Productos Sin Stock:
        ${analisis.productosSinStock.length > 0 
            ? analisis.productosSinStock.map(p => `- ${p}`).join('\n')
            : 'No hay productos sin stock'}
    `;
}

// ===== PUNTO 12: ESTRUCTURAS ANIDADAS =====
// Visualización de estructuras de datos anidadas en formato tabla
function generarTablaFacturas(sistema: typeof sistemaFacturacion): string {
    return `
        <table class="facturas-table">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Factura</th>
                    <th>Fecha</th>
                    <th>Productos</th>
                    <th>Subtotal</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${sistema.clientes.map(cliente => 
                    cliente.facturas.map(factura => `
                        <tr>
                            <td rowspan="${factura.items.length}">
                                <strong>${cliente.name}</strong><br>
                                <small>${cliente.email}</small>
                            </td>
                            <td rowspan="${factura.items.length}">
                                #${factura.id}
                            </td>
                            <td rowspan="${factura.items.length}">
                                ${new Date(factura.fecha).toLocaleDateString()}
                            </td>
                            ${factura.items.map((item, index) => `
                                ${index === 0 ? '' : '<tr>'}
                                <td>
                                    ${item.producto.name}<br>
                                    <small>Cantidad: ${item.cantidad}</small>
                                </td>
                                <td>$${item.subtotal.toFixed(2)}</td>
                                ${index === 0 ? `<td rowspan="${factura.items.length}">$${factura.total.toFixed(2)}</td>` : ''}
                                ${index === 0 ? '' : '</tr>'}
                            `).join('')}
                        </tr>
                    `).join('')
                ).join('')}
            </tbody>
        </table>
    `;
}

function generarTablaProductos(sistema: typeof sistemaFacturacion): string {
    const productosDisponibles = sistema.productos.filter(p => p.isAvailable);
    const productosSinStock = sistema.productos.filter(p => !p.isAvailable);
    
    return `
        <div class="productos-section">
            <h4>Productos Disponibles (${productosDisponibles.length}):</h4>
            <table class="productos-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Facturas Relacionadas</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosDisponibles.map(producto => `
                        <tr>
                            <td>${producto.name}</td>
                            <td>$${producto.price.toFixed(2)}</td>
                            <td>${producto.stock}</td>
                            <td>
                                ${producto.facturas.length > 0 
                                    ? producto.facturas.map(id => `#${id}`).join(', ')
                                    : 'Sin facturas'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h4>Productos Sin Stock (${productosSinStock.length}):</h4>
            <table class="productos-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Facturas Relacionadas</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosSinStock.map(producto => `
                        <tr>
                            <td>${producto.name}</td>
                            <td>$${producto.price.toFixed(2)}</td>
                            <td>${producto.stock}</td>
                            <td>
                                ${producto.facturas.length > 0 
                                    ? producto.facturas.map(id => `#${id}`).join(', ')
                                    : 'Sin facturas'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Ejecución y visualización de resultados
const app = document.querySelector<HTMLDivElement>('#app')!;

// Mostrar resultados en la página
app.innerHTML = `
    <h1>Sistema de Facturación</h1>
    
    <section class="point">
        <h2>1. Tipos Básicos</h2>
        <pre>${JSON.stringify({
            ProductName: "string",
            ProductPrice: "number",
            ProductStock: "number",
            CustomerEmail: "string",
            IsActive: "boolean"
        }, null, 2)}</pre>
    </section>

    <section class="point">
        <h2>2. Interfaces</h2>
        <pre>${JSON.stringify({
            IProduct: "Interface para productos",
            ICustomer: "Interface para clientes",
            IInvoice: "Interface para facturas",
            IInvoiceProduct: "Interface para productos en factura"
        }, null, 2)}</pre>
    </section>

    <section class="point">
        <h2>3. Clases</h2>
        <pre>${JSON.stringify({
            Product: "Clase con método updateStock()",
            Customer: "Clase con método getCustomerInfo()"
        }, null, 2)}</pre>
    </section>

    <section class="point">
        <h2>4. Arreglos Tipados y Objetos Literales</h2>
        <h3>Arreglos Tipados:</h3>
        <h4>Productos:</h4>
        <pre>${JSON.stringify(products, null, 2)}</pre>
        <h4>Clientes:</h4>
        <pre>${JSON.stringify(customers, null, 2)}</pre>
        <h4>Facturas:</h4>
        <pre>${JSON.stringify(invoices, null, 2)}</pre>

        <h3>Objetos Literales Tipados:</h3>
        <h4>Configuración del Sistema:</h4>
        <pre>${JSON.stringify(configuracionSistema, null, 2)}</pre>
        <h4>Metadatos de Factura:</h4>
        <pre>${JSON.stringify(metadatosFactura, null, 2)}</pre>
    </section>

    <section class="point">
        <h2>5. Funciones Tipadas</h2>
        <h3>Ejemplos de Funciones:</h3>
        <pre>${JSON.stringify({
            displayAllItems: "Función genérica para mostrar items",
            calcularTotal: "Función con tipos genéricos y restricciones",
            formatearPrecio: "Función con tipos de unión",
            buscarClientePorId: "Función con tipos de retorno específicos",
            actualizarStock: "Función con parámetros opcionales",
            procesarFactura: "Función con tipos de callback"
        }, null, 2)}</pre>

        <h3>Resultados de Ejecución:</h3>
        <pre>${JSON.stringify({
            totalProductos: calcularTotal(products),
            precioFormateado: formatearPrecio(999.99),
            clienteEncontrado: buscarClientePorId(1)?.name,
            procesamientoFactura: (() => {
                let resultado = '';
                procesarFactura(invoices[0], (res) => { resultado = res; });
                return resultado;
            })()
        }, null, 2)}</pre>
    </section>

    <section class="point">
        <h2>6. Tipos Especiales</h2>
        <pre>${JSON.stringify({
            readonly: "createdAt en ICustomer",
            optional: "items? en IInvoice"
        }, null, 2)}</pre>
    </section>

    <section class="point">
        <h2>7. Uso de map()</h2>
        <pre>${JSON.stringify(getProductNames(products), null, 2)}</pre>
    </section>

    <section class="point">
        <h2>8. Uso de filter()</h2>
        <pre>${JSON.stringify(getActiveCustomers(customers), null, 2)}</pre>
    </section>

    <section class="point">
        <h2>9. Uso de reduce()</h2>
        <p>Total en inventario: ${calculateTotalInventory(products)} unidades</p>
    </section>

    <section class="point">
        <h2>10. Relaciones entre Entidades</h2>
        <h3>Estructura Completa del Sistema:</h3>
        <pre>${JSON.stringify(sistemaFacturacion, null, 2)}</pre>
        <h3>Resumen de Relaciones:</h3>
        <pre>${mostrarRelaciones(sistemaFacturacion)}</pre>
    </section>

    <section class="point">
        <h2>11. Operación de Negocio</h2>
        <h3>Análisis de Ventas:</h3>
        <pre>${generarReporteVentas(realizarAnalisisVentas(sistemaFacturacion))}</pre>
    </section>

    <section class="point">
        <h2>12. Estructuras Anidadas</h2>
        <h3>Detalle de Facturas y Relaciones:</h3>
        ${generarTablaFacturas(sistemaFacturacion)}
        
        <h3>Productos y sus Relaciones:</h3>
        ${generarTablaProductos(sistemaFacturacion)}
    </section>

    <style>
        .facturas-table, .productos-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        .facturas-table th, .facturas-table td,
        .productos-table th, .productos-table td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        
        .facturas-table th, .productos-table th {
            background-color: #2c3e50;
            color: white;
        }
        
        .facturas-table tr:nth-child(even),
        .productos-table tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        .facturas-table tr:hover,
        .productos-table tr:hover {
            background-color: #f1f1f1;
        }
        
        .facturas-table small,
        .productos-table small {
            color: #666;
            font-size: 0.8em;
        }
    </style>
`;

// Mostrar resultados en consola
console.log('=== Resultados en Consola ===');
displayAllItems(products);
displayAllItems(customers);
displayAllItems(invoices);
