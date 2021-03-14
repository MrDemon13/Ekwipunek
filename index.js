const Discord = require ("discord.js")
const fs = require ('fs') //Wymagane do zpisu i odczytu plików .json

const prefix = '!' //Tu ustawiłem prefix bota na !, ale można ustawić jakikolwiek inny

const bot = new Discord.Client ({disableEveryone: false})

bot.on("ready", async () => {
    console.log(`Testowy bot jest online`) //Tu w konsoli dostaje powiadomienie kiedy uruchami się bot
});

bot.on('message', (message) => {
    if(message.author.bot) return;

    //Tu ustawa comand jako pierwsze słowo do spacji (nie licząc jej) bez wykszyknika, czyli tekst komendy
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var comand = args.shift().toLowerCase()

    if(comand == 'eq_edit'){ //Tutaj po wpisaniu !eq_edit wykonuje odpowiedenie działanie
        const {mentions} = message //Pobiera wspomnienie o użytkowniku z wiadomości
        var target = mentions.users.first()
        var napisy = message.content.split(' ') //Zpisuje całą wiadomość w tablicy pomijając spacje
        var data = JSON.stringify(napisy.slice(2)) //Zamienia to na tekst odpowiedni dla pliku .json i ucina z tego komendę i wspomnienie
        if(!target){
            return message.channel.send("Nie wybrałeś osoby której ekwipunek chcesz zmienić") //Jeżeli ktoś nie oznaczy osoby to bot mu o tym powie i nie wykona komendy by nie doszło do crasha
        }
        fs.writeFileSync(`./eq/${target.id}.json`, data) // Na koniec zapisuje wszystko w pliku, którego nazwa to id osoby do której eq ma należeć
    }
    
    if((message.content == "**Co mam w ekwipunku?**") || (message.content == "**co mam w ekwipunku?**")){ //To jest sposób by sprawdzić swoje eq
        let patch = `./eq/${message.member.id}.json` //Ustawia zmienną patch na drogę do pliku ekwipunku
        fs.readFile(patch, 'utf8', (err, data) => { //Zaczyna odczytywać
            if(err){
                message.channel.send('Pusto') //To się wykona kiedy będzie błąd, czyli wtedy kiedy plik ekwipunku nie będzie istniał
            }
            else{
                message.channel.send(JSON.parse(data)) //To się wykona kiedy plik istnieje, bot wypisze wtedy jego zawartość
            }
        });
    }

    if(comand == 'eq'){ //Komenda do sprawdzenia czyjegoś eq
        const {mentions} = message //Znowu odczytuje wspomnienie urzytkownika z wiadomośći
        var target2 = mentions.users.first() 
        if(!target2){
            return message.channel.send("Nie wybrałeś kogo ekwipunek chesz spradizć")//Znowu jak ktoś nie poda kogo ekwipunek chceprzeglądać bor nie wykona dalej komendy
        }
        fs.readFile(`./eq/${target2.id}.json`, 'utf8', (err, data2) => { //Zaczyna odczytywać plik eq
            if(err){
                message.channel.send('Nie maogę znaleźć pliku ekwipunku') //Jeżeli nie ma takiego pliku to napisze coś takiego
            }
            else{
                message.channel.send(JSON.parse(data2)) //Jak plik istnieje wypisze jego zawartość
            }
        });
    }
});
bot.login("") //Tu był token mojego testowego bota, którym sprawdzałem czy to działa, ale go nie ma bo go skasowałem przed wysłaniem ci tego kodu :)