const express = require('express');
const sys = require('sys');
const app = express();
const port = 8080;
const fs= require('fs');

/*files.sort(function(a, b) {
  var aIsDir = fs.statSync(dir + "/" + a).isDirectory(),
  bIsDir = fs.statSync(dir + "/" + b).isDirectory();
  if (aIsDir && !bIsDir) {
  return -1;
  }
  if (!aIsDir && bIsDir) {
  return 1;
  }
  return a.localCompare(b);
  }).forEach(printBr);
*/
app.get('/file-explorer', (req, res) => 
{
    const myArgs = process.argv.slice(2);
    console.log('myArgs: ', myArgs[0], myArgs[1]);

    fs.readFile('FileExplorer.html', 'utf8', function(err,data)
    {
      if (err){
                console.log('Erreur de lecture du fichier FileExplorer.html : '+ err + "\n");
              }  
      else    {
                res.send(data);
              }
    })
})

app.get('/FileExplorer', function(_req, res)
{
    fs.readFile('FileExplorer.css','utf8', function(err,data)
    {
        if (err)
              {
                  console.log('Erreur de lecture du fichier FileExplorer.css : ' + err + "\n");
              }  
        else  {
                  res.setHeader("Content-Type", "text/css");
                  console.log(data);
                  res.send(data);
              }
    })
})


app.get('/ChevronDroit', function(_req, res)
{
    fs.readFile('Img/icons8-flèche-droite-48.png', function(err,data)
    {
        if (err)
              {
                  console.log('Erreur de lecture du fichier chevron-droit.png : ' + err + "\n");
              }  
        else  {
                  console.log("Chargement chevron\n");
                  res.setHeader("Content-Type", 'image/png');
                  res.send(data);
              }
    })
})

const {Builder, By, Key, util} = require('selenium-webdriver');

(async function launchExplorer() {
  let driver = await new Builder().forBrowser('firefox').build();
  try        {
                  driver.manage().window().maximize();
                  await driver.get('http://localhost:8080/file-explorer');
                  
              } 
  catch(err) {
                  console.log("Erreur geckodriver: " + err + "\n");
                  await driver.quit();
             }
})();


app.listen(port, () => 
{
  console.log('Serveur en écoute sur le port:%d',port);
})