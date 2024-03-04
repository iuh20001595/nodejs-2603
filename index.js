const courses = require('./data.js');
const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json({ extended: false }));
app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(express.static('./views'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.post('/add', (req, res) => {
    const { id, name, course_type, semeter, department } = req.body;
    courses.push({ id, name, course_type, semeter, department });
    res.redirect('/');
});
app.post('/delete', (req, res) => {
    const { ids } = req.body;
    console.log('🚀 ~ app.post ~ ids:', ids);
    // if(ids.length<=0){
    //     return res.redirect('/');
    // }
    // function onDeleteItem(length){
    //     if(length>0){
    //         onDeleteItem(length-1);
    //     }else
    //     return res.redirect('/');
    // }
    // onDeleteItem(ids.length-1);

    (Array.isArray(ids) ? ids : [ids]).forEach((id) =>
        courses.splice(
            courses.findIndex((c) => c.id === id),
            1,
        ),
    );
    res.redirect('/');
});
app.get('/', (req, resp) => {
    return resp.render('index', { courses });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
