import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand === "0")
        return { ...state, currentOperand: "0." };
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${
          state.currentOperand === "0" ? "" : state.currentOperand
        }${payload.digit}`,
      };
    default:
      return state;
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === "0" && state.previousOperand === "0") {
        return state;
      }

      if (state.currentOperand === "" ) {
        return {
          ...state, 
          operation: payload.operation,
        }
      }
      
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: "",
      };
    case ACTIONS.CLEAR:
      return { currentOperand: "0" };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if (isNaN(current) || isNaN(prev)) return "";
  let calculation = "";
  switch (operation) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "*":
      calculation = prev * current;
      break;
    case "÷":
      calculation = prev / current;
      break;
      default:
  }
  return calculation.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "0" }
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
