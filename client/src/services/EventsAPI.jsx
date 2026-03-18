const API_BASE = '/api/events'

const request = async (path = '') => {
	const response = await fetch(`${API_BASE}${path}`)

	if (!response.ok) {
		throw new Error(`Events API request failed: ${response.status}`)
	}

	return response.json()
}

const EventsAPI = {
	getAllEvents: async () => request('/'),

	getEventById: async (id) => request(`/${id}`),

	getEventsByLocationId: async (locationId) => request(`/location/${locationId}`)
}

export default EventsAPI
