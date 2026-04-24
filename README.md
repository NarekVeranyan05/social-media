---
TITLE: Social Media Platform Project Description and Setup Guide
DATE: April 24, 2026
AUTHOR: Narek Veranyan
---

# Vision Statement

* This project implements a social media platform designed for real-time user interaction.
* It supports user discovery through search functionality.
* It enables users to follow and manage connections with other users.
* It provides profile management features, including:

  * Status updates
  * Profile picture changes
* It includes a live chat system for direct messaging between users.

---

HOW TO RUN
The application depends on an educational, remotely hosted API server. Full API documentation is available at:
[https://social-network.samuraijs.com/docs#](https://social-network.samuraijs.com/docs#)

DEFAULT ACCOUNT LIMITATIONS
The provided default credentials are:

Email: [free@samuraijs.com](mailto:free@samuraijs.com)
Password: free

These credentials are unreliable due to server-side instability. Certain endpoints (notably user retrieval) may fail with internal server errors. The application interface will still load, but functionality may be incomplete.

RECOMMENDED SETUP (FULL FUNCTIONALITY)
To ensure full system functionality, proceed as follows:

1. Register an account at:
   [https://social-network.samuraijs.com/signUp](https://social-network.samuraijs.com/signUp)

2. After registration, you will be redirected to a page containing your API key.

3. Copy the API key.

4. Insert the API key into the project configuration file:
   src/api/api.ts

Replace the "API-KEY" field in both the instance and uploadInstance configurations with your key.
