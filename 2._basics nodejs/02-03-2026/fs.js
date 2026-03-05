const fs = require('fs');

//read============================================//
// fs.readFile('./a.txt', 'utf8', (err, data) => {
//     if (err) console.log(err);
//     // console.log(data.toString()); //if not use "utf8"
//     console.log(data);
// })

//write==================================//
// fs.writeFile('./b.txt', 'hello me', (err) => {
//     if(err) console.log(err);
//     console.log('writefile successfully');
// })

//append========================================//
// fs.appendFile('./b.txt', `\n${a}`, (err) => {
//     if(err) console.log(err);
//     console.log('append successfully');
// })

//dalete========================================//
// fs.unlink('./b.txt', (err) => {
//     if(err) console.log(err);
//     console.log('deleted!')
// })

// if (fs.existsSync('./b.txt')) {
//     fs.unlink('./b.txt', (err) => {
//         if (err) console.log(err);
//         console.log('deleted!')  
//     })
// }else{
//     console.log('No file to delete!');
// }

//read append============================================//
fs.readFile('./a.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    // console.log(data);
    
    // append ========================================//
    fs.appendFile('./b.txt', `\n${data}`, (err) => {
        if (err) console.log(err);
        console.log('append successfully');
    })
})

