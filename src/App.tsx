import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { v4 } from "uuid"
import ChatInput from "./components/ChatInput/ChatInput"
import Header from "./components/Header/Header"
import Message from "./components/Message/Message"
import { MessageTypes } from "./utils/types"

export default function App() {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState<MessageTypes[]>([
    {
      id: v4(),
      text: `Hi there, I'm here to listen to you. I'm your safe space. **wink**`,
      type: "receiver",
      date: new Date().toLocaleString()
    }
  ])
  const [sending, setSending] = useState(false)

  const messagesContainerBottomRef = useRef<any>(null)

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    messagesContainerBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const messageSendHandler = async () => {
    const newMessage: MessageTypes = {
      id: v4(),
      text,
      type: "sender",
      date: new Date().toLocaleString()
    }

    setMessages((prevState) => [...prevState, newMessage])

    const config = {
      model: "text-davinci-003",
      prompt:
        "Respond to this text like a Pastor. Also, Attach a matching bible verse. Return response as text\n\n" +
        text +
        ". ",
      temperature: 0.5,
      max_tokens: 1000,
      frequency_penalty: 0.8
    }

    try {
      setSending(true)

      const response = await axios.post(
        `${process.env.REACT_APP_OPENAI_URL}`,
        config,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
          }
        }
      )

      if (response) {
        const newMessage: MessageTypes = {
          id: v4(),
          text: response.data.choices[0].text,
          type: "receiver",
          date: new Date().toLocaleString()
        }

        setMessages((prevState) => [...prevState, newMessage])

        setSending(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen">
      <div className="w-full md:w-1/2 h-full mx-auto flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex justify-end flex-col h-full overflow-hidden">
          <div className="p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <Message key={message.id} {...message} />
            ))}

            {sending && <Message text="Typing..." type="receiver" />}

            <div ref={messagesContainerBottomRef} />
          </div>
        </div>
        <div>
          <ChatInput
            onChange={(value) => setText(value)}
            onSubmit={messageSendHandler}
            placeholder="Talk to me."
          />
        </div>
      </div>
    </div>
  )
}
