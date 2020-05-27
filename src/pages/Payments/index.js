import React, {useState, useMemo, useEffect} from 'react';
import {
  format,
  subMonths,
  addMonths,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
  import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from '~/services/api';


import { Container, Time, LoadContainer} from './styles';

registerLocale('pt', pt)

function Payments() {
  const [date, setDate] = useState(new Date());
  const [payData, setPayData] = useState();
  const [load, setLoad] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function fetch_payments(){
    const aux_payData =[];
    const res = await api.get('search-payments-month',{
      params : { date }
    });

    if(res.data.length === 0){
      aux_payData.push(
      <LoadContainer><strong>Nenhum pagamento foi registado nesse mês</strong></LoadContainer>
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
                  "dd'/'MM 'ás' HH:mm"
                )}`
                }else{
                  const data = parseISO(value.data_criacao);               
                  data_formatada = `Data: ${format(
                 data, 
                 "dd'/'MMMM 'ás' HH:mm"
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
     fetch_payments();     
  }, [date]);

  // useEffect(()=>{
  //   console.tron.log(payData)
  // }, [payData])

  
  function handleDay(add) {
    setDate(add ? addMonths(date, 1) : subMonths(date, 1));
  }

 function handleChangeDay(date_change) {
    setDate(date_change)
  }
 

  return(
    <Container>
    <header>
    <button type="button" onClick={() => handleDay(false)}>
      <MdChevronLeft size={36} color="#fff" />
    </button>
    <DatePicker
        selected={date}
        onChange={handleChangeDay}
        customInput={<strong>{dateFormatted}</strong>}
        locale='pt'
        showMonthYearPicker
        showFullMonthYearPicker
      />
    
    
    <button type="button" onClick={() => handleDay(true)}>
      <MdChevronRight size={36} color="#fff" />
    </button>
  </header>

    {load ? (<LoadContainer><Digital color='#FFF' size={40} /></LoadContainer>):(payData)}
    
    </Container>
  )
 
}
export default Payments;
