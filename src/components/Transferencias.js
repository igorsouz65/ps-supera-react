import { useEffect } from 'react';
import { useState } from "react";
import moment from 'moment/moment';

function Transferencias() {

  const API = 'http://localhost:8080/v1/transferencias';

  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [dadosFiltrados, setDadosFiltrados] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      let queryParams = '/';

      if (filtroDataInicio) {
        const dataFormatada = moment(filtroDataInicio, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss');
        queryParams += `${dataFormatada}/`;
      }

      if (filtroDataFim) {
        const dataFormatada = moment(filtroDataFim, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss');
        queryParams += `${dataFormatada}/`;
      }

      try {
        const response = await fetch(API + `${queryParams}`);
        const data = await response.json();

        if (!Array.isArray(data)){
          setDadosFiltrados([data]);
        } else {
          setDadosFiltrados(data);
        }

        
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchData();
  }, [filtroDataInicio, filtroDataFim]);

  if (dadosFiltrados === null) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto os dados são obtidos
  }



  return (

    <div>
      <input
        type="text"
        value={filtroDataInicio}
        onChange={e => setFiltroDataInicio(e.target.value)}
        placeholder="Data inicial"
      />
      <input
        type="text"
        value={filtroDataFim}
        onChange={e => setFiltroDataFim(e.target.value)}
        placeholder="Data final"
      />

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
          {dadosFiltrados.map(item => (
            <tr key={item.id}>
              <td>{item.dataTransferencia}</td>
              <td>{item.valor}</td>
              <td>{item.tipo}</td>
              <td>{item.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






export default Transferencias;