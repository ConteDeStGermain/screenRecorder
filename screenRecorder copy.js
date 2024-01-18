require('dotenv').config()
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
// const { exec } = require('child_process');
const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const { execSync } = require('child_process');


const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  // let timeInSeconds = calculateTime(1);
  // console.log(timeInSeconds + ' second till 1 am...');
  // await wait(timeInSeconds*1000);

  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
  const page = await browser.newPage();
  await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fclassroom.google.com%2F&emr=1&followup=https%3A%2F%2Fclassroom.google.com%2F&ifkv=ASKXGp38XQD342-5MlElrLTgg7IAgglt6UixzE8dNhNGh8YoEeZdidrunhedzyLyId_408CDPPkg&passive=1209600&service=classroom&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-720719761%3A1704937311118373&theme=glif');
  // await page.goto('https://www.youtube.com/watch?v=c3PWsEh0Tzw');

  let urlGENERAL = 'https://meet.google.com/uom-cpsq-msk'
  let urlIFR = 'https://meet.google.com/ror-cryv-jaq'
  let urlLITsem = 'https://meet.google.com/zer-znyz-uwx'
  let urlDREPTcanonic = 'https://meet.google.com/nid-stwc-yan'
  let urlOMI = 'https://meet.google.com/pvk-jovy-vkn'
  let urlMIS = 'https://meet.google.com/kfk-ubsd-dxt'

  await wait(2000);

  await page.type('input[type^="email"]', process.env.EMAIL);
  await page.keyboard.press('Enter');

  await wait(5000);

  await page.type('input[type^="password"]', process.env.PASSWORD);
  await page.keyboard.press('Enter');

  await wait(3000);

  // home page a: onkcGd CbuVcc cGvavf QRiHXd fcsk5
  let arePeriferialsOFF = false;

  // let tab1 = await main(page, 0, arePeriferialsOFF, browser); // General
 

  // await page.bringToFront();
  await wait(5000);
  // let homeBTN = await page.$('a[class^="onkcGd CbuVcc cGvavf QRiHXd fcsk5"]');
  // await homeBTN.click();
  // let tab2 = await main(page, 7, arePeriferialsOFF, browser); // LIT
  // arePeriferialsOFF = true;
  // await record('marti_Liturgica', 1);
  // await tab2.close();


  // https://meet.google.com/uom-cpsq-msk // General
  // https://meet.google.com/ror-cryv-jaq ifr

  tab2 = await main(page, urlGENERAL, arePeriferialsOFF, browser); // IFR
  arePeriferialsOFF = true;
  await record('miercuri_spiritualitate', 0);


  await tab2.close()

  // await record('test', 1)
  // await page.bringToFront();
  // homeBTN = await page.$('a[class^="onkcGd CbuVcc cGvavf QRiHXd fcsk5"]');
  // await homeBTN.click();
  // tab2 = await main(page, 7, arePeriferialsOFF, browser); // MOR
  // await record('marti_Morala', 1); // Record for 2 hrs
  

  // await tab2.close();

  // await page.bringToFront();
  // homeBTN = await page.$('a[class^="onkcGd CbuVcc cGvavf QRiHXd fcsk5"]');
  // await homeBTN.click();
  // tab2 = await main(page, 12, arePeriferialsOFF, browser); // IFR
  // await record('marti_IFR', 1);

  // await tab2.close();

  // await tab2.close();

  await browser.close();

})();

async function record(name, is1Hour) {
  try {
    // Run the first pair of scripts
    execSync(`python winRecorder.py ${is1Hour}`);
    execSync(`python audio.py ${name}.wav`);
  
    console.log('All scripts executed successfully.');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  console.log(`stopped recording ${name} at ` + getCurrentTime());
}

async function main(page, meetURL, arePeriferialsOFF, browser) {
  // await wait(5000);

  // const classes = await page.$$(".onkcGd.ZmqAt.Vx8Sxd");
  // await classes[meetURL].click();

  const newPage = await browser.newPage();

  // Navigate to the desired URL in the new tab
  await newPage.goto(`${meetURL}`); // Morala

  await wait(5000);

  // let joinBtn = await page.$('a[aria-label="Participați"]');

  // if (joinBtn) {
    // const newPagePromise = new Promise(resolve => browser.once('targetcreated', async target => resolve(await target.page())))
    // await joinBtn.evaluate(el => el.click());

    // await wait(5000);

    // const newPage = await newPagePromise;

    //.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.LQeN7
    if (!arePeriferialsOFF) {
      await wait(3000);
      const noCamBtn = await newPage.$('button[class^="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-dgl2Hf"]');
      await noCamBtn.evaluate(el => el.click());
    }
    // go to recording button: VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 jEvJdc QJgqC
    // continue without camera button: VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-dgl2Hf ksBjEc lKxP2d LQeN7
    await wait(2000);
    const gotToLecturBtn = await newPage.$('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.jEvJdc.QJgqC')
    // const newerPagePromise = new Promise(resolve => browser.once('targetcreated', async target => resolve(await target.page())))
    await gotToLecturBtn.click()

    // const newerPage = await newPagePromise;
    return newPage;
  // } else {
  //   return undefined;
  // }
}

function calculateTime(startTime) {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(startTime, 0, 0, 0);

  // If the current time is already past 2 am, set the target time to 2 am of the next day
  if (now.getHours() >= 2) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  // Calculate the time difference in seconds
  let timeDifferenceInSeconds = Math.floor((targetTime - now) / 1000);

  // If the result is negative, adjust it for the next day
  if (timeDifferenceInSeconds < 0) {
    const nextDayTargetTime = new Date(targetTime);
    nextDayTargetTime.setDate(targetTime.getDate() + 1);
    timeDifferenceInSeconds = Math.floor((nextDayTargetTime - now) / 1000);
  }

  return timeDifferenceInSeconds;
}

function combineFile(name) {
  exec(`python combine.py ./video/${name}.mp4 ${name}.wav ${name}.mp4`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python script: ${error}`);
      return;
    }

    console.log(`Python script output:\n${stdout}`);

  });
}

function getCurrentTime() {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (12:00 AM)
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const currentTime = hours + ':' + formattedMinutes + ' ' + ampm;
  return currentTime;
}

// async function record(page, name) {
//   const recorder = new PuppeteerScreenRecorder(page, { fps: 48 });

//   const audioPromise = new Promise((resolve) => {
//     exec(`python audio.py ${name}.wav`, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error executing the Python script: ${error}`);
//         return;
//       }
//       resolve();
//     });
//   })

//   await recorder.start(`./video/${name}.mp4`)
//   await audioPromise;
//   await recorder.stop();
//   console.log(`stopped recording ${name} at ` + getCurrentTime())
// }