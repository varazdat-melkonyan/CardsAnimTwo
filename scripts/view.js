const view = {
    createCard: (i, text, type, title, readMore) => {
        if ($(`#0 .text`).css("height") > "300px") {
            $(`#0 .text`).html(set.data[0].text.slice(0, 580).concat('...'));
        }
        else if (set.data[0].text.length > 650) {
            $(`#0 .text`).html(set.data[0].text.slice(0, 650).concat('...'));
        }

        if ($(`#${0} .title`).css("height") == "98px" && set.data[0].text.length > 550) {
            $(`#${0} .text`).css("top", "130px")
        }
        if(set.index == 0) {
            $(`#back .scrolImg`).addClass("disable");
        }
        
        let card = `
            <div id="${i}" class="card ${type}">
                <p class="title">${title}</p>
                <p class="text">${text}</p>
                <label onClick="readMore(${i})" class="readMore" style="display: none">${readMore}<label>
            </div>
        `;

        $("body").append(card);
        $(`#${i}`).css("margin-top", 2400 * i);

        if (text.length > 650) {
            $(`#${i} .readMore`).css("display", "flex");
        }
    },
    editCard: (i, text, title) => {
        if(set.index == 0) {
            $(`#back .scrolImg`).addClass("disable");
            $(`#next .scrolImg`).removeClass("disable");
        }
        else if (set.index == set.data.length - 1) {
            $(`#next .scrolImg`).addClass("disable");
            $(`#back .scrolImg`).removeClass("disable");
        }
        else if (set.index !=0 || set.index != set.data.length - 1) {
            $(`#next .scrolImg`).removeClass("disable");
            $(`#back .scrolImg`).removeClass("disable");
        }

        
        $(`#${i} .title`).html(title);

        if (title.length < 1 && text.length < 650) {
            $(`#${i} .text`).html(text);
            $(`#${i} .text`).css("top", "auto")
            $(`#${i} .readMore`).css("display", "none");
        }
        else if (title.length < 1 && text.length > 650) {
            $(`#${i} .text`).css("top", "auto")
            $(`#${i} .text`).html(text.slice(0, 650).concat('...'));
            $(`#${i} .readMore`).css("display", "flex");
        }
        else if ($(`#${i} .title`).css("height") == "49px" && text.length > 650) {
            $(`#${i} .text`).css("top", "auto");
            $(`#${i} .text`).html(text.slice(0, 580).concat('...'));
            $(`#${i} .readMore`).css("display", "flex");
        }
        else if (text.length > 650 && $(`#${i} .title`).css("height") == "98px") {
            $(`#${i} .text`).css("top", "130px");
            $(`#${i} .text`).html(text.slice(0, 550).concat('...'));
            $(`#${i} .readMore`).css("display", "flex");
        }
        else if($(`#${i} .title`).css("height") == "49px" && text.length < 650 && text.length > 400) {
            $(`#${i} .text`).css("top", "auto");
            $(`#${i} .text`).html(text);
            $(`#${i} .readMore`).css("display", "none");
        }
        else if ($(`#${i} .title`).css("height") == "98px" && text.length < 650 && text.length > 400) {
            $(`#${i} .text`).css("top", "130px");
            $(`#${i} .text`).html(text);
            $(`#${i} .readMore`).css("display", "none");
        }
        else if($(`#${i} .title`).css("height") == "49px" && text.length < 400 || $(`#${i} .title`).css("height") == "98px" && text.length < 400) {
            $(`#${i} .text`).css("top", "auto");
            $(`#${i} .text`).html(text);
            $(`#${i} .readMore`).css("display", "none");
        }
    },
    scrollCards: async (direction) => {
        if (direction > 0) {
            let count = -1;
            for(let i = set.index - 1; i < set.index + direction; i++)
            {
                $(`#${i}`).css("margin-top", 2400 * count);
                count++;
            }
        } else {
            let count = 1;
            for(let i = set.index + 1; i > set.index + direction; i--)
            {
                $(`#${i}`).css("margin-top", 2400 * count);
                count--;
            }
        }
        view.editCard(set.index, set.data[set.index].text, set.data[set.index].title);
        $(".card").removeClass("top center bottom");
        $(`#${set.index}`).addClass("center");
        
        
        
        if (direction > 0) {
            $(`#${set.index - 1}`).addClass("top");
            $(`#${set.index - 2}`).addClass("bottom");
            $(`#${set.index - 2}`).hide();
            setTimeout(() => {
            $(`#${set.index - 2}`).css("margin-top", "2400px");
            $(`#${set.index - 2}`).attr("id", set.index + 1);
            },10);

            setTimeout(() => {
                $(`#${set.index + 1}`).show();
            },100);
        } else {
            $(`#${set.index + 1}`).addClass("bottom");
            $(`#${set.index + 2}`).addClass("top");
            $(`#${set.index + 2}`).hide();
            setTimeout(() => {
            $(`#${set.index + 2}`).css("margin-top", "-2400px");
            $(`#${set.index + 2}`).attr("id", set.index - 1);
            },10);
            setTimeout(() => {
                $(`#${set.index - 1}`).show();
            },100);
        }
    },
    reset: (index) => {
        $(".top").css("margin-top", "-2400px");
        $(".center").css("margin-top", "0px");
        $(".bottom").css("margin-top", "2400px");
    }
}