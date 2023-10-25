import Supabase from "../repository/supabase.ts";
import { Context, preUploadValidate, upload } from "../../deps.ts";

const supabase = Supabase.getInstance().client;

export const getProducts = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  console.log("Getting products");
  let response = {};

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      throw new Error(JSON.stringify(error));
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
      error: typeof error.message == "string"
        ? JSON.parse(error.message)
        : error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};

export const getProduct = async (ctx: any, next: () => Promise<unknown>) => {
  console.log("Getting a product");
  let response = {};

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", ctx.params.id);

    if (error) {
      throw new Error(JSON.stringify(error));
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
      product: products[0],
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: typeof error.message == "string"
        ? JSON.parse(error.message)
        : error,
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
  console.log("Adding a product");
  let response = {};

  try {
    const body = await ctx.request.body({ type: "form-data" });
    const data = await body.value.read();
    const product: any = data.fields;
    const fileFullPath = data.files ? data.files[0].filename : "";

    if (fileFullPath == "") {
      throw new Error("The file is required.");
    }

    product.image = fileFullPath ? fileFullPath.split("/")[1] : "";

    await Deno.writeFile(
      `${Deno.cwd()}/static/${product.image}`,
      await Deno.readFile(fileFullPath || ""),
    );

    const { data: products, error } = await supabase
      .from("products")
      .insert(product)
      .select();

    if (error || products.length == 0) {
      throw new Error(JSON.stringify(error));
    }

    response = {
      success: true,
      products,
    };
    ctx.response.status = 201;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: typeof error.message == "string"
        ? JSON.parse(error.message)
        : error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};

export const putProduct = async (ctx: any, next: () => Promise<unknown>) => {
  console.log("Updating a product");
  let response = {};

  try {
    const body = await ctx.request.body({ type: "form-data" });
    const data = await body.value.read();
    const product: any = data.fields;
    const fileFullPath = data.files ? data.files[0].filename : "";

    if (fileFullPath != "") {
      product.image = fileFullPath ? fileFullPath.split("/")[1] : "";

      await Deno.writeFile(
        `${Deno.cwd()}/static/${product.image}`,
        await Deno.readFile(fileFullPath || ""),
      );
    }

    const { data: products, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", ctx.params.id)
      .select();

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    if (!products || products.length == 0) {
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
      product: products[0],
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: typeof error.message == "string"
        ? JSON.parse(error.message)
        : error,
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
  console.log("Deleting a product");
  let response = {};

  try {
    const { data: products, error: errorSelect } = await supabase
      .from("products")
      .select("*")
      .eq("id", ctx.params.id);

    if (errorSelect) {
      throw new Error(JSON.stringify(errorSelect));
    }

    if (!products || products.length == 0) {
      response = {
        success: false,
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    const { error: errorDelete } = await supabase
      .from("products")
      .delete()
      .eq("id", ctx.params.id);

    if (errorDelete) {
      throw new Error(JSON.stringify(errorDelete));
    }

    response = {
      success: true,
    };
    ctx.response.status = 200;
    ctx.response.body = response;
  } catch (error) {
    response = {
      success: false,
      error: typeof error.message == "string"
        ? JSON.parse(error.message)
        : error,
    };
    ctx.response.status = 500;
    ctx.response.body = response;
    await next();
  }
};
