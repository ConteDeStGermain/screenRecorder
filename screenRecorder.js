require('dotenv').config()
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const { exec } = require('child_process');


const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  // let startTime = 1;
  // let timeInSeconds = calculateTime(startTime);
  // console.log(timeInSeconds + ` second till ${startTime} am...`);
  // await wait(timeInSeconds*1000);

  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
  const page = await browser.newPage();
  await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fclassroom.google.com%2F&emr=1&followup=https%3A%2F%2Fclassroom.google.com%2F&ifkv=ASKXGp38XQD342-5MlElrLTgg7IAgglt6UixzE8dNhNGh8YoEeZdidrunhedzyLyId_408CDPPkg&passive=1209600&service=classroom&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-720719761%3A1704937311118373&theme=glif');

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

  let arePeriferialsOFF = false;

  let tab1 = await main(page, urlGENERAL, arePeriferialsOFF, browser); // IFR
  arePeriferialsOFF = true;
  await record('joi_omiletica', 0, tab1, urlGENERAL);

  // await tab1.close()

  // let tab2 = await main(page, urlDREPTcanonic, arePeriferialsOFF, browser); // IFR
  // arePeriferialsOFF = true;
  // await record('joi_DreptCanonic', 0);

  // await tab2.close()

  await browser.close();
})();

function runScript(script) {
  return new Promise((resolve, reject) => {
    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

async function record(name, is1Hour, page, meetURL) {
  try {
    await Promise.all([
      runScript(`python winRecorder.py ${is1Hour}`),
      // runScript(`python audio.py ${name}.wav ${is1Hour}`),
      (async function monitorDisconnection(meetURL) {
        while (true) {
          await checkAndReloadPage(page, meetURL);
          await new Promise(resolve => setTimeout(resolve, 60000)); // Check every 60 seconds
        }
      })(meetURL)
    ]);


    console.log('All scripts executed successfully.');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  console.log(`stopped recording ${name} at ` + getCurrentTime());
}


async function checkAndReloadPage(page, meetURL) {
  const isDisconnected = await page.evaluate(() => document.body.innerText.includes("No camera found"));
  if (isDisconnected) {
    await page.goto(`${meetURL}`);
  }
}

async function main(page, meetURL, arePeriferialsOFF, browser) {
  const newPage = await browser.newPage();

  
  await newPage.goto(`${meetURL}`); 

  await wait(5000);
  if (!arePeriferialsOFF) {
    await wait(3000);
    const noCamBtn = await newPage.$('button[class^="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-dgl2Hf"]');
    await noCamBtn.evaluate(el => el.click());
  }
  // go to recording button: VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 jEvJdc QJgqC
  // continue without camera button: VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-dgl2Hf ksBjEc lKxP2d LQeN7

  await wait(2000);
  const gotToLecturBtn = await newPage.$('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.jEvJdc.QJgqC')

  await gotToLecturBtn.click()
  return newPage;
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