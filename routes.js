'use strict';

module.exports = function(app){
     var json =require('./controller')

     app.route('/').get(json.index);
     // routes get all data mahasiswa di fungsi di controller
     app.route('/get-all-mahasiswa').get(json.getAllMahasiswa);

     app.route('/get-mahasiswa/:id').get(json.getMahasiswa);

     app.route('/add-mahasiswa').post(json.addMahasiswa);

     app.route('/edit-mahasiswa').put(json.editMahasiswa)

     app.route('/delete-mahasiswa/:id').delete(json.deleteMahasiswa)

     app.route('/matakuliah-mahasiswa').get(json.tampilGroupMatakuliah)
}