import React, {useState, useMemo, useEffect} from 'react';
import {
  format,
  subMonths,
  addMonths,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from '~/services/api';


import { Container,
         LoadContainer,
         PaymentsContainer,
         HeaderLista,
         GlobalPaymentsContainer
      } from './styles';

registerLocale('pt', pt)

function Payments() {
  const [date, setDate] = useState(new Date());
  // const [payData, setPayData] = useState([]);
  const [load, setLoad] = useState(true);
  const [paymentListPago, setPaymentListPago] = useState([]);
  const [paymentListPendente, setPaymentListPendente] = useState([]);
  const [listaVazia, setListaVazia] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "MMMM 'de' yyyy", { locale: pt }),
    [date]
  );
 
  async function fetch_payments(){
    setLoad(true);
    setListaVazia(true);
    const data_ref = format(date, "MM'/'yyyy", { locale: pt })

    const res = await api.get('search-payments-month',{
      params : { data_ref }
    });


    if(res.data.length === 0){
      setLoad(false);
      return
    }

    const pago =[];
    const pendente = [];

    res.data.map((value, index) => {
      if(value.status === 'Pago'){
        pago.push(res.data[index]);
        
      }else if(value.status === 'Pendente'){
        pendente.push(res.data[index]);
      }
      return true
    });

    setPaymentListPago(pago);
    setPaymentListPendente(pendente);
    setListaVazia(false);
    setLoad(false);

    // aux_payData.push(
    //   <ul>
    //   {
    //     res.data.map(value => {
    //       let pay = false;
    //       let data_formatada = '';
    //             if(value.data_pagamento){
    //               pay = true
    //               const data = parseISO(value.data_pagamento);               
    //                data_formatada = `Data: ${format(
    //               data, 
    //               "dd'/'MM 'ás' HH:mm"
    //             )}`
    //             }else{
    //               const data = parseISO(value.data_criacao);               
    //               data_formatada = `Data: ${format(
    //              data, 
    //              "dd'/'MMMM 'ás' HH:mm"
    //            )}`

    //             }
    //       return (
    //         <Time key={`page${ value.id}`} pay={pay}>
    //         <strong>Aluno: {value.student.username}</strong>
    //         <span>Status: {value.status}</span>
    //         <span>{data_formatada}</span>
    //         <span>Tipo de pagamento: {value.tipo_pagamento}</span>
    //       </Time>
    //       )})
    //   }
    //   </ul>
    // );
   

    // setPayData(aux_payData);
    // setLoad(false);
   
  }

  useEffect(() => { 
     fetch_payments();     
  }, [date]);

  // useEffect(()=>{
  //   console.tron.log(payData)
  // }, [payData])

  
  function handleMounth(add) {
    setDate(add ? addMonths(date, 1) : subMonths(date, 1));
  }

 function handleChangeDay(date_change) {
    setDate(date_change)
  }
 

  return(
    <Container>
    <header>
    <button type="button" onClick={() => handleMounth(false)}>
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
    
    
    <button type="button" onClick={() => handleMounth(true)}>
      <MdChevronRight size={36} color="#fff" />
    </button>
  </header>


    {load ? <LoadContainer><Digital color='#FFF' size={40} /></LoadContainer> 
    : listaVazia ? 
    <LoadContainer><strong>Nenhum pagamento foi registado nesse mês</strong></LoadContainer> 
    : 
      
<GlobalPaymentsContainer>
  
<PaymentsContainer> 
    <div>
      <ul>
      <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', height:45, width:562,justifyContent:'center', alignItems:'center', backgroundColor:'#819FF7', borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
              <strong>Pagamentos Efetuados</strong>
            </div>
        <HeaderLista>
            <div style={{display:'flex', height:45, width:130,justifyContent:'center', backgroundColor:'#D8D8D8'}}>
              <strong>Matrícula</strong>
            </div>

            <div style={{display:'flex', height:45,width:330,justifyContent:'center', alignItems:'center', backgroundColor:'#D8D8D8', marginLeft:1}}>
              <strong>Nome</strong>
            </div> 

            <div style={{display:'flex', height:45,width:100,justifyContent:'center', alignItems:'center', backgroundColor:'#D8D8D8', marginLeft:1}}>
              <strong>Valor Pago</strong>
            </div>
        </HeaderLista>

      {
        paymentListPago.map((value)=>{
          return(
                  <HeaderLista>
                      <div style={{display:'flex', height:45, width:130, backgroundColor:'#D8D8D8', justifyContent:'center', alignItems:'center'}}>
                          <button type="button" onClick={() => null}>
                            <strong>{value.student.matricula}</strong>
                          </button>
                      </div>

                      <div style={{height:45,width:330, backgroundColor:'#D8D8D8', marginLeft:1,paddingTop:15, paddingLeft:10}}>
                        <button type="button" onClick={() => null}>
                          <strong>{value.student.username}</strong>
                        </button>
                      </div>

                      <div style={{height:45,width:100, backgroundColor:'#D8D8D8', marginLeft:1,paddingTop:15, paddingLeft:10}}>
                        <button type="button" onClick={() => null}>
                          <strong>R${value.valor_pago}</strong>
                        </button>
                      </div>
                </HeaderLista>
          )})
      }
        </div>

      </ul>
    </div>
</PaymentsContainer>


<PaymentsContainer> 
    <div>
      <ul>
      <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', height:45, width:561,justifyContent:'center', alignItems:'center',  backgroundColor:'#F7819F', borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
              <strong>Pagamentos Pendentes</strong>
            </div>
        <HeaderLista>
            <div style={{display:'flex', height:45, width:130,justifyContent:'center', backgroundColor:'#D8D8D8'}}>
              <strong>Matrícula</strong>
            </div>

            <div style={{display:'flex', height:45,width:430,justifyContent:'center', alignItems:'center', backgroundColor:'#D8D8D8', marginLeft:1}}>
              <strong>Nome</strong>
            </div> 
        </HeaderLista>

      {
        paymentListPendente.map((value)=>{
          return(
                  <HeaderLista>
                      <div style={{display:'flex', height:45, width:130, backgroundColor:'#D8D8D8', justifyContent:'center', alignItems:'center'}}>
                          <strong>{value.student.matricula}</strong>
                      </div>

                      <div style={{height:45,width:430, backgroundColor:'#D8D8D8', marginLeft:1,paddingTop:15, paddingLeft:10}}>
                          <strong>{value.student.username}</strong>  
                     </div>

                      
                </HeaderLista>
          )})
      }
        </div>

      </ul>
    </div>
</PaymentsContainer>

</GlobalPaymentsContainer>
      

}
</Container>
      )  
 
}
export default Payments;
