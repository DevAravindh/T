const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('.status');
const btn = document.querySelector('#restart');
const ximg = document.querySelector('#x');
const oimg = document.querySelector('#o');

const x = `<img src="images/x.png" alt="" class="x">`;
const o = `<img src="images/o.png" alt="" class="o">`;

let running = false;
let player = "X";
let currentplayer = x;

let possible = 
[  [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]];
let order = ["","","","","","","","",""];

init()

function init()
{
    boxs.forEach((box)=>
    {
        box.addEventListener('click',boxClick);
    })
    statusTxt.textContent = `${player} Your Turn`
    btn.addEventListener('click',restart)
    running = true;
    ximg.classList.add('currimg');
}

function boxClick()
{
    const index = this.dataset.index;
    if(order[index]!="" || !running)
    {
        return;
    }
    updateBox(this,index);
    checkWinner();
}

function updateBox(box,index)
{
    order[index] = player;
    box.innerHTML = currentplayer;
}

function changePlayer()
{
    player = (player == "X") ? "O" : "X";
    currentplayer = (currentplayer == x) ? o : x; 
    statusTxt.textContent = `${player} Your Turn`;
    if(player == "X")
    {
        ximg.classList.add('currimg')
        oimg.classList.remove('currimg')
    }
    else
    {
        oimg.classList.add('currimg')
        ximg.classList.remove('currimg')
    }
}

function checkWinner()
{
    let iswon = false;
    for(let i = 0;i<possible.length;i++)
    {
     let condition = possible[i]
     const  box1 = order[condition[0]];
     const  box2 = order[condition[1]];
     const  box3 = order[condition[2]];

     if(box1 == '' || box2 =='' || box3 =='')
     {
        continue
     }
     if(box1 == box2 && box2 == box3)
     {
        iswon = true;
        boxs[condition[0]].classList.add('win');
        boxs[condition[1]].classList.add('win');
        boxs[condition[2]].classList.add('win');
     }
    }
    if(iswon)
    {
        statusTxt.textContent = `${player} Won The Match...`
        running = false;
    }
    else if(!order.includes(''))
    {
        statusTxt.textContent = `Match Is Draw...`;
        oimg.classList.remove('currimg');
        ximg.classList.remove('currimg');
        running = false;
    }
    else 
    {
        changePlayer();
    }
}

function restart()
{
    order = ["","","","","","","","",""];
    running = true;
    player = "X";
    currentplayer = x;
    oimg.classList.remove('currimg');
    ximg.classList.add('currimg');
    statusTxt.textContent = `${player} Your Turn`
    boxs.forEach((box)=>
    {
        box.classList.remove('win');
        box.innerHTML = "";
    })
}