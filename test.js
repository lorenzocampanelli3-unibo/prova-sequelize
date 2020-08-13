'use strict';

const db = require('./models/index');

(async () => {
    try {
        const queryInterface = db.sequelize.getQueryInterface();
        const DataTypes = db.Sequelize;
        await queryInterface.dropAllTables();
        console.log('Tables dropped');
        await queryInterface.createTable('Users', {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          lastName:{
            type: DataTypes.STRING(50),
            allowNull: false
          },
          email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
          }
        }, {
            timestamps: false
        });
        await queryInterface.createTable('Posts', {
            postId: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            title: {
              type: DataTypes.STRING(50),
              allowNull: false
            },
            body: {
              type: DataTypes.TEXT,
              allowNull: true
            },
            author: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references:{
                model: {
                  tableName: 'Users'
                },
                key: 'userId'
              }
            }
          }, {
            timestamps: false
        });
        console.log('Tables created');

        // === CREATE AND FIND QUERIES ===

        await db.User.create({
            userId: 1,
            firstName: "Lillo",
            lastName: "Billo",
            email: "lillo@billo.com"
        });
        await db.Post.bulkCreate([
            {title: "pippopluto0", author: 1},
            {title: "pippopluto1", body:"Ciccio Pasticcio era un bel bambino", author: 1} // FK CONSTRAINT VIOLATION
        ]);
        const resultUser = await db.User.findAll({
            where: {
                userId: 1
            },
            include: db.Post
        });
        console.log(JSON.stringify(resultUser, null, 2));
        // const resultPosts = await db.Post.findAll({
        //     include: db.User
        // });
        const allPosts = await db.Post.findAll();
        console.log(JSON.stringify(allPosts, null, 2));
        allPosts.forEach(async p => {
                                     const user = await p.getUser();
                                     console.log('USER: ', JSON.stringify(user, null, 2))
                                    });
        // console.log(JSON.stringify(resultPosts, null, 2));
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