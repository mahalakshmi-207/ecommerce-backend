import Product from "../models/Product.js";

// Create a product
 const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, countInStock ,category} = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      countInStock,
      category,
      user: req.user._id, // reference to the user who created
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all products
// Get all products (with optional category filter)
const getProducts = async (req, res) => {
  try {
    const category = req.query.category;
    let products;

    if (category) {
      products = await Product.find({ category });  // ✅ filter by category
    } else {
      products = await Product.find({});
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// Get single product by ID
 const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

//update product

const updateProduct = async (req, res) => {
   try {
    const product =  await Product.findById(req.params.id);
   if(product) {
    product.name =name || product.name;
    product.description = description || product.description;
    product.price = price || product.price; 
    product.image = image || product.image;
    product.countInStock = countInStock || product.countInStock;
    product.category = category || product.category;

    const updatedProduct =await product.save();
    res.json(updatedProduct);
   } else {
    res.status(404).json({message:"Product not found"})
   }}   catch (error) {
    res.status(500).json({ message: "Server error", error });
   }
   };

   //get product created by login user

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export { 
  createProduct, 
  getProducts, 
  getProductById, 
  deleteProduct, 
  updateProduct, 
  getMyProducts   // ✅ include this
};