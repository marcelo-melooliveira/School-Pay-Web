import React, {useState, useMemo, useEffect} from 'react';
import { Form, Input } from '@rocketseat/unform';
import Modal from 'react-awesome-modal';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Digital } from 'react-activity';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-activity/dist/react-activity.css';
import api from '~/services/api';

import { Container,
         Time,
         LoadContainer,
         StudentsContainer,
         HeaderContainer,
         InputContainer,
         HeaderLista,
         ButtonContainer,
         ModalContiner
        } from './styles';


const schema = Yup.object().shape({
  matricula: Yup.string(),
  username: Yup.string().required('O nome é obrigatório'),
  cpf: Yup.string(),
  rg: Yup.string(),
  endereco: Yup.string().required('O endereço é obrigatório').max(254),
  telefone: Yup.string()
    .required('O telefone é obrigatório'),
  valor_mensalidade: Yup.string()
    .required('A mensalidade é obrigatória'),
});

function Students() {

  const [studentList, setStudentList] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);
  const [load, setLoad] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');


 

async function fetch_students(){  
  const res = await api.get('students');
  setDataStudents(res.data);
  setStudentList(res.data);
}

  useEffect(() => { 
     fetch_students(); 
     setLoad(false);    
  }, []);

 

  // useEffect(()=>{
  //   alert(search)
  // }, [search])

  function SearchStudents (nome){
    setSearch(nome);

    const searcjQery = nome.toLowerCase();
        const mostra_aluno = dataStudents.filter((el) => {
          const searchValue = el.username.toLowerCase();
          return searchValue.indexOf(searcjQery) !== -1;
        })
    setStudentList(mostra_aluno);

  }

 

  async function handleSubmit(data){
    // alert("Entrou no submit")
    // console.tron.log(data)
    const response = await api.post('students',{
      username : data.username,
	    matricula : parseInt(data.matricula),
	    cpf : data.cpf,
	    rg : data.rg,
	    endereço : data.endereco,
      telefone : data.telefone,
      valor_mensalidade: parseFloat(data.valor_mensalidade)
    });

    console.tron.log(response.data)

    if(response.data.username){
        fetch_students();
        setOpenModal(false)
        toast.success('Aluno salvo com sucesso')
    }else{
      setOpenModal(false)
      toast.error('Ops. Houve algum erro no cadastro');
    }
      
 }
  

 

  return(
    <Container>
    <HeaderContainer>
      <header>
        <BsFillPeopleFill size={50} color="#FFF" />
        <strong>ALUNOS</strong>
      </header>
    </HeaderContainer>

    <InputContainer style={{display:'flex', justifyContent:'center'}}>
      <input
      name='nome'
      type="text"
      placeholder="Digite o nome do aluno"
      value={search}
      onChange={(event) => SearchStudents(event.target.value)}
    />    
    </InputContainer>
    
    {load ? (<LoadContainer><Digital color='#FFF' size={40} /></LoadContainer>):(<StudentsContainer>
      
    <div>
    <ul>
    <HeaderLista>
      <div style={{display:'flex', height:45, width:130,justifyContent:'center', backgroundColor:'#D8D8D8'}}>
        <strong>Matrícula</strong>
      </div>

      <div style={{display:'flex', height:45,width:260,justifyContent:'center', alignItems:'center', backgroundColor:'#D8D8D8', marginLeft:1}}>
        <strong>Nome</strong>
      </div>

      <ButtonContainer>
        <button type='button' onClick={()=> setOpenModal(true)}>Adicionar aluno</button>
      </ButtonContainer>
      
    </HeaderLista>
    {
      studentList.map((value) => {
        return  <HeaderLista key={`page${ value.id}`}>
              <div style={{height:45, width:130,paddingTop:15, paddingLeft:10, backgroundColor:'#AAA'}}>
                  <button type="button" onClick={() => null}>
                    <strong>{value.matricula}</strong>
                  </button>
              
              </div>

              <div style={{height:45,width:430, backgroundColor:'#AAA', marginLeft:1,paddingTop:15, paddingLeft:10}}>
                  <button type="button" onClick={() => null}>
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
      visible={openModal}
      width="700"
      height="600"
      effect="fadeInUp"
      onClickAway={() => setOpenModal(false)}
  >
      <ModalContiner>
      <strong>Cadastro de aluno</strong>
      
        <Form schema={schema} onSubmit={(data) => handleSubmit(data)}>
        <Input name="matricula" type='text' placeholder="Digite a matricula" />
        <Input name="username" type='text' placeholder="Digite o nome" />
        <Input name="cpf" type='text' placeholder="Digite o CPF" />
        <Input name="rg" type='text' placeholder="Digite o RG" />
        <Input name="endereco" type='text' placeholder="Digite o endereço" />
        <Input name="telefone" type='tel' placeholder="Digite o telefone" />
        <Input name="valor_mensalidade" type='text' placeholder="Valor da mensalidade" />
        
        <button type="submit">Salvar</button>

        </Form>
      </ModalContiner>
  </Modal>

    </Container>
  )
 
}
export default Students;
