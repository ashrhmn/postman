import axios from "axios";
import React, { useState } from "react";

const View = () => {
  const [link, setLink] = useState("http://localhost:4000");
  const [result, setResult] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("GET");

  const methods = ["GET", "POST", "PUT", "DELETE"];

  const handleLinkInput = (event) => {
    setLink(event.target.value);
  };

  const handleMethodChane = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleSendClick = async () => {
    if (selectedMethod == methods[0]) {
      try {
        const response = await axios.get(link);
        const data = response.data;
        setResult(data);
      } catch (error) {
        setResult(error);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <select value={selectedMethod} onChange={handleMethodChane}>
        {methods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      <input value={link} onChange={handleLinkInput} type="text" />
      <button onClick={handleSendClick}>Send</button>
      <br />
      <div>
        <pre>{result != "" ? JSON.stringify(result, null, 2) : ""}</pre>
      </div>
    </div>
  );
};

export default View;
