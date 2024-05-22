const { ProductFromModel } = require("./Model");
const { connect } = require("mongoose");
const  { MONGO_URL } = require ("./../../index")


const CreateProduct = async (req, res) => {
  const {
    ProductName,
    ProductCategory,
    ProductPrice,
    // ProductBrand,
    rating,
    ProductThumbnail,
    ProductDescription,
    ProductImageArray
  } = req.body;

  // // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
  if (
    !ProductName ||
    !ProductCategory ||
    !ProductPrice ||
    // !ProductBrand ||
    !ProductThumbnail ||
    !ProductDescription ||
    !ProductImageArray
  ) {
    res.status(403).json({
      message: "Some Fields are Missing",
    });
  } else {
    try {
      await connect(MONGO_URL);
    //   res.json({
    //     message: "database connected",
    //   });

      // Check if product already exists
      const checkExistance = await ProductFromModel.exists({
        ProductName,
        ProductCategory,
        // ProductBrand,
        ProductPrice,
        ProductThumbnail,
        ProductDescription,
        ProductImageArray,
      });
      if (checkExistance) {
        res.status(400).json({
          message: "Product already exists",
        });
      } else {
        await ProductFromModel.create({
          ProductName,
          ProductCategory,
          ProductPrice,
          // ProductBrand,
          ProductThumbnail,
          rating,
          ProductDescription,
          ProductImageArray
        });

        const AllProducts = await ProductFromModel.find();
        res.json({
          message: "New Product Created",
          AllProduct: AllProducts,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Some error occurred:",
        errorMessage: error.message,
      });
    }
  }
};

const ProductByName =async (req, res) => {
  const {ProductName}=req.query

    try {
     await connect(MONGO_URL)
     const ProductByName=await ProductFromModel.findOne({ProductName})
     res.json({ProductByName})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

const ProductReviews = async (req, res) => {

  const { _id, rating, username, review } = req.body

  try {
      await connect(MONGO_URL)
      console.log("DB CONNECTED")

      const Product = await ProductFromModel.findOne({ _id })
      Product.reviews.unshift({ username, rating, review })

      await Product.save();

      const allProduct = await ProductFromModel.findOne({ _id })

      res.status(201).json({
          message: "Reviews Added Successfully",
          Product: allProduct
      })

  } catch (error) {
      console.error(error)
      res.status(500).json({
          message: "Database Connection Failed"
      })
  }
}

const AllProduct=async (req, res) => {

  try {
      await connect(MONGO_URL)  //connect hoga db idher

      const AllProducts=await ProductFromModel.find()
              res.json({
                  
                  Products:AllProducts

              })
  
      
  } catch (error) {
      res.status(400).json({
          message:"Error:",
          messagedusra:error.message
      })
      
  }
}

const ProductByID =async (req, res) => {
  const {_id}=req.query

    try {
     await connect(MONGO_URL)
     const ProductById=await ProductFromModel.findOne({_id})
     res.json({ProductById})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

// const ProductByBrandName =async (req, res) => {
//   const {ProductBrand}=req.query

//     try {
//      await connect(MONGO_URL)
//      const ProductByBrandName=await ProductFromModel.find({ProductBrand})
//      res.json({ProductByBrandName})
        
//     } catch (error) {
//         res.status(400).json({
//             message:"Some Error Came:",
//             ErrorMessage:error.message
//         })
        
//     }
// };

const ProductByProductCategoryName =async (req, res) => {
  const {ProductCategory}=req.query

    try {
     await connect(MONGO_URL)
     const ProductByProductCategory=await ProductFromModel.find({ProductCategory})
     res.json({ProductByProductCategory})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

const UpdateProduct =async (req, res) => {
  const {
    _id,
    ProductName,
    ProductCategory,
    ProductPrice,
    // ProductBrand,
    rating,
    ProductThumbnail,
    ProductDescription,
    ProductImageArray
  } = req.body;
     
    
  const filter = { _id };
  const update = { ProductName,
    ProductCategory,
    ProductPrice,
    // ProductBrand,
    rating,
    ProductThumbnail,
    ProductDescription,
    ProductImageArray };

  try {
      //db connection
      await connect(MONGO_URL)  //connect hoga db idher
      await ProductFromModel.findOneAndUpdate(filter, update, {
          new: true
        });

      //   sara lany k liye
      const ProductUpdate= await ProductFromModel.find()

      res.json({
          message:"Updation Done Succesfully",
          ProductUpdate
      })

      
  } catch (error) {
      res.status(400).json({
         message:"Some Error Came:",
         ErrorMessage:error.message
      })
      
  }
};

const DeleteProduct =async (req, res) => {
  const {_id}=req.body

    try {
     await connect(MONGO_URL)   //mongo connection
     //pehly find to karo k wo chez db mai hai bhi ya nahi
     if (_id){
            await ProductFromModel.deleteOne({_id})      //api call hony pe delete hojayegi
            const AllProducts=await ProductFromModel.find()      //ek variable main baki ki mungwali
            res.status(200).json({
                message:"Deleted succesfully",
                AllProducts
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

module.exports = {
  CreateProduct,
  ProductByName,
  // ProductByBrandName,
  ProductByProductCategoryName,
  ProductByID,
  UpdateProduct,
  DeleteProduct,
  AllProduct,
  ProductReviews
};
