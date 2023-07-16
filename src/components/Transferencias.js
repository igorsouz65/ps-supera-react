import { useEffect } from 'react';
import { useState } from "react";
import moment from 'moment/moment';

import './transferencias.css';


function Transferencias() {

  const API = 'http://localhost:8080/v1/transferencias';

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let queryParams = '/';

      if (filtroNome) {
        queryParams += `${filtroNome}/`;
      }


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
          setDados([data]);
        } else {
          setDados(data);
        }

        
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function filtrarDados() {
    let dadosFiltrados = dados;

    // Filtra os dados com base nos filtros
    const nomeOperadorFiltrado = filtroNome?.toLowerCase() ?? '';
    if (filtroNome) {
      dadosFiltrados = dadosFiltrados.filter(item => item.nomeOperadorTransacao && item.nomeOperadorTransacao.toLowerCase().includes(nomeOperadorFiltrado));
    }

    if (filtroDataInicio) {
      dadosFiltrados = dadosFiltrados.filter(item => moment(item.dataTransferencia).isSameOrAfter(filtroDataInicio, 'day'));
    }

    if (filtroDataFim) {
      dadosFiltrados = dadosFiltrados.filter(item => moment(item.dataTransferencia).isSameOrBefore(filtroDataFim, 'day'));
    }

    setDadosFiltrados(dadosFiltrados);
  }

  if (dadosFiltrados === null) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto os dados são obtidos
  }

  function formatarString(str) {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
  

  return (

    <div>
      <input
        type="text"
        value={filtroNome}
        onChange={e => setFiltroNome(e.target.value)}
        className='input-custom'
        placeholder="Nome do Operador"
      />
      <input
        type="text"
        value={filtroDataInicio}
        onChange={e => setFiltroDataInicio(e.target.value)}
        className='input-custom'
        placeholder="Data inicial"
      />
      <input
        type="text"
        value={filtroDataFim}
        onChange={e => setFiltroDataFim(e.target.value)}
        className='input-custom'
        placeholder="Data final"
      />

<button onClick={filtrarDados}>Filtrar</button>

      <table className="transferencias-table">
        <thead>
          <tr>
            <th>Data de Transferências</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Nome do Operador da transação</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map(item => (
            <tr key={item.id}>
              <td>{moment(item.dataTransferencia).format('DD/MM/YYYY')}</td>
              <td>{item.valor.toLocaleString('pt-BR')}</td>
              <td>{formatarString(item.tipo)}</td>
              <td>{item.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






export default Transferencias;