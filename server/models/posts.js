const data = require("../data/posts.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "posts";

const BaseQuery = () => connect().from(TABLE_NAME).select("*");

const isAdmin = true;

async function getAll(
  limit = 30,
  offset = 0,
  sort = "created_at",
  order = "asc"
) {
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

async function get(
  id,
  limit = 30,
  offset = 0,
  sort = "created_at",
  order = "asc"
) {
  const list = await BaseQuery()
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + limit - 1)
    .eq("user_id", id); // 0 based index but range is inclusive
  if (list.error) {
    throw list.error;
  }
  return {
    items: list.data,
    total: list.count,
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

async function remove(post_id) {
  if (!isAdmin) {
    throw CustomError(
      "Sorry, you are not authorized to delete this item",
      statusCodes.UNAUTHORIZED
    );
  }

  console.log("Deleting post with ID:", post_id);
  const { data: deletedItem, error } = await connect()
    .from(TABLE_NAME)
    .delete()
    .eq("post_id", post_id)
    .select("*"); // Select the deleted item to return it

  console.log(data);
  if (error) {
    throw error;
  }
  return deletedItem;
}

async function seed() {
  const { data: users } = await connect().from("users").select("*");

  for (const item of data.items) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];

    const insert = mapToDB(item, randomUser.user_id);
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

function mapToDB(item, user_id) {
  return {
    user_id: user_id,
    description: item.description,
    exercise: item.exercise,
    equipment: item.equipment,
    duration: item.duration,
    sets: item.sets,
    reps: item.reps,
    image: item.image,
    email: item.email,
    username: item.username,
    profile_picture: item.profile_picture,
  };
}

module.exports = {
  get,
  getAll,
  create,
  remove,
  seed,
};
