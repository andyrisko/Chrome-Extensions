console.log("Hello from content.js");

var last_t_formula_bar_input;
var last_t_name_box;

document.addEventListener("mouseup", function () {
    var t_name_box = document.querySelector("#t-name-box").value;
    var t_formula_bar_input = document.querySelector("#t-formula-bar-input").textContent;
    if (last_t_formula_bar_input != t_formula_bar_input || last_t_name_box != t_name_box) {
        last_t_formula_bar_input = t_formula_bar_input;
        last_t_name_box = t_name_box;
        var script_application_sidebar_content = document.querySelector('body > div.script-application-sidebar > div.script-application-sidebar-content')
        if (script_application_sidebar_content && script_application_sidebar_content.hasChildNodes()) {
            (async () => {
                const response = await chrome.runtime.sendMessage({ t_name_box: t_name_box, t_formula_bar_input: t_formula_bar_input });
            })();
        } else {
            //console.log("no sidepanel");
        }
    } else {
        //console.log("no change");
    }

});

