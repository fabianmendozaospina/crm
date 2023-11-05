import Supabase from "../repository/supabase.ts";
import { bcrypt, Context, create, getNumericDate } from "../../deps.ts";

const supabase = Supabase.getInstance().client;

export const registerUser = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  console.log("Registering an user");
  let response = {};

  try {
    const body = ctx.request.body();
    let data = await body.value;

    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    const salt = await bcrypt.genSalt(12);
    data.password = await bcrypt.hash(data.password, salt);

    const { data: users, error } = await supabase
      .from("users")
      .insert(data)
      .select();

    if (error || users.length == 0) {
      throw new Error(JSON.stringify(error));
    }

    response = {
      success: true,
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

export const loginUser = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  console.log("Login an user");
  let response = {};

  try {
    const body = ctx.request.body();
    let data = await body.value;

    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    const { email, password } = data;
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    if (!users || users.length == 0) {
      response = {
        success: false,
        description: "The user doesn't exist",
      };
      ctx.response.status = 401;
      ctx.response.body = response;
      await next();
      return;
    }

    if (!bcrypt.compareSync(password, users[0].password)) {
      response = {
        success: false,
        description: "Incorrect password!",
      };
      ctx.response.status = 401;
      ctx.response.body = response;
      await next();
      return;
    }

    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );

    const token = await create(
      {
        alg: "HS512",
        typ: "JWT",
      },
      {
        exp: getNumericDate(60 * 60),
        email: users[0].email,
        name: users[0].name,
        id: users[0].id,
      },
      key,
    );

    response = {
      success: true,
      token,
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
