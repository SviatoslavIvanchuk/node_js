const fs = require("fs");
const path = require("path");


// ===============================Task1========================================
// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви
// отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

fs.mkdir(path.join(__dirname, 'task1'), (err)=> {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.writeFile(path.join(__dirname, 'task1', 'file.txt'), '', (err)=> {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.appendFile(path.join(__dirname, 'task1', 'file.txt'), 'Hello Okten', (err)=> {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.readFile(path.join(__dirname, 'task1', 'file.txt'), "utf8", (err, data)=> {
    if (err) {
        console.log(err)
        throw err
    }
    fs.writeFile(path.join(__dirname, 'task1', 'newFile.txt'), data, (err)=> {
        if (err) {
            console.log(err)
            throw err
        }
    })
})

// ===============================Task2========================================
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// старий файл видаліть після того як все завершиться. Також вийде callback hell

fs.mkdir(path.join(__dirname, 'task2',), (err) => {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.writeFile(path.join(__dirname, 'task2', 'file.txt'), 'Hello World', (err)=> {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.readFile(path.join(__dirname, 'task2', 'file.txt'), "utf8", (err, data)=> {
    if (err) {
        console.log(err)
        throw err
    }
    fs.mkdir(path.join(__dirname, 'task2', 'newDir'), (err)=> {
        if (err) {
            console.log(err)
            throw err
        }
    })
    fs.writeFile(path.join(__dirname, 'task2', 'newDir', 'newFile.txt'), data, (err)=> {
        if (err) {
            console.log(err)
            throw err
        }
        fs.unlink(path.join(__dirname, 'task2', 'file.txt'), (err) => {
            if (err) {
                console.log(err)
                throw err
            }
        })
    })
})


// ===============================Task3========================================
// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать -
// це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно
// їх перейменувати і додати до назви префікс _new

fs.mkdir(path.join(__dirname, 'task3'), (err)=> {
    if (err) {
        console.log(err)
        throw err
    }
})

for (let i=1; i<4; i++) {
    fs.mkdir(path.join(__dirname, 'task3', `dir${i}`), (err)=> {
        if (err) {
            console.log(err)
            throw err
        }
    })
    fs.writeFile(path.join(__dirname, 'task3', `file${i}.txt`), `Hello World ${i}`, (err)=> {
        if (err) {
            console.log(err)
            throw err
        }
    })
}

function restoration(directory) {
    fs.readdir(path.join(__dirname, directory), (err, files)=> {
        if (err) {
            console.log(err)
            throw err
        }
        for (const file of files) {
            fs.stat(path.join(__dirname, directory, file), (err, stats)=> {
                if (err) {
                    console.log(err)
                    throw err
                }

                if (stats.isDirectory()) {
                    fs.rename(path.join(__dirname, directory, file), path.join(__dirname, directory, `new_${file}`), (err)=> {
                        if (err) {
                            throw err
                        }
                    })
                }

                if (stats.isFile()) {
                    fs.truncate(path.join(__dirname, directory, file), (err)=> {
                        if (err) {
                            throw err
                        }
                    })
                }
            })
        }
    })
}
// restoration('task3')