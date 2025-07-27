import 'dotenv/config';
import express from 'express';
import { readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { OpenAI } from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PORT = process.env.PORT || 3000;
const basePath = path.join(__dirname, '../resources');
const promptPaths = {
    standard: path.join(basePath, 'prompts/standard'),
    standardResults: path.join(basePath, 'prompts/standard/results'),
    enhanced: path.join(basePath, 'prompts/enhanced'),
    enhancedResults: path.join(basePath, 'prompts/enhanced/results'),
    protocols: path.join(basePath, 'protocol')
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

async function readPrompt(filePath) {
    return await readFile(filePath, 'utf-8');
}

async function writeResponse(folder, fileName, content) {
    const outPath = path.join(folder, fileName.replace(/\.(md|json)$/i, '.md'));
    await writeFile(outPath, content);
}

async function listFiles(dir, filter) {
    const files = await readdir(dir);
    return files.filter(f => f.endsWith(filter)).sort();
}

async function loadFileContent(dir, ext) {
    const files = await listFiles(dir, ext);
    return Promise.all(
        files.map(async f => ({
            name: f,
            content: await readPrompt(path.join(dir, f))
        }))
    );
}

app.get('/api/protocols', async (req, res) => {
    const data = await loadFileContent(promptPaths.protocols, '.json');
    res.json(data);
});

app.get('/api/prompts/standard', async (req, res) => {
    const files = await listFiles(promptPaths.standard, '.md');
    const results = await listFiles(promptPaths.standardResults, '.md');
    const contentMap = Object.fromEntries(await Promise.all(
        files.map(async name => [name, await readPrompt(path.join(promptPaths.standard, name))])
    ));
    res.json(files.map(name => ({
        name,
        content: contentMap[name],
        hasResult: results.includes(name.replace(/\.md$/, '.md'))
    })));
});

app.get('/api/prompts/enhanced', async (req, res) => {
    const files = await listFiles(promptPaths.enhanced, '.json');
    const results = await listFiles(promptPaths.enhancedResults, '.md');
    const contentMap = Object.fromEntries(await Promise.all(
        files.map(async name => [name, await readPrompt(path.join(promptPaths.enhanced, name))])
    ));
    res.json(files.map(name => ({
        name,
        content: contentMap[name],
        hasResult: results.includes(name.replace(/\.json$/, '.md'))
    })));
});

app.get('/api/result', async (req, res) => {
    const { type, name } = req.query;
    try {
        const folder = type === 'enhanced' ? promptPaths.enhancedResults : promptPaths.standardResults;
        const filePath = path.join(folder, name);
        const content = await readPrompt(filePath).catch(() => '');
        res.send(content);
    } catch (err) {
        res.send('');
    }
});

app.post('/api/run-prompt', async (req, res) => {
    const { type, name } = req.body;
    try {
        const isEnhanced = type === 'enhanced';
        const fullPath = path.join(
            isEnhanced ? promptPaths.enhanced : promptPaths.standard,
            name
        );
        const content = await readPrompt(fullPath);
        const promptText = content;
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: promptText }]
        });
        const result = response.choices[0].message.content;
        const resultFolder = isEnhanced ? promptPaths.enhancedResults : promptPaths.standardResults;
        await writeResponse(resultFolder, name, result);
        res.json({ success: true, result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Processing error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
