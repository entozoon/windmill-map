const tables = document.querySelectorAll(".wikitable");
let windmills;
tables.forEach((table) => {
  // console.log(table.innerHTML);
  // const geohacksUrls = table.querySelectorAll(
  //   '[href^="https://geohack.toolforge"]'
  // );
  const urls = table.querySelectorAll("a");
  // var span = document.createElement("span");
  urls.forEach((url) => {
    if (
      url.href.substr(0, "https://geohack.toolforge".length) ==
      "https://geohack.toolforge"
    ) {
      // https://geohack.toolforge.org/geohack.php?pagename=List_of_windmills_in_Lincolnshire&params=53.18196411445_N_0.32103753531058_E_region:GB
      const latlng = url.href.match(/params=(.*)_N_([0-9\.]*)_/);
      if (latlng) {
        console.log(url, latlng);
        url.closest("td").innerHTML += `latlng:${latlng[1]},${latlng[2]}`;
        url.remove();
      } else {
        // url.closest("td").innerHTML = "???";
      }
    } else {
      // url.closest("td").innerHTML = url.innerHTML;
    }
    // url.replaceWith(span);
  });
  // https://geohack.toolforge.org/geohack.php?pagename=List_of_windmills_in_Lincolnshire&params=54.387109797044_N_0.8296617821235_W_region:GB
});
