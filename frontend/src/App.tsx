import { useState } from "react";
import "./App.css";

function App() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string>("");
  const [output2, setOutput2] = useState<string>("");

  const handleClick = async () => {
    console.log(input)
    const response = await fetch("http://localhost:4001/bfhl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: input.split("")
      })
    })

    const data = await response.json()
    setOutput(JSON.stringify(data))
  }

  const hanldeClick2 = async () => {
    const response = await fetch("http://localhost:4001/bfhl")
    const data = await response.json()
    console.log(data)
    setOutput2(JSON.stringify(data))
  }

  return(
  <div>
    <h1>just write the element of the array in data format you want to write like abc123</h1>
    <input value={input} onChange={(e) => setInput(e.target.value)} />
    <button onClick={handleClick}>submit</button>
    <div>{output}</div>

    <button onClick={hanldeClick2}>get request</button>
    <div>{output2}</div>
  </div>
  )
}

export default App;
