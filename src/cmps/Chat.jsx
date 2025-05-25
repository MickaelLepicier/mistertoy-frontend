import { useState, useEffect } from 'react'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function Chat({ msgs, user, onSend, toyId }) {
    const [input, setInput] = useState({ txt: '' })
    const [chatMsgs, setChatMsgs] = useState(msgs)

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId) // Join chat room for this toy

        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [toyId])

    function addMsg(newMsg) {
        setChatMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function sendMsg() {
        const trimmed = input.txt.trim()
        if (!trimmed) return

        const msgToSend = {
            txt: trimmed,
            by: user
        }

        onSend(msgToSend) // Save to DB
        socketService.emit(SOCKET_EMIT_SEND_MSG, msgToSend) // Send to socket
        setInput({ txt: '' })
    }

    function handleMsgChange(ev) {
        const { name, value } = ev.target
        setInput(msg => ({ ...msg, [name]: value }))
    }

    return (
        <div className="chat-container">
            <div className="chat-msgs">
                {chatMsgs.map((msg, idx) => {
                    const isUser = msg.by._id === user._id
                    const position = isUser ? 'user' : 'other'

                    return (
                        <div key={idx} className={`chat-msg ${position}`}>
                            <strong>{msg.by.fullname === user.fullname ? 'Me' : msg.by.fullname}: </strong>
                            {msg.txt}
                        </div>
                    )
                })}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input.txt}
                    name="txt"
                    onChange={handleMsgChange}
                    placeholder="Type a message..."
                    onKeyDown={ev => ev.key === 'Enter' && sendMsg()}
                />
                <button className="btn" onClick={sendMsg}>
                    Send
                </button>
            </div>
        </div>
    )
}
