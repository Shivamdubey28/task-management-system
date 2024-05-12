const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors());
MONGO_URL="mongodb://dubeyshivam512:shivamshivam@ac-6xfhjfg-shard-00-00.bsjppuh.mongodb.net:27017,ac-6xfhjfg-shard-00-02.bsjppuh.mongodb.net:27017/?ssl=true&replicaSet=atlas-qc34uv-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true })
	.then(() => console.log("connected to db"))
	.catch(console.error);

const Task = require('./models/task');

app.get('/tasks', async (req, res) => {
	const tasks = await Task.find();

	res.json(tasks);
});

app.post('/task/new', (req, res) => {
	const task = new Task({
		text: req.body.text,
		priority: req.body.priority
	})

	task.save();

	res.json(task);
});

app.delete('/task/delete/:id', async (req, res) => {
	const result = await Task.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.put('/task/update/:id', async (req, res) => {
	const task = await Task.findById(req.params.id);

	task.text = req.body.text;

	Task.save();

	res.json(task);
});

app.listen(3001);
