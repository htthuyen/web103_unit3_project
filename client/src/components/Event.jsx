import React from 'react'
import '../css/Event.css'

const Event = (props) => {
    const dateTime = props.date && props.time ? new Date(`${props.date}T${props.time}`) : null

    const formattedTime = dateTime
        ? dateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        : ''

    const remaining = dateTime
        ? (() => {
              const ms = dateTime.getTime() - Date.now()

              if (ms <= 0) {
                  return 'Event started'
              }

              const days = Math.floor(ms / (1000 * 60 * 60 * 24))
              const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)

              if (days > 0) {
                  return `${days}d ${hours}h remaining`
              }

              const minutes = Math.floor((ms / (1000 * 60)) % 60)
              return `${hours}h ${minutes}m remaining`
          })()
        : ''

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {props.date} <br /> {formattedTime}</p>
                    <p id={`remaining-${props.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event