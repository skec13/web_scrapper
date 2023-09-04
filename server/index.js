////////////////////// dependencies /////////////////////////////
const puppeteer = require('puppeteer');
const fs = require('fs');
/////////////////////////////////////////////////////////////////

///////////////////// read json /////////////////////////////
const fileName = './public/data.json';
const file = require(fileName);




///////////////////////// product urls ////////////////////////////////
const intersportUrl1 = "https://www.intersport.si/catalogsearch/result/?q=lunargato";
const eleventeamsportUrl1 = "https://11teamsports.si/c/nogometni-cevlji-nike/model-lunargato";
const sportsdirectUrl1 = "https://sl.sportsdirect.com/searchresults?descriptionfilter=lunar%20gato";
const sportvisionUrl1 = "https://www.sportvision.si/izdelki?search=lunargato";
const rgolUrl1 = "https://www.r-gol.com/sl/search?phrase=lunargato&search_type=default";
//////////////////////////////////////////////////////////////////////

//////////////////////// scrap intersport ////////////////////////////////
async function scrapeIntersport(url) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const productsHandles = await page.$$('.products.list.items.product-items > .item.product.product-item');

    console.log("Intersport: " + productsHandles);


    for(const [index, producthandle] of productsHandles.entries()){
        let title = "Null";
        let price = "Null";
        let img = "Null";

        try{
            title = await page.evaluate((el) => el.querySelector(".product-item-link").textContent, producthandle);
        }catch(error){}

        try{
            price = await page.evaluate((el) => el.querySelector(".price").textContent, producthandle);
        }catch(error){}

        try{
            img = await page.evaluate((el) => el.querySelector(".product-image-photo ").getAttribute("src"), producthandle);
        }catch(error){}

        file.intersport.push({
            "title": title.trim(),
            "price": price.trim().replaceAll(" ", ""),
            "img": img.trim(),
            "sizes": ""

        });
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });



    }
  

    browser.close();
}
/////////////////////////////////////////////////////////////////////////

/////////////////////// scrap 11teamsports /////////////////////////
async function scrapeEleventeamsport(url) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const productsHandles = await page.$$('.product-grid-list > .product-box-item');
    
    console.log("Eleventeamsport: " + productsHandles);

    for(const [index, producthandle] of productsHandles.entries()){
        let title = "Null";
        let price = "Null";
        let img = "Null";
        let sizes = "Null";

        try{
            title = await page.evaluate((el) => el.querySelector(".product-box-title.mb-1").textContent, producthandle);
        }catch(error){}

        try{
            price = await page.evaluate((el) => el.querySelector(".col-auto.p-0.d-lg-flex.justify-content-lg-end").textContent, producthandle);
        }catch(error){}

        try{
            img = await page.evaluate((el) => el.querySelector(".px-2.position-absolute").getAttribute("src"), producthandle);
        }catch(error){}

        try{
            sizes = await page.evaluate((el) => el.querySelector(".product-box-sizes.text-center").textContent, producthandle);
        }catch(error){}


        file.eleventeamsport.push({
            "title": title.trim(),
            "price": price.trim().replaceAll(" ", ""),
            "img": img.trim(),
            "sizes": sizes

        });
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });
    
    }

    browser.close();
}
///////////////////////////////////////////////////////////////////

////////////////////// scrap sportsdirect /////////////////////////
async function scrapeSportsdirect(url) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const productsHandles = await page.$$('#navlist > li');

    console.log("Sportsdirect: " + productsHandles);
    
    for(const [index, producthandle] of productsHandles.entries()){
        let title = "Null";
        let price = "Null";
        let img = "Null";
        let sizes = "Null";

        try{
            title = await page.evaluate((el) => el.querySelector(".productdescriptionname").textContent, producthandle);
        }catch(error){}

        try{
            price = await page.evaluate((el) => el.querySelector(".CurrencySizeLarge.curprice").textContent, producthandle);
        }catch(error){}

        try{
            img = await page.evaluate((el) => el.querySelector(".rtimg.MainImage.img-responsive").getAttribute("src"), producthandle);
        }catch(error){}

        try{
            sizes = await page.evaluate((el) => el.querySelector(".sizeDetail").textContent, producthandle);
        }catch(error){}


        file.sportsdirect.push({
            "title": title.trim(),
            "price": price.trim().replaceAll(" ", ""),
            "img": img.trim(),
            "sizes": sizes

        });
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });

    }

    
    

    browser.close();
}
//////////////////////////////////////////////////////////////////

///////////////////// scrap sportvision /////////////////////////
async function scrapeSportvision(url) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const productsHandles = await page.$$('.row > .item-data');

    console.log("Sportvision: " + productsHandles);


    for(const [index, producthandle] of productsHandles.entries()){
        let title = "Null";
        let price = "Null";
        let img = "Null";

        try{
            title = await page.evaluate((el) => el.querySelector(".title").textContent, producthandle);
        }catch(error){}

        try{
            price = await page.evaluate((el) => el.querySelector(".current-price").textContent, producthandle);
        }catch(error){}

        try{
            img = await page.evaluate((el) => el.querySelector(".img-responsive.lozad.fade").getAttribute("src"), producthandle);
            img = "https://sportvision.si" + img;
        }catch(error){}


        file.sportvision.push({
            "title": title.trim(),
            "price": price.trim().replaceAll(" ", ""),
            "img": img.trim(),
            "sizes": ""
        });
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }


  

    browser.close();
}
/////////////////////////////////////////////////////////////////

///////////////////// scrap rgol /////////////////////////
async function scrapeRgol(url) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const productsHandles = await page.$$('.category-grid > .product-item');

    console.log("Rgol: " + productsHandles);


    for(const [index, producthandle] of productsHandles.entries()){
        let title = "Null";
        let price = "Null";
        let img = "Null";

        try{
            title = await page.evaluate((el) => el.querySelector(".product-item__product-name").textContent, producthandle);
        }catch(error){}

        try{
            price = await page.evaluate((el) => el.querySelector(".current-price").textContent, producthandle);
        }catch(error){}

        try{
            img = await page.evaluate((el) => el.querySelector(".img-fluid.image-for-product-brick").getAttribute("src"), producthandle);
        }catch(error){}


        file.rgol.push({
            "title": title.trim(),
            "price": price.trim().replaceAll(" ", ""),
            "img": img.trim(),
            "sizes": ""
        });
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }



  

    browser.close();
}
/////////////////////////////////////////////////////////////////


/////////////////////// function calls ///////////////////////////
function updateAll(){
    file.sportvision = [];
    file.intersport = [];
    file.eleventeamsport = [];
    file.sportsdirect = [];
    file.rgol = [];
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
    });
    scrapeIntersport(intersportUrl1);
    scrapeEleventeamsport(eleventeamsportUrl1);
    scrapeSportsdirect(sportsdirectUrl1);
    scrapeSportvision(sportvisionUrl1);
    scrapeRgol(rgolUrl1);
}

/////////////////////////////////////////////////////////////////

////////////////////////// add function to exports ///////////////////////////////////
module.exports.updateAll = updateAll;