/**
* Checks if username already exists within the database
*/
SELECT username 
FROM todo_app_users.users 
WHERE BINARY username = "{{username}}";

