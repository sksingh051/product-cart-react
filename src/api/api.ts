import axios from "axios";
import type { Products } from "../types/type";

// Api call to get Category list
export async function fetchCategoryList(): Promise<string[]> {
  try {
    const { data } = await axios(
      "https://dummyjson.com/products/category-list",
    );
    const response = data;
    return response;
  } catch (error) {
    console.error("Error fetching category List:", error);
    return [];
  }
}

// function to get all the items of a specific category
export async function fetchSepcificCategory(
  name: string,
): Promise<Products[]> {
  try {
    const { data } = await axios(
      `https://dummyjson.com/products/category/${name}`,
    );
    const response = data.products;
    return response;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

// function to get all the searched items
export async function fetchSearchedProduct(
  searchQuery: string,
): Promise<Products[]> {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${searchQuery}`,
    );
    const response = data.products;
    return response;
  } catch (error) {
    console.error("Error while fetching the product", error);
    return [];
  }
}

// function to get the product info for carousel
export async function fetchHeroProducts(): Promise<Products[]> {
  try {
    const { data } = await axios.get("https://dummyjson.com/products?limit=15");
    return data.products;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching hero products:", error.message);
    }
    return [];
  }
}