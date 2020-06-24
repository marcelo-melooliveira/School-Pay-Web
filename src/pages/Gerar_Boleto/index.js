import React, {useState, useEffect, useRef, useMemo} from 'react';
// import { Form, Input} from '@rocketseat/unform'
import { Form } from '@unform/web';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Modal from 'react-awesome-modal';
import { IoMdBarcode, IoIosCalendar } from 'react-icons/io';
import { Digital } from 'react-activity';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-activity/dist/react-activity.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from '~/services/api';
import Input from '../../components/Form/Input';


import { Container,
         LoadContainer,
         StudentsContainer,
         HeaderContainer,
         SearchContainer,
         HeaderLista,
         ModalContainer,
         ModalInfoContainer,
         ContainerPicker
        } from './styles';


const schema = Yup.object().shape({
  username: Yup.string().required('obrigatório'),
  email: Yup.string().required('obrigatório'),
  cpf: Yup.string(),
  valor_mensalidade: Yup.string().required('obrigatório'),
});

function Gerar_Boleto() {

  const [studentList, setStudentList] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [load, setLoad] = useState(true);
  const [loadBoleto, setLoadBoleto] = useState(false);
  const [openModalInfoStudent, setOpenModalInfoStudent] = useState(false);
  const [openModalBoleto, setOpenModalBoleto] = useState(false);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());

  const formRef = useRef(null);

  const dateFormatted = useMemo(
    () => format(date, "MMMM 'de' yyyy", { locale: pt }),
    [date]
  );
 

async function fetch_students(){  
  const res = await api.get('students');
  setDataStudents(res.data);
  setStudentList(res.data);
}

  useEffect(() => { 
     fetch_students(); 
     setLoad(false);    
  }, []);


  function SearchStudents (nome){
    setSearch(nome);

    const searcjQery = nome.toLowerCase();
        const mostra_aluno = dataStudents.filter((el) => {
          const searchValue = el.username.toLowerCase();
          return searchValue.indexOf(searcjQery) !== -1;
        })
    setStudentList(mostra_aluno);

  }



 async function criarBoleto(data){
   setLoadBoleto(true);
    const aux_name = data.username.split(' ');
    const primeiro_nome = aux_name[0];
    let sobrenome = '';
    for(let i=1; i < aux_name.length; i+=1){
       sobrenome = `${sobrenome} ${aux_name[i]}`;
    }
  const aux_data_ref = format(date, "MM'/'yyyy", { locale: pt })
  
  try {

    await schema.validate(data, {
      abortEarly: false,
    });

const data_fetch = {
  student_id: selectedStudents.id,
  first_name : primeiro_nome,
  last_name : sobrenome,
  email : data.email,
  cpf : data.cpf,
  valor_mensalidade: parseFloat(data.valor_mensalidade),
  description: `Mensalidade SchoolPay - ${selectedStudents.username}`,
  data_ref: aux_data_ref
  
  
}
console.log(data_fetch);

 const response = await api.post('payment-boleto', data_fetch);

 console.log(response.data);

 if(response.data.sucess){
     fetch_students();
     setLoadBoleto(false)
     setOpenModalBoleto(false);
     setSelectedStudents([]);
     window.open(response.data.url, '_blank')
 }else{
  setLoadBoleto(false)
   setOpenModalBoleto(false);
   setSelectedStudents([]);
   toast.error('Ops. Houve algum erro na geração do boleto');
   console.log(response.data.error);
 }
}catch(err){

      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        alert("Verifique os dados inseridos!")
        err.inner.forEach(error => {
          console.tron.log(error)
          validationErrors[error.path] = error.message;
        });
        
        formRef.current.setErrors(validationErrors);
      }

}
   
}



function openModal_SelectedStudents(index){
  setSelectedStudents(dataStudents[index]);
  setOpenModalInfoStudent(true)
}

function handleChangeDay(date_change) {
  setDate(date_change)
}
 
  return(
    <Container>
    <HeaderContainer>
      <header>
        <IoMdBarcode size={50} color="#FFF" />
        <strong>Gerar Boleto</strong>
      </header>
    </HeaderContainer>

    <SearchContainer style={{display:'flex', justifyContent:'center'}}>
      <input
      name='nome'
      type="text"
      placeholder="Digite o nome do aluno"
      value={search}
      onChange={(event) => SearchStudents(event.target.value)}
    />    
    </SearchContainer>
    
    {load ? (<LoadContainer><Digital color='#FFF' size={40} /></LoadContainer>):(<StudentsContainer>
      
    <div>
    <ul>
    <HeaderLista>
      <div style={{display:'flex', height:45, width:130,justifyContent:'center', backgroundColor:'#AAA'}}>
        <strong>Matrícula</strong>
      </div>

      <div style={{display:'flex', height:45,width:430,justifyContent:'center', alignItems:'center', backgroundColor:'#AAA', marginLeft:1}}>
        <strong>Nome</strong>
      </div>

      
    </HeaderLista>
    {
      studentList.map((value, index) => {
        return  <HeaderLista key={`page${ value.id}`}>
              <div style={{height:45, width:130,paddingTop:15, paddingLeft:10, backgroundColor:'#D8D8D8'}}>
                  <button type="button" onClick={() => openModal_SelectedStudents(index)}>
                    <strong>{value.matricula}</strong>
                  </button>
              
              </div>

              <div style={{height:45,width:430, backgroundColor:'#D8D8D8', marginLeft:1,paddingTop:15, paddingLeft:10}}>
                  <button type="button" onClick={() => openModal_SelectedStudents(index)}>
                    <strong>{value.username}</strong>
                  </button>
              </div>
         </HeaderLista>
                     
        })
    }
    </ul>
    </div>
      </StudentsContainer>)}
    
 
  <Modal 
  visible={openModalInfoStudent}
  width="700"
  height="600"
  effect="fadeInUp"
  onClickAway={() => setOpenModalInfoStudent(false)}
>
  <ModalInfoContainer>
  <div style={{display:'flex', width:'100%', justifyContent:'center', paddingTop:15, paddingBottom:15}}>
    <strong style={{fontSize:20}}>{selectedStudents.username}</strong>
  </div>
  
    
        <div style={{display:'flex', flexDirection:"column", paddingLeft:15}}>
          <strong>Matricula: {selectedStudents.matricula}</strong>
          <strong>CPF: {selectedStudents.cpf}</strong>
          <strong>RG: {selectedStudents.rg}</strong>
          <strong>Endereço: {selectedStudents.endereco}</strong>
          <strong>Telefone: {selectedStudents.telefone}</strong>
          <strong>Mensalidade: R${selectedStudents.valor_mensalidade}</strong>
          <strong>Responsável: {selectedStudents.nome_responsavel}</strong>
        </div>
        
        <div style={{display:'flex', width:'100%', justifyContent:'center', marginTop:35}}>
            <button type="button" onClick={()=>{setOpenModalInfoStudent(false); setOpenModalBoleto(true)}}>
            Próximo</button>
      
        </div>
  
  </ModalInfoContainer>
</Modal>



<Modal 
      visible={openModalBoleto}
      width="700"
      height="600"
      effect="fadeInUp"
      onClickAway={() => setOpenModalBoleto(false)}
  >
                    
      <ModalContainer>
      <strong>Boleto ({selectedStudents.username})</strong>
      
            <ContainerPicker>
            <strong>Mês do Pagamento</strong>
                 <DatePicker
                      selected={date}
                      onChange={handleChangeDay}
                      customInput={<strong style={{backgroundColor:'rgba(255, 255, 255, 0.85)', cursor:'pointer', color:'#000', width:200}}><IoIosCalendar style={{marginRight:5}} size={20} color="#210B61" />{dateFormatted}</strong>}
                      locale='pt'
                      showMonthYearPicker
                      showFullMonthYearPicker
                    />
            </ContainerPicker>

        <Form  onSubmit={(data) => criarBoleto(data)}>
                       
            <div>
              <strong>Nome</strong>
              <Input name="username" type='text' placeholder="Digite o nome do pagador (obrigatório)" />
            </div>

            <div>
              <strong>Email</strong>
              <Input name="email" type='text' placeholder="Digite o email do pagador (obrigatório)" />
            </div>
            
            <div>
              <strong>CPF</strong>
              <Input name="cpf" type='text' placeholder="Digite o CPF do pagador" />
            </div>

          <div>
            <strong>Mensalidade</strong>
            <Input name="valor_mensalidade" type='text' placeholder="Valor da mensalidade (obrigatório)" />
          </div>


          <button type="submit">{loadBoleto ? 'Gerando Boleto...' : 'Gerar Boleto'}</button>

        </Form>
      </ModalContainer>
  </Modal>
 

    </Container>
  )
 
}
export default Gerar_Boleto;
