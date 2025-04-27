/*  B"H
 */

const data = require("../data/users.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "users";

const BaseQuery = () => connect().from(TABLE_NAME);
//.select('*')

const isAdmin = true;

async function getAll(limit = 30, offset = 0, sort = "id", order = "desc") {
  const list = await BaseQuery()
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + limit - 1); // 0 based index but range is inclusive
  if (list.error) {
    throw list.error;
  }
  return {
    items: list.data,
    total: list.count,
  };
}

async function get(id) {
  const { data: item, error } = await connect().from(TABLE_NAME).eq("id", id);
  if (!item.length) {
    throw new CustomError("Item not found", statusCodes.NOT_FOUND);
  }
  if (error) {
    throw error;
  }
  return item[0];
}

async function search(
  query,
  limit = 30,
  offset = 0,
  sort = "id",
  order = "desc"
) {
  const {
    data: items,
    error,
    count,
  } = await BaseQuery()
    .or(
      `first.ilike.%${query}%,last.ilike.%${query}%,email.ilike.%${query}%,username.ilike.%${query}%`
    )
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + limit - 1);
  if (error) {
    throw error;
  }
  return {
    items,
    total: count,
  };
}

async function create(item) {
  if (!isAdmin) {
    throw CustomError(
      "Sorry, you are not authorized to create a new item",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: newItem, error } = await connect()
    .from(TABLE_NAME)
    .insert(item)
    .select("*");
  if (error) {
    throw error;
  }
  return newItem;
}

async function update(id, item) {
  if (!isAdmin) {
    throw CustomError(
      "Sorry, you are not authorized to update this item",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: updatedItem, error } = await connect()
    .from(TABLE_NAME)
    .update(item)
    .eq("id", id)
    .select("*");
  if (error) {
    throw error;
  }
  return updatedItem;
}

async function remove(id) {
  if (!isAdmin) {
    throw CustomError(
      "Sorry, you are not authorized to delete this item",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: deletedItem, error } = await connect()
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  return deletedItem;
}

async function seed() {
  for (const item of data.items) {
    const insert = mapToDB(item);
    const { data: newItem, error } = await connect()
      .from(TABLE_NAME)
      .insert(insert)
      .select("*");
    if (error) {
      throw error;
    }
  }
  return { message: "Seeded successfully" };
}

function mapToDB(item) {
  return {
    user_id: item.id,
    first_name: item.first,
    last_name: item.last,
    email: item.email,
    username: item.username,
    password: item.password,
    profile_picture: item.profile_picture,
    admin: item.admin,
  };
}

module.exports = {
  getAll,
  get,
  search,
  create,
  update,
  remove,
  seed,
};
