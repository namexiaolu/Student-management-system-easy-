var express = require('express');
var router = express.Router();
const mysql = require('mysql'); //调用mysql模块

//下面的配置必须要与自己本机上的mysql信息一致
let connection = mysql.createConnection({
  host:'localhost',   //主机地址
  port:3306,	    //端口
  user:'root',       //账号
  password:'',   //密码
  database:'student'   //连接的数据库
});
//连接到数据库
connection.connect();
//执行sql语句
router.get('/', function(req, res) {
  var user_sql = 'SELECT * FROM studentinfo';
  connection.query(user_sql,function(err,result){
  if(err){
    console.log('[query]-:'+err);
  }else{
//拿到result后给模板引擎

      res.render('index', {
        title: '学生简易管理系统',
        data:result
      });
    }

  })
})


router.post('/adduser',function (req, res) {
  var name = req.body.name;
  var tel = req.body.tel;
  var grade = req.body.grade;
  var date = req.body.date;
  var add_user_sql = 'INSERT INTO `studentinfo` (`id`, `name`, `phone`, `grade`, `date`) VALUES (NULL,?,?,?,?);';
  var add_user_sql_para = [name,tel,grade,date];
  connection.query(add_user_sql,add_user_sql_para,function(err,result){
    if(err){
      res.render('returnView',{title:'failed',content: '添加失败'+err});
    }else{
      res.render('returnView',{title:'success',content: '添加成功'});
    }
  })
})
// router.post('/editusertemp',function (req,res) {
//   var name = req.body.name;
//   var tel = req.body.tel;
//   var grade = req.body.grade;
//   var date = req.body.date;
//   var id = req.body.id;
//   res.render('editusertemp'),{
//     "id":id,
//     "name":name,
//     "tel":tel,
//     "grade":grade,
//     "data":data,
//
//   };
// })
router.post('/editusertemp', function(req, res, next) {
  var id =1;
  var name=req.body.name;
  tel=req.tel;
  console.log(id);

  console.log(name);
  res.render('returnView',{
    title:'success',
    content: '修改成功',
    id:id,
    name:name,
    tel,tel
  });
});




router.post('/edituser',function (req, res) {
  var name = req.body.name;
  var tel = req.body.tel;
  var grade = req.body.grade;
  var date = req.body.date;
  var id = req.body.id;
  var update_user_sql = 'UPDATE `studentinfo` SET `name` = ?, `phone` = ? ,`grade` = ?,`date` = ? WHERE `studentinfo`.`id` = ?;';
  // UPDATE `studentinfo` SET `name` = 'xia123', `phone` = '12' WHERE `studentinfo`.`id` = 1;
  var update_user_sql_para = [name,tel,grade,date,id];
  connection.query(update_user_sql,update_user_sql_para,function(err,result){
    if(err){
      res.render('returnView',{title:'failed',content: '修改失败'+err});
    }else{
      res.render('returnView',{title:'success',content: '修改成功'});
    }
  })
})

router.post('/deleteuser',function (req, res) {
// “DELETE FROM `studentinfo` WHERE `studentinfo`.`id` = 1”
  var id = req.body.id;

  var delete_user_sql = 'DELETE FROM `studentinfo` WHERE `studentinfo`.`id` = ?;';

  var delete_user_sql_para = [id];
  connection.query(delete_user_sql,delete_user_sql_para,function(err,result){
    if(err){
      res.render('returnView',{title:'failed',content: '删除失败'+err});
    }else{
      res.render('returnView',{title:'success',content: '删除成功'});
    }
  })
})
module.exports = router;