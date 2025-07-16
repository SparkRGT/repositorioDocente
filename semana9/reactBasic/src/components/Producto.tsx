interface ProductoData {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

interface ProductoProps {
  nombre: string;
  precio: number;
  imagen: string;
}

const Producto = ({ nombre, precio, imagen }: ProductoProps) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: 'white'
    }}>
      <img 
        src={imagen} 
        alt={nombre}
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <h3 style={{ margin: '8px 0', color: '#333' }}>{nombre}</h3>
      <p style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: '#007bff',
        margin: '4px 0'
      }}>
        ${precio}
      </p>
    </div>
  );
};

export default Producto;
export type { ProductoData }; 