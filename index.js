const app = require('express')();

app.get('/', (req, res) => {
    res.json({message: 'Docker is easy'});
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`running on port ${port}`));