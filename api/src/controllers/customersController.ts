import Supabase from "../repository/supabase.ts";
import { Context } from "../../deps.ts";

const supabase = Supabase.getInstance().client;

export const getCustomers = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Getting customers");

  try {
    const { data: customers, error } = await supabase
      .from("customers")
      .select("*");

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    if (!customers || customers.length == 0) {
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
      customers,
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

export const getCustomer = async (ctx: any, next: () => Promise<unknown>) => {
  let response = {};
  console.log("Getting a customer");

  try {
    const { data: customers, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", ctx.params.id);

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    if (!customers || customers.length == 0) {
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
      customer: customers[0],
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

export const postCustomer = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  const body = ctx.request.body();
  let response = {};
  let data = await body.value;
  console.log("Adding a customer");

  if (typeof data == "string") {
    data = JSON.parse(data);
  }

  try {
    const { data: customers, error } = await supabase
      .from("customers")
      .insert(data)
      .select();

    if (error || customers.length == 0) {
      throw new Error(JSON.stringify(error));
    }

    response = {
      success: true,
      customer: customers[0],
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

export const putCustomer = async (ctx: any, next: () => Promise<unknown>) => {
  const body = ctx.request.body();
  let response = {};
  let data = await body.value;
  console.log("Updating a customer");

  if (typeof data == "string") {
    data = JSON.parse(data);
  }

  try {
    const { data: customers, error } = await supabase
      .from("customers")
      .update(data)
      .eq("id", ctx.params.id)
      .select();

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    if (!customers || customers.length == 0) {
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
      customer: customers[0],
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

export const deleteCustomer = async (
  ctx: any,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Deleting a customer");

  try {
    const { data: customers, error: errorSelect } = await supabase
      .from("customers")
      .select("*")
      .eq("id", ctx.params.id);

    if (errorSelect) {
      throw new Error(JSON.stringify(errorSelect));
    }

    if (!customers || customers.length == 0) {
      response = {
        success: false,
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    const { error: errorDelete } = await supabase
      .from("customers")
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
