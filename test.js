'use strict';

const db = require('./models/index');

(async () => {
    await db.sequelize.sync({force: true});
    console.log('Tables created');
    try {
        await db.User.create({
            userId: 1,
            firstName: "Lillo"
        });
        await db.Post.bulkCreate([
            {UserId: 1},
            {title: "pippopluto", author: 5, UserId: 1},
        ]);
    } catch (err) {
        console.log('error: ', err);
    }
    
    // db.User.create({
    //     userId: 1,
    //     firstName: "Lillo"
    // }).then(()=>console.log('Utente creato correttamente'))
    // .catch(err => console.log('error: ', err));

    // db.Post.bulkCreate([
    //     {UserId: 1},
    //     {title: "pippopluto", author: 5, UserId: 1},
    // ]).then(()=>console.log('Post creati correttamente'))
    // .catch(err => console.log('error: ', err));
})();