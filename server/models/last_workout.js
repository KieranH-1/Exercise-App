const data = require("../data/last_workout.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "last_workout";

const isAdmin = true;

async function get(id, limit = 30, offset = 0) {
  const list = await connect()
    .from(TABLE_NAME)
    .select("*")
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

async function update(user_id, item) {
  if (!isAdmin) {
    throw CustomError(
      "Sorry, you are not authorized to update this item",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: updatedItem, error } = await connect()
    .from(TABLE_NAME)
    .update(item)
    .eq("user_id", user_id)
    .select("*");
  if (error) {
    throw error;
  }
  return updatedItem;
}

async function seed() {
  const { data: users } = await connect().from("users").select("*");
  let i = 0;
  for (const item of data.items) {
    const user = users[i];
    i++;
    const insert = mapToDB(item, user.user_id);
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
    exercise: item.exercise,
    duration: item.duration,
    sets: item.sets,
    reps: item.reps,
  };
}

module.exports = {
  get,
  update,
  create,
  seed,
};
