// var url = require("url"),
//      fs=require("fs"),
//      http=require("http"),
//      path = require("path");
// http.createServer(function (req, res) {
//     var pathname=__dirname+url.parse(req.url).pathname;
//     if (path.extname(pathname)=="") {
//         pathname+="/";
//     }
//     if (pathname.charAt(pathname.length-1)=="/"){
//         pathname+="/lib/index.html";
//     }

    // fs.exists(pathname,function(exists){
    //     if(exists){
    //         switch(path.extname(pathname)){
    //             case ".html":
    //                 res.writeHead(200, {"Content-Type": "text/html"});
    //                 break;
    //             case ".js":
    //                 res.writeHead(200, {"Content-Type": "text/javascript"});
    //                 break;
    //             case ".css":
    //                 res.writeHead(200, {"Content-Type": "text/css"});
    //                 break;
    //             case ".gif":
    //                 res.writeHead(200, {"Content-Type": "image/gif"});
    //                 break;
    //             case ".jpg":
    //                 res.writeHead(200, {"Content-Type": "image/jpeg"});
    //                 break;
    //             case ".png":
    //                 res.writeHead(200, {"Content-Type": "image/png"});
    //                 break;
    //             case ".svg":
    //                 res.writeHead(200, {"Content-Type": "image/svg+xml"});
    //                 break;
    //             default:
    //                 res.writeHead(200, {"Content-Type": "application/octet-stream"});
    //         }

    //         fs.readFile(pathname,function (err,data){
    //             res.end(data);
    //         });
    //     } else {
    //         res.writeHead(404, {"Content-Type": "text/html"});
    //         res.end("<h1>404 Not Found</h1>");
    //     }
    // });
// }).listen(8080, "127.0.0.1");
// console.log("Server running at http://127.0.0.1:8080/");


// var express =require('express');
// var app=express();
// var  mysql=require('mysql');
// var url=require('url');
// var client=mysql.createConnection({
//         host:'192.168.0.120',
//         user:'root',
//         password:'PASSWORD',
// });
// client.connect();
// client.query('use wuyutech');
// app.post('/search_num',function(req,res){
//     res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
//     console.log(res);
// });
var url = require('url');
var express = require('express');  
var fs = require('fs'); 
var path = require('path');
var querystring = require('querystring');  
var app = express();  
var mysql = require('mysql');  
var pool = mysql.createPool({  
    host : '192.168.0.120',  
    port : 3306,  
    database : 'wuyutech',  
    user : 'root',  
    password : 'PASSWORD'  
}); 
// app.get('/lib/index.html',function(req,res){
// res.sendfile(_dirname + '/index.html');
// }) ;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/index.html',function(req,res){  
    // res.writeHead(200,{'Content-Type' : 'text/html'});  
    // res.write('<head><meta charset="utf-8" /></head>');  
    res.sendFile(__dirname + '/' + 'lib' +  '/' +  'index.html'); 
    // file.pipe(res);  
}) ;
app.post('/addcontent',function(req,res){  
    req.on('data',function(data){  
        var params = querystring.parse(data.toString());  
        pool.getConnection(function(err,connection){  
            if(err){  
                console.log('与mysql数据库建立连接失败');  
            }else{  
                console.log('与mysql数据库建立连接成功');  
                console.log(params.visitor_name);  
                console.log(params.visitor_phone); 
                console.log(params.visitor_content); 
                var pam_name=params.visitor_name;
                var pam_phone=params.visitor_phone;
                var pam_content=params.visitor_content;
                // {fankui_person:params.visitor_name,phone_number:params.visitor_phone,concent:params.visitor_content}
                var userAddSql='INSERT INTO fankui (fankui_person,phone_number,concent) VALUES (?,?,?)';
                var userAddSql_pam=[pam_name,pam_phone,pam_content];
                connection.query(userAddSql,userAddSql_pam,function(err,result){  
                    if(err){  
                        connection.release(); 
                        // res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
                        // res.writeHead(400,{'Content-Type':'text/plain', 'Access-Control-Allow-Origin': '*'});
                        res.send({success:1}); 
                        res.end();
                        console.log('插入数据失败'); 
                    }else{  
                        connection.release(); 
                        // res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'}); 
                         // res.writeHead(200,{'Content-Type':'text/plain', 'Access-Control-Allow-Origin': '*'});
                        res.json({success:0});
                        res.end();
                        console.log('插入数据成功');  
                    }  
                }) ; 
            }  
        }) ; 
    });  
}) ; 
app.listen(8080,'127.0.0.1',function(){  
    console.log('服务器正在监听');  
});  

