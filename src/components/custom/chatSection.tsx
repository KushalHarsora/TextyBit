"use client";

import { SendHorizonal } from 'lucide-react';
import React, { useState } from 'react';

const ChatSection = () => {
  const [query, setQuery] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const response = document.getElementById('response') as HTMLDivElement;
      const question = document.createElement("div");
      question.className = " relative left-[25%] h-fit w-[72%] bg-blue-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
      question.innerText = query;
      response.appendChild(question);
      setQuery("");
    }
  };

  const handleSendButton = () => {
    const response = document.getElementById('response') as HTMLDivElement;
    const question = document.createElement("div");
    question.className = " relative left-[25%] h-fit w-[72%] bg-blue-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
    question.innerText = query;
    response.appendChild(question);
    setQuery("");
  }
  return (
    <React.Fragment>
      <section className=" absolute left-[50vw] top-[10vh] h-[90vh] w-1/2 p-4 flex flex-col justify-center items-center">
        <div id="response" className=" h-[83vh] w-full overflow-y-auto p-2"></div>
        <div className=" h-[7vh] w-full flex flex-row justify-evenly items-center">
          <textarea
            className=" h-[85%] w-[90%] focus:outline-green-700 rounded-xl p-2 text-black placeholder:text-slate-800 border-2 border-blue-700 overflow-x-auto text-balance text-ellipsis whitespace-pre-line break-words resize-none flex items-center"
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
