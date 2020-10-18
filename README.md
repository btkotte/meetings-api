# Meetings API

## Requirements

For building and running the application you need:

- node.js
- npm
- Mongo DB

&nbsp;
## Running the application locally


```shell
npm start PORT=<server-port> JWTKEY=<key-for-signing-jwt> DBURL=<mongodb-connection-url>
```
The environment variables are optional and are cofigured with following defaults
| Variable | Default value  |
| :--- | :--- |
| `PORT` | 3000 |
| `JWTKEY` | jwt-siging-key-that-should-be-passed-as-env-variable |
| `DBURL` | mongodb://127.0.0.1:27017/meetings-db |

&nbsp;
&nbsp;

## Meetings API

&nbsp;
## Register user


```http
POST /api/auth/register
```

| Json Body | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. The name of the user|
| `email` | `string` | **Required**. The email of the user|
| `password` | `string` | **Required**. The password of the user|
```javascript
{
    "name": "user1",
    "email": "user1@email.com",
    "password" : "test1234"
}
```

## Login user
 Returns a JWT token valid for 24 hrs after successful login.

```http
POST /api/auth/login
```

| Json Body | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. The email of the user|
| `password` | `string` | **Required**. The password of the user|
```javascript
{
    "email": "user1@email.com",
    "password" : "test1234"
}
```

Sample response

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOGMxMmI5YWQ4NWI5MjFjYmQ2NDliYiIsImlhdCI6MTYwMzAxNTQwNSwiZXhwIjoxNjAzMTAxODA1fQ.IdsZrxJTM-sLwhcWHW0qPq992YtnceuOWO8smrEsuLA",
}
```


## Create a meeting

Create a meeting with the given values and return the created meeting with id. Requires `Authorization` header with the JWT token received after login

```http
POST /api/meetings/
```

| Json Body | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. The title of the meeting |
| `date` | `string` | **Required**. The date in dd-MMM-yyyy format |
| `time` | `string` | **Required**. The time in HH:MM format|
| `organiser` | `string` | **Required**. The name or email of organizer |
| `attendies` | `list<string>` | **Required**. The list of name or email of attendies |
| `timestamp` | `string` | The timestamp when the event was created |

### Sample request

```javascript
{
    "title" : "test",
    "date" : "22-Oct-2020",
    "time" : "09:00",
    "organiser": "user1@email.com",
    "attendies" : ["user2@email.com", "user3@email.com"]
}
```

### Sample response

```javascript
{
    "_id" : "5f8c14c4a2d4222291a5c169"
    "title" : "test",
    "date" : "22-Oct-2020",
    "time" : "09:00",
    "organiser": "user1@email.com",
    "attendies" : ["user2", "user3@email.com"]
}
```



## Fetch meetings

List of meetings matching the provided options. If no options are passed then returns all the meetings

```http
GET /api/meetings?option1=a&option2=b
```
options are the fields of a meeting that are to be searched

### Sample response

/api/meetings?title=test

```javascript
[

    {
        "_id" : "5f8c14c4a2d4222291a5c169"
        "title" : "test",
        "date" : "22-Oct-2020",
        "time" : "09:00",
        "organiser": "user1@email.com",
        "attendies" : ["user2", "user3@email.com"]
    }

]
```

## Update a meeting

Updates a meeting and returns the updated details

```http
PUT /api/meetings/{id}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | **Required**. The _id of the meeting|

### Sample request

```javascript
{
    "title" : "test-updated",
    "time" : "11:00",
}
```

### Sample response

```javascript
{
    "_id" : "5f8c14c4a2d4222291a5c169"
    "title" : "test-updated",
    "date" : "22-Oct-2020",
    "time" : "11:00",
    "organiser": "user1@email.com",
    "attendies" : ["user2", "user3@email.com"]
}
```

## Error Responses

All API endpoints return the JSON representation of error
```javascript
{
    "message" : string
}
```

The `message` attribute contains detailed error message

## Status Codes

The following status codes are returned in the API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 401 | `UN AUTHORIZED` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |