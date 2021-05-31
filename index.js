const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto('https://instagram.com/luksantonio_');
  
  const imgList = await page.evaluate(()=>{
    // toda função executada no browser
    const nodeList = document.querySelectorAll('article img');
    const imgArray = [...nodeList];
    const imgList = imgArray.map( ({src}) => ({
        src
    }));
    return imgList;
  })

  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('error!');
      console.log('done');
  })

  await browser.close();
})();

