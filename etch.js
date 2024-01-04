let trigger = 0;
let selectRandomColor = 0;
let selectProgressive = 0;
let rOffset,gOffset,bOffset;

const colorPicker = document.querySelector("#colorpicker"); 
let color = colorPicker.value;
let progressiveColor = color;
let randomColor = color;

colorPicker.addEventListener("input", function (){
    selectRandomColor = 0;
    selectProgressive = 0;
    color = colorPicker.value;
    progressiveColor = color;
    randomColor = color;
})
function selectionType(){
    let selection;
    if(selectRandomColor && !progressiveColor){
        selection = "Random Color";
    }
    else if(!selectRandomColor && progressiveColor){
        selection = "Progressive";
    }
    else{
        selection = "Regular";
    }
    return selection;
}
function onHover(tile){
    if(trigger == 0 || tile.classList.contains("colored")){
        return;
    }

    if(selectRandomColor){
        var o = Math.round, r = Math.random, s = 255;
        randomColor = 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) +')';
        tile.style.backgroundColor = randomColor;
        tile.classList.add("colored");
        return;
    }

    if(selectProgressive){
        progressiveColor = '#' + 
                            (parseInt(progressiveColor.slice(1,3),16) - rOffset).toString(16).padStart(2, '0') + 
                            (parseInt(progressiveColor.slice(3,5),16) - gOffset).toString(16).padStart(2, '0') +
                            (parseInt(progressiveColor.slice(5), 16) - bOffset).toString(16).padStart(2, '0');

        if(progressiveColor.toString().includes('-')){progressiveColor = "#000000"}
        tile.style.backgroundColor = progressiveColor;
        tile.classList.add("colored");
        return;

    }
    tile.style.backgroundColor = color;
    tile.classList.add("colored");
}
function addRow(boxSize, totalBoxes){
    let board = document.querySelector(".sketchBoard");
    let row = document.createElement("div");
    row.classList.add("row");
    for(let i = 0; i<totalBoxes; i++){
        let tile = document.createElement("div");
        tile.style.width = boxSize;
        tile.style.height = boxSize;
        tile.classList.add("tile");
        tile.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
        tile.addEventListener('mouseenter', ()=> onHover(tile));
        row.appendChild(tile);
    }
    board.appendChild(row);
}

function main(){
    document.querySelector(".sketchBoard").addEventListener('mousedown', function (event){
        trigger = 1;
        onHover(document.elementFromPoint(event.clientX, event.clientY));
    })
    document.querySelector(".mouseup").addEventListener('mouseup', function (event){
        trigger = 0;
        progressiveColor = color;
    })
    document.querySelector(".reset").addEventListener('click', ()=>{
        tiles = document.querySelectorAll(".tile");
        progressiveColor = color;
        selectRandomColor = 0;
        selectProgressive = 0;
        for (let tile of tiles){ 
            tile.style.backgroundColor = "white"
            if(tile.classList.contains("colored")){
                tile.classList.remove("colored");
            };
        };
    });
    document.querySelector("#randomRGB").addEventListener('click', ()=>{
        selectRandomColor = 1;
        selectProgressive = 0;
    });
    document.querySelector("#progressive").addEventListener('click', ()=>{
        selectRandomColor = 0;
        selectProgressive = 1;
        rOffset = Math.round(parseInt(color.slice(1,3), 16)/10);
        gOffset = Math.round(parseInt(color.slice(3,5), 16)/10);
        bOffset = Math.round(parseInt(color.slice(5), 16)/10);
    });


    let boxSize = 480/slider.value;
    for(let i=0; i<slider.value; i++){
        addRow(boxSize+"px", slider.value);
    }
}
const slider = document.querySelector('.slider');
const sliderValueDisplay = document.querySelector('.sliderValue');
main();
slider.addEventListener('input', function () {
    const sliderValue = slider.value;
    sliderValueDisplay.textContent = sliderValue + "x" + sliderValue;
    document.querySelector(".sketchBoard").innerHTML = "";
    main();
});