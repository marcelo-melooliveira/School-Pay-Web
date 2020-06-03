import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1300px;
  margin: 50px auto;
  padding-top: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;

  header {
    display: flex;
    align-self: center;
    align-items: center;
    background-color:#7159c1;
    border-radius: 10px;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 20px;
      margin: 0 15px;
      cursor: pointer;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const GlobalPaymentsContainer = styled.div`
  display:flex;
  flex-direction:row;
  padding-top:20px;
`;

export const PaymentsContainer = styled.div`
max-width: 600px;
padding-left: 10px;
padding-right: 10px;
padding-bottom: 20px;
border-radius:5px;
display: flex;
background-color:#F2F2F2;
flex-direction: column;
margin-top:5px;
margin: 0 10px;


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

export const HeaderLista = styled.div`
display:flex;
flex-direction:row;
margin-top:1px;

button {
      border: 0;
      background: none;
    }
    div {
      justify-content:center;
      align-items:center;
    }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: ${props => (props.pay ? '#2EFE2E' : '#FFF')};

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

  strong {
      color: #fff;
      font-size: 20px;
      margin: 0 15px;
      font-weight:bold;
    }
  ;`