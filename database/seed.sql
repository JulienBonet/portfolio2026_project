USE portfolio_db;

-- =====================================================
-- ADMIN USER
-- =====================================================

INSERT INTO users (
login,
password
)
VALUES (
'admin',
'1234'
);

-- =====================================================
-- TECHNOLOGIES
-- =====================================================

INSERT INTO technologies (
name,
icon_url,
category,
is_featured
)
VALUES

-- Frontend

('HTML', NULL, 'frontend', FALSE),
('CSS', NULL, 'frontend', FALSE),
('JavaScript', NULL, 'frontend', FALSE),
('TypeScript', NULL, 'frontend', TRUE),
('React', NULL, 'frontend', TRUE),
('Vite', NULL, 'frontend', TRUE),
('Material UI', NULL, 'frontend', TRUE),

-- Backend

('Node.js', NULL, 'backend', TRUE),
('Express', NULL, 'backend', TRUE),
('JWT', NULL, 'backend', FALSE),
('Multer', NULL, 'backend', FALSE),

-- Database

('MySQL', NULL, 'database', TRUE),

-- DevOps

('Docker', NULL, 'devops', TRUE),
('Nginx', NULL, 'devops', FALSE),
('Linux', NULL, 'devops', FALSE),
('Hetzner', NULL, 'devops', FALSE),

-- Tools

('Git', NULL, 'tool', FALSE),
('GitHub', NULL, 'tool', FALSE),
('Cloudinary', NULL, 'tool', FALSE),
('Postman', NULL, 'tool', FALSE);
