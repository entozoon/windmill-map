const tidyText = (s) => {
  return s.replace(/(<([^>]+)>)/gi, "");
};
const stripHTML = (html) => {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
};
const extractTable = (html) => {
  // const found = html.match(/<table(.*)+<\/table>/);
  const found = html.match(/<table([\s\S]*?)<\/table>/g);
  // console.log(found);
  if (!found) return "";
  return found[0];
};
const tableToJson = (table) => {
  var data = [];
  // first row needs to be headers
  var headers = [];
  for (var i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML
      .toLowerCase()
      .replace(/ /gi, "");
  }
  // go through cells
  for (var i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];
    var rowData = {};
    for (var j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerHTML;
    }
    data.push(rowData);
  }
  return data;
};
const textareaInput = document.querySelector('[name="input"]');
const textareaOutput = document.querySelector('[name="output"]');
const process = document.querySelector('[id="process"]');
textareaInput.addEventListener("keyup", (e) => {
  const input = e.target.value;
  const table = extractTable(input);
  process.innerHTML = table;
  const hiddenCrap = process.querySelectorAll('[style="display:none"]');
  hiddenCrap.forEach((crap) => {
    crap.remove();
  });
  // console.log(process.querySelector("table"));
  let tablesArray = tableToJson(process.querySelector("table")).map(
    ({ condition, id, location, maps, name, type }, i) => {
      // if (i == 3) {
      console.log({ condition, id, location, maps, name, type });
      // }
      const latMatch = maps.match(/class="latitude">([^<]+)</);
      const lngMatch = maps.match(/class="longitude">([^<]+)</);
      return {
        //   #<b><a href="../millid/2055.htm" title="Full details for Alford">2055</a></b>"
        name:
          name && name != "."
            ? stripHTML(name.replace(/\n/g, ""))
            : stripHTML(location.replace(/\n/g, "")),
        lat: latMatch ? parseFloat(latMatch[1]) : null,
        lng: lngMatch ? parseFloat(lngMatch[1]) : null,
        url:
          id && id.trim() != "."
            ? id
                .match(/href="([^"]+)/)[1]
                .replace("../", "http://www.windmillworld.com/")
            : null,
        // "<span style="display:none" class="fn">Alkborough</span><span style="display:none" class="region">Lincolnshire</span><span style="display:none" class="country-name">UK</span><a href="../millid/1534.htm" class="locality">Alkborough</a>"
        location: stripHTML(location.replace(/\n/g, "")),
        type: type.replace("\n", "").trim(),
        condition: condition && condition != "." ? condition : null,
        // other: JSON.stringify({ type, condition }),
      };
    }
  );
  console.log(tablesArray[3]);
  textareaOutput.value = JSON.stringify(tablesArray);
});
