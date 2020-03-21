const ex = require("express");
const app = ex();
const path = require("path");
const bp = require("body-parser");
const mysql = require("mysql");
app.set("views", "statics/templates");
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));
app.use(ex.static(__dirname + "/statics"));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ganit"
});
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "index.html"));
});
app.get("/cct", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "contact.html"));
});
app.get("/sgn", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "signup.html"));
});
app.get("/lg", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "logs.html"));
});
app.get("/lgs", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "logins.html"));
});
app.get("/lga", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "logina.html"));
});
app.get("/lgt", function(req, res) {
  res.sendFile(path.join(__dirname, "statics", "templates", "logint.html"));
});
app.post("/ch", function(req, res) {
  let a = req.body.em;
  let p = req.body.psw;
  con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    var sql =
      "INSERT INTO reg (username,password) VALUES ('" + a + "','" + p + "') ";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("data inserted");
    });
  });
  res.sendfile(path.join(__dirname, "statics", "templates", "aftsgn.html"));
});

app.post("/cca", function(req, res) {
  let aa = req.body.us;
  let pp = req.body.psw;

  con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    var sql =
      "select* from admin where username='" +
      aa +
      "' and password='" +
      pp +
      "'";
    console.log(sql);
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("admin", { name: aa, title: "pp" });
    });
  });
});
app.post("/cct", function(req, res) {
  let aa = req.body.us;
  let pp = req.body.psw;

  con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    var sql =
      "select* from teachers where username='" +
      aa +
      "' and password='" +
      pp +
      "'";
    console.log(sql);
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("teacher", { name: aa, title: "pp" });
    });
  });
});
app.post("/ccs", function(req, res) {
  let aa = req.body.us;
  let pp = req.body.psw;

  con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    var sql =
      "select* from students where username='" +
      aa +
      "' and password='" +
      pp +
      "'";
    console.log(sql);
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("student", { name: aa, title: "pp" });
    });
  });
});
//this is to show data as a list on a page
var obj = {};
app.get("/listreg", function(req, res) {
  con.query("SELECT * FROM reg", function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("registered", obj);
    }
  });
});
//this will edit

app.get("/edit", function(req, res) {
  con.query("SELECT * FROM reg WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("form", { data: result });
  });
});
app.post("/upload", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "update reg set username='" +
    nm +
    "',password='" +
    psw +
    "' where id=" +
    parseInt(req.body.t0);

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM reg";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("registered", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});
//this will delete the data
app.get("/del", function(req, res) {
  var sql = "delete from reg where id=" + req.query["id"];
  con.query(sql, function(err, result) {
    if (err) throw err;
    else var sql = "SELECT * FROM reg";
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("registered", { data: result });
    });
  });
});
app.get("/ast", function(req, res) {
  con.query("SELECT * FROM reg WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("formt", { data: result });
  });
});
app.post("/tch", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "INSERT INTO teachers (username,password) VALUES ('" +
    nm +
    "','" +
    psw +
    "') ";

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM reg";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("registered", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});
//this will delete the data
app.get("/asst", function(req, res) {
  con.query("SELECT * FROM reg WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("forms", { data: result });
  });
});
app.post("/sch", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "INSERT INTO students (username,password) VALUES ('" +
    nm +
    "','" +
    psw +
    "') ";

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM reg";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("registered", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});

var obj = {};
app.get("/liststd", function(req, res) {
  con.query("SELECT * FROM students", function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("student", obj);
    }
  });
});

app.get("/editt", function(req, res) {
  con.query("SELECT * FROM students WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("formss", { data: result });
  });
});
app.post("/uploadd", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "update students set username='" +
    nm +
    "',password='" +
    psw +
    "' where id=" +
    parseInt(req.body.t0);

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM students";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("student", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});
//this will delete the data
app.get("/dell", function(req, res) {
  var sql = "delete from students where id=" + req.query["id"];
  con.query(sql, function(err, result) {
    if (err) throw err;
    else var sql = "SELECT * FROM students";
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("student", { data: result });
    });
  });
});
var obj = {};
app.get("/listtch", function(req, res) {
  con.query("SELECT * FROM teachers", function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("teacher", obj);
    }
  });
});

app.get("/edittt", function(req, res) {
  con.query("SELECT * FROM teachers WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("formtt", { data: result });
  });
});
app.post("/uploaddd", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "update teachers set username='" +
    nm +
    "',password='" +
    psw +
    "' where id=" +
    parseInt(req.body.t0);

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM teachers";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("teacher", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});
//this will delete the data
app.get("/delll", function(req, res) {
  var sql = "delete from teachers where id=" + req.query["id"];
  con.query(sql, function(err, result) {
    if (err) throw err;
    else var sql = "SELECT * FROM students";
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("teacher", { data: result });
    });
  });
});
var obj = {};
app.get("/listadm", function(req, res) {
  con.query("SELECT * FROM admin", function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("adminlst", obj);
    }
  });
});

app.get("/editttt", function(req, res) {
  con.query("SELECT * FROM admin WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("forma", { data: result });
  });
});
app.post("/uploadddd", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "update admin set username='" +
    nm +
    "',password='" +
    psw +
    "' where id=" +
    parseInt(req.body.t0);

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM admin";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("adminlst", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});
//this will delete the data
app.get("/dellll", function(req, res) {
  var sql = "delete from admin where id=" + req.query["id"];
  con.query(sql, function(err, result) {
    if (err) throw err;
    else var sql = "SELECT * FROM admin";
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("adminlst", { data: result });
    });
  });
});
app.get("/add", function(req, res) {
  res.render("formaa");
});

app.post("/added", function(req, res) {
  let nm = req.body.t1;
  let psw = req.body.t3;
  var sql =
    "INSERT INTO admin (username,password) VALUES ('" +
    nm +
    "','" +
    psw +
    "') ";

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM admin";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("adminlst", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});

var obj = {};
app.get("/cour", function(req, res) {
  con.query("SELECT * FROM courses", function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("courses", obj);
    }
  });
});

var obj = {};
app.get("/courss", function(req, res) {
  con.query("SELECT * FROM courses", function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = { print: result };
      res.render("coursesadm", obj);
    }
  });
});
app.get("/editttc", function(req, res) {
  con.query("SELECT * FROM courses WHERE id=" + req.query["id"], function(
    err,
    result
  ) {
    if (err) throw err;
    else res.render("formc", { data: result });
  });
});
app.post("/uploaddddc", function(req, res) {
  let bch = req.body.t1;
  let cours = req.body.t3;
  let dur = req.body.t4;
  let freq = req.body.t5;
  let setss = req.body.t6;
  let commnt = req.body.t7;

  var sql =
    "update courses set batch='" +
    bch +
    "',course='" +
    cours +
    "',duration='" +
    dur +
    "',frequency='" +
    freq +
    "',seats='" +
    setss +
    "', commencement='" +
    commnt +
    "'where id=" +
    parseInt(req.body.t0);

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM courses";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("coursesadm", { data: result });
      });
    }
  });
});
app.get("/delllc", function(req, res) {
  var sql = "delete from courses where id=" + req.query["id"];
  con.query(sql, function(err, result) {
    if (err) throw err;
    else var sql = "SELECT * FROM courses";
    con.query(sql, function(err, result) {
      if (err) throw err;
      else res.render("coursesadm", { data: result });
    });
  });
});
app.get("/addc", function(req, res) {
  res.render("formcc");
});

app.post("/addcc", function(req, res) {
  let bch = req.body.t1;
  let cours = req.body.t3;
  let dur = req.body.t4;
  let freq = req.body.t5;
  let setss = req.body.t6;
  let commnt = req.body.t7;
  var sql =
    "INSERT INTO courses(batch,course,duration,frequency,seats,commencement) VALUES ('" +
    bch +
    "','" +
    cours +
    "','" +
    dur +
    "','" +
    freq +
    "','" +
    setss +
    "','" +
    commnt +
    "') ";

  con.query(sql, function(err, result) {
    if (err) throw err;
    else {
      var sql = "SELECT * FROM courses";
      con.query(sql, function(err, result) {
        if (err) throw err;
        else res.render("coursesadm", { data: result });
      });
    }
  });
  // res.send("data is inserted");
});

app.listen(5000, function(req, res) {
  console.log("listening on port 5000");
});
