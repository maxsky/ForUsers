var express = require('express');
var router = express.Router();

// 连接数据库
var monk = require('monk');
var db = monk('localhost:27017/ForUsers');

router.get('/', function(req, res) {
    var collection = db.get('users');
    /* 还记得 Robomongo 里的那句 db.getCollection('users').find({}); 吗
     * 同样的，db.get('表名')，然后再 .find({}) 表示查找所有
     * 类似 MySQL 里的 select * from users;
     */
    collection.find({}, function(err, users) {
        if (err) throw err;
        res.json(users);
    });
});

router.post('/', function(req, res) {
    var collection = db.get('users');
    collection.insert({
        // 这里应该是和之前的用户保持同样属性
        // 有姓名、年龄、性别
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('users');
    collection.findOne({
        _id: req.params.id
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
});

router.put('/:id', function(req, res) {
    var collection = db.get('users');
    collection.update({
        _id: req.params.id
    }, {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('users');
    collection.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
});

module.exports = router;