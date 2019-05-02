CREATE TABLE locations (
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude DECIMAL,
  longitude DECIMAL
);

CREATE TABLE weather(
  forecast TEXT,
  weather_time TEXT
);

CREATE TABLE events(
  link TEXT,
  event_name TEXT,
  event_date TEXT,
  summary TEXT
);