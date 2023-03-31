import posts from "./tuits.js";
let tuits = posts;

const currentUser = {
    "userName": "neha annigeri",
    "handle": "@neha_a",
    "image": "https://i.pinimg.com/736x/4d/d4/ac/4dd4ac0cd3f2b6c0fa0f7ffadb597c7d.jpg",
};

const templateTuit = {
    ...currentUser,
    "topic": "",
    "time": "2h",
    "liked": false,
    "replies": 32,
    "retuits": 300,
    "disliked": false,
    "likes": 567,
    "dislikes": 1,
}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    tuits.unshift({...newTuit,...templateTuit});
    res.json({...newTuit,...templateTuit});
}

const findTuits = (req, res) =>
    res.json(tuits);
const updateTuit = (req, res) => {
    const tuitdIdToUpdate = parseInt(req.params.tid);
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

const deleteTuit = (req, res) => {
    const tuitdIdToDelete = parseInt(req.params.tid);
    tuits = tuits.filter((t) =>
        t._id !== tuitdIdToDelete);
    res.sendStatus(200);
}


export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
