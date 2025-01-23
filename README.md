# Comments

- A join is potentially going to fail since there is a limit to users who can join the queue (currently 23/01/2025).
- Where an api call returns nothing, it is still expected to receive confirmation or an error in case of failure.
- All calls start with `/queue/`. To be discussed.
- The `token` parameter is meant to ensure the calls are secure. Its generation is to be discussed.

# API endpoints necessary for the dashboard

| Endpoint | Method | Body | Description |
| --- | --- | --- | --- |
| /queue/metrics | GET | - | Retrieve the general data of the queue |
| /queue/status | GET | - | Retrieve the data of all users in the queue |
| /queue/status/{id} | GET | - | Retrieve the data of the user in the queue |
| /queue/join | POST | {"user_id": string} | Add a user to the queue |
| /queue/leave | POST | {"user_id": string} | Remove a user from the queue |
| /queue/confirm | POST | {"user_id": string} | Confirm a user in draft queue |
| /queue/update_config | POST | {"token": string, "max_active_users": int, "max_draft_users": int, "max_waiting_users": int} | Update the configuration of the queue |
| /queue/panic_disconnect | POST | {"token": string} | Remove all users from the queue |
| /queue/allow_join | POST | {"token": string, "allow_join": bool} | Allow users to join the queue |

## Expected response

### /queue/metrics
```json
{
    "active_users": int,
    "draft_users": int,
    "waiting_users": int,
}
```

### /queue/status
```json
[
    {
        "user_id": int,
        "status": string,
        "position": int,
        "timer": int,
    },
    ...
]
```

### /queue/user/{id}
```json
{
    "user_id": int,
    "status": string,
    "position": int,
    "timer": int,
}
```

### /queue/join
```json
{
    "user_id": int,
    "status": string,
    "position": int,
    "timer": int,
}
```

### /queue/leave
Nothing

### /queue/confirm
Nothing

### /queue/update_config
Nothing

### /queue/panic_disconnect
Nothing

### /queue/allow_join
Nothing