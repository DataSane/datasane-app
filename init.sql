CREATE USER 'appuser'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'password123';
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%';
FLUSH PRIVILEGES;