let trigger = 0;
function onHover(tile){
    if(trigger == 0){return}
    tile.style.backgroundColor = "red";
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
    })

    document.querySelector(".reset").addEventListener('click', ()=>{
        tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile) => tile.style.backgroundColor = "white");
    });
    let totalBoxes = 480/slider.value;
    for(let i=0; i<totalBoxes; i++){
        addRow(slider.value+"px", totalBoxes);
    }
}
const slider = document.querySelector('.slider');
const sliderValueDisplay = document.querySelector('.sliderValue');
main();
slider.addEventListener('input', function () {
    const sliderValue = slider.value;
    sliderValueDisplay.textContent = sliderValue;
    document.querySelector(".sketchBoard").innerHTML = "";
    // const rows = document.querySelectorAll('.row');
    // rows.forEach(function (row) {
    //   row.remove();
    // });
    // document.querySelector(".sketchBoard").remove();
    // let sketchBoard = document.createElement("div");
    // sketchBoard.classList.add(".sketchBoard");
    main();
});