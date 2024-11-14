const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/reviews.json");

function readReviews() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

function writeReviews(reviews) {
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
}

export default function handler(req, res) {
    if (req.method === "GET") {
        const reviews = readReviews();
        res.status(200).json(reviews);
    } else if (req.method === "POST") {
        const { name, rating, text } = req.body;
        const date = new Date().toISOString();

        if (!name || !text || isNaN(rating)) {
            return res.status(400).json({ error: "Ungültige Eingabe." });
        }

        const newReview = { name, rating, text, date };
        const reviews = readReviews();
        reviews.push(newReview);
        writeReviews(reviews);

        res.status(201).json(newReview);
    } else {
        res.status(405).json({ error: "Methode nicht erlaubt." });
    }
}
