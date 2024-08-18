CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    last_login_date TIMESTAMP,
    status VARCHAR(255) NOT NULL,
    roles VARCHAR(255)
);

CREATE TABLE routes (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_cost DOUBLE PRECISION NOT NULL
);

CREATE TABLE delivery_costs (
    id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        distance_cost DOUBLE PRECISION NOT NULL,
        clearance_cost DOUBLE PRECISION NOT NULL,
        total_cost DOUBLE PRECISION NOT NULL,
        package_id BIGINT UNIQUE  -- Add package_id column here

        --package_id BIGINT UNIQUE REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE locations (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) UNIQUE NOT NULL,
    latitude DOUBLE PRECISION CHECK (latitude BETWEEN -180 AND 180),
    longitude DOUBLE PRECISION NOT NULL,
    clearing_cost DOUBLE PRECISION CHECK (clearing_cost BETWEEN 25 AND 100),
    delivery_route_id BIGINT REFERENCES routes(id) ON DELETE SET NULL
);

CREATE TABLE packages (
       id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        origin_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
        destination_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
        distance DOUBLE PRECISION NOT NULL,
        delivery_cost_id BIGINT UNIQUE

        --delivery_cost_id BIGINT UNIQUE REFERENCES delivery_costs(id) ON DELETE SET NULL
);

CREATE TABLE package_route (
    package_id BIGINT REFERENCES packages(id) ON DELETE CASCADE,
    location_id BIGINT REFERENCES locations(id) ON DELETE CASCADE,
    PRIMARY KEY (package_id, location_id)
);


ALTER TABLE delivery_costs
ADD CONSTRAINT fk_delivery_cost_package
FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE;

ALTER TABLE packages
ADD CONSTRAINT fk_package_delivery_cost
FOREIGN KEY (delivery_cost_id) REFERENCES delivery_costs(id) ON DELETE SET NULL;
