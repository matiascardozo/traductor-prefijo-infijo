import React, { useState, useEffect } from "react";
import "./App.css";

let vals = [];

function App() {
  const [entrada, setEntrada] = useState("");
  const [traduccion, setTraduccion] = useState("");
  const [error, setError] = useState("");
  const [symbol, setSymbol] = useState({
    valores: [],
    tokens: []
  });

  let salida = "";

  const traductor = cadena => {
    let formated = Array.from(cadena); // conversion de cadena en array de caracteres
    let pre = formated[0]; // Inicialización de lectura

    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Enumeración de los números válidos

    const addToSymbolTable = (value, token) => {
      console.log(value, !vals.includes(value));
      if (!vals.includes(value)) {
        vals.push(value);
        setSymbol(prev => ({
          valores: [...prev.valores, value],
          tokens: [...prev.tokens, token]
        }));
      }
    };

    /**
     * Realiza la comparación entre el caracter a matchear char y el que se encuentra en la primera
     * posición de pre.
     * @param {char} char
     */
    const match = char => {
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
        const dig = digito();
        const n = num();
        // addToSymbolTable(`${dig}${n}`, "num");
        return `${dig}${n || ""}`;
      } else return;
    };

    const digito = () => {
      switch (pre) {
        case "0":
          salida += "0";
          match("0");
          addToSymbolTable("0", "digito");
          return 0;
        case "1":
          salida += "1";
          match("1");
          addToSymbolTable("1", "digito");
          return 1;
          break;
        case "2":
          salida += "2";
          match("2");
          addToSymbolTable("2", "digito");
          return 2;
        case "3":
          salida += "3";
          match("3");
          addToSymbolTable("3", "digito");
          return 3;
        case "4":
          salida += "4";
          match("4");
          addToSymbolTable("4", "digito");
          return 4;
        case "5":
          salida += "5";
          match("5");
          addToSymbolTable("5", "digito");
          return 5;
        case "6":
          salida += "6";
          match("6");
          addToSymbolTable("6", "digito");
          return 6;
        case "7":
          salida += "7";
          match("7");
          addToSymbolTable("7", "digito");
          return 7;
        case "8":
          salida += "8";
          match("8");
          addToSymbolTable("8", "digito");
          return 8;
        case "9":
          salida += "9";
          match("9");
          addToSymbolTable("9", "digito");
          return 9;
        default:
          setError(`El caractér ${pre} no forma parte del alfabeto`);
        // throw Error(`El caractér ${pre} no forma parte del alfabeto`);
      }
    };

    const expr = () => {
      if (pre === "+") {
        match("+");
        addToSymbolTable("+", "suma");
        salida += "(";
        expr();
        match(" ");
        salida += "+";
        expr();
        salida += ")";
        return;
      } else if (pre === "-") {
        match("-");
        addToSymbolTable("-", "resta");
        salida += "(";
        expr();
        match(" ");
        salida += "-";
        expr();
        salida += ")";
        return;
      } else if (pre === "*") {
        match("*");
        addToSymbolTable("*", "mult");
        salida += "(";
        expr();
        match(" ");
        salida += "*";
        expr();
        salida += ")";
        return;
      } else if (pre === "/") {
        match("/");
        addToSymbolTable("/", "div");
        salida += "(";
        expr();
        match(" ");
        salida += "/";
        expr();
        salida += ")";
        return;
      } else if (pre in nums) {
        const d = digito();
        const n = num();
        addToSymbolTable(`${d}${n || ""}`, "num");
        return;
      } else {
        setError("Error. Faltan operadores u operandos");
      }
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

  return (
    <div
      className="App row  text-center align-middle overflow-auto"
      style={{ height: "100vh" }}
    >
      <div
        className="card text-center w-50 align-middle overflow-hidden"
        style={{ margin: "auto", position: "sticky" }}
      >
        <div className="card-header">
          <span style={{ color: "#2f0743" }} className="font-weight-bold">
            Traductor de expresiones prefijas a infijas
          </span>
        </div>
        <div className="card-body">
          <div className="col align-middle h-100 ">
            <div className="row mb-4">
              <label htmlFor="entrada">Expresión prefija</label>
              <input
                type="text"
                className="form-control"
                id="entrada"
                value={entrada}
                onFocus={() => {
                  vals = [];
                  setSymbol({ valores: [], tokens: [] });
                }}
                onChange={event => setEntrada(event.target.value)}
              />
            </div>
            <div className="row my-4">
              <button
                className="btn btn-dark w-100"
                onClick={() => {
                  convertir();
                }}
              >
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
            <table className="table-sm">
              <thead>
                <tr>
                  <th scope="col">Valor</th>
                  <th scope="col">Token</th>
                </tr>
              </thead>
              <tbody>
                {symbol &&
                  symbol.valores.map((s, index) => (
                    <tr>
                      <td key={`valores${index}`}>{s}</td>
                      <td key={`token${index}`}>{symbol.tokens[index]}</td>
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
