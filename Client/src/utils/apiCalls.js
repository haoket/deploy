import axios from "axios";
import { apiDomain } from "./utilsDomain";

//axios request to create a new product
// PRODUCTS


// CREATE
export const createProduct = async (product) => {

  try {
    // axios request
    const { data } = await axios.post(apiDomain + "/createproducts", product);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadImage = async (dataImage) => {

  try {
    // axios request
    const { data } = await axios.post(apiDomain + "/uploadImage", dataImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createCategory = async (categories) => {
  try {
    // axios request
    const { data } = await axios.post(apiDomain + "/categories", categories);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createBlog = async (blog) => {
  try {
    // axios request
    const { data } = await axios.post(apiDomain + "/create-blog", blog);
    return data;
  } catch (error) {
    console.error(error);
  }
};




// UPDATE
export const updateProduct = async (updatedProduct, productID) => {
  try {
    // axios request
    const { data } = await axios.put(
      apiDomain + "/products/" + productID,
      updatedProduct
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateImage = async (selectedImages, userId) => {
  try {
    // axios request
    const { data } = await axios.put(
      apiDomain + "/users/update/" + userId,
      selectedImages
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
//DELETE

export const deleteProduct = async (productID) => {
  try {
    // axios request
    const { data } = await axios.delete(apiDomain + "/products/" + productID);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCategory = async (categoriesID) => {
  try {
    // axios request
    const { data } = await axios.delete(apiDomain + "/categories/" + categoriesID);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//GETPRODUCTBYID
export const getProductById = async (productID) => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/products/" + productID);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// get product by slug
export const getProductBySlug = async (productSlug) => {
  console.log('====================================');
  console.log(`${apiDomain}/products/${productSlug}`);
  console.log('====================================');
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/products/tay-trang");

    return data;
  } catch (error) {
    console.error(error);
  }
};
//GETPRODUCT
export const getProducts = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/products");
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getCategory = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/categories");
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getProductsPriceDesc = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/getProductsPriceDesc");
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getProductsPriceAsc = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/getProductsPriceAsc");
    return data;
  } catch (error) {
    console.error(error);
  }
};





///GET BLOG

export const getBlog = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/blog");
    return data;
  } catch (error) {
    console.error(error);
  }
};

///DELETE BLOG
export const deleteBlog = async (blogID) => {
  try {
    // axios request
    const { data } = await axios.delete(apiDomain + "/delete-blog/" + blogID);
    return data;
  } catch (error) {
    console.error(error);
  }
};


export const updateBlog = async (updatedBlog, blogID) => {
  try {
    // axios request
    const { data } = await axios.put(
      apiDomain + "/update-blog/" + blogID,
      updatedBlog
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBlogById = async (blogID) => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/getBlogById/" + blogID);
    return data;
  } catch (error) {
    console.error(error);
  }
};
