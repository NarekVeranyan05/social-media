Vision Statement

This project implements a social media platform that enables users to connect and interact in real time. Core functionality includes user discovery via search, the ability to follow other users, profile management (including status updates and profile picture changes), and live chat messaging between users.

How to Run

This application relies on an educational, remotely hosted API server. Full API documentation is available at:

https://social-network.samuraijs.com/docs#

Default Account Limitations

The default credentials provided by the API:

Email: free@samuraijs.com
Password: free

are unreliable due to server-side issues. In particular, certain endpoints (e.g., user listing) may fail with internal server errors caused by API instability. Despite this, the application interface will still load correctly.

Recommended Setup (Full Functionality)

To ensure full functionality of the application, follow these steps:

Register an account at:
https://social-network.samuraijs.com/signUp
After registration, you will be redirected to a page displaying your API key.
Copy the provided API key.

Paste the API key into the project configuration file:
src/api/api.ts

Replace the "API-KEY" field in both instance and uploadInstance with your key.