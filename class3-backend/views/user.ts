import { registerRouter } from "../utils/utils";
import { database } from "../utils/database";

let AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
var APP_ID = "*******";
var API_KEY = "*******";
var SECRET_KEY = "*******";
let client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

export const test = () => registerRouter({
    method: "get",
    path: "/query",
    handler: (req, res) => {
        // console.log(req.query, req.query['name']);
        
        database.query(`select * from trash where name like "%${req.query['name']}%"`, (err: any, data: any[]) => {
            if (err) {
                console.log(err);
                
                res.send("error")
            } else {
                res.send(data.splice(0, 10))
            }
        })
    }
})

export const upload = () => registerRouter({
    method: "post",
    path: "/upload",
    handler: (req, res) => {
        // console.log(req.body);

        let image = req.body.image;
        // let base64 = image.replace(/^data:image\/\w+;base64,/, "");
        client.advancedGeneral(image).then(function(result: any) {
            console.log(JSON.stringify(result));
            let name = result.result[0].keyword;
            database.query(`select * from trash where name like "%${name}%"`, (err: any, data: any[]) => {
                if (err) {
                    console.log(err);
                    res.send("error")
                } else {
                    res.send(data.splice(0, 10))
                }
            })
        }).catch(function(err: any) {
            // 如果发生网络错误
            console.log(err);
        });
    }
})