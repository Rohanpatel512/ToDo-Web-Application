/**
 * Retrieves data from the database
 */
SELECT list
FROM todo_app_users.users
WHERE BINARY username = "{{username}}";