import { useEffect } from 'react';
import { useState } from "react";

function Transferencias(){

  const [dados, setDados] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/v1/transferencias')
      .then(response => response.json())
      .then(data => setDados(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Coluna 1</th>
          <th>Coluna 2</th>
          <th>Coluna 3</th>
          <th>Coluna 4</th>
        </tr>
      </thead>
      <tbody>
        {dados.map(item => (
          <tr key={item.id}>
            <td>{item.dataTransferencia}</td>
            <td>{item.valor}</td>
            <td>{item.tipo}</td>
            <td>{item.nomeOperadorTransacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}






export default Transferencias;