import Producto, { type ProductoData } from './Producto';

interface ListaProductosProps {
  productos: ProductoData[];
}

const ListaProductos = ({ productos }: ListaProductosProps) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
      gap: '16px'
    }}>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          imagen={producto.imagen}
        />
      ))}
    </div>
  );
};

export default ListaProductos; 