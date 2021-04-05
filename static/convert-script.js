const tidyText = (element) => {
  if (!element) return;
  if (element.querySelector("a")) {
    element.innerHTML = element.querySelector("a").innerHTML;
  }
  element.innerHTML = element.innerHTML.replace(/(<([^>]+)>)/gi, "");
};
document.querySelectorAll("div *").forEach((element) => {
  if (!(element.closest(".wikitable") || element.querySelector(".wikitable"))) {
    element.remove();
  }
});
function tableToJson(table) {
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
}
const tables = document.querySelectorAll(".wikitable");
tables.forEach((table) => {
  console.log(tableToJson(table));
});
// setTimeout(() => {
//   const tables = document.querySelectorAll(".wikitable");
//   let windmills;
//   tables.forEach((table) => {
// // console.log(table.innerHTML);
// // const geohacksUrls = table.querySelectorAll(
// //   '[href^="https://geohack.toolforge"]'
// // );
// table
//   .querySelector("th:last-child")
//   .insertAdjacentHTML("afterend", "<th>latlng</th><th>name</th>");
// table.querySelectorAll(".wmamapbutton,.reference").forEach((element) => {
//   element.remove();
// });
// table.querySelectorAll("tr").forEach((tr) => {
//   const urls = tr.querySelectorAll("a");
//   console.log("urls", urls);
//   // var span = document.createElement("span");
//   urls.forEach((url) => {
//     if (
//       url.href.substr(0, "https://geohack.toolforge".length) ==
//       "https://geohack.toolforge"
//     ) {
//       console.log("stuff");
//       // https://geohack.toolforge.org/geohack.php?pagename=List_of_windmills_in_Lincolnshire&params=53.18196411445_N_0.32103753531058_E_region:GB
//       const latlng = url.href.match(/params=(.*)_N_([0-9\.]*)_/);
//       if (latlng) {
//         // console.log(url, latlng);
//         if (url.closest("td")) {
//           // url.closest(
//           //   "td"
//           // ).innerHTML += `</td><td>latlng:${latlng[1]},${latlng[2]}</td>`;
//           //   var td = document.createElement("td");
//           //   td.innerHTML = "hello";
//           //   url
//           //     .closest("td")
//           //     .insertAdjacentHTML("afterEnd", `<td>dwa</td>`);
//           //   // url
//           //   //   .closest("td")
//           //   //   .parentNode.insertBefore(td, url.closest("td").nextSibling);
//         }
//         console.log("stuffssss");
//         url.remove();
//       } else {
//         // url.closest("td").innerHTML = "???";
//       }
//       tr.querySelector("td:last-child") &&
//         tr
//           .querySelector("td:last-child")
//           .insertAdjacentHTML(
//             "afterend",
//             `<td>${latlng ? `${latlng[1]},${latlng[2]}` : ``}</td>`
//           );
//     } else {
//       // url.closest("td").innerHTML = url.innerHTML;
//     }
//     const td1 = tr.querySelector("td:nth-child(1)");
//     const td2 = tr.querySelector("td:nth-child(2)");
//     tidyText(tr.querySelector("td:nth-child(1)"));
//     tidyText(tr.querySelector("td:nth-child(2)"));
//     const name =
//       td2 && td2.innerHTML
//         ? td2.innerHTML
//         : td1 && td1.innerHTML
//         ? td1.innerHTML
//         : "unknown";
//     if (td1) {
//       console.log(td1.innerHTML);
//     }
//     tr.querySelector("td:last-child") &&
//       tr
//         .querySelector("td:last-child")
//         // .insertAdjacentHTML("afterend", `<td>${name}</td>`);
//         .insertAdjacentHTML("afterend", `<td>name???</td>`);
//     //
//     // url.replaceWith(span);
//   });
// });
// // https://geohack.toolforge.org/geohack.php?pagename=List_of_windmills_in_Lincolnshire&params=54.387109797044_N_0.8296617821235_W_region:GB
//   });
// }, 2000);
