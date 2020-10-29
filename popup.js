let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  console.log("longer click check what");

   /* A function creator for callbacks */
  function doStuffWithDOM(element) {
    alert("I received the following DOM content:\n" + element);
    var test = document.getElementById("testhere");
    test.innerHTML = element;
  }


  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: "report_back" }, doStuffWithDOM);
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

const background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
  // Do something, e.g. send a message to content or background script
  background.console.log('test background');
});