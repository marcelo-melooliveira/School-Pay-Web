import React, {useState, useMemo, useEffect} from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import api from '~/services/api';


import { Container, Time, LoadContainer} from './styles';

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [payData, setPayData] = useState();
  const [load, setLoad] = useState(true);
  const [dateFormatted, setDateFormatted] = useState('');

  // const dateFormatted = useMemo(() => {format(date, "d 'de' MMMM", { locale: pt })},
  //   [date]);

  async function payments(){
    const aux_payData =[];
    const aux_date = format(date, "yyyy'-'MM'-'dd")
    const res = await api.get('search-payments-today',{
      params : { date: aux_date }
    });
console.log(aux_date);   
console.log(res.data);
    
    if(res.data.length === 0){
      aux_payData.push(
      <LoadContainer><strong>Nenhuma movimentação foi registada hoje</strong></LoadContainer>
      )
      setPayData(aux_payData);
      setLoad(false);
      return
    }


    aux_payData.push(
      <ul>
      {
        res.data.map(value => {
          let pay = false;
          let data_formatada = '';
                if(value.data_pagamento){
                  pay = true
                  const data = parseISO(value.data_pagamento);               
                   data_formatada = `Data: ${format(
                  data, 
                  "'Hoje ás' HH:mm"
                )}`
                }else{
                  const data = parseISO(value.data_criacao);               
                  data_formatada = `Data: ${format(
                 data, 
                 "'Hoje ás' HH:mm"
               )}`

                }
          return (
            <Time key={`page${ value.id}`} pay={pay}>
            <strong>Aluno: {value.student.username}</strong>
            <span>Status: {value.status}</span>
            <span>{data_formatada}</span>
            <span>Tipo de pagamento: {value.tipo_pagamento}</span>
          </Time>
          )})
      }
      </ul>
    );
   

    setPayData(aux_payData);
    setLoad(false);
   
  }

  useEffect(() => { 
     payments();
     const aux_dateFormated =  format(date, "d 'de' MMMM", { locale: pt });
     setDateFormatted(aux_dateFormated);
  }, []);

  // useEffect(()=>{
  //   console.tron.log(payData)
  // }, [payData])

  

  

  return(
    <Container>
    <header>
      <RiExchangeDollarLine size={50} color="#FFF" />
      <strong>MOVIMENTAÇÕES DE HOJE</strong>
      <strong> ( {dateFormatted} ) </strong>
    </header>
    {load ? (<LoadContainer><Digital color='#FFF' size={40} /></LoadContainer>):(payData)}
    
    </Container>
  )
 
}
export default Dashboard;
