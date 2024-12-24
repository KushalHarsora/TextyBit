'use client';

import { SendHorizonal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Cosine similarity function to compare query and embeddings
const cosineSimilarity = (a: number[], b: number[]) => {
  const dotProduct = a.reduce((acc, val, idx) => acc + val * b[idx], 0);
  const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val ** 2, 0));
  const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

const ChatSection = () => {
  const [query, setQuery] = useState<string>("");
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const savedFile = localStorage.getItem('uploadedFile');
    if (savedFile) {
      const parsedFile = JSON.parse(savedFile);
      const byteString = atob(parsedFile.content.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        view[i] = byteString.charCodeAt(i);
      }
      const fileBlob = new Blob([arrayBuffer], { type: parsedFile.type });
      const restoredFile = new File([fileBlob], parsedFile.name, { type: parsedFile.type });
      setFile(restoredFile);
    } else {
      const textbox = document.getElementById("queryBox") as HTMLTextAreaElement;
      textbox.disabled = true;
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      setQuery((prev) => prev + '\n');
    } else if (event.key === 'Enter' && !event.shiftKey) {
      handleQuerySubmit();
    }
  };

  const handleSendButton = () => {
    handleQuerySubmit();
  };

  const handleQuerySubmit = async () => {

    const responseContainer = document.getElementById('response') as HTMLDivElement;
    const question = document.createElement("div");
    question.className = "relative left-[25%] h-fit w-[72%] bg-blue-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
    question.innerText = query;
    responseContainer.appendChild(question);

    const loading = document.createElement("div");
    loading.className = " my-2 relative left-0 h-fit w-fit bg-green-200 text-black text-wrap border-0 text-balance rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
    loading.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    responseContainer.appendChild(loading);

    // CSS (add this to your styles)
    const style = document.createElement("style");
    style.innerHTML = `
      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        background-color: #000;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;
      }

      .dot:nth-child(1) {
        animation-delay: -0.32s;
      }

      .dot:nth-child(2) {
        animation-delay: -0.16s;
      }

      @keyframes bounce {
        0%, 100% {
          transform: scale(0);
        }
        50% {
          transform: scale(1);
        }
      }
    `;

    document.head.appendChild(style);

    const storedEmbeddings = JSON.parse(localStorage.getItem("embeddings") || '[]');
    const textContent = localStorage.getItem("textContent");
    if (storedEmbeddings.length > 0) {
      const queryEmbedding = await generateQueryEmbedding(query);
      const similarities = storedEmbeddings.map((entry: any) => {
        const similarity = cosineSimilarity(queryEmbedding, entry.embeddings);
        return { fileName: entry.fileName, similarity, embeddings: entry.embeddings, content: entry.content };
      });

      // Sort by similarity (descending)
      similarities.sort((a: any, b: any) => b.similarity - a.similarity);

      // Use the most similar document as context for generating the response
      const topDocument = similarities[0];
      let context = `The most relevant document is from ${topDocument}. Here is its content: ...`;

      if (textContent) {
        context += ` Additional content from storage: "${textContent}".`;
      }

      const apiResponse = await generateApiResponse(context, query);
      if (apiResponse) {
        responseContainer.removeChild(loading);
        const apiResponseDiv = document.createElement("div");
        apiResponseDiv.className = "my-4 relative left-0 h-fit w-[50%] bg-green-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
        apiResponseDiv.innerText = apiResponse;
        responseContainer.appendChild(apiResponseDiv);
      }
    } else {
      const noEmbeddingsResponse = "No embeddings found in storage.";
      const apiResponseDiv = document.createElement("div");
      apiResponseDiv.className = "my-4 relative left-0 h-fit w-[50%] bg-green-200 text-black text-wrap border-0 text-balance my-2 rounded-lg font-medium p-3 whitespace-pre-line text-ellipsis break-words";
      apiResponseDiv.innerText = noEmbeddingsResponse;
      responseContainer.appendChild(apiResponseDiv);
    }

    setQuery("");
  };

  // Generate the embedding for the query (using the same model as you did for documents)
  const generateQueryEmbedding = async (query: string) => {
    // Use the same method as you did for generating embeddings for the documents
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);
    const model = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const result = await model.embedContent(query);
    if (result && result.embedding) {
      return result.embedding.values;
    } else {
      console.error("Failed to generate query embedding");
      return [];
    }
  };

  // Function to generate response from the LLM (using the top document as context)
  const generateApiResponse = async (context: string, query: string) => {
    // Assuming you have a function to query the Gemini model with context and query
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `${context}\n\nQuery: ${query}\nAnswer:`;
    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            }
          ],
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },
    });

    return response.response.text() || "Sorry, I couldn't find an answer.";
  };

  return (
    <React.Fragment>
      <section className="absolute left-[50vw] top-[10vh] h-[90vh] w-1/2 p-4 flex flex-col justify-center items-center">
        <div id="response" className="h-[83vh] w-full overflow-y-auto p-2"></div>
        <div className="h-[7vh] w-full flex flex-row justify-evenly items-center">
          <textarea
            className="h-fit w-[90%] focus:outline-green-700 rounded-xl p-2 text-black placeholder:text-slate-800 border-2 border-blue-700 overflow-x-auto text-balance text-ellipsis whitespace-pre-line break-words resize-none flex items-center z-10"
            placeholder="enter your query"
            id="queryBox"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyUp={handleKeyPress}
          />
          <SendHorizonal
            className='text-black cursor-pointer scale-125'
            onClick={handleSendButton}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default ChatSection;
