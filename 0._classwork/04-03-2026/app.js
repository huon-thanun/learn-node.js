let fs = require('fs');

if (!fs.existsSync('./doc')) {
    fs.mkdir('./doc', (err) => {
        if (err) console.log(err);
        console.log('created doc successfully!');
    })
} else {
    console.log('doc is have already!');
}

const fetchData = async () => {
    // await fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then((data) => {

    let res = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await res.json();
    // console.log(data);
    if (!fs.existsSync('./doc/data.txt')) {
        fs.writeFile('./doc/data.txt', '', (err) => {
            if (err) console.log(err);
            console.log('write data succcessfully!');
        })
    } else {
        console.log('data.txt is have already!');
    }

    fs.appendFile('./doc/data.txt', JSON.stringify(data, null, 2), (err) => {
        if (err) console.log(err);
        console.log('append data succcessfully!');
    })
    // })
}

fetchData()
