ref_node = document.getElementsByTagName('fieldset')[0];
let my_btn = document.createElement("button");
my_btn.setAttribute("class", "centered");
my_btn.setAttribute("onClick", "copy_perks()");
my_btn.innerHTML = "Copy Perks";
ref_node.append(my_btn);

function copy_perks(){
    document.getElementById('perkstring').focus();
    navigator.clipboard.writeText(document.getElementById('perkstring').value);
}

document.getElementById("save").focus();