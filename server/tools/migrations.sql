-- SQL for a posgresql database
-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image TEXT,
    admin BOOLEAN NOT NULL
);
-- Add indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
-- Create the products table
CREATE TABLE posts (
    description TEXT NOT NULL,
    exercise VARCHAR(100) NOT NULL,
    equipment VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    sets INT,
    reps INT,
    timestamp DATE NOT NULL DEFAULT CURRENT_DATE,
    image TEXT,
    user_email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);
-- Create the product_reviews table
CREATE TABLE last_workout (
    name VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    sets INT,
    reps INT,
    timestamp DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Add indexes for performance optimization
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
-- The following SQL statements are used to allow aggregate functions in PostgREST
ALTER ROLE authenticator
SET pgrst.db_aggregates_enabled = 'true';
NOTIFY pgrst,
'reload config';