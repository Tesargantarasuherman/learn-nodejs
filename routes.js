'use strict';

module.exports = function(app){
     var json =require('./controller')

     app.route('/').get(json.index);
     // routes get all data mahasiswa di fungsi di controller
     app.route('/get-all-mahasiswa').get(json.getAllMahasiswa)

     app.route('/get-mahasiswa/:id').get(json.getMahasiswa)
}