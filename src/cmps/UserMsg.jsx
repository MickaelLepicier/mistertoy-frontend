import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service'
import {
  socketService,
  SOCKET_EVENT_REVIEW_ABOUT_YOU
} from '../services/socket.service'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      // window.scrollTo({top: 0, behavior: 'smooth'});
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return null
  return (
    <section className={`user-msg ${msg.type}`}>
      {msg.txt}
      <button onClick={closeMsg}>x</button>
    </section>
  )
}
