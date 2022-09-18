/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
const http = require("http");
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const jssoup = require("jssoup").default;
// eslint-disable-next-line no-undef
const axios = require("axios");

const hostname = "localhost";
const port = 30000;

const options = {
    method: "POST",
    url: "http://skytech.si/skytechsys/data.php",
    data: "c=tabela"
};

var fileContents;
try {
    fileContents = fs.readFileSync("sitelist.json");
} catch (err) {
    // here you get ANY error, not just file not found (ENOENT)
}
var sitelist = JSON.parse(fileContents);

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url == "/full") {
        axios.request(options).then(resSkytech => {
            var soup = new jssoup(resSkytech.data);

            var allTDs = soup.findAll("td");
            for (var i = 0; i < allTDs.length; i++) {
                var e = allTDs[i];
                var jumpPointName = "";
                if (e.nextElement.name == "a") {
                    var jumpPointElement = e.nextElement.nextElement;
                    jumpPointName = jumpPointElement._text.trim();

                    // filter for "* na servisu"
                    if (!jumpPointName.endsWith(" na servisu")) {
                        // for i in range(5), get nextElement.nextElement._text, which is the next datapoint for the jumppoint
                        var data = [];
                        var dataElement = jumpPointElement;
                        for (let i = 0; i < 5; i++) {
                            dataElement = dataElement.nextElement.nextElement;
                            data.push(dataElement._text);
                        }

                        // add data to sitelist
                        var temp = sitelist[jumpPointName];
                        // check if they added a new jumppoint, skip if true
                        if (typeof temp == "object") {
                            temp["windSpeed"] = Number.parseFloat(data[0].substr(0, data[0].indexOf(" ")));
                            temp["windGust"] = Number.parseFloat(data[1].substr(0, data[1].indexOf(" ")));
                            temp["windDirection"] = data[2];
                            temp["temperature"] = Number.parseFloat(data[3].substr(0, data[3].indexOf("&deg")));

                            // date parsing
                            var date = data[4].replaceAll(".", "-");
                            date = date.split(" ").reverse().join(" ");
                            date = date + ":00";
                            temp["timeAndDate"] = date;

                            // save back to global object
                            sitelist[jumpPointName] = temp;
                        }
                    }
                }
            }

            // return response here (because fucking async functions)
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(sitelist));
        }).catch(error => {
            console.error(error);
            // TODO: return 500 internal server error
        });
    } else {
        res.end(`{"error":"invalid API endpoint"}`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}`);
});