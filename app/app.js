const express = require('express');
const app = express();
const redis = require('redis')

const client = redis.createClient({
  url: 'redis://redis'
})

app.get('/', (req, res) => {
  (async () => {
    await client.connect();
  })();

  // (async () => {
  //   await client.get('foo');
  // })();

  // client.get('bar', (err, reply) => {
  //   if (err) throw err;
  //   console.log(reply);
  // });

  // (async () => {
  //   client.get('bar', (err, reply) => {
  //     if (err) throw err;
  //     console.log(reply);
  //   });
  // })();

  // const myKeyValue = (async () => {
  //   await client.get('foo');
  // })();
  // console.log(myKeyValue);

  // const myKeyValue = (async () => {
  //   await client.get('foo', function(err, reply) {
  //     console.log(reply);
  //   });
  // })();
  // console.log(myKeyValue);

  // client.keys('*', (err, keys) => {
  //   console.log(reply);
  // });

  // const myKeyValue = (async () => {
  //   await client.keys('*', function(err, reply) {
  //     console.log(reply);
  //   });
  // })();
  // console.log(myKeyValue);

  // const myKeyValue1 = (async () => {
  //   await client.get("user").then((user) => {
  //     console.log(user);
  //   });
  // })();
  // console.log(myKeyValue1);

  // const myKeyValue = client.get("user").then((user) => {
  //   console.log(user);
  // });
  // console.log(myKeyValue);

  // client.get("user").then((user) => {
  //   console.log(user);
  // });

  const myKeyValue = (async () => {
    await client.get("user").then((user) => {
      console.log(user);
    });
  })();

  // console.log(myKeyValue);






  (async () => {
    await client.quit();
  })();

  res.json(
      {
          "user": "home"
      }
  );
})

app.post('/user', (req, res) => {

  (async () => {
    await client.connect();
  })();

  // client.set('foo', 'bar');
  // client.close();
  // client.disconnect()

  (async () => {
    await client.set('user', req.query.username);
  })();

  (async () => {
    await client.quit();
  })();

  res.json(
      {
          "user": req.query.username
      }
  );
})

app.listen(8080, ()=>{
  console.log(`Server listening on port 8080`);
});