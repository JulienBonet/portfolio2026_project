-- =====================================================
-- Portfolio 2026
-- Database initialization
-- =====================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,

```
login VARCHAR(100) NOT NULL UNIQUE,

password VARCHAR(255) NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

);

-- =====================================================
-- PROJECTS
-- =====================================================

CREATE TABLE projects (
id INT AUTO_INCREMENT PRIMARY KEY,

```
title VARCHAR(255) NOT NULL,

slug VARCHAR(255) NOT NULL UNIQUE,

short_description TEXT NOT NULL,

full_description LONGTEXT,

project_type ENUM(
    'school',
    'hackathon',
    'personal',
    'professional'
) NOT NULL,

duration VARCHAR(100),

github_url VARCHAR(255),

website_url VARCHAR(255),

demo_url VARCHAR(255),

youtube_url VARCHAR(255),

cover_image_url VARCHAR(255),

is_deployed BOOLEAN DEFAULT FALSE,

status ENUM(
    'draft',
    'published'
) NOT NULL DEFAULT 'draft',

display_order INT NOT NULL DEFAULT 0,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
```

);

-- =====================================================
-- TECHNOLOGIES
-- =====================================================

CREATE TABLE technologies (
id INT AUTO_INCREMENT PRIMARY KEY,

```
name VARCHAR(100) NOT NULL UNIQUE

icon_url VARCHAR(255),

category ENUM(
    'frontend',
    'backend',
    'database',
    'devops',
    'tool'
) NOT NULL,

is_featured BOOLEAN NOT NULL DEFAULT FALSE
```

);

-- =====================================================
-- PROJECT / TECHNOLOGIES
-- =====================================================

CREATE TABLE project_technologies (
project_id INT NOT NULL,

```
technology_id INT NOT NULL,

PRIMARY KEY (
    project_id,
    technology_id
),

CONSTRAINT fk_project_technologies_project
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE,

CONSTRAINT fk_project_technologies_technology
    FOREIGN KEY (technology_id)
    REFERENCES technologies(id)
    ON DELETE CASCADE
```

);

-- =====================================================
-- PROJECT IMAGES
-- =====================================================

CREATE TABLE project_images (
id INT AUTO_INCREMENT PRIMARY KEY,

```
project_id INT NOT NULL,

image_url VARCHAR(255) NOT NULL,

position INT NOT NULL DEFAULT 0,

CONSTRAINT fk_project_images_project
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE
```

);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_projects_status
ON projects(status);

CREATE INDEX idx_projects_display_order
ON projects(display_order);

CREATE INDEX idx_technologies_category
ON technologies(category);
