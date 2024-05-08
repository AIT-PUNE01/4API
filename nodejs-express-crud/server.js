const express = require('express');
const app = express();
app.use(express.json());

// Sample data
let assignments = [
    { id: 1, name: 'Assignment 1' },
    { id: 2, name: 'Assignment 2' },
    { id: 3, name: 'Assignment 3' }
];

// GET all assignments
app.get('/assignments', (req, res) => {
    res.json(assignments);
});

// GET single assignment
app.get('/assignments/:id', (req, res) => {
    const assignment = assignments.find(a => a.id === parseInt(req.params.id));
    if (!assignment) return res.status(404).send('Assignment not found');
    res.json(assignment);
});

// POST new assignment
app.post('/assignments', (req, res) => {
    const assignment = {
        id: assignments.length + 1,
        name: req.body.name
    };
    assignments.push(assignment);
    res.json(assignment);
});

// PUT update assignment
app.put('/assignments/:id', (req, res) => {
    const assignment = assignments.find(a => a.id === parseInt(req.params.id));
    if (!assignment) return res.status(404).send('Assignment not found');
    assignment.name = req.body.name;
    res.json(assignment);
});

// DELETE assignment
app.delete('/assignments/:id', (req, res) => {
    const assignment = assignments.find(a => a.id === parseInt(req.params.id));
    if (!assignment) return res.status(404).send('Assignment not found');
    const index = assignments.indexOf(assignment);
    assignments.splice(index, 1);
    res.json(assignment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
