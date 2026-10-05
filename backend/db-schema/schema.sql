DROP TABLE IF EXISTS applications CASCADE;

CREATE TABLE applications (
    -- Mécanique interne technique
    id SERIAL PRIMARY KEY,

-- Identifiant métier public (Sécurité anti-IDOR)
tracking_number VARCHAR(50) UNIQUE NOT NULL,

-- Cycle de vie
status VARCHAR(50) DEFAULT 'draft',
is_certified BOOLEAN DEFAULT FALSE,

-- ÉTAPE 1 : Identité (Requis dès la création)
last_name VARCHAR(100) NOT NULL,
first_name VARCHAR(100) NOT NULL,
birth_date DATE NOT NULL,
birth_place VARCHAR(150) NOT NULL,
gender VARCHAR(20) NOT NULL,
nationality VARCHAR(100) NOT NULL,
national_id_number VARCHAR(50) UNIQUE NOT NULL,

-- ÉTAPE 2 : Famille (Rempli plus tard)
marital_status VARCHAR(50),
father_name VARCHAR(150),
mother_name VARCHAR(150),

-- ÉTAPE 3 : Adresse (Rempli plus tard)
address TEXT, city VARCHAR(100), phone_number VARCHAR(20),

-- ÉTAPE 4 : Profession (Rempli plus tard)
profession VARCHAR(100), employer_name VARCHAR(150),

-- ÉTAPE 5 : Documents (URLs Supabase)
birth_certificate_url TEXT,
national_id_card_url TEXT,
proof_of_address_url TEXT,
id_photo_url TEXT,

-- Audit
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);