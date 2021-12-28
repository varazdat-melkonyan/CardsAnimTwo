let set = { index: 0, readMore: "" };
let anim;
const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function onLoad() {
    view.createCard(-1, "",              "left",    "",                set.readMore);
    view.createCard(0, set.data[0].text, "center",  set.data[0].title, set.readMore);
    view.createCard(1, set.data[1].text, "right",   set.data[1].title, set.readMore);

    $("body").mousedown(function (e) {
        mousedown(e)
    });

    $("body").mousemove(function (e) {
        mousemove(e, this);
    })

    $("body").mouseup(function (e) {
        mouseup(e);
    });

    loader.toggle();
}

$(async () => {
    let path = parser.getParams();
    await $.get(path, async function (json) {
        anim = json.anim;
        set.data = json.data;
        set.readMore = json.readmore;
        let style =  document.getElementById("style");
        style.onload = onLoad;
        style.href = `styles/${json.style}.css`;
        if (json.anim != undefined) {
            let styleAnim =  document.getElementById("styleAnim");
            styleAnim.href = `styles/${json.anim}.css`;
        }
    });
});

const scrollCards = (direction) => {
    let newIndex = set.index + direction;

    if (newIndex < 0 || newIndex >= set.data.length) {
        return;
    }
    else {
        $(`.scrollBtn`).css("pointer-events", "none").prop("disabled", true);

        set.index += direction;
        view.scrollCards(direction);

        setTimeout(() => {
            $(`.scrollBtn`).css("pointer-events", "auto").removeAttr("disabled");
        }, 500);
    }
}

function readMore() {
    if (set.data[set.index].text.length > 650 && set.data[set.index].title.length < 1) {
        $(`#${set.index} .text`).css("top", "auto");
        $(`#${set.index} .text`).css("height", "auto");
        $(`#${set.index} .text`).css("overflow", "auto");
        $(`#${set.index} .text`).html(set.data[set.index].text);
        $(`#${set.index} .readMore`).css("display", "none");
    }
    else {
        if ($(`#${set.index} .title`).css("height") == "98px") {
            $(`#${set.index} .text`).css("top", "130px");
        }
        else if ($(`#${set.index} .title`).css("height") == "49px" && set.data[set.index].text.length < 650) {
            $(`#${set.index} .text`).css("top", "auto");
        }
        $(`#${set.index} .text`).css("max-height", "300px");
        $(`#${set.index} .text`).css("height", "auto");
        $(`#${set.index} .text`).css("overflow", "auto");
        $(`#${set.index} .text`).html(set.data[set.index].text);
        $(`#${set.index} .readMore`).css("display", "none");
    }
}

const reset = (index) => {
    view.reset();
}

let drag = { mouseDownPos: 0, start: 0, end: 0, ended: false };
let area = { x: 0 };
let inMotion = false;
let coolDown = false;

const mousedown = async (e) => {
    if (!drag.ended && coolDown == false) {
        drag.mouseDownPos = e.pageX;
        drag.start = e.pageX;
        drag.ended = true;
    }
}

const mousemove = (e) => {
    if (drag.ended) {
        area.x = e.pageX - drag.start;
        $(`.card`).css("transition", `none`);

        $(".card").each(function (i) {
            let margin = parseFloat($(this).css("margin-left"));
            $(this).css("margin-left", margin + area.x);
        });

        drag.start = e.pageX;
        $(`.card`).css("transition", `0.5s`);
    }

    if (e.pageX <= 70 || e.pageX >= window.innerWidth - 70) {
        mouseup(e);
    }
    if (($(`#-1`).css("margin-left") < "-1800px" || $(`#${set.data.length}`).css("margin-left") < "1800")) {
        mouseup(e);
    }
}

const mouseup = (e) => {
    if (drag.ended) {
        drag.end = e.pageX;
        drag.ended = false;

        let difference = drag.end - drag.mouseDownPos;
        if (Math.abs(difference) >= 150) {
            let direction = -Math.sign(difference);
            let newIndex = set.index + direction;

            if (newIndex < 0 || newIndex >= set.data.length) {
                reset();
                return;
            }

            coolDown = true;
            scrollCards(direction);
            setTimeout(() => coolDown = false, 500);
        } else {
            reset();
        }
    }
}