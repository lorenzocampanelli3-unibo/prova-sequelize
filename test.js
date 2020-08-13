'use strict';

const db = require('./models/index');

(async () => {
    try {
        await db.sequelize.sync({force: true});
        console.log('Tables created');
        await db.User.create({
            userId: 1,
            firstName: "Lillo"
        });
        await db.Post.bulkCreate([
            {UserId: 1},
            {title: "pippopluto", author: 5, UserId: 1},
        ]);
        const resultUser = await db.User.findAll({
            where: {
                userId: 1
            },
            include: db.Post
        });
        console.log(JSON.stringify(resultUser, null, 2));
        const resultPosts = await db.Post.findAll({
            include: db.User
        });
        console.log(JSON.stringify(resultPosts, null, 2));
        const resultUser2 = await db.User.findOne({
            where: {
                userId: 1
            }
        });
        // console.log(resultUser2);
        // console.log(resultUser2.firstName);
        console.log(JSON.stringify(resultUser2, null, 2));
        const resultUser2Posts = await resultUser2.getPosts();
        console.log(JSON.stringify(resultUser2Posts, null, 2));
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