import React, {useState, useEffect, useRef} from 'react';
// import { Form, Input} from '@rocketseat/unform'
import { Form } from '@unform/web';
import Modal from 'react-awesome-modal';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Digital } from 'react-activity';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-activity/dist/react-activity.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import api from '~/services/api';
import Input from '../../components/Form/Input'

import { Container,
         LoadContainer,
         StudentsContainer,
         HeaderContainer,
         SearchContainer,
         HeaderLista,
         ButtonContainer,
         ModalContainer,
         ModalInfoContainer
        } from './styles';


const schema = Yup.object().shape({
  matricula: Yup.string(),
  username: Yup.string().required('obrigatório'),
  cpf: Yup.string(),
  rg: Yup.string(),
  endereco: Yup.string().required('obrigatório').max(254),
  telefone: Yup.string()
    .required('obrigatório'),
  valor_mensalidade: Yup.string().required('obrigatório'),
  nome_responsavel: Yup.string().required('obrigatório'),
});

function Students() {

  const [studentList, setStudentList] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [load, setLoad] = useState(true);
  const [openModalInfoStudent, setOpenModalInfoStudent] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [search, setSearch] = useState('');
  const [modalCadastro, setModalCadastro] = useState([]);

  const formRef = useRef(null);


 

async function fetch_students(){  
  const res = await api.get('students');
  setDataStudents(res.data);
  setStudentList(res.data);
}

  useEffect(() => { 
     fetch_students(); 
     setLoad(false);    
  }, []);

 

  useEffect(()=>{
    formRef.current.setData(selectedStudents);  
  }, [selectedStudents])


  function SearchStudents (nome){
    setSearch(nome);

    const searcjQery = nome.toLowerCase();
        const mostra_aluno = dataStudents.filter((el) => {
          const searchValue = el.username.toLowerCase();
          return searchValue.indexOf(searcjQery) !== -1;
        })
    setStudentList(mostra_aluno);

  }

 
  async function criarAluno(data){
   
     
     try {

        await schema.validate(data, {
          abortEarly: false,
        });

          const response = await api.post('students',{
            username : data.username,
            matricula : parseInt(data.matricula),
            cpf : data.cpf,
            rg : data.rg,
            endereco : data.endereco,
            telefone : data.telefone,
            valor_mensalidade: parseFloat(data.valor_mensalidade),
            nome_responsavel : data.nome_responsavel,
          });
          
          if(response.data.username){
              fetch_students();
              setModalCadastro([])
              toast.success('Aluno criado com sucesso')
          }else{
            setModalCadastro([])
            toast.error('Ops. Houve algum erro no cadastro');
          }

      }catch(err){
        
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        alert("Erro no cadastro, verifique os dados inseridos!")
        err.inner.forEach(error => {
          console.tron.log(error)
          validationErrors[error.path] = error.message;
        });
        
        formRef.current.setErrors(validationErrors);
      }

  }
    
  }
  



 async function editarAluno(data){
  
  try {

    await schema.validate(data, {
      abortEarly: false,
    });

  const data_fetch = {
    id: selectedStudents.id,
    username : data.username,
    matricula : parseInt(data.matricula),
    cpf : data.cpf,
    rg : data.rg,
    endereco : data.endereco,
    telefone : data.telefone,
    valor_mensalidade: parseFloat(data.valor_mensalidade),
    nome_responsavel : data.nome_responsavel
  }
 const response = await api.put('students', data_fetch);

 // setLogData(response.data);

 if(response.data.sucess){
     fetch_students();
     setOpenModalUpdate(false);
     setSelectedStudents([]);
     toast.success('Aluno editado com sucesso');
 }else{
   setOpenModalUpdate(false);
   setSelectedStudents([]);
   toast.error('Ops. Houve algum erro no edição');
 }
}catch(err){

      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        alert("Erro na edição, verifique os dados inseridos!")
        err.inner.forEach(error => {
          console.tron.log(error)
          validationErrors[error.path] = error.message;
        });
        
        formRef.current.setErrors(validationErrors);
      }

}
   
}


async function deletarAluno(){
  setOpenModalInfoStudent(false);

  confirmAlert({
    title: 'Confirmar?',
    message: 'Deseja realmente deletar o aluno?',
    buttons: [
      {
        label: 'Sim',
        onClick: async () => {
          setOpenModalInfoStudent(true);
          const response = await api.delete(`students/${selectedStudents.id}`);
              if(response.data.sucess){
                  fetch_students();
                  setOpenModalInfoStudent(false);
                  setSelectedStudents([]);
                  toast.success('Aluno deletado com sucesso');
              }else{
                setOpenModalInfoStudent(false);
                setSelectedStudents([]);
                toast.error(response.data.error);
              }
        }
      },
      {
        label: 'Não',
        onClick: () => {setOpenModalInfoStudent(true)}
      }
    ]
  });
  

}


function openModal_SelectedStudents(index){
  setSelectedStudents(dataStudents[index]);
   setOpenModalInfoStudent(true)
}

function abrir_modal_cadastro(){
  const aux_modal_cadastro = [];

  aux_modal_cadastro.push(

   <Modal 
   visible={ () => {return true} }
   width="700"
   height="600"
   effect="fadeInUp"
   onClickAway={() => setModalCadastro([])}
>
   <ModalContainer>
   <strong>Cadastro de aluno</strong>
   
     <Form ref={formRef} onSubmit={(data) => criarAluno(data)}>
         <div>
           <strong>Matricula</strong>
           <Input name="matricula" type='text' placeholder="Digite a matricula" />
         </div>
         
         <div>
           <strong>Nome</strong>
           <Input name="username" type='text' placeholder="Digite o nome (obrigatório)" />
         </div>
         
         <div>
           <strong>CPF</strong>
           <Input name="cpf" type='text' placeholder="Digite o CPF" />
         </div>

         <div>
           <strong>RG</strong>
           <Input name="rg" type='text' placeholder="Digite o RG" />
         </div>

         <div>
           <strong>Endereço</strong>
           <Input name="endereco" type='text' placeholder="Digite o endereço (obrigatório)" />
       </div>
         
       <div>
         <strong>Telefone</strong>
         <Input name="telefone" type='text' placeholder="Digite o telefone (obrigatório)" />
       </div>

       <div>
         <strong>Mensalidade</strong>
         <Input name="valor_mensalidade" type='text' placeholder="Valor da mensalidade (obrigatório)" />
       </div>

       <div>
         <strong>Responsável</strong>
         <Input name="nome_responsavel" type='text' placeholder="Nome do responsável (obrigatório)" />
       </div>

         <button type="submit">Salvar</button>

     </Form>
   </ModalContainer>
</Modal>
  );
  setModalCadastro(aux_modal_cadastro);
}
 
  return(
    <Container>
    <HeaderContainer>
      <header>
        <BsFillPeopleFill size={50} color="#FFF" />
        <strong>ALUNOS</strong>
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

      <div style={{display:'flex', height:45,width:260,justifyContent:'center', alignItems:'center', backgroundColor:'#AAA', marginLeft:1}}>
        <strong>Nome</strong>
      </div>

      <ButtonContainer>
        <button type='button' onClick={()=> {
          abrir_modal_cadastro(true)}}>
            Adicionar aluno</button>
      </ButtonContainer>
      
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
    
     
    {modalCadastro.length ? modalCadastro : null}

 
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
            <button type="button" onClick={()=>{
                                                setOpenModalInfoStudent(false);
                                                setOpenModalUpdate(true)}}>
            Editar</button>
            <button style={{backgroundColor:'#FE2E64'}} type="button" onClick={()=> deletarAluno()}>
            Deletar</button>
        </div>
  
  </ModalInfoContainer>
</Modal>



<Modal 
      visible={openModalUpdate}
      width="700"
      height="600"
      effect="fadeInUp"
      onClickAway={() => setOpenModalUpdate(false)}
  >
      <ModalContainer>
      <strong>Editar cadastro de aluno</strong>
      
        <Form ref={formRef} onSubmit={(data) => editarAluno(data)}>
            <div>
              <strong>Matricula</strong>
              <Input name="matricula" type='text' placeholder="Digite a matricula" />
            </div>
            
            <div>
              <strong>Nome</strong>
              <Input name="username" type='text' placeholder="Digite o nome (obrigatório)" />
            </div>
            
            <div>
              <strong>CPF</strong>
              <Input name="cpf" type='text' placeholder="Digite o CPF" />
            </div>

            <div>
              <strong>RG</strong>
              <Input name="rg" type='text' placeholder="Digite o RG" />
            </div>

            <div>
              <strong>Endereço</strong>
              <Input name="endereco" type='text' placeholder="Digite o endereço (obrigatório)" />
          </div>
            
          <div>
            <strong>Telefone</strong>
            <Input name="telefone" type='text' placeholder="Digite o telefone (obrigatório)" />
          </div>

          <div>
            <strong>Mensalidade</strong>
            <Input name="valor_mensalidade" type='text' placeholder="Valor da mensalidade (obrigatório)" />
          </div>

          <div>
            <strong>Responsável</strong>
            <Input name="nome_responsavel" type='text' placeholder="Nome do responsável (obrigatório)" />
          </div>

          <button type="submit">Salvar</button>

        </Form>
      </ModalContainer>
  </Modal>
 

    </Container>
  )
 
}
export default Students;
