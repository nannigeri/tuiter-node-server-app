import * as tuitsDao from './tuits-dao.js'


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

const createTuit = async (req, res) => {
    const newTuit = {
        ...req.body,
        ...templateTuit
    };
    const insertedTuit = await tuitsDao
        .createTuit(newTuit);
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}


const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
