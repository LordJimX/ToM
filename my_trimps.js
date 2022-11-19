function debug(text){
    console.log(text);
}

//----------------------------------------------------------------------------
// Customised zone
//----------------------------------------------------------------------------
// Auto Shield | Auto Staff | Auto DG | Get Perky
// Auto Weapon
let custo_zone1 = document.createElement("div");
custo_zone1.setAttribute("class", "row");
custo_zone1.innerHTML = '\
    <div class="col-xs-3" style="padding-right: 5px"></div>\
    <div class="col-xs-3 lowPad"></div>\
    <div class="col-xs-3 lowPad"></div>\
    <div class="col-xs-3" style="padding-left: 5px"></div>';
let custo_zone2 = document.createElement("div");
custo_zone2.setAttribute("class", "row");
custo_zone2.innerHTML = '\
    <div class="col-xs-3" style="padding-right: 5px"></div>\
    <div class="col-xs-3 lowPad"></div>\
    <div class="col-xs-3 lowPad"></div>\
    <div class="col-xs-3" style="padding-left: 5px"></div>';
document.getElementById("buildingsTitleDiv").insertBefore(custo_zone2, document.getElementById("buildingsTitleDiv").children[0]);;
document.getElementById("buildingsTitleDiv").insertBefore(custo_zone1, document.getElementById("buildingsTitleDiv").children[0]);;

//----------------------------------------------------------------------------
// Get Perky from current save
//----------------------------------------------------------------------------
let div_Perky = document.createElement("div");
div_Perky.setAttribute("id", "Perky");
div_Perky.setAttribute("class", "toggleConfigBtn pointer noselect settingBtn3 autoUpgradeBtn");
div_Perky.setAttribute("style", "display: block;");
custo_zone1.children[3].append(div_Perky);

let div_Perky_txt = document.createElement("div");
div_Perky_txt.setAttribute("id", "PerkyText");
div_Perky_txt.setAttribute("onClick", "get_Perky()");
div_Perky_txt.innerHTML = "Get Perky";
div_Perky.append(div_Perky_txt);

function get_Perky(){
    save_string = save(true);
    navigator.clipboard.writeText(save_string);
    portalClicked();
    tooltip('Import Perks', null, 'update');
    window.open("https://grimy.github.io/perks.html");
}


//----------------------------------------------------------------------------
// Staff upgrade
//----------------------------------------------------------------------------
var AutoStaffInterval;
var AutoStaffIntervalTime = 1000;
let div_autoStaff = document.createElement("div");
div_autoStaff.setAttribute("id", "autoStaff");
div_autoStaff.setAttribute("class", "toggleConfigBtn pointer noselect settingBtn3 autoUpgradeBtn");
div_autoStaff.setAttribute("style", "display: block;");
custo_zone1.children[1].append(div_autoStaff);

let div_autoStaff_txt = document.createElement("div");
div_autoStaff_txt.setAttribute("id", "autoStaffText");
div_autoStaff_txt.setAttribute("onClick", "Staff_auto_upgrade()");
div_autoStaff_txt.innerHTML = "Auto Staff";
div_autoStaff.append(div_autoStaff_txt);

function Staff_auto_upgrade(){
    debug("Start buying Staff mod");
    toggleHeirlooms();
    AutoStaffInterval = setInterval(buy_nextStaff_upgrade, AutoStaffIntervalTime);
}

function buy_nextStaff_upgrade(){
    // open Heilooms window
    selectHeirloom(-1,'StaffEquipped', this)
    // get mods rates
    fluffy_rate = -1;
    miner_rate = -1;
    explorer_rate = -1;
    lumber_rate = -1;
    farmer_rate = -1;
    dragimp_rate = -1;
    metal_rate = -1;
    fragment_rate = -1;
    mods = document.getElementById("selectedHeirloom").children[0].getElementsByTagName('span');
    for (let mod of mods){
        if (mod.innerHTML.includes("Fluffy")){
            fluffy_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            fluffy_span = mod;
        }
        else if (mod.innerHTML.includes("Miner")){
            miner_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            miner_span = mod;
        }
        else if (mod.innerHTML.includes("Explorer")){
            explorer_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            explorer_span = mod;
        }
        else if (mod.innerHTML.includes("Lumber")){
            lumber_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            lumber_span = mod;
        }
        else if (mod.innerHTML.includes("Farmer")){
            farmer_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            farmer_span = mod;
        }
        else if (mod.innerHTML.includes("Dragimp")){
            dragimp_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            dragimp_span = mod;
        }
        else if (mod.innerHTML.includes("Metal")){
            metal_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            metal_span = mod;
        }
        else if (mod.innerHTML.includes("Fragment")){
            fragment_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            fragment_span = mod;
        }
    }

    // get mods affordable
    txt = document.getElementById("selectedHeirloom").innerHTML;
    ind = txt.indexOf("% Pet") - fluffy_rate.toString().length;
    fluffy_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Miner") - miner_rate.toString().length;
    miner_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Explorer") - explorer_rate.toString().length;
    explorer_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Lumber") - lumber_rate.toString().length;
    lumber_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Farmer") - farmer_rate.toString().length;
    farmer_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Dragimp") - dragimp_rate.toString().length;
    dragimp_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Metal") - metal_rate.toString().length;
    metal_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Fragment") - fragment_rate.toString().length;
    fragment_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;

    if (fluffy_affordable){
        fluffy_span.click();
        upgradeMod(true, 1);
        debug("Buy fluffy")
        return true;
    }
    if (miner_affordable){
        miner_span.click();
        upgradeMod(true, 1);
        debug("Buy miner");
        return true;
    }
    if (explorer_affordable){
        explorer_span.click();
        upgradeMod(true, 1);
        debug("Buy explorer");
        // no return, so that explorer and fragment are bought in paralell
    }
    if (fragment_affordable){
        fragment_span.click();
        upgradeMod(true, 1);
        debug("Buy fragment");
        return true;
    }
    if (lumber_affordable){
        lumber_span.click();
        upgradeMod(true, 1);
        debug("Buy lumber");
        return true;
    }
    if (metal_affordable){
        metal_span.click();
        upgradeMod(true, 1);
        debug("Buy metal");
        return true;
    }
    if (farmer_affordable){
        farmer_span.click();
        upgradeMod(true, 1);
        debug("Buy farmer");
        return true;
    }
    if (dragimp_affordable){
        dragimp_span.click();
        upgradeMod(true, 1);
        debug("Buy dragimp");
        return true;
    }
    clearInterval(AutoStaffInterval);
    debug("No more Staff mod affordable");
    toggleHeirlooms();
}

//----------------------------------------------------------------------------
// Shield upgrade
//----------------------------------------------------------------------------
// settings
var first_buy_one_void_map = true; // buy one VM mod, before buying attach mods
var buy_while_one_affordable = true; // after buying attack mods, buy others while one is affordable

var AutoShieldInterval;
var AutoShieldIntervalTime = 1000;
let div_autoShield = document.createElement("div");
div_autoShield.setAttribute("id", "autoShield");
div_autoShield.setAttribute("class", "toggleConfigBtn pointer noselect settingBtn3 autoUpgradeBtn");
div_autoShield.setAttribute("style", "display: block;");
custo_zone1.children[0].append(div_autoShield);

let div_autoShield_txt = document.createElement("div");
div_autoShield_txt.setAttribute("id", "autoShieldText");
div_autoShield_txt.innerHTML = "Auto Shield";
div_autoShield_txt.setAttribute("onClick", "Shield_auto_upgrade()");
div_autoShield.append(div_autoShield_txt);

function Shield_auto_upgrade(){
    debug("Start buying Shield mod");
    first_void_map_bought = !first_buy_one_void_map;
    toggleHeirlooms();
    AutoShieldInterval = setInterval(buy_nextShield_upgrade, AutoShieldIntervalTime);
}

function buy_nextShield_upgrade(){
    // open Heilooms window
    selectHeirloom(-1,'ShieldEquipped', this)
    // get mods rates
    attack_rate = -1;
    crit_chance_rate = -1;
    crit_damage_rate = -1;
    void_map_rate = -1;
    plague_rate = -1;
    health_rate = -1;
    breed_rate = -1;
    mods = document.getElementById("selectedHeirloom").children[0].getElementsByTagName('span');
    for (let mod of mods){
        if (mod.innerHTML.includes("Trimp Attack")){
            attack_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            attack_span = mod;
        }
        else if (mod.innerHTML.includes("Crit Chance")){
            crit_chance_rate = parseFloat(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            crit_chance_span = mod;
        }
        else if (mod.innerHTML.includes("Crit Damage")){
            crit_damage_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            crit_damage_span = mod;
        }
        else if (mod.innerHTML.includes("Void Map")){
            void_map_rate = parseFloat(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            void_map_span = mod;
        }
        else if (mod.innerHTML.includes("Plaguebringer")){
            plague_rate = parseFloat(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            plague_span = mod;
        }
        else if (mod.innerHTML.includes("Trimp Health")){
            health_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            health_span = mod;
        }
        else if (mod.innerHTML.includes("Breed Speed")){
            breed_rate = parseInt(mod.innerHTML.substring(0, mod.innerHTML.indexOf('%')));
            breed_span = mod;
        }
    }
    // get mods affordable
    txt = document.getElementById("selectedHeirloom").innerHTML;
    ind = txt.indexOf("% Trimp Attack") - attack_rate.toString().length;
    attack_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Crit Chance") - crit_chance_rate.toString().length;
    crit_chance_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Crit Damage") - crit_damage_rate.toString().length;
    crit_damage_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Plaguebringer") - plague_rate.toString().length;
    plague_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Trimp Health") - health_rate.toString().length;
    health_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Breed Speed") - breed_rate.toString().length;
    breed_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;
    ind = txt.indexOf("% Void Map") - void_map_rate.toString().length;
    void_map_affordable = txt.substring(ind - 65, ind - 64) === "!" && ind > 0;

    attack_lvl = (attack_rate - 356) / 8;
    attack_cost = 2500 * 1.04 ** attack_lvl;
    crit_chance_lvl = (crit_chance_rate - 30) / 0.5;
    crit_chance_cost = 2500 * 1.04 ** crit_chance_lvl;
    crit_damage_lvl = (crit_damage_rate - 650) / 15;
    crit_damage_cost = 2500 * 1.04 ** crit_damage_lvl;

    function attack_mod(att, crit_ch, crit_dam){
        red_crit_ch_rate = 50 + 50 + (30 + 0.5 * crit_ch) * 1.5 - 200;
        or_crit_ch_rate = 100 - red_crit_ch_rate;
        crit_dam_rate = 650 + crit_dam * 15;
        att_rate = 356 + att * 8;
        return att_rate * (red_crit_ch_rate * 64 + or_crit_ch_rate * 8) * crit_dam_rate / 100;
    }

    attack_gain = attack_mod(attack_lvl + 1, crit_chance_lvl, crit_damage_rate) / attack_cost;
    crit_chance_gain = attack_mod(attack_lvl, crit_chance_lvl + 1, crit_damage_rate) / crit_chance_cost;
    crit_damage_gain = attack_mod(attack_lvl, crit_chance_lvl, crit_damage_rate + 1) / crit_damage_cost;
    /*debug(attack_gain);
    debug(crit_chance_gain);
    debug(crit_damage_gain);
    debug(attack_affordable);
    debug(crit_chance_affordable);
    debug(crit_damage_affordable);*/

    if (void_map_affordable && !first_void_map_bought){
        void_map_span.click();
        upgradeMod(true, 1);
        first_void_map_bought = true;
        debug("Buy VM");
    }
    else if (attack_gain >= crit_chance_gain && attack_gain >= crit_damage_gain && attack_affordable){
        attack_span.click();
        upgradeMod(true, 1);
        debug("Buy attack");
    }
    else if (crit_chance_gain >= crit_damage_gain && crit_chance_affordable){
        crit_chance_span.click();
        upgradeMod(true, 1);
        debug("Buy crit_chance");
    }
    else if (crit_damage_affordable){
        crit_damage_span.click();
        upgradeMod(true, 1);
        debug("Buy crit_dam");
    }
    else if (attack_gain >= crit_chance_gain && attack_affordable){
        // case crit_chance < attack < crit_dam but crit_dam not affordable
        attack_span.click();
        upgradeMod(true, 1);
        debug("Buy attack");
    }
    else if (crit_chance_affordable){
        // case attack < crit_chance < crit_dam but crit_dam not affordable
        crit_chance_span.click();
        upgradeMod(true, 1);
        debug("Buy crit_chance");
    }
    else if (attack_affordable){
        // case attack < crit_chance < crit_dam but crit_dam and crit_chance not affordable
        attack_span.click();
        upgradeMod(true, 1);
        debug("Buy attack");
    }
    // cases no more attach mods affordable
    else if (void_map_affordable && buy_while_one_affordable){
        void_map_span.click();
        upgradeMod(true, 1);
        debug("Buy void_map");
    }
    else if (plague_affordable && buy_while_one_affordable){
        plague_span.click();
        upgradeMod(true, 1);
        debug("Buy plague");
    }
    else if (health_affordable && buy_while_one_affordable){
        health_span.click();
        upgradeMod(true, 1);
        debug("Buy health");
    }
    else if (breed_affordable && buy_while_one_affordable){
        breed_span.click();
        upgradeMod(true, 1);
        debug("Buy breed");
    }
    else{
        clearInterval(AutoShieldInterval);
        debug("No more Shield mod affordable");
        toggleHeirlooms();
    }
}

//----------------------------------------------------------------------------
// DG & Nature auto upgrade
//----------------------------------------------------------------------------
var AutoDGInterval;
var AutoDGIntervalTime = 1000;
var AutoNatureIntervalTime = 1000;

let div_autoDG = document.createElement("div");
div_autoDG.setAttribute("id", "autoDG");
div_autoDG.setAttribute("class", "toggleConfigBtn pointer noselect settingBtn3 autoUpgradeBtn");
div_autoDG.setAttribute("style", "display: block;");
custo_zone1.children[2].append(div_autoDG);

let div_autoDG_txt = document.createElement("div");
div_autoDG_txt.setAttribute("id", "autoDGText");
div_autoDG_txt.innerHTML = "Auto DG & Nature";
div_autoDG_txt.setAttribute("onClick", "DG_auto_upgrade()");
div_autoDG.append(div_autoDG_txt);

function DG_auto_upgrade(){
    debug("Start buying DG upgrade");
    tooltip("Upgrade Generator", null, "update");
    AutoDGInterval = setInterval(buy_next_DG_upgrade, AutoDGIntervalTime);
    document.getElementById("natureA").click();
    AutoNatureInterval = setInterval(buy_next_nature_upgrade, AutoNatureIntervalTime);
    document.getElementById("allA").click();
}

function buy_next_nature_upgrade(){
    while (document.getElementById("natureUpgradePoisonCost").children[0].classList.contains("green")){
        debug('Buy Poison');
        naturePurchase('upgrade', 'Poison');
    }
    while (document.getElementById("natureUpgradeWindCost").children[0].classList.contains("green")){
        debug('Buy Wind');
        naturePurchase('upgrade', 'Wind');
    }
    while (document.getElementById("natureUpgradeIceCost").children[0].classList.contains("green")){
        debug('Buy Ice');
        naturePurchase('upgrade', 'Ice');
    }
    clearInterval(AutoNatureInterval);
}

function buy_next_DG_upgrade(){
    effi_lvl = parseInt(document.getElementById('generatorUpgradeEfficiency').innerHTML.substring(14));
    capa_lvl = parseInt(document.getElementById('generatorUpgradeCapacity').innerHTML.substring(12));
    supp_lvl = parseInt(document.getElementById('generatorUpgradeSupply').innerHTML.substring(10));
    over_lvl = parseInt(document.getElementById('generatorUpgradeOverclocker').innerHTML.substring(15));
    effi_cost = 8 * (effi_lvl + 1);
    capa_cost = 32 * (capa_lvl + 1);
    supp_cost = 64 * (supp_lvl + 1);
    over_cost = 512 + 32 * over_lvl;
    effi_affordable = document.getElementById('generatorUpgradeEfficiency').classList.contains("thingColorCanAfford");
    capa_affordable = document.getElementById('generatorUpgradeCapacity').classList.contains("thingColorCanAfford");
    supp_affordable = document.getElementById('generatorUpgradeSupply').classList.contains("thingColorCanAfford");
    over_affordable = document.getElementById('generatorUpgradeOverclocker').classList.contains("thingColorCanAfford");

    function trimps_added(effi, capa, over){
        return Math.floor(Math.sqrt(3 + 0.4 * capa) * 5e8 * (1 + 0.1 * effi)) * (1 - 0.5 * 0.99 ** (over - 1));
    }

    effi_gain = trimps_added(effi_lvl + 1, capa_lvl, over_lvl) / effi_cost;
    capa_gain = trimps_added(effi_lvl, capa_lvl + 1, over_lvl) / capa_cost;
    over_gain = trimps_added(effi_lvl, capa_lvl, over_lvl + 1) / over_cost;
    if (effi_gain >= capa_gain && effi_gain >= over_gain && effi_affordable){
        buyGeneratorUpgrade("Efficiency");
        debug('Buy Efficiency');
    }
    else if (capa_gain >= over_gain && capa_affordable){
        buyGeneratorUpgrade("Capacity");
        debug('Buy Capacity');
    }
    else if (over_affordable){
        buyGeneratorUpgrade("Overclocker");
        debug('Buy Overclocker');
    }
    else if (supp_affordable){
        buyGeneratorUpgrade("Supply");
        debug('Buy Supply');
    }
    else{
        debug('No more DG upgrade affordable');
        clearInterval(AutoDGInterval);
        cancelTooltip();
    }
}

//----------------------------------------------------------------------------
// Show nature in offline mode
//----------------------------------------------------------------------------
function get_nature(zone){
    if (zone < 236)
        return "No nature yet";
    if ((zone - 1) % 15 < 5)
        return "Wind";
    if ((zone - 1) % 15 < 10)
        return "Ice";
    return "Poison";
}

var zone = parseInt(document.getElementById("offlineZoneNumber").innerHTML.substring(5));
var div_nature = document.createElement("div");
div_nature.innerHTML = get_nature(zone);
document.getElementById("offlineZoneNumber").parentNode.append(div_nature);

// Mise en place surveillance zone
const targetNode = document.getElementById("offlineZoneNumber");

// Options for the observer (which mutations to observe)
const config = {attributes: true, childList: true, subtree: true};

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer)
{
  for(let mutation of mutationsList)
    new_zone = parseInt(document.getElementById("offlineZoneNumber").innerHTML.substring(5));
    if (new_zone != zone){
        zone = new_zone;
        div_nature.innerHTML = get_nature(zone);
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);


//----------------------------------------------------------------------------
// Built a button to equip with the most efficient equipments while affordable
//----------------------------------------------------------------------------
var health = ['Boots', 'Helmet', 'Pants', 'Shoulderguards', 'Breastplate', 'Gambeson'];
var attack = ['Dagger', 'Mace', 'Polearm', 'Battleaxe', 'Greatsword', 'Arbalest'];
var option = "Weapon";
var AutoMaxEquipInterval;
var AutoMaxEquipIntervalTime = 100;

var element = custo_zone2.children[3];

let div1 = document.createElement("div");
div1.setAttribute("id", "autoWeapon");
div1.setAttribute("class", "toggleConfigBtn pointer noselect settingBtn3 autoUpgradeBtn");
div1.setAttribute("style", "display: block;");
element.append(div1);

let div2 = document.createElement("div");
div2.setAttribute("id", "autoWeaponText");
div2.innerHTML = "Auto Weapon";
div2.setAttribute("onClick", "switchOption()");
div1.append(div2);

let div3 = document.createElement("div");
div3.setAttribute("onClick", "autoMaxEquipment()");
let span = document.createElement("span");
span.setAttribute("class", "glyphicon glyphicon-play");
div3.append(span);
div1.append(div3);

function switchOption(){
    switch (option){
        case "Weapon":
            option = "Armor";
            div2.innerHTML = "Auto Armor";
            break;
        case "Armor":
            option = "All";
            div2.innerHTML = "Auto All";
            break;
        case "All":
            option = "Weapon";
            div2.innerHTML = "Auto Weapon";
            break;
    }
}

function autoMaxEquipment(){
    debug("Start buying max " + option);
    document.getElementById('equipmentHere').scrollIntoView();
    AutoMaxEquipInterval = setInterval(buyBestEquip, AutoMaxEquipIntervalTime);
}

function buyBestEquip(){

    buyAffordWeapon = false;
    buyAffordArmor = false;

    if (option != "Armor")
        for (const weap of attack){
            wElement = document.getElementById(weap);
            if (wElement.classList.contains("efficientYes") && wElement.classList.contains("thingColorCanAfford")){
                buyAffordWeapon = true;
                buyEquipment(weap, true, true);
                break;
            }
        }
    if (option != "Weapon")
        for (const arm of health){
            aElement = document.getElementById(arm);
            if (aElement.classList.contains("efficientYes") && aElement.classList.contains("thingColorCanAfford")){
                buyAffordArmor = true;
                buyEquipment(arm, true, true);
                break;
            }
        }

    if (!buyAffordWeapon && !buyAffordArmor){
        clearInterval(AutoMaxEquipInterval);
        debug("Stop buying max " + option);
    }
}