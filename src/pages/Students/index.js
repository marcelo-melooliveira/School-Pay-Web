import React, {useState, useMemo, useEffect} from 'react';
import { Form, Input } from '@rocketseat/unform';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import api from '~/services/api';


import { Container,
         Time,
         LoadContainer,
         StudentsContainer,
         HeaderContainer,
         InputContainer,
         HeaderLista
        } from './styles';

function Students() {

  const [studentList, setStudentList] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);
  const [load, setLoad] = useState(true);
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

      <div style={{display:'flex', height:45,width:430,justifyContent:'center', alignItems:'center', backgroundColor:'#D8D8D8', marginLeft:1}}>
        <strong>Nome</strong>
      </div>
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
    
    </Container>
  )
 
}
export default Students;
