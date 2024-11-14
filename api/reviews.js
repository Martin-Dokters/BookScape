import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'data', 'reviews.json');

    // Rezensionen laden
    if (req.method === 'GET') {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const reviews = JSON.parse(data);
            res.status(200).json(reviews);
        } catch (error) {
            console.error('Fehler beim Laden der Rezensionen:', error);
            res.status(500).json({ message: 'Fehler beim Laden der Rezensionen.' });
        }
    }

    // Rezensionen speichern
    if (req.method === 'POST') {
        const newReview = req.body;
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const reviews = JSON.parse(data);
            reviews.push(newReview);
            fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
            res.status(200).json({ message: 'Rezension erfolgreich gespeichert.' });
        } catch (error) {
            console.error('Fehler beim Speichern der Rezension:', error);
            res.status(500).json({ message: 'Fehler beim Speichern der Rezension.' });
        }
    }
}
