import Supabase from "../repository/supabase.ts";
import { Context } from "../../deps.ts";

const supabase = Supabase.getInstance().client;

export const getProducts = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Getting products");

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    if (!products || products.length == 0) {
      response = {
        success: false,
        description: "no data was obtained",
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    response = {
      success: true,
      products,
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: error.message || error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};

export const getProduct = async (ctx: any, next: () => Promise<unknown>) => {
  let response = {};
  console.log("Getting a product");

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", ctx.params.id);

    if (error) {
      throw new Error(error.message);
    }

    if (!product || product.length == 0) {
      response = {
        success: false,
        description: "no data was obtained",
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    response = {
      success: true,
      product,
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: error.message || error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};

export const postProduct = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  let response = {};
  const body = ctx.request.body();
  const data = await body.value;
  console.log("Adding a product");

  try {
    const { data: product, error } = await supabase
      .from("products")
      .insert(data)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    response = {
      success: true,
      product,
    };
    ctx.response.status = 201;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: error.message || error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};

export const putProduct = async (ctx: any, next: () => Promise<unknown>) => {
  let response = {};
  const body = ctx.request.body();
  const data = await body.value;
  console.log("Updating a product");

  try {
    const { data: product, error } = await supabase
      .from("products")
      .update(data)
      .eq("id", ctx.params.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!product || product.length == 0) {
      response = {
        success: false,
        description: "no data was updated",
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    response = {
      success: true,
      product,
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: error.message || error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};

export const deleteProduct = async (
  ctx: any,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Deleting a product");

  try {
    const { data: product, error: error1 } = await supabase
      .from("products")
      .select("*")
      .eq("id", ctx.params.id);

    if (error1) {
      throw new Error(error1.message);
    }

    if (!product || product.length == 0) {
      response = {
        success: false,
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    const { error: error2 } = await supabase
      .from("products")
      .delete()
      .eq("id", ctx.params.id);

    if (error2) {
      throw new Error(error2.message);
    }

    response = {
      success: true,
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: error.message || error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};
