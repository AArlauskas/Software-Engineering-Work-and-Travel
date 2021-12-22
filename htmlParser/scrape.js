const fs = require('fs')
const cheerio=require('cheerio');
const request = require('request');
const { get } = require('request');


const testFolder = './sources';
let information=[];
fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            let inf={};
            const html=fs.readFileSync(`sources/${file}`).toString();
            const $=cheerio.load(html);
            const companies=$('.list-group-item.clickable');
            const state=$('title').text().split('|');
            const state_name=state[0];
            companies.each(function (i, el) {
                const name=$(el).find('.col-sm-4').find("strong").text();
                const location=$(el).find('.col-sm-3').find("strong").text();
                var website=$(el).find('.col-sm-4').find("a").text();

                const inf_block=$(el).find('#details-'+i.toString());
                var adress="";
                var zip="";
                var mail="";
                var mail2="";
                var phone="";
                var website2="";
                inf_block.find("div").each(function(j, el1) {
                    const element=$(el1);
                    if(element.text().includes("Adresas"))
                        adress=element.find("strong").text();
                    else if(element.text().includes("Zip"))
                        zip=element.find("strong").text();
                    else if(element.text().includes("paštas"))
                    {
                        if(mail=="")
                            {
                                mail=element.find("a").text();
                                if(mail.includes(","))
                                    mail=mail.replace(",","|");
                                else if (mail.includes(";"))
                                    mail=mail.replace(";","|");
                            }
                        else
                            mail2=element.find("a").text();
                    }
                    else if(element.text().includes("Telefono"))
                        {
                            phone=element.find("strong").text();
                            if(phone.includes(","))
                                phone=phone.replace(",","|");
                            else if(phone.includes("or"))
                                phone=phone.replace("or","|");
                            else if(phone.includes(";"))
                                phone=phone.replace(";","|");
                        }
                    else if(element.text().includes("Puslapis"))
                            website2=element.find("a").text();
                });
                    if(mail2!="")
                        mail+=" | "+ mail2;
                    if(website2!="")
                        website+=" | "+website2;
                    inf={
                        name : name,
                        state : state_name,
                        location : location,
                        website : website,
                        adress : adress,
                        zip : zip,
                        mail: mail,
                        phone : phone,
                    }

                information.push(inf);

            });
    });
    var obj=Object.assign({},information);
    fs.writeFileSync("companies.json",JSON.stringify(obj));
});