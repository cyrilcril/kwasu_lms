A Full-Stack Laravel Leave Management System

Description: Leave Management System is a web application for managing employee leaves. This application provides all the stages and phases of leave management from the application to all levels(HOD, Dean, Registrar and the VC) of approval that any employee needs. Through this application one can easily manage leaves.

Installation:

1. Install Laravel 8
2. change the following fields in .env file settings to
    1. DB_CONNECTION=mysql
    2. DB_HOST=127.0.0.1
    3. DB_PORT=8889
    4. DB_DATABASE=Kwasu-LMS
    5. DB_USERNAME=root
    6. DB_PASSWORD=root
3. Create a database called Kwasu-LMS
4. Run (php artisan migrate) In the project terminal to create all the necessary tables in the database created earlier (Kwasu-LMS)
5. Run (php artisan serve) to run the project
6. Username and password for users will be defined upon registration on the app.

Usage:

1. From admin dashboard:

-   Apply: This is the page where all users apply for leave.
-   Applied: Here is where the admin keep track go those that have applied but yet to be approved/recommended or decline
-   Search: Admin can search through all the leave application for a particular staff to see all the leave details of any staff.
-   All Leave: The table in this page shows the list of all leave irrespective of the application status either applied, pending or approved.
-   Approved Leaves: Shows the list of all approved leave and the details of the leave approval
-   Employee Class: This module helps the admin to create new Department, Faculty or unit incase a new department, faculty or unit is created.
-   Leave Type: Admin is allowed to add/edit new leave type or existing leaves incase if the company policy is amended for leave application.
-   Add Holiday: The system is designed to skip holidays so undefined holidays (Eid) can be added with their dates and days foe the holiday.
-   Activity Log: Keeps track of all activities that goes on the application for security purpose. This is only seen but the super admins and its to monitory any foul play on the software and to keep the integrity fo the software intact.

Features:

1. Shared leaves are activated
2. Cumulative leaves are activated
3. Log file is accessible by admins

Feel free to contribute to this project and fork it
