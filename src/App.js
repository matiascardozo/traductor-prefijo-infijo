import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [entrada, setEntrada] = useState("");
  const [out, setOut ] = useState("")
  let salida = ""
const traductor = cadena => {
  let formated = Array.from(cadena); // conversion de cadena en array de caracteres
  let pre= formated[0]; // Inicialización de lectura
  const nums = ['0','1','2','3','4','5','6','7','8','9']

  const match = char => {
      if(pre === char) {
        formated.shift();
        if(formated[0]){
            pre=formated[0]
        } else {
            pre='';
           return;
        }
      }
      else 
        throw Error(`El caractér ${char} no forma parte del alfabeto`)
  }

  const digito = () => {
    switch(pre)
    {      
      case '0': console.log('0'); salida += "0"; match('0'); break;
      case '1': console.log('1');  salida += "1"; match('1'); break; 
      case '2': console.log('2');  salida += "2"; match('2'); break; 
      case '3': console.log('3');  salida += "3"; match('3'); break; 
      case '4': console.log('4');  salida += "4";match('4'); break; 
      case '5': console.log('5'); salida += "5"; match('5'); break; 
      case '6': console.log('6');  salida += "6";match('6'); break; 
      case '7': console.log('7'); salida += "7"; match('7'); break; 
      case '8': console.log('8');  salida += "8";match('8'); break; 
      case '9': console.log('9');  salida += "9";match('9'); break; 
      default: salida = `El caractér ${pre} no forma parte del alfabeto`; throw Error(`El caractér ${pre} no forma parte del alfabeto`)
    }
  }

  const num = () => {
    if(pre in nums) {
      digito(); num();
    } else return;
  }

  const expr = () => {
    if(pre === '+') {
      match('+'); expr(); match(" "); console.log('+') ; salida += "+"; expr();
      return;
    }
    else if(pre === '-') {
      match('-'); expr(); match(" "); console.log('-');  salida += "-" ;expr();
      return;
    }
    else if(pre === '*') {
      match('*'); console.log('('); salida += "("; expr(); match(" "); console.log('*'); salida += "*"; expr(); console.log(')'); salida += ")";
      return;
    }
     else if(pre === '/') {
      match('/'); console.log('('); salida += "("; expr(); match(" "); console.log('/'); salida += "/"; expr(); console.log(')'); salida += ")";
      return;
    }
    else if(pre in nums) {
      num();
    }
  }
  expr();
  if(formated.length !== 0 ) {
    console.log("se termino en un st")
    throw Error('Se termino en un estado no final')
  }
  else {
      console.log('Termino exitoso');
      return;
  } 
}
  const convertir = () => {
    salida = ""
    try {
      traductor(entrada)
      console.log("continuó")
      setOut(salida)
    }catch(e){
      console.log(e.message);
      setOut(e.message)
    } 
  }
  return (
    <div className="App">
      <header className="App-header">
      <div className="form-group">
        <label>Entrada prefija:</label>
        <input className="form-control"  type="text" value={entrada} onChange={(event) => setEntrada(event.target.value) } /> 
        <button className="btn btn-outline-primary" onClick={convertir} >Convertir</button>
      </div>

      Salida infija: <p>{out}</p>
       
      </header>
    </div>
  );
}

export default App;
