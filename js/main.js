let img = ["img/1_pig.png","img/2_squirrel.png","img/3_rabbit.png","img/4_frog.png","img/5_fox.png","img/6_bear.png","img/7_monkey.png","img/8_panda.png","img/9_chick.png","img/10_tiger.png","img/11_penguin.png","img/12_racoon.png","img/1_pig.png","img/2_squirrel.png","img/3_rabbit.png","img/4_frog.png","img/5_fox.png","img/6_bear.png","img/7_monkey.png","img/8_panda.png","img/9_chick.png","img/10_tiger.png","img/11_penguin.png","img/12_racoon.png"]
let background = "img/back.png"
const cardList = document.querySelector('#card_holder');
let started = 0
let attempts = 0
let time = 60
let mytimer = null
let score = 0

addImages();

function shuffle(list){

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

}

function addImages(){

    newlist = shuffle(img)

    newlist.forEach(bild => {
    
        const newItemTemplate = document.querySelector('#card-temp')
    
        const clone = newItemTemplate.content.cloneNode(true);
    
        const newItemRow = clone.querySelector('li')
    
        const cardImg = newItemRow.querySelector('img')
    
        let splitlist = bild.split('/')
        splitlist = splitlist[1].split('_')
        let imgid = splitlist[0]

        newItemRow.setAttribute('data-cardid', imgid)

        newItemRow.addEventListener('click', select)
        
        cardImg.src = bild
    
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
        document.body.innerHTML = imgEl.outerHTML

        let button = document.createElement("button")
        button.innerText = "Play again!"
        button.id = "tryagainbutton"
        button.onclick = function() { location.reload(); };
        document.body.appendChild(button)
    }
  
}

function select(event) {

    if (started == 0){
        mytimer = setInterval(countdown, 1000)
        started = 1
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
    if(document.querySelectorAll('.matched').length == img.length){
        
        score = time / attempts
        console.log(score)

        if (mytimer){
            clearInterval(mytimer)
        }

        let imgEl = document.createElement("img")
        imgEl.src = 'img/finished.gif'
        document.body.innerHTML = imgEl.outerHTML

        let button = document.createElement("button")
        button.innerText = "Play again!"
        button.id = "tryagainbutton"
        button.onclick = function() { location.reload(); };
        document.body.appendChild(button)
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
        }, 750)
    }
}



