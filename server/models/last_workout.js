const data = require("../data/last_workout.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "last_workout";

const isAdmin = true;

async function get(id) {
  const { data: item, error } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", id);
  console.log(item);
  if (!item.length) {
    throw new CustomError("Item not found", statusCodes.NOT_FOUND);
  }
  if (error) {
    throw error;
  }
  return item;
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
    .eq("user_id", id)
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
    const insert = mapToDB(item, user);
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

function mapToDB(item, user) {
  return {
    user_id: user.id,
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
