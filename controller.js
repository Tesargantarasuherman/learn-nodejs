"use strict";
var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("berjalan", res);
};
// menampilkan semua data
exports.getAllMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
// tampil berdasarkan id
exports.getMahasiswa = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
// menambahkan data mahasiswa

exports.addMahasiswa = function (req, res) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "INSERT INTO mahasiswa (nim,nama,jurusan)",
    [nim, nama, jurusan],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Ditambahkan", res);
      }
    }
  );
};
// edit data
exports.editMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?",
    [nim, nama, jurusan, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Ubah", res);
      }
    }
  );
};

exports.deleteMahasiswa = function (req, res) {
    var id = req.params.id;
    connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa=?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data Berhasil Di Hapus", res);
      }
    }
  );
};
// menampilkan mata kuliah grup
exports.tampilGroupMatakuliah = function(req,res){
   connection.query('SELECT mahasiswa.id_mahasiswa,mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
   function(error,rows,fields){
        if(error){
            console.log(error)
        }
        else{
            response.nestedOK(rows,res)
        }
   }
   ) 
}
