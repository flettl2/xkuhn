function checkInput() {
    var input = document.getElementById("setup-input");
    var imgName = input.value;
    if (imgName) {
        var img = document.createElement("img");
        img.src = "./imgs/" + imgName + ".png";
        img.alt = imgName;
        img.style.width = "100%";
        img.style.height = "100%";
        var pokerTable = document.querySelector(".poker_table");
        pokerTable.innerHTML = "";
        pokerTable.appendChild(img);

        fetch('http://flettl2.github.io/xkuhn/data/kuhn_explained.json')
        .then(response => response.json())
        .then(data => {
            var scenario = imgName.replace(/_/g, ' ');
            var p = document.querySelector(".explain p");
            var explanationText = data[scenario].explain;
            explanationText = explanationText.replace(/\./g, '.<br><br>'); // Add a line break after each period.
            p.innerHTML = explanationText;  // Use innerHTML instead of textContent to parse the '<br>' as HTML.

            if (scenario.length % 2 === 0) {  // Hero is p1
                var hero = 'p1';
            }
            else {  // Hero is p2
                var hero = 'p2';
            }

            const plot_types = ['hist', 'bar'];
            const plyr_types = ['p1', 'p2'];

            for (const plot_type of plot_types) {
                for (const plyr_type of plyr_types) {
                    var plot_img = document.createElement("img");
                    if (hero === plyr_type) {
                        plot_img.src = "./imgs/" + imgName + "_" + plyr_type + "_" + "hero" + "_" + plot_type + ".png";
                    }
                    else {
                        plot_img.src = "./imgs/" + imgName + "_" + plyr_type + "_" + "vill" + "_" + plot_type + ".png";
                    }
                    
                    plot_img.alt = imgName;
                    plot_img.style.width = "100%";
                    plot_img.style.height = "100%";
                    var plot_img_section = document.querySelector("#" + plyr_type + "_" + plot_type);
                    plot_img_section.innerHTML = "";
                    plot_img_section.appendChild(plot_img);
                }
            }
        });
    }
}
