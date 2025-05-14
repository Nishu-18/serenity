import React, { useEffect, useRef, useState } from 'react'
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMood } from '@/database/vectorconfig';

function Echo() {
  const { currMood, vectorconfig } = useMood();
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const endref = useRef(null);

  useEffect(() => {
    endref.current?.scrollIntoView({ behavior: "smooth" });
  });
  const getResponse = async () => {

    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }
    if (loader) {
      return;
    }

    setLoader(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: trimmedInput, sender: "user" },
    ]);
    setInput("");


    try {
      const response = await fetch("http://127.0.0.1:5000/api/echo/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `${trimmedInput} (Try to concisely respond with maximum 150 tokens and in a single paragraph and also the key of the response value is named as response.)`,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed with status ${response.status}: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      const botResponse = data.response;
      setMessages((message) => [
        ...message,
        { text: botResponse || "I can't understand please try again. 🤖", sender: "bot" },
      ]);

      vectorconfig(trimmedInput);
      console.log(currMood);

    } catch (err) {
      console.error("Error fetching response:", err);
      toast("Error: Could not get a response from the AI. Please try again later.");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong. 🤖", sender: "bot" },
      ]);
    } finally {
      setLoader(false);
    }

  };

  return (
    <div className='px-[18%] pt-20 w-full flex items-center justify-center flex-col font-baloo'>

      <div className='font-bold mb-8 flex items-center gap-2 justify-between flex-col text-center'>
        <div className='flex items-center gap-2'>
          <span className='text-6xl'>😶‍🌫️</span>
          <span className='text-3xl'>ECHO</span>
        </div>
        <p className='opacity-75 text-xl'>Listens with empathy</p>
      </div>

      <div className='flex flex-col gap-4 w-full h-[450px] bg-white shadow-[9px_9px_9px_rgb(0,0,0,0.3)] overflow-hidden border-2 border-neutral-900 rounded-2xl'>
        <div className='h-[80%] w-full overflow-y-scroll p-8 scroll-hiding border-b-2 border-neutral-900'
          style={{ scrollbarWidth: 'none' }}>
          {messages.map((msg, index) => {
            return <div
              key={index}
              className={`flex mb-2 ${msg?.sender === "user" ? "justify-end" : "justify-start"
                }`}>
              <div
                className={`py-2 px-3 rounded-lg max-w-xs ${(msg?.sender === "user") ?
                  "bg-green-700 text-white self-end"
                  : "bg-neutral-700 text-white self-start"
                  }`}>
                {msg?.text}
              </div>
            </div>
          })
          }

          <div ref={endref}></div>
        </div>

        <div className='flex items-center justify-center gap-4 w-full'>
          <Input
            type="text"
            placeholder="Ask me something..."
            className='w-[70%] shadow-md shadow-[rgb(0,0,0,0.6)] h-12'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => getResponse()}
            className='cursor-pointer bg-neutral-900 py-3 px-4 rounded-lg font-medium text-green-500 text-lg hover:text-green-200 transition-all duration-300 shadow-[0_0_9px_black]'>
            {
              (loader)
                ? <Loader2 size={24} className="animate-spin" />
                : <Send size={24} />
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Echo