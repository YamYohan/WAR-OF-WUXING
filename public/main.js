const socket = io.connect("http://localhost:2021");

var Xcontainer = document.getElementById("X-container");
var Ycontainer = document.getElementById("Y-container");
var chatOutput = document.getElementById("chat-output");
var Xmessage = document.getElementById("message");
var cards = document.getElementsByClassName("card");
var XboardContainer = document.getElementById("Xboard");
var YboardContainer = document.getElementById("Yboard");
var okButton = document.getElementById("ok");
var backButton = document.getElementById("back");

Xhand = ["C1", "C1", "C3", "D1", "D2", "D3", "N1", "N2", "N3", "L1", "L2", "L3", "S1", "S2", "S3", "CD", "DN", "NL"];
Xboard = [];
XguardLeft = [];
XguardRight = [];

Xmargin = (1200 - Xhand.length * 100) / (Xhand.length * 2);
Xmargin = Math.min(10, Xmargin);

Yhand = ["C1", "C2", "C3", "D1", "D2", "D3", "N1", "N2", "N3", "L1", "L2", "L3", "S1", "S2", "S3"];
Yboard = [];
YguardLeft = [];
YguardRight = [];

Ymargin = (1200 - Yhand.length * 100) / (Yhand.length * 2);
Ymargin = Math.min(10, Ymargin);

function XhandDraw() {
    Xcontainer.innerHTML = "";
    for (let index of Xhand) {
        var card = document.createElement("div");
        card.classList.add("card", "hand");
        card.style.backgroundImage = "url(images/" + index + ".png)";
        card.style.margin = "0px " + Xmargin + "px";
        card.draggable = "true";
        Xcontainer.appendChild(card);
    }
}

function YhandDraw(params) {
    Ycontainer.innerHTML = "";
    for (let index of Yhand) {
        var card = document.createElement("div");
        card.classList.add("backside");
        card.style.margin = "0px " + Ymargin + "px";
        Ycontainer.appendChild(card);
    }
}

function XboardDraw() {
    XboardContainer.innerHTML = "";
    if (XguardLeft.length != 0) {
        var card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundImage = "url(images/" + XguardLeft[0] + ".png)";
        card.addEventListener('click', () => {
            Xboard.push(XguardLeft[0]);
            XguardLeft = [];
            XboardDraw();
        })

        var container = document.createElement("div");
        container.classList.add("area", "P");
        container.appendChild(card);
        XboardContainer.appendChild(container);
    }
    else {
        var container = document.createElement("div");
        container.classList.add("area", "P");
        XboardContainer.appendChild(container);

        container.ondragover = event => {
            event.preventDefault();
        }
        container.ondrop = event => {
            var data = event.dataTransfer.getData("Text");
            XguardLeft.push(data);
            Xhand = Xhand.filter(card => card != data);
            dropFlag = true;
            XboardDraw();
        }
    }

    let d = { "C": 0, "D": 0, "N": 0, "L": 0, "S": 0 };
    for (let card of Xboard) {
        if (isNaN(parseInt(card[1]))) {
            var wrapper2 = document.getElementById("wrapper2");
            wrapper2.style.visibility = "visible";
            var choose = document.createElement("div");
            var first = document.createElement("div");
            first.classList.add("card");
            first.style.backgroundImage = "url(images/" + card[0] + "1.png)";
            first.onclick = function() {
                wrapper2.style.visibility = "hidden";
                wrapper2.innerHTML = "";
                Xboard.push(card[0]+"1");
                Xboard = Xboard.filter(item => item != card);
                XboardDraw();
            }
            var second = document.createElement("div");
            second.classList.add("card");
            second.style.backgroundImage = "url(images/" + card[1] + "1.png)";
            second.onclick = function() {
                wrapper2.style.visibility = "hidden";
                wrapper2.innerHTML = "";
                Xboard.push(card[1]+"1");
                Xboard = Xboard.filter(item => item != card);
                XboardDraw();
            }
            choose.appendChild(first);
            choose.appendChild(second);
            wrapper2.appendChild(choose);
        }
        else {
            d[card[0]] += parseInt(card[1]);
        }
    }

    for (let item in d) {
        var quantity = document.createElement("div");
        quantity.innerHTML = d[item];
        quantity.classList.add("quantity");
        var container = document.createElement("div");
        container.classList.add("area", item);
        container.appendChild(quantity);
        XboardContainer.appendChild(container);

        container.ondragover = event => {
            event.preventDefault();
        }
        container.ondrop = event => {
            var data = event.dataTransfer.getData("Text");
            Xboard.push(data);
            Xhand = Xhand.filter(card => card != data);
            dropFlag = true;
            XboardDraw();
        }
    }

    if (XguardRight.length != 0) {
        var card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundImage = "url(images/" + XguardRight[0] + ".png)";
        card.addEventListener('click', () => {
            Xboard.push(XguardRight[0]);
            XguardRight = [];
            XboardDraw();
        })

        var container = document.createElement("div");
        container.classList.add("area", "P");
        container.appendChild(card);
        XboardContainer.appendChild(container);
    }
    else {
        var container = document.createElement("div");
        container.classList.add("area", "P");
        XboardContainer.appendChild(container);

        container.ondragover = event => {
            event.preventDefault();
        }
        container.ondrop = event => {
            var data = event.dataTransfer.getData("Text");
            XguardRight.push(data);
            Xhand = Xhand.filter(card => card != data);
            dropFlag = true;
            XboardDraw();
        }
    }
}

function YboardDraw() {
    YboardContainer.innerHTML = "";
    if (YguardLeft.length != 0) {
        var card = document.createElement("div");
        card.classList.add("card", "backside");

        var container = document.createElement("div");
        container.classList.add("area", "P");
        container.appendChild(card);
        YboardContainer.appendChild(container);
    }
    else {
        var container = document.createElement("div");
        container.classList.add("area", "P");
        YboardContainer.appendChild(container);
    }

    let d = { "C": 0, "D": 0, "N": 0, "L": 0, "S": 0 };
    for (let card of Yboard) {
        d[card[0]] += parseInt(card[1])
    }

    for (let item in d) {
        var quantity = document.createElement("div");
        quantity.innerHTML = d[item];
        quantity.classList.add("quantity");
        var container = document.createElement("div");
        container.classList.add("area", item);
        container.appendChild(quantity);
        YboardContainer.appendChild(container);
    }

    if (YguardRight.length != 0) {
        var card = document.createElement("div");
        card.classList.add("card", "backside");

        var container = document.createElement("div");
        container.classList.add("area", "P");
        container.appendChild(card);
        YboardContainer.appendChild(container);
    }
    else {
        var container = document.createElement("div");
        container.classList.add("area", "P");
        YboardContainer.appendChild(container);
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && Xmessage.value != "") {
        var line = document.createElement("div");
        line.innerText = Xmessage.value;
        line.className = "Xmessage";
        chatOutput.insertBefore(line, chatOutput.firstChild);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        socket.emit("chat", {
            message: Xmessage.value,
            Yboard: Xboard,
            Yhand: Xhand,
            YguardLeft: XguardLeft,
            YguardRight: XguardRight
        })

        Xmessage.value = "";
    }
})

function draw() {
    XhandDraw();
    XboardDraw();
    YhandDraw();
    YboardDraw();
}

draw();

for (let card of cards) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

function dragStart(event) {
    dropFlag = false;
    event.target.style.opacity = 0.5;
    event.dataTransfer.setData("Text", event.target.style.backgroundImage.substring(12, 14));
}

function dragEnd(event) {
    if (!dropFlag) {
        event.target.style.opacity = 1;
    }
    else {
        event.target.style.display = "none"
    }
}

okButton.addEventListener("click", function () {
    socket.emit("chat", {
        message: "",
        Yboard: Xboard,
        Yhand: Xhand,
        YguardLeft: XguardLeft,
        YguardRight: XguardRight
    });
})

socket.on("chat", data => {
    if (data.message != "") {
        var line = document.createElement("div");
        line.innerText = data.message;
        line.className = "Ymessage";
        chatOutput.insertBefore(line, chatOutput.firstChild);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
    Yboard = data.Yboard;
    Yhand = data.Yhand;
    YguardLeft = data.YguardLeft;
    YguardRight = data.YguardRight;
    YboardDraw();
    YhandDraw();
})