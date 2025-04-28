
const data = require("../data/last_workout.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "last_workout";

const isAdmin = true;

async function get(id) {
  const { data: item, error } = await connect().from(TABLE_NAME).select('*').eq("user_id", id);
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
    user_id: item.user_id,
    description: item.description,
    exercise: item.exercise,
    equipment: item.equipment,
    duration: item.duration,
    sets: item.sets,
    reps: item.reps,
    image: item.image
  };
}

module.exports = {
  get,
  update,
  create,
  seed,
};
