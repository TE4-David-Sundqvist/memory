let img = ["1_pig","2_squirrel","3_rabbit","4_frog","5_fox","6_bear","7_monkey","8_panda","9_chick","10_tiger","11_penguin","12_racoon"]
let background = "img/back.png"
const cardList = document.querySelector('#card_holder');
let started = false
let attempts = 0
let time = 500
let mytimer = null
let score = 0

addImages();
addImages();

/*function shuffle(list){

    let ilist = list.length
    let listclone = new Array()
    let newlist = []
    list.forEach(bild => {
        listclone.push(bild)
    });
    
    for(let i = 0; i < ilist; i++ ){

        randomnum = Math.floor(Math.random() * listclone.length)
        
        newlist.push(listclone[randomnum])

        listclone.splice(randomnum,1)

    }

    return newlist

}*/


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


function addImages(){

    newlist = shuffle(img)

    newlist.forEach(bild => {
    
        const newItemTemplate = document.querySelector('#card-temp')
        const clone = newItemTemplate.content.cloneNode(true);
        const newItemRow = clone.querySelector('li')
        const cardImg = newItemRow.querySelector('img')

        let imgid = bild.split('_')[0]

        newItemRow.setAttribute('data-cardid', imgid)
        newItemRow.addEventListener('click', select)
        
        cardImg.src = "img/" + bild + ".png"
    
        cardList.appendChild(newItemRow);
    
    });
    
}

function countdown(){
    time--
    document.querySelector('#time span').innerText = time
    if (time == 0){
        if (mytimer){
            clearInterval(mytimer)
        }
        let imgEl = document.createElement("img")
        imgEl.src = 'img/fail.gif'
        document.querySelector('#nuke-body').innerHTML = imgEl.outerHTML

        let button = document.createElement("button")
        button.innerText = "Play again!"
        button.id = "tryagainbutton"
        button.onclick = function() { location.reload(); };
        document.body.appendChild(button)
    }
  
}

function select(event) {

    if (!started){
        mytimer = setInterval(countdown, 1000)
        started = true
    }

    if(event.target.className != "matched"){
        
        let  selected_amount;
        
        selected_amount = document.querySelectorAll('.selected').length
        
        if(selected_amount < 2 && event.target.className != "selected"){
            event.target.classList.add('selected')
        }
        // else if(event.target.className == "selected"){
        //     event.target.classList.remove('selected')
        // }
        selected_amount = document.querySelectorAll('.selected').length

        if(selected_amount == 2){
            check(document.querySelectorAll('.selected'))
            attempts++
            document.querySelector('#attempts span').innerText = attempts
        }
        
    }
    if(document.querySelectorAll('.matched').length == img.length * 2){
        
        score = time / attempts
        score = Math.floor(score) * 69
        

        if (mytimer){
            clearInterval(mytimer)
        }

        let imgEl = document.createElement("img")
        imgEl.src = 'img/finished.gif'
        document.querySelector('#nuke-body').innerHTML = imgEl.outerHTML

        let button = document.createElement("button")
        button.innerText = "Play again!"
        button.id = "tryagainbutton"
        button.onclick = function() { location.reload(); };
        document.body.appendChild(button)


        render_scoreboard(score);
    }
}

function check(arr) {
    
    if(arr[0].getAttribute('data-cardid') == arr[1].getAttribute('data-cardid')){
        for(let card of arr){
            card.classList.remove('selected')
            card.classList.add('matched')
        }
    }else{
        setTimeout(function() {
            for(let card of arr){
                card.classList.remove('selected')
            }
        }, 800)
    }
}


function render_scoreboard(value){

    const scoreboard_temp = document.querySelector('#score-board')
    
    const clone = scoreboard_temp.content.cloneNode(true);

    const scoreboard = clone.querySelector('.scoreboard')

    scoreboard.querySelector('.yourscore > h2').innerText = value

    let highscores = Object.entries(localStorage)
    highscores.sort(function(a,b){return b[1] - a[1]})

    document.body.appendChild(scoreboard)


    for(let i = 0; i < 10; i++){
        let child = document.createElement('p')
        child.innerText = highscores[i].join(': ')
        document.querySelector('.scoreboard').appendChild(child)
        if (i == highscores.length - 1){
            break
        }
    }

}


function postToScoreboard(){
    let input = document.querySelectorAll('#form input')[0].value
    let score = document.querySelector('.yourscore > h2').innerText
    localStorage.setItem(input, score)
}



