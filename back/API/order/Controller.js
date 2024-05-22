const nodemailer = require("nodemailer");
var Mailgen = require("mailgen");
const { connect } = require("mongoose");
const Orders = require("./Model");
const { MONGO_URL } = require("./../../index");
const { NODEMAILER_EMAIL } = require("./../../index");
const { NODEMAILER_PASSWORD } = require("./../../index");

const placeorder = async (req, res) => {
  const {
    customerName,
    items,
    totalBill,
    customerEmail,
    customerId,
    DeliveryMode,
    Deliveryfee,
    CardNumber,
    paymode,
    NameOnCard,
    CardExpiryDate,
    SecurityCode,
    Country,
    Address,
    City,
    Phone,
  } = req.body;
  
  // console.log("Received Payload:", req.body);
  if (
    !customerName ||
    !items ||
    !totalBill ||
    !customerEmail ||
    !customerId ||
    !DeliveryMode ||
    !Deliveryfee ||
    !CardNumber ||
    !paymode ||
    !NameOnCard ||
    !CardExpiryDate ||
    !SecurityCode ||
    !Country ||
    !Address ||
    !City ||
    !Phone 
  ) {
    res.status(403).json({ message: "Some fields are missing" });
  } 
  
  
  else {
    try {
      await connect(MONGO_URL);
      const order = await Orders.create({
        customerName,
        items,
        totalBill,
        customerEmail,
        customerId,
        DeliveryMode,
        Deliveryfee,
        CardNumber,
        paymode,
        NameOnCard,
        CardExpiryDate,
        SecurityCode,
        Country,
        Address,
        City,
        Phone,
      });

      //                                 EMAIL
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_PASSWORD,
        },
      });

      //MAIL GEN SETUP

      var mailGenerator = new Mailgen({
        theme: "default",
        product: {
          // Appears in header & footer of e-mails
          name: "BakeHype: ",
          link: "https://mailgen.js/",
        },
      });
      await transporter.sendMail({
        from: NODEMAILER_EMAIL, // sender address
        to: customerEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: mailGenerator.generate({
          body: {
            name: customerName,
            intro:
              "Thank You for ordering from our sweet little store, Your order will be delivered soon",
            table: {
              data: [
                {
                  name: customerName,
                  email: customerEmail,
                  TrackingId: order._id,
                  // Address: Address,
                  // Contact: Phone,
                },
              ],
            },
            outro:
              "Please make sure the above mentioned details are correct , incase any mistake , you can contact us.",
          },
        }), // html body
      });

      //          Back
      res.status(201).json({
        message: "Order Place Successfully",
        TrackingId: order._id, //abhi yeh jo humny order diya uski id tracking id kehlati
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
//All orders
const allOrders = async (req, res) => {
  try {
    await connect(MONGO_URL);
    const orders = await Orders.find();
    res.json({ orders });
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
};
//kisi bhi ek order ko track krwana by id   ORDER BY ID
const trackOrder = async (req, res) => {
  const { _id } = req.query;
  try {
    await connect(MONGO_URL);
    const order = await Orders.findOne({ _id });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const OrderByUserEmail = async (req, res) => {
  const { customerEmail } = req.query;


  try {
    await connect(MONGO_URL)
    const OrderByEmail=await Orders.find({customerEmail})
    res.json({OrderByEmail})
       
   } catch (error) {
       res.status(400).json({
           message:"Some Error Came:",
           ErrorMessage:error.message
       })
       
   }

}


const DeleteOrder =async (req, res) => {
  const {_id}=req.body

    try {
     await connect(MONGO_URL)   //mongo connection
     //pehly find to karo k wo chez db mai hai bhi ya nahi
     if (_id){
            await Orders.deleteOne({_id})      //api call hony pe delete hojayegi
            const orders=await Orders.find()      //ek variable main baki ki mungwali
            res.status(200).json({
                message:"Deleted succesfully",
                orders
            })
        } else{
            res.json({
                message:"The id you are trying to delete do not exists"
            })
        }
    }catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};
module.exports = { placeorder, allOrders, trackOrder, OrderByUserEmail, DeleteOrder };
