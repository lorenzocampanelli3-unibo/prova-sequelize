'use strict';

const db = require('./models/index');

(async () => {
    try {
        const queryInterface = db.sequelize.getQueryInterface();
        const DataTypes = db.Sequelize;
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
          });
        // await queryInterface.dropAllTables();
        // await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
        // await db.sequelize.sync({force: true});
        // await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
        console.log('Tables created');
        // await db.sequelize.drop();
        // console.log('Tables dropped');
        // await db.User.create({
        //     userId: 1,
        //     firstName: "Lillo"
        // });
        // await db.Post.bulkCreate([
        //     {UserId: 1},
        //     {title: "pippopluto", author: 5, UserId: 1},
        // ]);
        // const resultUser = await db.User.findAll({
        //     where: {
        //         userId: 1
        //     },
        //     include: db.Post
        // });
        // console.log(JSON.stringify(resultUser, null, 2));
        // const resultPosts = await db.Post.findAll({
        //     include: db.User
        // });
        // console.log(JSON.stringify(resultPosts, null, 2));
        // const resultUser2 = await db.User.findOne({
        //     where: {
        //         userId: 1
        //     }
        // });
        // // console.log(resultUser2);
        // // console.log(resultUser2.firstName);
        // console.log(JSON.stringify(resultUser2, null, 2));
        // const resultUser2Posts = await resultUser2.getPosts();
        // console.log(JSON.stringify(resultUser2Posts, null, 2));
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