const PARTS = {
  cass: ["cass.b64"],
  auto: ["auto.b64"],
  home: ["home.b64"],
  flood: ["flood.b64"],
  sky: ["sky.b64"]
};
async function load(name) {
  const texts = await Promise.all(PARTS[name].map(function (f) {
    return fetch(f).then(function (r) { return r.text(); });
  }));
  return "data:image/jpeg;base64," + texts.join("").replace(/\s/g, "");
}
document.querySelectorAll("img[data-pic]").forEach(function (img) {
  load(img.dataset.pic).then(function (src) { img.src = src; });
});
document.querySelectorAll("[data-pic-bg]").forEach(function (el) {
  load(el.dataset.picBg).then(function (src) {
    el.style.backgroundImage = "url(" + src + ")";
  });
});
