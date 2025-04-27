const { createClient } = require("@supabase/supabase-js");

module.exports = {
  connect() {
    return createClient(process.env.DATABASE_URL, process.env.PASSWORD);
  },
};
