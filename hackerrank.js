let pup = require("puppeteer");

let gPage;
let gBrowser;
let email = "sayor94525@pidhoes.com";
let pass = "pidhoes";
let codeObj = {};

pup
    .launch({
        headless: false,
        defaultViewport:null,
        args:["--start-maximized"],
        //to slow the process
        slowMo: 50,
    })
    .then(function (browser){
        gBrowser = browser;
        return browser.pages();
    })

    .then(function (pagesArr){
        gPage = pagesArr[0];
        return gPage.goto("https://www.hackerrank.com/auth/login");
    })
    .then(function(){
        return gPage.type("#input-1",email);
    })
    .then(function(){
        return gPage.type("#input-2",pass);
    })
    .then(function(){
        return Promise.all([
            gPage.waitForNavigation(),
            gPage.click('[data-analytics="LoginPassword"]'),
          ]);
    })
    .then(function(){
        return Promise.all([
            gPage.waitForNavigation(),
            gPage.click("[data-attr1='interview-preparation-kit']"),
          ]);
    })
    .then(function(){
        return gPage.waitForSelector("[data-attr1='warmup']");
    })
    .then(function(){
        return Promise.all([
            gPage.waitForNavigation(),
            gPage.click("[data-attr1='warmup']"),
        ]);
    })
    .then(function(){
        return gPage.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
    })
    .then(function(){
        return Promise.all([
            gPage.waitForNavigation(),
            gPage.click(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"),
        ]);
    })
    .then(function(){
        return gPage.waitForSelector("[data-attr2='Editorial']");
    })
    .then(function(){
        return Promise.all([
            gPage.waitForNavigation(),
            gPage.click("[data-attr2='Editorial']"),
        ]);
    })
    .then(function(){
        return handleLockBtn(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
    })
    .then(function(){
        return gPage.evaluate(function(){
            let allCodes = document.querySelectorAll(".challenge-editorial-block.editorial-setter-code .highlight");
            let allLanguages = document.querySelectorAll(".challenge-editorial-block.editorial-setter-code h3");
            let obj={};
            obj.code = allCodes[0].innerText;
            obj.language = allLanguages[0].innerText;
            return obj;
        });
    })
    .then(function(obj){
        codeObj=obj;
        // console.log(obj);
        return Promise.all([
            gPage.waitForNavigation(),
            gPage.click("[data-attr2='Problem']"),
        ]);
    })
    .then(function(){
        return gPage.waitForSelector(".css-1hwfws3");
    })
    .then(function(){
        return gPage.click(".css-1hwfws3");
    })
    .then(function(){
        return gPage.waitForSelector(".css-ki0glp");
    })
    .then(function(){
        return gPage.type(".css-ki0glp",codeObj.language);
    })
    .then(function(){
        return gPage.keyboard.press("Enter");
    })
    .then(function(){
        return gPage.click(".checkbox-input");
    })
    .then(function(){
        return gPage.type(".input.text-area.custominput.auto-width",codeObj.code);
    })
    .then(function () {
        return gPage.keyboard.down("Control");
    })
    .then(function(){
        return gPage.keyboard.press("KeyA");
    })
    .then(function(){
        return gPage.keyboard.press("KeyX");
    })
    .then(function(){
        return gPage.keyboard.up("Control");
    })
    .then(function(){
        return gPage.click(".view-lines");
    })
    .then(function(){
        return gPage.keyboard.down("Control");
    })
    .then(function(){
        return gPage.keyboard.press("KeyA");
    })
    .then(function(){
        return gPage.keyboard.press("KeyV");
    })
    .then(function(){
        return gPage.keyboard.up("Control");
    })
    .then(function(){
        return gPage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    })
    .catch(function(err){
        console.log(err);
    })

    

function handleLockBtn(selector){
    return new Promise(function(resolve,reject){
        gPage.waitForSelector(selector).then(function(){
            return gPage.click(selector);
        })
        .then(function(){
            //lock btn is clicked
            resolve();
        })
        .catch(function(err){
            resolve();
        })
    })
}