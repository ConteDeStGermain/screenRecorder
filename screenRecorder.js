require('dotenv').config()
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const { exec } = require('child_process');
const { resolve } = require('path');


const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });

  const page = await browser.newPage();
  // await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fclassroom.google.com%2F&emr=1&followup=https%3A%2F%2Fclassroom.google.com%2F&ifkv=ASKXGp38XQD342-5MlElrLTgg7IAgglt6UixzE8dNhNGh8YoEeZdidrunhedzyLyId_408CDPPkg&passive=1209600&service=classroom&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-720719761%3A1704937311118373&theme=glif');
  await page.goto('https://www.youtube.com/watch?v=3VfL1PH8D4A&ab_channel=FunkyScott47');
  await wait(10000);

  // await page.type('input[type^="email"]', process.env.EMAIL);
  // await page.keyboard.press('Enter');

  // await wait(2000);
  
  // await page.type('input[type^="password"]', process.env.PASSWORD);
  // await page.keyboard.press('Enter');
  const recorder = new PuppeteerScreenRecorder(page, {fps: 45});  

 const audioPromise = new Promise((resolve) => {
  exec('python audio.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python script: ${error}`);
      return;
    }

    console.log(`Python script output:\n${stdout}`);
    resolve();
  });
 })

  // exec('python audio.py', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing the Python script: ${error}`);
  //     return;
  //   }

  //   console.log(`Python script output:\n${stdout}`);
  // });
  
  await recorder.start('./video/simple.mp4')
  await audioPromise;
  await recorder.stop();


  await browser.close();
  exec('python combine.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python script: ${error}`);
      return;
    }

    console.log(`Python script output:\n${stdout}`);
    
  });
  
})();