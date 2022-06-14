const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
// @ts-ignore
var xpath = require('xpath');
// @ts-ignore
const { type } = require('express/lib/response');
// @ts-ignore
var dom = require('xmldom').DOMParser

var haberlercom = [];
var haberlercomEkonomi = [];
var haberlercomDunya = [];

var sozcu = [];
var sozcuEkonomi = [];
var sozcuDunya = [];

var milliyet = [];
var milliyetSonDakika = [];
var milliyetEkonomi = [];
var milliyetDunya = [];

var cnn = [];

var t24 = [];
var t24sonDakika = [];
var t24Ekonomi = [];
var t24Dunya = [];

var haberGlobal = [];
var haberGlobalEkonomi = [];
var haberGlobalDunya = [];

var sonDakikaComEkonomi = [];
var sonDakikaComDunya = [];

var tele1sondakika = [];

var allSondakika = [];
var allGundem = [];
var allEkonomi = [];
var allDunya = [];

var mynetSondakika = [];

var suDeutscheZeitung = [];
var kathimerini = [];

const haberUrl = "https://www.haberler.com/son-dakika/guncel/";
const haberEkonomiUrl = "https://www.haberler.com/son-dakika/ekonomi/";
const haberDunyaUrl = "https://www.haberler.com/son-dakika/dunya/";

const sozcuUrl = "https://www.sozcu.com.tr/kategori/gundem/";
const sozcuEkonomiUrl = "https://www.sozcu.com.tr/kategori/ekonomi/";
const sozcuDunyaUrl = "https://www.sozcu.com.tr/kategori/dunya/";

const milliyetUrl = "https://www.milliyet.com.tr/gundem/";
const milliyetSonDakikaUrl = "https://www.milliyet.com.tr/son-dakika-haberleri/";
const milliyetEkonomiUrl = "https://www.milliyet.com.tr/ekonomi/";
const milliyetdunyaUrl = "https://www.milliyet.com.tr/dunya/";

const cnnUrl = "https://www.cnnturk.com/sondakika/turkiye";

const t24SondakikaUrl = "https://t24.com.tr/son-dakika";
const t24Url = "https://t24.com.tr/haber/gundem";
const t24EkonomiUrl = "https://t24.com.tr/haber/ekonomi";
const t24DunyaUrl = "https://t24.com.tr/haber/dunya";

const haberGlobalUrl = "https://haberglobal.com.tr/son-dakika-haberler";
const haberGlobalEkonomiUrl = "https://haberglobal.com.tr/ekonomi";
const haberGlobalDunyaUrl = "https://haberglobal.com.tr/dunya";

const sonDakikaComEkonomiUrl = "https://www.sondakika.com/ekonomi";
const sonDakikaComDunyaUrl = "https://www.sondakika.com/dunya";

const tele1sondakikaUrl = "https://tele1.com.tr/son-dakika"

const mynetSondakikaUrl = "https://www.mynet.com/son-dakika-haberleri";

const suDeutscheZeitungUrl = "https://www.sueddeutsche.de/politik";
const kathimeriniUrl = "https://www.kathimerini.gr/epikairothta/"


String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

function getHaber() {
    haberlercom.splice(0, haberlercom.length)
    // @ts-ignore
    return fetch(`${haberUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            $('.hblnBox').each(function (i, element) {
                if (i == 10) {
                    return; // Reklam
                }
                const $element = $(element);
                const $image = $element.find("div.hblnImage img").attr('data-src')
                const $title = $element.find("span.hblnTitle").text().trim().split('"').join('').substring(5);
                const $time = $element.find("div.hblnTime").text().trim();
                const $subtitle = $element.find('div.hblnContent p').text().trim().split('"').join('');
                const $href = $element.find("a").attr('href');
                const mainUrl = "https://www.haberler.com"
                //const spliced = haberUrl.substring(0, haberUrl.length - 1);
                const formattedhref = mainUrl.split("/").join("^") + $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "time": $time ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle ?? "",
                    "source": "Haberler.com",
                    "url": formattedhref
                }

                haberlercom.push(haberler)

            })

        }).catch(err => {
            console.log(err);
        })
}

function getHaberEkonomi() {
    haberlercomEkonomi.splice(0, haberlercomEkonomi.length)
    // @ts-ignore
    return fetch(`${haberEkonomiUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            $('.hblnBox').each(function (i, element) {
                if (i == 10) {
                    return; // Reklam
                }
                const $element = $(element);
                const $image = $element.find("div.hblnImage img").attr('data-src')
                const $title = $element.find("span.hblnTitle").text().split('"').join("").trim().split('"').join('').substring(5);
                const $subtitle = $element.find('div.hblnContent p').text().split('"').join("").trim().split('"').join('');
                const $time = $element.find("div.hblnTime").text().trim();
                const $href = $element.find("a").attr('href');
                const mainUrl = "https://www.haberler.com"
                const formattedhref = mainUrl.split("/").join("^") + $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": $subtitle ?? "",
                    "source": "Haberler.com",
                    "url": formattedhref
                }

                haberlercomEkonomi.push(haberler);
                //console.log($element.text());
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function getHaberDunya() {
    haberlercomDunya.splice(0, haberlercomDunya.length)
    // @ts-ignore
    return fetch(`${haberDunyaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            $('.hblnBox').each(function (i, element) {
                if (i == 10) {
                    return; // Reklam
                }
                const $element = $(element);
                const $image = $element.find("div.hblnImage img").attr('data-src')
                const $title = $element.find("span.hblnTitle").text().split('"').join("").trim().split('"').join('').substring(5);
                const $subtitle = $element.find('div.hblnContent p').text().split('"').join("").trim().split('"').join('');
                const $time = $element.find("div.hblnTime").text().trim();
                const $href = $element.find("a").attr('href');
                const mainUrl = "https://www.haberler.com"
                const formattedhref = mainUrl.split("/").join("^") + $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": $subtitle ?? "",
                    "source": "Haberler.com",
                    "url": formattedhref
                }

                haberlercomDunya.push(haberler);

            });

        }).catch(err => {
            console.log(err);
        })
}

function searchHaber(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('article.colPage header.hbptHead h1').text().trim().split('"').join('');
            const $date = $('time.hbptDate').text().trim().substring(0, 16)
            const $mainimage = $('figure img').attr('src')
            const $yazar = $('div.hbptTagDate a').text().trim()
            const $videoUrl = $('iframe.dailymotion-player').attr('src')
            const $abstract = $('h2').text().trim().split('"').join('')
            var contents = [];
            // @ts-ignore
            $('main.hbptContent p').each(function (index, element) {
                var p = $(element).text().trim().split('"').join("")
                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head ?? "",
                "date": $date ?? "",
                "image": $mainimage ?? "",
                "yazar": $yazar ?? "Haberler.com",
                "abstract": $abstract ?? "",
                "videoUrl": $videoUrl ?? "",
                "contents": contents
            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}


function getSozcu() {
    sozcu.splice(0, sozcu.length)
    // @ts-ignore
    return fetch(`${sozcuUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-6').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("a").attr('href');
                const $image = $element.find("img").attr('src');
                const $title = $element.find("a").text().trim();
                //const $subtitle = $element.find("p a").text();
                const formattedhref = $url.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": "",
                    "time": "",
                    "source": "Sözcü",
                    "url": formattedhref
                }
                sozcu.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function getSozcuEkonomi() {
    sozcuEkonomi.splice(0, sozcuEkonomi.length)
    // @ts-ignore
    return fetch(`${sozcuEkonomiUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-6').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("a").attr('href');
                const $image = $element.find("img").attr('src');
                const $title = $element.find("a").text().trim();
                // const $subtitle = $element.find("p a").text();
                const formattedhref = $url.split("/").join("^");
                const haberler = {
                    "image": $image,
                    "title": $title,
                    "subtitle": "",
                    "time": "",
                    "source": "Sözcü",
                    "url": formattedhref,
                }
                sozcuEkonomi.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function getSozcuDunya() {
    sozcuDunya.splice(0, sozcuDunya.length)
    // @ts-ignore
    return fetch(`${sozcuDunyaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-6').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("a").attr('href');
                const $image = $element.find("img").attr('src');
                const $title = $element.find("a").text();
                const $subtitle = $element.find("p a").text();
                const formattedhref = $url.split("/").join("^");
                const haberler = {
                    "image": $image,
                    "title": $title,
                    "subtitle": $subtitle,
                    "time": "",
                    "source": "Sözcü",
                    "url": formattedhref,
                }
                sozcuDunya.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function searchSozcu(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            const $head = $('h1').text();
            const $date = $('time').text();
            //const $mainimage = $('div.hbptMainImage div img').attr('src');
            const $mainimage = $('div.img-holder img').attr('src');
            const $abstract = $('h2').text();
            const $yazar = $('div.editor-name').text();
            const $videoUrl = $('iframe.dailymotion-player').attr('src')
            const $secondImage = $('article img').attr('src');
            var contents = [];

            // @ts-ignore
            $('div.row').find('p').each(function (index, element) {
                var p = $(element).text().trim();
                var myMap = { "paragraph": p };
                contents.push(myMap);
            });
            // GET WITH XPATH
            /* const $a = cheerio.load(body).xml()
             var doc = new dom().parseFromString($a)
             var nodes = xpath.select('//*[@id="load_area"]/div[2]/div[4]/div[3]/a[2]', doc)
             console.log(nodes[0].firstChild.data) */

            const resultMap = {
                "head": $head,
                "date": $date ?? "",
                "image": $mainimage != null ? $mainimage : $secondImage == null ? "" : $secondImage,
                "yazar": $yazar ?? "Sözcü",
                "abstract": $abstract ?? "",
                "videoUrl": $videoUrl ?? "",
                "contents": contents
            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function getMilliyet() {
    milliyet.splice(0, milliyet.length)
    // @ts-ignore
    return fetch(`${milliyetUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.cat-list-card__item').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("div.cat-list-card__item a").attr('href');
                const $image = $element.find("div.cat-list-card__image__wrapper img").attr('src');
                const $title = $element.find("div.cat-list-card__content strong.cat-list-card__title").text().split('"').join("").trim()
                const $subtitle = $element.find("div.cat-list-card__content span.cat-list-card__spot").text().split('"').join("").trim()
                const formattedhref = $url.split("/").join("^");
                const finalHref = "https:^^www.milliyet.com.tr" + `${formattedhref}`

                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle.substring(0, 100) ?? "",
                    "time": "",
                    "source": "Milliyet",
                    "url": finalHref,
                }
                milliyet.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function getMilliyetSondakika() {
    milliyetSonDakika.splice(0, milliyetSonDakika.length)
    // @ts-ignore
    return fetch(`${milliyetSonDakikaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.breaking-news-page__item').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("a.breaking-news-page__item__text").attr('href');
                const $title = $element.find("a.breaking-news-page__item__text strong").text().trim();
                const $time = $element.find("time.breaking-news-page__item__time strong").text();
                const formattedhref = $url.split("/").join("^");
                const finalHref = "https:^^www.milliyet.com.tr" + `${formattedhref}`

                const haberler = {
                    "image": "",
                    "title": $title ?? "",
                    "subtitle": "",
                    "time": $time ?? "",
                    "source": "Milliyet",
                    "url": finalHref,
                }
                milliyetSonDakika.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function getMilliyetEkonomi() {
    milliyetEkonomi.splice(0, milliyetEkonomi.length)
    // @ts-ignore
    return fetch(`${milliyetEkonomiUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.cat-list-card__item').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("div.cat-list-card__item a").attr('href');
                const $image = $element.find("div.cat-list-card__image__wrapper img").attr('src');
                const $title = $element.find("div.cat-list-card__content strong.cat-list-card__title").text().split('"').join("").trim()
                const $subtitle = $element.find("div.cat-list-card__content span.cat-list-card__spot").text().split('"').join("").trim()
                const formattedhref = $url.split("/").join("^");
                const finalHref = "https:^^www.milliyet.com.tr" + `${formattedhref}`

                const haberler = {
                    "image": $image,
                    "title": $title ?? "",
                    "subtitle": $subtitle.substring(0, 100) ?? "",
                    "time": "",
                    "source": "Milliyet",
                    "url": finalHref,
                }
                milliyetEkonomi.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function getMilliyetDunya() {
    milliyetDunya.splice(0, milliyetDunya.length)
    // @ts-ignore
    return fetch(`${milliyetdunyaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.cat-list-card__item').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("div.cat-list-card__item a").attr('href');
                const $image = $element.find("div.cat-list-card__image__wrapper img").attr('src');
                const $title = $element.find("div.cat-list-card__content strong.cat-list-card__title").text().split('"').join("").trim()
                const $subtitle = $element.find("div.cat-list-card__content span.cat-list-card__spot").text().split('"').join("").trim()
                const formattedhref = $url.split("/").join("^");
                const finalHref = "https:^^www.milliyet.com.tr" + `${formattedhref}`

                const haberler = {
                    "image": $image,
                    "title": $title ?? "",
                    "subtitle": $subtitle.substring(0, 100) ?? "",
                    "time": "",
                    "source": "Milliyet",
                    "url": finalHref,
                }
                milliyetDunya.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function searchMilliyet(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        //return fetch("https://www.sozcu.com.tr/2021/gundem/ukraynali-kadina-falcatali-saldiri-yapan-kocasi-tutuklandi-6215250/?utm_source=dahafazla_haber&utm_medium=free&utm_campaign=dahafazlahaber").then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('h1.nd-article__title').text().split('"').join("").trim()
            const $date = $('div.nd-article__info-block').text().substring(0, 18).trim();
            const $mainimage = $('div.nd-article__spot-img img').attr('data-src');
            const $abstract = $('h2.nd-article__spot').text().split('"').join("").trim();
            const $yazar = $('div.nd-article__info-block').text().trim();
            const $videoUrl = $('iframe').attr('src');
            var contents = [];

            var p = $('div.nd-content-column p').text().split('"').join("").trim();
            var myMap = { "paragraph": p };
            contents.push(myMap);


            const resultMap = {
                "head": $head,
                "date": $date ?? "",
                "image": $mainimage ?? "",
                "yazar": $yazar ?? "Milliyet",
                "abstract": $abstract ?? "",
                "videoUrl": $videoUrl ?? "",
                "contents": contents,
            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function getCnn() {
    cnn.splice(0, cnn.length)
    // @ts-ignore
    return fetch(`${cnnUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('li.media').each(function (i, element) {
                const $element = $(element);
                const $url = $element.find("a").attr('href');
                const $image = $element.find("div.media-left img").attr('data-src');
                const $title = $element.find("div.media-heading").text();
                const formattedhref = $url.split("/").join("^");
                const finalHref = "https:^^www.cnnturk.com" + `${formattedhref}`

                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": "",
                    "time": "",
                    "source": "Cnn",
                    "url": finalHref ?? "",
                }
                cnn.push(haberler);
                //console.log($image.attr('src'));        
            });

        }).catch(err => {
            console.log(err);
        })
}

function searchCnn(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        //return fetch("https://www.sozcu.com.tr/2021/gundem/ukraynali-kadina-falcatali-saldiri-yapan-kocasi-tutuklandi-6215250/?utm_source=dahafazla_haber&utm_medium=free&utm_campaign=dahafazlahaber").then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('h1.detail-title').text();
            const $date = $('div.detail-metadata small').text().trim().substring(0, 18);
            const $mainimage = $('div.img-container img').attr('data-src');
            const $abstract = $('h2.detail-description').text();
            const $yazar = $('div.editor-name').text();
            const $videoUrl = $('div.embed-code').attr('src');
            console.log($videoUrl);
            var contents = [];

            // @ts-ignore
            $('div.detail-content').find('p').each(function (index, element) {
                var p = $(element).text().trim();
                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head,
                "date": $date ?? "",
                "image": $mainimage ?? "",
                "yazar": $yazar ?? "",
                "abstract": $abstract ?? "",
                "videoUrl": $videoUrl ?? "",
                "contents": contents,
            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function gett24() {
    t24.splice(0, t24.length)
    // @ts-ignore
    return fetch(`${t24Url}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-md-6').each(function (i, element) {
                // @ts-ignore
                const $element = $(element);
                const $title = $(element).find('div a').attr('title').split('"').join('').trim();
                const $image = $(element).find('img').attr('src')
                const $subtitle = $(element).find('p').text().trim().split('"').join('').substring(6)
                const $href = $(element).find('div a').attr('href');
                const formattedhref = $href.split("/").join("^");
                const finalHref = "https:^^t24.com.tr" + `${formattedhref}`
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": "",
                    "subtitle": $subtitle ?? "",
                    "source": "T24",
                    "url": finalHref
                }

                t24.push(haberler);
            });
            // /html/body/div[6]/div[2]/div[2]/div/div[3]/div[1]/div/div/div[1]/div/a[1]/img
        }).catch(err => {
            console.log(err);
        })
}

function gett24SonDakika() {
    t24sonDakika.splice(0, t24sonDakika.length)
    // @ts-ignore
    return fetch(`${t24SondakikaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('._2sEJF').each(function (i, element) {
                // @ts-ignore
                const $element = $(element);
                const $title = $(element).find('h3._3LIb3').text().trim()
                const $href = $(element).find('div a').attr('href');
                const $time = $(element).find('p._2iJ5G').text().trim()
                const formattedhref = $href.split("/").join("^");
                const finalHref = "https:^^t24.com.tr" + `${formattedhref}`
                const haberler = {
                    "image": "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": "",
                    "source": "T24",
                    "url": finalHref
                }

                t24sonDakika.push(haberler);
            });
            // /html/body/div[6]/div[2]/div[2]/div/div[3]/div[1]/div/div/div[1]/div/a[1]/img
        }).catch(err => {
            console.log(err);
        })
}

function gett24Ekonomi() {
    t24Ekonomi.splice(0, t24Ekonomi.length)
    // @ts-ignore
    return fetch(`${t24EkonomiUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-md-6').each(function (i, element) {
                const $element = $(element);
                const $title = $(element).find('div a').attr('title').split('"').join('').trim()
                const $image = $element.find('div a').attr('img')
                // @ts-ignore
                const $subtitle = $(element).find('div p').text().trim().split('"').join('').allReplace({ 'Ekonomi': '', '/': '' })
                const $href = $(element).find('div a').attr('href');
                const formattedhref = $href.split("/").join("^");
                const finalHref = "https:^^t24.com.tr" + `${formattedhref}`
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": "",
                    "subtitle": $subtitle ?? "",
                    "source": "T24",
                    "url": finalHref
                }

                t24Ekonomi.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function gett24Dunya() {
    t24Dunya.splice(0, t24Dunya.length)
    // @ts-ignore
    return fetch(`${t24DunyaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-md-6').each(function (i, element) {
                const $element = $(element);
                const $title = $(element).find('div a').attr('title').trim().split('"').join('')
                const $image = $element.find('div a').attr('img')
                // @ts-ignore
                const $subtitle = $(element).find('div p').text().trim().split('"').join('').allReplace({ 'Dünya': '', '/': '' })
                const $href = $(element).find('div a').attr('href');
                const formattedhref = $href.split("/").join("^");
                const finalHref = "https:^^t24.com.tr" + `${formattedhref}`
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": "",
                    "subtitle": $subtitle ?? "",
                    "source": "T24",
                    "url": finalHref
                }

                t24Dunya.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function searcht24(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('div.d0FP9 h1').text().trim().split('"').join(" ");
            const $date = $('div._392lz p').text().trim();
            const $image = $('img ._3xXvK').attr('src');
            const $abstract = $('div.d0FP9 h2').text().trim().split('"').join(" ");
            var contents = [];

            // @ts-ignore
            $('div._1NMxy div').find('p').each(function (index, element) {
                var p = $(element).text().trim().split('"').join(" ");
                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head ?? "",
                "date": $date ?? "",
                "image": $image ?? "",
                "yazar": "T24",
                "abstract": $abstract ?? "",
                "videoUrl": "",
                "contents": contents,
            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function getHaberGlobal() {
    haberGlobal.splice(0, haberGlobal.length)
    // @ts-ignore
    return fetch(`${haberGlobalUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.row').each(function (i, element) {
                const $element = $(element);
                const $image = $element.find("div.col-md-4 img").attr('src');
                const $title = $element.find("h3").text().trim().split('"').join('');
                const $subtitle = $element.find('p').text().trim().split('"').join('');
                const $time = $element.find('div.time span.hour').text() + $element.find('div.time span.minute').text()
                const $href = $element.find("div.content a").attr('href');
                const formattedhref = $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle ?? "",
                    "time": $time ?? "",
                    "source": "Haber Global",
                    "url": formattedhref
                }

                haberGlobal.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function getHaberGlobalEkonomi() {
    haberGlobalEkonomi.splice(0, haberGlobalEkonomi.length)
    // @ts-ignore
    return fetch(`${haberGlobalEkonomiUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-12 div.post-item-row').each(function (i, element) {
                const $element = $(element);
                const $image = $element.find("img").attr('src');
                const $title = $element.find("h3").text().split('"').join('').trim();
                const $subtitle = $element.find('p').text().split('"').join('').trim();
                const $time = $element.find('span.meta-time').text().trim();
                const $href = $element.find("a").attr('href');
                const formattedhref = $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle ?? "",
                    "time": $time ?? "",
                    "source": "Haber Global",
                    "url": formattedhref
                }

                haberGlobalEkonomi.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function getHaberGlobalDunya() {
    haberGlobalDunya.splice(0, haberGlobalDunya.length)
    // @ts-ignore
    return fetch(`${haberGlobalDunyaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.col-12 div.post-item-row').each(function (i, element) {
                const $element = $(element);
                const $image = $element.find("img").attr('src');
                const $title = $element.find("h3").text().split('"').join('').trim();
                const $subtitle = $element.find('p').text().split('"').join('').trim();
                const $time = $element.find('span.meta-time').text().trim();
                const $href = $element.find("a").attr('href');
                const formattedhref = $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle ?? "",
                    "time": $time ?? "",
                    "source": "Haber Global",
                    "url": formattedhref
                }

                haberGlobalDunya.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function searchGlobalHaber(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('.post-detail-header h1').text().trim().split('"').join('');
            const $date = $('time.time').text().trim()
            const $mainimage = $('picture img').attr('src');
            const $secondImage = $('a.data-fancybox img').attr('src');
            const $yazar = $('.news-source').text().trim()
            const $abstract = $('div.post-detail-header h2').text().trim().split('"').join('');
            var contents = [];

            // @ts-ignore
            $('div.content-text p').each(function (index, element) {
                var p = $(element).text().trim().split('"').join('');

                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head ?? "",
                "date": $date ?? "",
                "image": $mainimage != null ? $mainimage : $secondImage == null ? "" : $secondImage,
                "yazar": $yazar ?? "Haber Global",
                "abstract": $abstract ?? "",
                "videoUrl": "",
                "contents": contents

            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function getHaberSonDakikaEkonomi() {
    sonDakikaComEkonomi.splice(0, sonDakikaComEkonomi.length)
    // @ts-ignore
    return fetch(`${sonDakikaComEkonomiUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.nws').each(function (i, element) {

                const $element = $(element);
                const $image = $element.find("img.lazy").attr('data-original');
                const $title = $element.find("a.content").attr('title').trim().split('"').join('');
                const $subtitle = $element.find('p.news-detail').text().trim().split('"').join('');
                const $time = $element.find('span.hour').attr('title');
                const $href = $element.find("a.fr").attr('href');
                const baseUrl = "https://www.sondakika.com"
                const formattedhref = (baseUrl + $href).split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": $subtitle ?? "",
                    "source": "Sondakika.com",
                    "url": formattedhref
                }

                sonDakikaComEkonomi.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function getHaberSonDakikaDunya() {
    sonDakikaComDunya.splice(0, sonDakikaComDunya.length)
    // @ts-ignore
    return fetch(`${sonDakikaComDunyaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.nws').each(function (i, element) {

                const $element = $(element);
                const $image = $element.find("img.lazy").attr('data-original');
                const $title = $element.find("a.content").attr('title').trim().split('"').join('');
                const $subtitle = $element.find('p.news-detail').text().trim().split('"').join('');
                const $time = $element.find('span.hour').attr('title');
                const $href = $element.find("a.fr").attr('href');
                const baseUrl = "https://www.sondakika.com"
                const formattedhref = (baseUrl + $href).split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": $subtitle ?? "",
                    "source": "Sondakika.com",
                    "url": formattedhref
                }

                sonDakikaComDunya.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function getTele1Sondakika() {
    tele1sondakika.splice(0, tele1sondakika.length)
    // @ts-ignore
    return fetch(`${tele1sondakikaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('a.list-group-item').each(function (i, element) {

                const $element = $(element);
                const $title = $element.text().split('"').join('').substring(6)
                const $time = $element.find('span.posttime').text();
                const $href = $element.attr('href');
                const formattedhref = $href.split("/").join("^");
                const haberler = {
                    "image": "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": "",
                    "source": "Tele1",
                    "url": formattedhref
                }

                tele1sondakika.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function searchTele1(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('div.single-content h1.font-weight-bolder').text().trim().split('"').join('');
            const $date = $('div.single-content p.fs-13').text().trim().split('"').join('');
            const $mainimage = $('div.single-content div.tv-single-img img.img-fluid').attr('src');
            const $secondImage = $('a.data-fancybox img').attr('src');
            const $abstract = $('.single-content h3').text().trim().split('"').join('');
            var contents = [];

            // @ts-ignore
            $('.single-content p').each(function (index, element) {
                var p = $(element).text().trim().split('"').join('');

                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head ?? "",
                "date": $date ?? "",
                "image": $mainimage != null ? $mainimage : $secondImage == null ? "" : $secondImage,
                "yazar": "Tele1",
                "abstract": $abstract ?? "",
                "videoUrl": "",
                "contents": contents

            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function searchSonDakika(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('h1.haber_baslik').text().trim().split('"').join('');
            const $date = $('.hbptDate').text().trim()
            const $mainimage = $('.haberResim img').attr('src');
            const $secondImage = $('img.lazy').attr('src');
            const $yazar = $('.news-source').text().trim()
            const $videoUrl = $('video').attr('src')
            const $abstract = $('.mt10').text().trim().split('"').join('');
            var contents = [];

            // @ts-ignore
            $('div.wrapper p').each(function (index, element) {
                var p = $(element).text().trim().split('"').join('');

                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head ?? "",
                "date": $date ?? "",
                "image": $mainimage != null ? $mainimage : $secondImage == null ? "" : $secondImage,
                "yazar": $yazar ?? "Sondakika.com",
                "abstract": $abstract ?? "",
                "videoUrl": $videoUrl ?? "",
                "contents": contents

            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function getMynetSondakika() {
    mynetSondakika.splice(0, mynetSondakika.length)
    // @ts-ignore
    return fetch(`${mynetSondakikaUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.list-item').each(function (i, element) {
                const $element = $(element);
                const $title = $(element).find('a').attr('title').trim().split('"').join('')
                const $image = $element.find('img').attr('data-src')
                const $subtitle = $(element).find('p').text()
                const $time = $element.find('span').text().trim()
                const $href = $(element).find('a').attr('href');
                const formattedhref = $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "time": $time ?? "",
                    "subtitle": $subtitle ?? "",
                    "source": "Mynet",
                    "url": formattedhref
                }

                mynetSondakika.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function searchMynet(searchUrl) {
    // @ts-ignore
    return fetch(`${searchUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $head = $('h1.post-title').text().trim().split('"').join('');
            const $date = $('time').text().trim()
            const $mainimage = $('img.img-responsive').attr('src');
            const $secondImage = $('img. lazyloaded').attr('src');
            const $yazar = $('.news-source').text().trim()
            const $videoUrl = $('video').attr('src')
            const $abstract = $('h2.post-spot').text().trim().split('"').join('');
            var contents = [];

            // @ts-ignore
            $('div.detail-content-inner p').each(function (index, element) {
                var p = $(element).text().trim().split('"').join('');

                var myMap = { "paragraph": p };
                contents.push(myMap);
            });

            const resultMap = {
                "head": $head ?? "",
                "date": $date ?? "",
                "image": $mainimage != null ? $mainimage : $secondImage == null ? "" : $secondImage,
                "yazar": $yazar ?? "Mynet",
                "abstract": $abstract ?? "",
                "videoUrl": $videoUrl ?? "",
                "contents": contents

            }
            return resultMap;
        }).catch(err => {
            console.log(err);
        })

}

function getallsondakika() {
    allSondakika.splice(0, allSondakika.length)
    allSondakika.push(haberlercom, milliyetSonDakika, t24sonDakika, haberGlobal, tele1sondakika, mynetSondakika)
}

function getallGundem() {
    allGundem.splice(0, allGundem.length)
    allGundem.push(sozcu, t24, milliyet)
}

function getallEkonomi() {
    allEkonomi.splice(0, allEkonomi.length)
    allEkonomi.push(sozcuEkonomi, haberlercomEkonomi, haberGlobalEkonomi, t24Ekonomi, milliyetEkonomi, sonDakikaComEkonomi, )
}

function getallDunya() {
    allDunya.splice(0, allDunya.length)
    allDunya.push(haberlercomDunya, sozcuDunya, haberGlobalDunya, t24Dunya, milliyetDunya, sonDakikaComDunya, )
}


function getsuDeutscheZeitung() {
    suDeutscheZeitung.splice(0, suDeutscheZeitung.length)
    // @ts-ignore
    return fetch(`${suDeutscheZeitungUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('.sz-teaserlist-element').each(function (i, element) {
                const $element = $(element);
                const $title = $(element).find('h3.sz-teaser__title').text();
                const $subtitle = $(element).find('p.sz-teaser__summary').text();
                const $image = $element.find("picture img").attr('data-src');
                const $href = $(element).find('a.sz-teaser').attr('href');
                const formattedhref = $href != undefined ? $href.split("/").join("^") : "";
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle ?? "",
                    "url": formattedhref ?? ""
                }
                suDeutscheZeitung.push(haberler);
            });

        }).catch(err => {
            console.log(err);
        })
}

function getKathimerini() {
    kathimerini.splice(0, kathimerini.length)
    // @ts-ignore
    return fetch(`${kathimeriniUrl}`).then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            // @ts-ignore
            $('div.col-md-9 div.row').each(function (i, element) {

                const $element = $(element);
                const $image = $element.find("picture.lazy-loaded img").attr('src')
                const $title = $element.find("div.design_one_title_big h2 a font font").text().trim().split('"').join('')
                const $subtitle = $element.find('div.hblnContent p').text().trim().split('"').join('');
                const $href = $element.find("a").attr('href');
                const mainUrl = "https://www.haberler.com"
                //const spliced = haberUrl.substring(0, haberUrl.length - 1);
                const formattedhref = mainUrl.split("/").join("^") + $href.split("/").join("^");
                const haberler = {
                    "image": $image ?? "",
                    "title": $title ?? "",
                    "subtitle": $subtitle ?? "",
                    "url": formattedhref
                }

                kathimerini.push(haberler);
            })

        }).catch(err => {
            console.log(err);
        })
}

// @ts-ignore
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

getHaber()
getHaberEkonomi()
getHaberDunya()
getSozcu()
getSozcuEkonomi()
getSozcuDunya()
getMilliyet()
getMilliyetSondakika()
getMilliyetEkonomi()
getMilliyetDunya()
getCnn()
gett24()
gett24SonDakika()
gett24Ekonomi()
gett24Dunya()
getHaberGlobal()
getHaberGlobalEkonomi();
getHaberGlobalDunya();
getHaberSonDakikaEkonomi()
getHaberSonDakikaDunya()
getTele1Sondakika()
getMynetSondakika()
getallsondakika()
getallGundem()
getallEkonomi()
getallDunya()

setInterval(getHaber, 300000)
setInterval(getHaberEkonomi, 300000)
setInterval(getHaberDunya, 300000)
setInterval(getSozcu, 300000)
setInterval(getSozcuEkonomi, 300000)
setInterval(getSozcuDunya, 300000)
setInterval(getMilliyet, 300000)
setInterval(getMilliyetSondakika, 300000)
setInterval(getMilliyetEkonomi, 300000)
setInterval(getMilliyetDunya, 300000)
setInterval(getCnn, 300000)
setInterval(gett24, 300000)
setInterval(gett24SonDakika, 300000)
setInterval(gett24Ekonomi, 300000)
setInterval(gett24Dunya, 300000)
setInterval(getHaberGlobal, 300000)
setInterval(getHaberGlobalEkonomi, 300000)
setInterval(getHaberGlobalDunya, 300000)
setInterval(getHaberSonDakikaEkonomi, 300000)
setInterval(getHaberSonDakikaDunya, 300000)
setInterval(getTele1Sondakika, 300000)
setInterval(getMynetSondakika, 300000)

setInterval(getallsondakika, 300000)
setInterval(getallGundem, 300000)
setInterval(getallEkonomi, 300000)
setInterval(getallDunya, 300000)

module.export = router;
module.exports = {
    haberlercom,
    haberlercomEkonomi,
    haberlercomDunya,
    sozcu,
    sozcuEkonomi,
    sozcuDunya,
    milliyet,
    milliyetSonDakika,
    milliyetEkonomi,
    milliyetDunya,
    cnn,
    t24,
    t24sonDakika,
    t24Ekonomi,
    t24Dunya,
    haberGlobal,
    haberGlobalEkonomi,
    haberGlobalDunya,
    suDeutscheZeitung,
    searchSozcu,
    searchHaber,
    searchMilliyet,
    searchCnn,
    searcht24,
    searchSonDakika,
    searchGlobalHaber,
    sonDakikaComEkonomi,
    sonDakikaComDunya,
    searchTele1,
    tele1sondakika,
    mynetSondakika,
    searchMynet,
    allSondakika,
    allGundem,
    allEkonomi,
    allDunya
}
