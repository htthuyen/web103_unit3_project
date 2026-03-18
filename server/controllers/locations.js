import { pool } from '../config/database.js'

export const getLocations = async (_, res) => {
	try {
		const result = await pool.query('SELECT * FROM locations ORDER BY id')
		res.status(200).json(result.rows)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch locations' })
	}
}

export const getLocationById = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM locations WHERE id = $1', [req.params.id])

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Location not found' })
		}

		return res.status(200).json(result.rows[0])
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch location' })
	}
}
