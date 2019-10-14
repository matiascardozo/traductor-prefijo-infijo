import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [entrada, setEntrada] = useState("");
  const [traduccion, setTraduccion] = useState("");
  const [error, setError] = useState("");
  const [valores, setValores] = useState([]);
  const [tokens, setTokens] = useState([]);
  let salida = "";

  const traductor = cadena => {
    let formated = Array.from(cadena); // conversion de cadena en array de caracteres
    let pre = formated[0]; // Inicialización de lectura
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Enumeración de los números válidos

    /**
     * Realiza la comparación entre el caracter a matchear char y el que se encuentra en la primera
     * posición de pre.
     * @param {char} char
     */
    const match = char => {
      console.log(char, pre);
      if (pre === char) {
        formated.shift(); // leemos un nuevo caracter
        // verificación de que exista todavía caracteres
        if (formated[0]) {
          pre = formated[0];
        } else {
          // si no existe devolvemos el caracter vacio como ""
          pre = "";
          return;
        }
      } else {
        // setError es una función de useState de React que sirve para mostrar el nombre del error en la interfaz.
        setError(`Error al hacer match.`);
        throw Error();
      }
    };

    /**
     * Función del no terminal num.
     */
    const num = () => {
      if (pre in nums) {
        digito();
        num();
      } else return;
    };

    const digito = () => {
      switch (pre) {
        case "0":
          console.log("0");
          salida += "0";
          match("0");
          break;
        case "1":
          console.log("1");
          salida += "1";
          match("1");
          break;
        case "2":
          console.log("2");
          salida += "2";
          match("2");
          break;
        case "3":
          console.log("3");
          salida += "3";
          match("3");
          break;
        case "4":
          console.log("4");
          salida += "4";
          match("4");
          break;
        case "5":
          console.log("5");
          salida += "5";
          match("5");
          break;
        case "6":
          console.log("6");
          salida += "6";
          match("6");
          break;
        case "7":
          console.log("7");
          salida += "7";
          match("7");
          break;
        case "8":
          console.log("8");
          salida += "8";
          match("8");
          break;
        case "9":
          console.log("9");
          salida += "9";
          match("9");
          break;
        default:
          setError(`El caractér ${pre} no forma parte del alfabeto`);
        // throw Error(`El caractér ${pre} no forma parte del alfabeto`);
      }
    };

    const expr = () => {
      if (pre === "+") {
        match("+");
        setValores(prev => [...prev, "+"]);
        setTokens(prev => [...prev, "suma"]);
        salida += "(";
        expr();
        match(" ");
        salida += "+";
        expr();
        salida += ")";
        return;
      } else if (pre === "-") {
        match("-");
        setValores(prev => [...prev, "-"]);
        setTokens(prev => [...prev, "resta"]);
        salida += "(";
        expr();
        match(" ");
        salida += "-";
        expr();
        salida += ")";
        return;
      } else if (pre === "*") {
        match("*");
        setValores(prev => [...prev, "*"]);
        setTokens(prev => [...prev, "mult"]);
        salida += "(";
        expr();
        match(" ");
        salida += "*";
        expr();
        salida += ")";
        return;
      } else if (pre === "/") {
        match("/");
        setValores(prev => [...prev, "/"]);
        setTokens(prev => [...prev, "div"]);
        salida += "(";
        expr();
        match(" ");
        salida += "/";
        expr();
        salida += ")";
        return;
      } else if (pre in nums) {
        num();
        return;
      } else return;
    };
    expr();
    if (formated.length !== 0) {
      setError("Se termino en un estado no final");
      // throw Error("Se termino en un estado no final");
    } else {
      console.log("Termino exitoso");
      return;
    }
  };

  const convertir = () => {
    setError("");
    salida = "";
    try {
      traductor(entrada);
      setTraduccion(salida);
    } catch (e) {
      console.log(e.message);
      setTraduccion(e.message);
    }
  };
  console.log(valores, tokens);
  return (
    <div
      className="App row  text-center align-middle overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div
        className="card text-center w-50 align-middle overflow-hidden"
        style={{ margin: "auto" }}
      >
        <div className="card-header">
          <span style={{ color: "#2f0743" }} className="font-weight-bold">
            Traductor de expresiones prefijas a infijas
          </span>
        </div>
        <div className="card-body">
          <div className="col align-middle h-100">
            <div className="row mb-4">
              <label htmlFor="entrada">Expresión prefija</label>
              <input
                type="text"
                className="form-control"
                id="entrada"
                value={entrada}
                onChange={event => setEntrada(event.target.value)}
              />
            </div>
            <div className="row my-4">
              <button className="btn btn-dark w-100" onClick={convertir}>
                Traducir
              </button>
            </div>
            <div className="row my-4">
              <label htmlFor="salida">Expresión infija</label>

              <input
                type="text"
                className="form-control"
                id="salida"
                readOnly
                value={!error ? traduccion : ""}
              />
            </div>
          </div>
        </div>
        {error && (
          <div className="card-footer bg-danger text-white">{error}</div>
        )}
      </div>
      <div
        className="card text-center w-25 align-middle overflow-hidden"
        style={{ margin: "auto" }}
      >
        <div className="card-header">
          <span style={{ color: "#2f0743" }} className="font-weight-bold">
            Tabla de Símbolos
          </span>
        </div>
        <div className="card-body">
          <div className="col align-middle h-100">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Valor</th>
                  <th scope="col">Token</th>
                </tr>
              </thead>
              <tbody>
                {valores.map((s, index) => (
                  <tr>
                    <td key={`valores${index}`}>{s}</td>
                    <td key={`valores${index}`}>{tokens[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {error && (
          <div className="card-footer bg-danger text-white">{error}</div>
        )}
      </div>
    </div>
  );
}

export default App;
