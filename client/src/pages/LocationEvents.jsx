import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                const selectedLocation = locationsData[index - 1]

                if (!selectedLocation) {
                    setLocation(null)
                    setEvents([])
                    return
                }

                const [locationData, locationEvents] = await Promise.all([
                    LocationsAPI.getLocationById(selectedLocation.id),
                    EventsAPI.getEventsByLocationId(selectedLocation.id)
                ])

                setLocation(locationData)
                setEvents(locationEvents)
            }
            catch (error) {
                console.error(error)
                setLocation(null)
                setEvents([])
            }
            finally {
                setLoading(false)
            }
        })()
    }, [index])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    {location?.image && <img src={location.image} />}
                </div>

                <div className='location-info'>
                    <h2>{location?.name ?? 'Location'}</h2>
                    {location && (
                        <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                    )}
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
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents