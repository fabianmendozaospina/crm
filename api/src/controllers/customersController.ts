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
      throw new Error(error.message);
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
      error: error.message || error,
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
    const { data: customer, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", ctx.params.id);

    if (error) {
      throw new Error(error.message);
    }

    if (!customer || customer.length == 0) {
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
      customer,
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
    const { data: customer, error } = await supabase
      .from("customers")
      .insert(data)
      .select();

    if (error || customer.length == 0) {
      throw new Error(error?.message);
    }

    response = {
      success: true,
      customer,
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

export const putCustomer = async (ctx: any, next: () => Promise<unknown>) => {
  let response = {};
  const body = ctx.request.body();
  const data = await body.value;
  console.log("Updating a customer");

  try {
    const { data: customer, error } = await supabase
      .from("customers")
      .update(data)
      .eq("id", ctx.params.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!customer || customer.length == 0) {
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
      customer,
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

export const deleteCustomer = async (
  ctx: any,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Deleting a customer");

  try {
    const { data: customer, error: error1 } = await supabase
      .from("customers")
      .select("*")
      .eq("id", ctx.params.id);

    if (error1) {
      throw new Error(error1.message);
    }

    if (!customer || customer.length == 0) {
      response = {
        success: false,
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    const { error: error2 } = await supabase
      .from("customers")
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
