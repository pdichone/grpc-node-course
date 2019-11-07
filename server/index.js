var greets = require("../server/protos/greet_pb");
var service = require("../server/protos/greet_grpc_pb");

var calc = require("../server/protos/calculator_pb");
var calcService = require("../server/protos/calculator_grpc_pb");

var blogs = require("../server/protos/blog_pb");
var blogService = require("../server/protos/blog_grpc_pb");

const fs = require("fs");

var grpc = require("grpc");

//Knex requires
const environment = process.env.ENVIRONMENT || "development";
const config = require("./knexfile")[environment];
const knex = require("knex")(config);

/*
  Implements the greet RPC method.
*/

/*
   Blog CRUD 
*/

function listBlog(call, callback) {
  console.log("Received list blog request");
  knex("blogs").then(data => {
    data.forEach(element => {
      var blog = new blogs.Blog();
      blog.setId(element.id);
      blog.setAuthor(element.author);
      blog.setTitle(element.title);
      blog.setContent(element.content);

      // console.log('Blogs ', blog.toString());

      var blogResponse = new blogs.ListBlogResponse();
      blogResponse.setBlog(blog);

      //write to the stream
      call.write(blogResponse);
    });
    call.end(); // we are done writing!!
  });
}

function createBlog(call, callback) {
  console.log("Received Create Blog Request");

  var blog = call.request.getBlog();

  console.log("Inserting a Blog...");

  knex("blogs")
    .insert({
      author: blog.getAuthor(),
      title: blog.getTitle(),
      content: blog.getContent()
    })
    .then(() => {
      var id = blog.getId();

      var addedBlog = new blogs.Blog();

      //set the blog response to be returned
      addedBlog.setId(id);
      addedBlog.setAuthor(blog.getAuthor());
      addedBlog.setTitle(blog.getTitle());
      addedBlog.setContent(blog.getContent());

      var blogResponse = new blogs.CreateBlogResponse();

      blogResponse.setBlog(addedBlog);

      console.log("Inserted Blog with ID: ", addedBlog.getId());

      callback(null, blogResponse);
    });
}

function readBlog(call, callback) {
  console.log("Received Blog request");

  // get id
  var blogId = call.request.getBlogId();

  knex("blogs")
    .where({ id: parseInt(blogId) })
    .then(data => {
      console.log("Searching for a blog...");

      if (data.length) {
        var blog = new blogs.Blog();

        console.log("Blog found and sending message");

        //set the blog response to be returned
        blog.setId(blogId);
        blog.setAuthor(data[0].author);
        blog.setTitle(data[0].title);
        blog.setContent(data[0].content);

        var blogResponse = new blogs.ReadBlogResponse();
        blogResponse.setBlog(blog);

        callback(null, blogResponse);
      } else {
        console.log("Blog not found");
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "Blog Not found!"
        });
      }
    });
}

function updateBlog(call, callback) {
  console.log("Received updated Blog Request");

  var blogId = call.request.getBlog().getId();

  console.log("Searching for a blog to update....");

  knex("blogs")
    .where({ id: parseInt(blogId) })
    .update({
      author: call.request.getBlog().getAuthor(),
      title: call.request.getBlog().getTitle(),
      content: call.request.getBlog().getContent()
    })
    .returning()
    .then(data => {
      if (data) {
        var blog = new blogs.Blog();

        console.log("Blog found sending message...");

        //set the blog response
        blog.setId(blogId);
        blog.setAuthor(data.author);
        blog.setTitle(data.title);
        blog.setContent(data.content);

        var updateBlogResponse = new blogs.UpdateBlogResponse();
        updateBlogResponse.setBlog(blog);

        console.log("Updated ===", updateBlogResponse.getBlog().getId());

        callback(null, updateBlogResponse);
      } else {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "Blog with the corresponding id was not found"
        });
      }
    });
}

function deleteBlog(call, callback) {
  console.log("Received Delete Blog request");

  var blogId = call.request.getBlogId();

  knex("blogs")
    .where({ id: parseInt(blogId) })
    .delete()
    .returning()
    .then(data => {
      console.log("Blog deleting...");

      if (data) {
        var deleteResponse = new blogs.DeleteBlogResponse();
        deleteResponse.setBlogId(blogId);

        console.log(
          "Blog request is now deleted with id: ",
          deleteResponse.toString()
        );

        callback(null, deleteResponse);
      } else {
        console.log("Nope....");

        return callback({
          code: grpc.status.NOT_FOUND,
          message: "Blog with the corresponding id was not found"
        });
      }
    });
}
function sum(call, callback) {
  var sumResponse = new calc.SumResponse();

  sumResponse.setSumResult(
    call.request.getFirstNumber() + call.request.getSecondNumber()
  );

  callback(null, sumResponse);
}

function greetManyTimes(call, callback) {
  var firstName = call.request.getGreeting().getFirstName();

  let count = 0,
    intervalID = setInterval(function() {
      var greetManyTimesResponse = new greets.GreetManyTimesResponse();
      greetManyTimesResponse.setResult(firstName);

      // setup streaming
      call.write(greetManyTimesResponse);
      if (++count > 9) {
        clearInterval(intervalID);
        call.end(); // we have sent all messages!
      }
    }, 1000);
}

//primeFactor -
function primeNumberDecomposition(call, callback) {
  var number = call.request.getNumber();
  var divisor = 2;

  console.log("Received number: ", number);

  while (number > 1) {
    if (number % divisor === 0) {
      var primeNumberDecompositionResponse = new calc.PrimeNumberDecompositionResponse();

      primeNumberDecompositionResponse.setPrimeFactor(divisor);

      number = number / divisor;

      //write the message using call.write()
      call.write(primeNumberDecompositionResponse);
    } else {
      divisor++;
      console.log("Divisor has increased to ", divisor);
    }
  }

  call.end(); // all messages sent! we are done
}

function longGreet(call, callback) {
  call.on("data", request => {
    var fullName =
      request.getGreet().getFirstName() +
      " " +
      request.getGreet().getLastName();

    console.log("Hello " + fullName);
  });

  call.on("error", error => {
    console.error(error);
  });

  call.on("end", () => {
    var response = new greets.LongGreetResponse();
    response.setResult("Long Greet Client Streaming.....");

    callback(null, response);
  });
}

function computeAverage(call, callback) {
  // running sum and count
  var sum = 0;
  var count = 0;

  call.on("data", request => {
    // increment sum
    sum += request.getNumber();

    console.log("Got number: " + request.getNumber());

    // increment count
    count += 1;
  });
  call.on("error", error => {
    console.log(error);
  });

  call.on("end", () => {
    // compute the actual average

    var average = sum / count;

    var response = new calc.ComputeAverageResponse();
    response.setAverage(average);

    callback(null, response);
  });
}
async function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), interval);
  });
}

// - FindMaximum - Solution
function findMaximum(call, callback) {
  var currentMaximum = 0;
  var currentNumber = 0;

  call.on("data", request => {
    currentNumber = request.getNumber();

    if (currentNumber > currentMaximum) {
      currentMaximum = currentNumber;

      var response = new calc.FindMaximumResponse();
      response.setMaximum(currentMaximum);

      call.write(response);
    } else {
      //do nothing
    }

    console.log("Streamed number: ", request.getNumber());
  });

  call.on("error", error => {
    console.error(error);
  });

  call.on("end", () => {
    var response = new calc.FindMaximumResponse();
    response.setMaximum(currentMaximum);

    call.write(response);

    call.end();
    console.log("The end!");
  });
}
async function greetEveryone(call, callback) {
  call.on("data", response => {
    var fullName =
      response.getGreet().getFirstName() +
      " " +
      response.getGreet().getLastName();

    console.log("Hello " + fullName);
  });

  call.on("error", error => {
    console.error(error);
  });

  call.on("end", () => {
    console.log("Server The End...");
  });

  for (var i = 0; i < 10; i++) {
    // var greeting = new greets.Greeting()
    // greeting.setFirstName('Paulo')
    // greeting.setLastName('Dichone')

    var request = new greets.GreetEveryoneResponse();
    request.setResult("Paulo Dichone");

    call.write(request);
    await sleep(1000);
  }

  call.end();
}

function greet(call, callback) {
  var greeting = new greets.GreetResponse();

  greeting.setResult(
    "Hello " +
      call.request.getGreeting().getFirstName() +
      " " +
      call.request.getGreeting().getLastName()
  );

  callback(null, greeting);
}

function squareRoot(call, callback) {
  var number = call.request.getNumber();

  if (number >= 0) {
    var numberRoot = Math.sqrt(number);
    var response = new calc.SquareRootResponse();
    response.setNumberRoot(numberRoot);

    callback(null, response);
  } else {
    // Error handling
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message:
        "The number being sent is not positive " + " Number sent: " + number
    });
  }
}

function main() {
  let credentials = grpc.ServerCredentials.createSsl(
    fs.readFileSync("../certs/ca.crt"),
    [
      {
        cert_chain: fs.readFileSync("../certs/server.crt"),
        private_key: fs.readFileSync("../certs/server.key")
      }
    ],
    true
  );

  let unsafeCreds = grpc.ServerCredentials.createInsecure();

  var server = new grpc.Server();

  server.addService(blogService.BlogServiceService, {
    listBlog: listBlog,
    createBlog: createBlog,
    readBlog: readBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog
  });

  server.addService(calcService.CalculatorServiceService, {
    sum: sum,
    primeNumberDecomposition: primeNumberDecomposition,
    computeAverage: computeAverage,
    findMaximum: findMaximum,
    squareRoot: squareRoot
  });

  server.addService(service.GreetServiceService, {
    greet: greet,
    greetManyTimes: greetManyTimes,
    longGreet: longGreet,
    greetEveryone: greetEveryone
  });
  server.bind("127.0.0.1:50051", unsafeCreds);
  server.start();

  console.log("Server running on port 127.0.0.1:50051");
}

main();
