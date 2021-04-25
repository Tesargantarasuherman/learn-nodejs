 'use strict';

 exports.ok = function(values,res){
     var data = {
         'status' : 200,
         'value'  : values
     };
     res.json(data);
     res.end();
 };

 // response untuk nested mata kuliah
exports.nestedOK = function(values,res){
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan,item)=>{
        // tentukan key groupnya
        if(akumulasikan[item.nama]){
            // buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama];
            // cek jika isi aray matakuliah 
            if(Array.isArray(group.matakuliah)){
                // tambahkan value kedalam group matakuliah
                group,matakuliah.push(item.matakuliah);
            }
            else{
                group.matakuliah = [group.matakuliah,item.matakuliah];
            }
        }
        else{
            akumulasikan[item.nama] = item
        }
        return akumulasikan
    },{});
    var data = {
        'status' : 200,
        'value'  : hasil
    };
     res.json(data);
     res.end;
}