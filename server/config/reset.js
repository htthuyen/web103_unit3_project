import { pool } from './database.js'
import './dotenv.js'

const resetTables = async () => {
    const resetQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image TEXT
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT NOT NULL,
            location_id INTEGER NOT NULL,
            FOREIGN KEY (location_id) REFERENCES locations(id)
        );

        INSERT INTO locations (name, address, city, state, zip, image)
        VALUES
            ('Echo Lounge', '101 Rhythm Ave', 'Miami', 'FL', '33101', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'),
            ('House of Blues', '225 Sunset Blvd', 'Miami', 'FL', '33131', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80'),
            ('Pavilion', '889 Garden St', 'Miami', 'FL', '33132', 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1000&q=80'),
            ('American Airlines Arena', '601 Biscayne Blvd', 'Miami', 'FL', '33132', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=80');

        INSERT INTO events (title, date, time, image, location_id)
        VALUES
            ('Neon Nights DJ Set', '2026-04-10', '20:00:00', 'https://images.unsplash.com/photo-1571266028243-d220c9f6f6d3?auto=format&fit=crop&w=1000&q=80', 1),
            ('Indie Sound Showcase', '2026-04-18', '19:30:00', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1000&q=80', 1),
            ('Blues & Brews Live', '2026-04-22', '21:00:00', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80', 2),
            ('Soul Sessions Friday', '2026-05-02', '20:30:00', 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1000&q=80', 2),
            ('Sunset Jazz in the Park', '2026-04-27', '18:45:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=80', 3),
            ('Pavilion Pop Fest', '2026-05-09', '17:30:00', 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1000&q=80', 3),
            ('Arena Mega Concert', '2026-05-15', '19:00:00', 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=1000&q=80', 4),
            ('Championship Watch Party', '2026-05-21', '18:00:00', 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1000&q=80', 4);
    `

    try {
        await pool.query(resetQuery)
        console.log('✅ tables reset and created successfully')
    } catch (err) {
        console.error('⚠️ error resetting tables', err)
    } finally {
        await pool.end()
    }
}

resetTables()