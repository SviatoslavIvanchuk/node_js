// ДЗ:
//
//     Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
//
// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)


const fs = require("fs");
const path = require("path");

const onlineUser = [
    {name: "Andrii", age: 22, city: "Lviv"},
    {name: "Oleg", age: 24, city: "Frankivsk"},
    {name: "Vitalik", age: 22, city: "Kyiv"},
];

const inPersonUser = [
    {name: "Jack", age: 22, city: "Austin"},
    {name: "Kate", age: 24, city: "NY"},
    {name: "Alice", age: 22, city: "LA"},
];

fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
    if (err) {
        throw err;
    }
    for (const user of onlineUser) {
        for (const userKey in user) {
            fs.appendFile(path.join(__dirname, 'main', 'online', 'file_online.txt'),
                `\n${userKey.toUpperCase()}: ${user[userKey]}`,
                (err) => {
                    if (err) {
                        throw err;
                    }
                })
        }
        fs.appendFile(path.join(__dirname, 'main', 'online', 'file_online.txt'),
            `\n===============`,
            (err) => {
                if (err) {
                    throw err;
                }
            })
    }

    fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
        if (err) {
            throw err;
        }
        for (const user of inPersonUser) {
            for (const userKey in user) {
                fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'file_inPerson.txt'),
                    `\n${userKey.toUpperCase()}: ${user[userKey]}`,
                    (err) => {
                        if (err) {
                            throw err;
                        }
                    })
            }

            fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'file_inPerson.txt'),
                `\n===================`,
                (err) => {
                    if (err) {
                        throw err
                    }
                })
        }
    })
});

function replace(getFrom, setTo) {
    fs.readFile(path.join(__dirname, 'main', getFrom), "utf8", (err, data) => {
        console.log(data)
        if (err) {
            throw err;
        }
        fs.appendFile(path.join(__dirname, 'main', setTo), data, {flag: 'w'}, (err) => {
            if (err) {
                throw err;
            }
        })
    })
}

function replaceDate(fileOne, fileTwo) {
    replace(fileOne, fileTwo)
    replace(fileTwo, fileOne)
}
// replaceDate('inPerson/file_inPerson.txt', 'online/file_online.txt')
// replaceDate(path.join('inPerson', 'file_inPerson.txt'),
//             path.join('online', 'file-online.txt'))