'use strict';

const path = require('path');
const FS = require('q-io/fs');
const cheerio = require('cheerio');
const sanitizeHtml = require('sanitize-html');
const zachala = require('./zachala.js');
const dateFormat = require('dateformat');

const parseSaints = html => {
    return sanitizeHtml(
        html.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>'),
        {
            allowedTags: ['div', 'a', 'strong']
        }
    ).replace(/<div>/g, '<p>').replace(/<\/div>/g, '</p>');
};

const createReadingLinks = (reading, zachalaResolver) => {
    return reading.replace(/<a[^>]*>(.*?)<\/a>/g, (match, linkBody) => {
        return '<a href="' + zachalaResolver(linkBody) + '">' + linkBody + '</a>';
    });
};

module.exports = (date) => {
    const dateString = dateFormat(date, 'yyyy-mm-dd');
    console.log('parse', dateString);
    return zachala.then(zachalaResolver => {
        return FS.read(path.join('raw', dateString))
            .then(value => {
                    let rows = value.split("\r\n");
                    let readings = '';
                    let comments = [];

                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i].indexOf('<h2>Евангельские Чтения</h2>') === 0) {
                            readings = rows[i].substr(28); //remove <h2>Евангельские Чтения</h2>
                            break;
                        }
                    }

                    let originalReadings = readings;

                    readings = readings.replace(/<div class='DAYS_snoska' style='display:none'>(.*?)<\/div>/g,function(str,innerText) {
                        innerText = sanitizeHtml(innerText, { allowedTags: ['a', 'strong'] });
                        comments.push(createReadingLinks(innerText, zachalaResolver));
                        return '';
                    });

                    readings = sanitizeHtml(readings, { allowedTags: ['a', 'strong'] });


                    let values = {};
                    const keyMap = {
                        "default": "По умолчанию",
                        "Утр.": "Утреня",
                        "Лит.": "Литургия"
                    };
                    const subKeyMap = {
                        "default": "Рядовое",
                        "Прп.": "Преподобному",
                        //"Прав.": "Праведному",
                        // "Свт.": "Преподобному",
                        // "Вмц.": "Преподобному",
                        "На веч.": "На вечерне"
                    };

                    readings.replace(/\s*((?:Утр\.|Лит\.))\s*-\s*/g, '|$1@').split('|').map(item => {

                        let [key,val] = item.split("@");
                        let subValues = {};
                        if (!val) {
                            val = key;
                            key = 'default';
                        }

                        val.replace(/Ев.\s\d-е,/g, '').replace(/\s*((Прп\.|[а-яА-Я0-9 .-]+))\s*[:]\s*/g, '|$1@').split('|').map(item => {
                            let [subKey,subVal] = item.split("@");
                            if (!subVal) {
                                subVal = subKey;
                                subKey = 'default';
                            }

                            if (subVal)
                                subValues[subKeyMap[subKey] || subKey] = createReadingLinks(subVal, zachalaResolver);
                        });

                        if (Object.keys(subValues).length > 0)
                            values[keyMap[key]] = subValues;
                    });

                    return {
                        cheerio: cheerio.load(value, { decodeEntities: false }),
                        readings: values,
                        comments,
                        originalReadings
                    }
                }
            )
            .then(data => {
                let $ = data.cheerio;

                let saints = [];
                $('.DP_TEXT a.DA').map(function(i, elem) {
                    if ($(this).find('img').length === 0 && $(this).attr('title').length > 0)
                        saints.push($(this).attr('title'));
                });

                return {
                    title: $('.DD_NED').text().trim().replace(/\.$/, ''),
                    glas: $('.DD_GLAS').text().trim().replace(/\D/g, ''),
                    fast: $('.DD_POST').text().trim().replace(/\.$/, ''),
                    fast_detail: $('.DD_TPTXT').text().trim().replace(/\.$/, ''),
                    originalTitle: $('.DP_TEXT.DPN_-1 .DNAME a').text().trim().replace(/\.$/, ''),
                    originalReadings: data.originalReadings,
                    readings: data.readings,
                    comments: data.comments,
                    saints
                };
            })
            .then(value => JSON.stringify(value, null, 2))
            .then(value => FS.write(path.join('processed', dateString), value).catch(e => console.log('can\'t write', e, dateString)))
            .catch(e => console.log('global error', e, dateString));
    });
};

// kld_font
// kld_red
// calendar_red_day
// trapeza
