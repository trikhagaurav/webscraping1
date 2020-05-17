const cheerio = require("cheerio");
const axios = require("axios");

const siteUrl = "https://medium.com/serious-philosophy/applied-philosophy-understanding-a-revolutionary-new-physics-project-7d4c4ec08ca";

let siteName = "";
const title = new Set();
const body = new Set();

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const getResults = async () => {
  const $ = await fetchData();

  const titl=$("div#f073").text();
  const subtitl=$("h2#c943").text();
  $("p").each((index,element) => {
	body.add($(element).text());
  });

  return {
    title: titl,
    subtitle: subtitl,
    bod: [...body],	
  };
};

module.exports = getResults;
