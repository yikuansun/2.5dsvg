svgns = "http://www.w3.org/2000/svg";

function levelInit(svgCode) {
    document.getElementById("gameframe").style.backgroundColor = "grey";

    wallGroup = document.createElementNS(svgns, "g");
    document.getElementById("gameframe").appendChild(wallGroup);

    wallGroup.innerHTML = svgCode;
}

cameraPos = [0, 0];

map = {};

function render3d() {
    wallGroup.setAttribute("transform", "translate(" + cameraPos[0].toString() + ", " + cameraPos[1].toString() + ")");

    for (duplicates of document.getElementsByClassName("wallgroupdup")) {
        document.getElementsByClassName("wallgroupdup")[0].remove();
    }

    for (i = 0; i < 15; i++) {
        wallGroupDup = wallGroup.cloneNode(true);
        wallGroupDup.style.transformOrigin = cameraPos[0].toString() + "px " + cameraPos[1].toString() + "px ";
        wallGroupDup.setAttribute("transform", " translate(" + cameraPos[0] + ", " + cameraPos[1] + ")" + " scale(" + (1 + i * 0.005).toString() + ")");
        wallGroupDup.setAttribute("class", "wallgroupdup");
        document.getElementById("gameframe").appendChild(wallGroupDup);
        if (i != 14) {
            for (allChildNodes of wallGroupDup.children) {
                allChildNodes.style.fill = "hsl(0, 0%, " + (i * 2 + 40).toString() + "%)";
            }
        }
        else {
            for (allChildNodes of wallGroupDup.children) {
                allChildNodes.style.fill = "hsl(0, 0%, 60%)";
            }
        }
    }

}

function load() {
    
    onkeydown = onkeyup = function(e){
        e = e || event;
        map[e.keyCode] = e.type == 'keydown';
    }
    
    if (map[40]) {
        cameraPos[1] -= 2;
    }

    if (map[39]) {
        cameraPos[0] -= 2;
    }

    if (map[38]) {
        cameraPos[1] += 2;
    }
    
    if (map[37]) {
        cameraPos[0] += 2;
    }

    render3d();

    requestAnimationFrame(load);

}

levelInit(`<path d="M-852 -480L852 -480L852 480L-852 480L-852 -480ZM-772 400L772 400L772 -400L-772 -400L-772 400ZM277 -343L610 -343L610 -325L626 -325L626 -283L598 -283L598 -310L290 -310L290 -283L266 -283L266 -325L277 -325L277 -343ZM-499 -339L-132 -339L-132 -316L-114 -316L-114 -270L-145 -270L-145 -300L-480 -300L-480 -266L-514 -266L-514 -317L-499 -317L-499 -339ZM-466 -252L-151 -252L-151 -169L-466 -169L-466 -252ZM310 -241L594 -241L594 -195L310 -195L310 -241ZM-477 50L-390 50L-390 183L447 183L447 83L524 83L524 208L473 208L473 269L-411 269L-411 224L-477 224L-477 50Z" />`);
load();