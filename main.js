const TelegramBot = require("node-telegram-bot-api");

const token = "6890718814:AAFc_6Wy1EdcIYlrjSNgVnfEd4mX4YUWtPY";

const options = {
  polling: true
};

const algolBot = new TelegramBot(token, options);

const prefix = "/";
const sayHi = new RegExp(`^${prefix}hi$`);
const botGempa = new RegExp(`^${prefix}infogempa$`);

algolBot.onText(sayHi, async (callback) => {
  console.log("first", callback);
  algolBot.sendMessage(callback.from.id, "Hello");
});

algolBot.onText(botGempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";

  const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
  const {
    Infogempa: {
      gempa: {
        Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
      }
    }
  } = await apiCall.json();

  const BMKG_IMAGE = BMKG_ENDPOINT + Shakemap;

  const caption = `
  Waktu: ${Tanggal} | ${Jam}
  Kekuatan: ${Magnitude} SR
  Wilayah: ${Wilayah}
  Potensi Tsunami: ${Potensi}
  Kedalaman: ${Kedalaman}
  `

  algolBot.sendPhoto(callback.from.id, BMKG_IMAGE, { caption });
});