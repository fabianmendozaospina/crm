import Supabase from "../repository/supabase.ts";
import { Context } from "../../deps.ts";

const supabase = Supabase.getInstance().client;

export const getOrders = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Getting orders");

  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    if (!orders || orders.length == 0) {
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
      orders,
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

export const getOrder = async (ctx: any, next: () => Promise<unknown>) => {
  let response = {};
  console.log("Getting a order");

  try {
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", ctx.params.id);

    if (error) {
      throw new Error(error.message);
    }

    if (!order || order.length == 0) {
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
      order,
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

export const postOrder = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  console.log("Adding a order");
  let response = {};

  try {
    const body = ctx.request.body();
    let data = await body.value;

    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    const { data: orders, error: errorOrder } = await supabase
      .from("orders")
      .insert({ customerId: ctx.params.customerId })
      .select();

    if (errorOrder || orders.length == 0) {
      throw new Error(JSON.stringify(errorOrder));
    }

    const details: any = [];
    data.map((product: any) => {
      details.push({
        orderId: orders[0].id,
        productId: product.productId,
        amount: product.amount,
      });
    });

    const { data: orderDetails, error: errorDetails } = await supabase
      .from("orderDetails")
      .insert(details)
      .select(`
        orders (
          id,
          customerId
        ),      
        id,
        productId,
        amount
      `);

    if (errorDetails || orderDetails.length == 0) {
      throw new Error(JSON.stringify(errorDetails));
    }

    response = {
      success: true,
      order: orderDetails,
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

export const putOrder = async (ctx: any, next: () => Promise<unknown>) => {
  let response = {};
  const body = ctx.request.body();
  const data = await body.value;
  console.log("Updating a order");

  try {
    const { data: order, error } = await supabase
      .from("orders")
      .update(data)
      .eq("id", ctx.params.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!order || order.length == 0) {
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
      order,
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

export const deleteOrder = async (
  ctx: any,
  next: () => Promise<unknown>,
) => {
  let response = {};
  console.log("Deleting a order");

  try {
    const { data: order, error: error1 } = await supabase
      .from("orders")
      .select("*")
      .eq("id", ctx.params.id);

    if (error1) {
      throw new Error(error1.message);
    }

    if (!order || order.length == 0) {
      response = {
        success: false,
      };
      ctx.response.status = 404;
      ctx.response.body = response;
      return;
    }

    const { error: error2 } = await supabase
      .from("orders")
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
