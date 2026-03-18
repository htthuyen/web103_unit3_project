import { pool } from '../config/database.js'

export const getEvents = async (_, res) => {
	try {
		const result = await pool.query('SELECT * FROM events ORDER BY date, time')
		res.status(200).json(result.rows)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch events' })
	}
}

export const getEventById = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id])

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Event not found' })
		}

		return res.status(200).json(result.rows[0])
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch event' })
	}
}

export const getEventsByLocationId = async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM events WHERE location_id = $1 ORDER BY date, time',
			[req.params.locationId]
		)

		return res.status(200).json(result.rows)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch location events' })
	}
}