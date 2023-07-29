/**
 * Saves users todo into database 
 */
UPDATE todo_app_users.users
SET list = "{{todo}}"
WHERE BINARY username = "{{username}}";