import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding-top: 15px;

  display: flex;
  flex-direction: column;

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    margin-top:5px;
    margin-bottom:15px;
  }
`;
export const HeaderContainer = styled.div`
  max-width: 600px;
  display: flex;
  justify-content:center;
header {
    display: flex;
    align-self: center;
    align-items: center;
    background-color:#7159c1;
    border-radius:10px;
    padding-left: 15px;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 20px;
      margin: 0 15px;
    }
  }

`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #BDBDBD;

  strong {
    display: block;
    color: #7159c1;
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #666;
    font-weight: ${props => (props.pay ? 'bold' : 'normal')};
  }
`;

export const LoadContainer = styled.div`
  max-width: 600px;
  height:400px;
  justify-content:center;
  align-items:center;
  display: flex;
  ;`

export const StudentsContainer = styled.div`
max-width: 600px;
padding-left: 10px;
padding-right: 10px;
padding-bottom: 20px;
border-radius:5px;
justify-content:center;
display: flex;
background-color:#F2F2F2;
flex-direction: column;
margin-top:5px;


header {
    display: flex;
    width: 600px;
    height: 35px;
    align-self: center;
    align-items: center;
    background-color:#7159c1;
    padding-left: 15px;
    margin-top:1px;

    strong {
    display: block;
    color: #FFF;
    font-size: 20px;
    font-weight: normal;
  }
}
;`

export const InputContainer = styled.div`

display:flex;
justify-content:center;

input {
      background: rgba(255, 255, 255, 0.85);
      border: 0;
      border-radius: 15px;
      width:400px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 10px 0 10px;

      &::placeholder {
        color: #AAA
      }
    }
`;

export const HeaderLista = styled.div`
display:flex;
flex-direction:row;

button {
      border: 0;
      background: none;
    }
    div {
      justify-content:center;
      align-items:center;
    }
`;