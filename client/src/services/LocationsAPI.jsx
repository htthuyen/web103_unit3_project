const API_BASE = '/api/locations'

const request = async (path = '') => {
	const response = await fetch(`${API_BASE}${path}`)

	if (!response.ok) {
		throw new Error(`Locations API request failed: ${response.status}`)
	}

	return response.json()
}

const LocationsAPI = {
	getAllLocations: async () => request('/'),

	getLocationById: async (id) => request(`/${id}`)
}

export default LocationsAPI
