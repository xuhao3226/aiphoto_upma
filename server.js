const express = require('express');
const cors = require('cors');
const { removeBackground } = require('@imgly/background-removal-node');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

async function processImage(buffer) {
    const tempDir = os.tmpdir();
    const inputPath = path.join(tempDir, `input_${Date.now()}.png`);

    try {
        fs.writeFileSync(inputPath, buffer);

        const resultBlob = await removeBackground(inputPath, {
            progress: (key, current, total) => {
                console.log(`Progress: ${key} - ${current}/${total}`);
            }
        });

        const arrayBuffer = await resultBlob.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } finally {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    }
}

app.post('/remove-background', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        let imageData = image;
        if (image.startsWith('data:image')) {
            imageData = image.split(',')[1];
        }

        const buffer = Buffer.from(imageData, 'base64');
        const resultBuffer = await processImage(buffer);
        const resultBase64 = resultBuffer.toString('base64');
        const dataUrl = `data:image/png;base64,${resultBase64}`;

        res.json({
            success: true,
            image: dataUrl
        });

    } catch (error) {
        console.error('Background removal error:', error);
        res.status(500).json({ error: error.message || 'Failed to remove background' });
    }
});

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'AI Photo Backend Service is running',
        endpoint: '/remove-background'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Background removal endpoint: POST http://localhost:${PORT}/remove-background`);
});