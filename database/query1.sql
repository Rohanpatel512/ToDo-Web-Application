SELECT firstname 
FROM todo_app_users.users 
WHERE BINARY username = "{{username}}" AND BINARY password =  "{{password}}";

