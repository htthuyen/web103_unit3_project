import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'

const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            }
            catch (error) {
                console.error(error)
                setEvents([])
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>All Events</h2>
                </div>
            </header>

            <main>
                {
                    loading ? <h2>Loading events...</h2> : events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events
