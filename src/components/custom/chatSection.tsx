/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { SendHorizonal } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ChatSection = () => {
  const [query, setQuery] = useState<string>("");
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    const responseAnimation = () => {
      const api_response = document.getElementById(`response-${count}`);
      if (api_response?.innerText == "" && response == "") {
        const dot1 = document.createElement("div");
        dot1.className = " rounded-full w-3 h-3 bg-green-800";

        const dot2 = document.createElement("div");
        dot2.className = " rounded-full w-3 h-3 bg-green-600";

        const dot3 = document.createElement("div");
        dot3.className = " rounded-full w-3 h-3 bg-green-400";
      } else if(api_response?.innerText !== "") {
        setCount(prev => prev + 1);
      }

      if (response !== "") {
        responseAnimation()
      }
    }
  }, [response, count])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      setQuery((prev) => prev + '\n');
    }
    else if (event.key === 'Enter' && !event.shiftKey) {
      const response = document.getElementById('response') as HTMLDivElement;

      // just display the query
      const question = document.createElement("div");
      question.className = " relative left-[25%] h-fit w-[72%] bg-blue-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
      question.innerText = query;
      response.appendChild(question);

      // handle the api responses from the LLM
      const api_response = document.createElement("div");
      api_response.className = " my-4 relative left-0 h-fit w-fit max-w-[50%] bg-green-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words"
      api_response.innerText = "";
      api_response.id = `response-${count}`;
      response.appendChild(api_response);

      // reset the query state
      setQuery("");
    }
  };

  const handleSendButton = () => {
    const response = document.getElementById('response') as HTMLDivElement;

    // just display the query
    const question = document.createElement("div");
    question.className = " relative left-[25%] h-fit w-[72%] bg-blue-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
    question.innerText = query;
    response.appendChild(question);

    // handle the api responses from the LLM
    const api_response = document.createElement("div");
    api_response.className = " my-4 relative left-0 h-fit w-[50%] bg-green-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words"
    api_response.innerText = "This is response";
    response.appendChild(api_response);

    // reset the query state
    setQuery("");
  }
  return (
    <React.Fragment>
      <section className=" absolute left-[50vw] top-[10vh] h-[90vh] w-1/2 p-4 flex flex-col justify-center items-center">
        <div id="response" className=" h-[83vh] w-full overflow-y-auto p-2"></div>
        <div className=" h-[7vh] w-full flex flex-row justify-evenly items-center">
          <textarea
            className=" h-fit w-[90%] focus:outline-green-700 rounded-xl p-2 text-black placeholder:text-slate-800 border-2 border-blue-700 overflow-x-auto text-balance text-ellipsis whitespace-pre-line break-words resize-none flex items-center z-10"
            placeholder="enter your query"
            id="queryBox"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyUp={handleKeyPress}
          />
          <SendHorizonal
            className=' text-black cursor-pointer scale-125'
            onClick={handleSendButton}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default ChatSection;