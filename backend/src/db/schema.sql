CREATE DATABASE IF NOT EXISTS god_of_college;
USE god_of_college;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id               VARCHAR(36) PRIMARY KEY,
  email            VARCHAR(255) UNIQUE NOT NULL,
  password_hash    VARCHAR(255) NOT NULL,
  username         VARCHAR(100),
  current_energy   INT DEFAULT 2 CHECK (current_energy >= 0 AND current_energy <= 2),
  max_energy       INT DEFAULT 2,
  last_energy_update DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Master Card Data
CREATE TABLE IF NOT EXISTS cards (
  id               VARCHAR(36) PRIMARY KEY,
  name             VARCHAR(255) NOT NULL,
  element          VARCHAR(50) NOT NULL CHECK (element IN ('Ambis', 'Santuy', 'Bucin')),
  stage            INT NOT NULL CHECK (stage IN (0, 1, 2)),
  hp               INT NOT NULL,
  skill_name       VARCHAR(255),
  skill_effect     TEXT,
  weakness         VARCHAR(50),
  lore             TEXT,
  image_url        VARCHAR(500),
  rarity_weight    INT NOT NULL,
  is_active        BOOLEAN DEFAULT true,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Inventory
CREATE TABLE IF NOT EXISTS inventories (
  id               VARCHAR(36) PRIMARY KEY,
  user_id          VARCHAR(36) NOT NULL,
  card_id          VARCHAR(36) NOT NULL,
  quantity         INT DEFAULT 1 CHECK (quantity > 0),
  first_obtained_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards(id),
  UNIQUE(user_id, card_id)
);

-- Gacha Pull Logs
CREATE TABLE IF NOT EXISTS gacha_logs (
  id               VARCHAR(36) PRIMARY KEY,
  user_id          VARCHAR(36) NOT NULL,
  card_ids         JSON NOT NULL,
  energy_before    INT NOT NULL,
  energy_after     INT NOT NULL,
  pulled_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address       VARCHAR(45),
  user_agent       TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Milestone tracking
CREATE TABLE IF NOT EXISTS user_milestones (
  id               VARCHAR(36) PRIMARY KEY,
  user_id          VARCHAR(36) NOT NULL,
  milestone_key    VARCHAR(100) NOT NULL,
  achieved_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, milestone_key)
);

-- Indexes
CREATE INDEX idx_inventories_user_id ON inventories(user_id);
CREATE INDEX idx_gacha_logs_user_id ON gacha_logs(user_id);
CREATE INDEX idx_cards_element ON cards(element);
CREATE INDEX idx_cards_stage ON cards(stage);
