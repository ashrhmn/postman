import axios from "axios";
import React, { useState } from "react";

const View = () => {
  const [link, setLink] = useState("http://localhost:4000");
  const [result, setResult] = useState("");
  const [reqBody, setReqBody] = useState("");
  const [bodyIsValidJson, setBodyIsValidJson] = useState(false);
  const [isSendBtnEnabled, setIsSendBtnEnabled] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState("GET");

  const methods = ["GET", "POST", "PUT", "DELETE"];

  const handleLinkInput = (event) => {
    setLink(event.target.value);
  };

  const handleMethodChange = (event) => {
    const method = event.target.value;
    if (method == "POST" || method == "PUT") {
      setIsSendBtnEnabled(bodyIsValidJson);
    }
    setSelectedMethod(event.target.value);
  };

  const IsValidJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleBodyInput = (event) => {
    setBodyIsValidJson(IsValidJson(event.target.value));
    setIsSendBtnEnabled(IsValidJson(event.target.value));
    setReqBody(event.target.value);
  };

  const handleSendClick = async () => {
    const service = axios.create({
      baseURL: link,
      headers: {
        "X-Custom-Header": "foobar",
        "X-Custom-Header1": "foobar1",
        "X-Custom-Header2": "foobar2",
      },
    });

    try {
      let response = null;
      console.log(selectedMethod);
      switch (selectedMethod) {
        case "GET":
          response = await service.get();
          break;
        case "POST":
          console.log("here");
          response = await service.post(null, JSON.parse(reqBody));
          break;
        case "PUT":
          response = await service.put(null, JSON.parse(reqBody));
          break;
        case "DELETE":
          response = await service.delete();
          break;
      }
      setResult(response.data);
    } catch (error) {
      setResult(error);
      console.log(error);
    }
  };

  return (
    <div>
      <select value={selectedMethod} onChange={handleMethodChange}>
        {methods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      <input value={link} onChange={handleLinkInput} type="text" />
      <button disabled={!isSendBtnEnabled} onClick={handleSendClick}>
        Send
      </button>
      <br />
      <textarea value={reqBody} onChange={handleBodyInput}></textarea>
      <br />
      <div>
        <pre>{result != "" ? JSON.stringify(result, null, 2) : null}</pre>
      </div>
    </div>
  );
};

export default View;
