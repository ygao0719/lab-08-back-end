CREATE TABLE locations (
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude DECIMAL,
  longitude DECIMAL
);

CREATE TABLE weather(
  search_query VARCHAR(255),
  forecast TEXT,
  weather_time TEXT
);

CREATE TABLE events(
  search_query VARCHAR(255),  
  link TEXT,
  event_name TEXT,
  event_date TEXT,
  summary TEXT
);