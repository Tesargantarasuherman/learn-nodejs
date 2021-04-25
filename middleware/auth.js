var koneksi = require("../koneksi");
var mysql = require("mysql");
var md5 = require("MD5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");
const { connect } = require("../koneksi");

// controller untuk register
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };
  var query = "SELECT email FROM ?? WHERE ??=?";
  var table = ["user", "email", post.email];

  query = mysql.format(query, table);
  koneksi.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        koneksi.query(query, post, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            response.ok("Berhasil menambahkan user baru", res);
          }
        });
      } else {
        response.ok("Email Sudah Terdaftar",res);
      }
    }
  });
};
// controller untuk login
exports.login = function(req,res){
    var post = {
      password :req.body.password,
      email:req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"
    var table = ['user','password',md5(post.password),'email',post.email];

    query = mysql.format(query,table);
    koneksi.query(query,function(err,rows){
      if(err){
        console.log(err)
      }
      else{
        if(rows.length == 1){ /*jika ada maka  token di buat */
          var token = jwt.sign({rows},config.secret,{
            expiresIn:1440 /* waktu token expired */
          })
          id_user = rows[0].id /* id user di isi id dari table user*/
          var data = {
            id_user : id_user,
            acces_token : token,
            ip_addres : ip.address()
          }
          var query = "INSERT INTO ?? SET ?";
          var table = ["akses_token"];
          query = mysql.format(query,table);
          
          koneksi.query(query,data,function(err,rows){
            if(err){
              console.log(err)
            }
            else{
              res.json({
                success : true,
                message:'JWT Berhasil Tergenerate',
                token:token,
                currUser : data.id_user
              })
            }
          })
        }
        else{
          res.json({
            "Error":true,
            "Message": "Email atu Password Salah"
          })
        }
      }
    })
}