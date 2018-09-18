const keyPublishable = 'pk_test_c55Zd5nVXhpkTvku3xmVpguH';
//pk_test_EcJC1f1pxRB9qIiDMJu8NMoe
const keySecret = 'sk_test_CbAIMoyVjUCoPPga6W4p0lgG';
//sk_test_pxHM5nOlgqMXM7TsinCTnH4m
const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "ejs");
app.use(require("body-parser").urlencoded({extended: false}));

app.get("/", function(req, res){
  res.render("index", {keyPublishable})
});


app.post("/charge", function(req, res) {
  let amount = 900; 
  console.log(req.body.stripeToken);
  stripe.customers.create({

    email: req.body.stripeEmail,
    card: req.body.stripeToken

  })

  .then(function(customer) {
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id,

    })
  })
  
  .catch(function(err) { 
    console.log("Error:", err)
  })

  .then(function(charge) { 
    res.render("charge")
  });

});

app.listen(3000, function(req, res){
  console.log("3000");
});