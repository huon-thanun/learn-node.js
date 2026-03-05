const { log } = require('console');
let fs = require('fs')

// fs.writeFile('./messsage.txt', 'hello node.js', (err) =>{
//     if(err) console.log(err);
//     console.log('write file to message successfully');
// })

// fs.appendFile('./messsage.txt', '\nnew message by append', (err) => {
//     if (err) console.log(err);
//     console.log('Append file successfully!');
// } )

//practice 04-03-20206=============================//
if (!fs.existsSync('./fileSystem')) {
    fs.mkdir('./fileSystem', (err) => {
        if (err) console.log(err);
        console.log('Created fileSystem successfully!');
    })
} else {
    console.log('fileSystem is have already!');
}

if (!fs.existsSync('./fileSystem/prepender.txt')) {
    fs.writeFile('./fileSystem/prepender.txt', 'hello_prepender', (err) => {
        if (err) console.log(err);
        console.log('Created prepender file successfully!');
    })
} else {
    console.log('prepender.txt is have already!');
}

if (fs.existsSync('./fileSystem/prepender.txt')) {
    fs.readFile('./fileSystem/prepender.txt', (err, data) => {
        if (err) console.log(err);
        if (fs.existsSync('./fileSystem/prepender.txt')) {
            fs.writeFile('./fileSystem/prepender.txt', 'before ' + data, (err) => {
                if (err) console.log(err);
                console.log('added Before!');
            })
        }
    })

} else {
    console.log('have no prepender.txt to read!');
}