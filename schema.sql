DROP TABLE IF EXISTS weathers, events, locations;


CREATE TABLE IF NOT EXISTS locations (
  id  SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7)
);

CREATE TABLE IF NOT EXISTS weather(
  id  SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  forecast VARCHAR(255),
  weather_time VARCHAR(255),
  location_id INTEGER REFERENCES locations(id)
);

CREATE TABLE IF NOT EXISTS events(
  id  SERIAL PRIMARY KEY,
  search_query VARCHAR(255),  
  link VARCHAR(255),
  event_name VARCHAR(255),
  event_date CHAR(15),
  summary VARCHAR(1000),
  location_id INTEGER REFERENCES locations(id)
);