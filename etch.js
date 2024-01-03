function onHover(tile){
    tile.style.backgroundColor = "red";
}
function addRow(boxSize){
    let board = document.querySelector(".sketchBoard");
    let row = document.createElement("div");
    row.classList.add("row");
    for(let i = 0; i<16; i++){
        let tile = document.createElement("div");
        tile.style.width = boxSize;
        tile.style.height = boxSize;
        tile.classList.add("tile");
        tile.addEventListener('mouseenter', ()=> onHover(tile));
        row.appendChild(tile);
    }
    board.appendChild(row);
}

function main(){
    for(let i=0; i<16; i++){
        addRow("30px")
    }
}
main();