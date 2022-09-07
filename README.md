# Activities Platform
Spring 2022 Semester project for the **Software Engineering** course in [DIT@UoA](https://www.di.uoa.gr/en)

## Team members
- [John-Vaios Dimopoulos](https://github.com/JohnVaiosDimopoulos)
- [Spyros Kantas](https://github.com/spyroskantas)
- [Loukas Mastoropoulos](https://github.com/Mastoropoulos-Loukas)
- [Pavlos Spanoudakis](https://github.com/pspanoudakis)

Instructor: [Kostas Saidis](https://github.com/saikos)

## About the project
This was a team project focused around creating a platform where parents may explore & reserve activities for their children. There where various goals:
- Co-operating as a group
- Designing, implementing & delivering the product in a **Scrum-like sprint** fashion
- Familiarize with SPA and REST API design & development
- Building & Deploying the product portably & efficiently
- Sharing code across the product parts in an automated way.

All the project demands & requirements are described in detail in `Software-Engineering-Project-Assignment.pdf`.

## Project phases
- Designing the UI appearance using [Uizard](https://uizard.io/) wireframes
- Designing the project architecture and structure
- Developing the product

## Technologies & Tools used
- **React** & [Tailwind CSS](https://tailwindcss.com/) in front-end applications. The **Google Maps API** is also used for Maps interoperability.
- **SpringBoot** for back-end & REST API. [Postman](https://www.postman.com/) & [Thunder Client](https://www.thunderclient.com/) where used for quick API calls.
- **PostgreSQL** is the selected DBMS. The schema was created using [DBeaver](https://dbeaver.io/).
- **Docker**
- **NPM package** for shared code, with automated publishing using **GitHub actions**

## Project parts
- Main front-end application for parents (`parent-app`)
- Front-end application designed for activity providers (`seller-app`)
- Supportive front-end application to be used by the platform administrators (`admin-app`)
- Back-end & REST API application (`back-end`)
- Shared code NPM package (`common-components-lib`)
- Database schema & data (`db`)
- Wireframes & User stories created during the initial phase (`docs`)

## Deployment
Docker is required.
- Clone the repository locally.

- **Before deploying**: In order for the front-end application Maps to be functional, go to `google-project-key.env` and replace `REPLACE_KEY_HERE` with a valid Google Maps API key for this project.
You may skip this if you are not concerned about Google Maps interoperability.

- Use `docker-compose up` to trigger the build & deployment process.
This will create 5 containers:
    - `api-container` listening to port 8070
    - `database-container` listening to port 5432
    - `parent-app-container` listening to port 3000
    - `admin-app-container` listening to port 3001
    - `seller-app-container` listening to port 3002
- You may then explore the front-end applications in your browser, by visiting `localhost:XXXX` (in their respective ports).

## Parent App features
- Explore & choose between activity categories

https://user-images.githubusercontent.com/52857036/188978168-b1827bd3-9e61-40d4-9c4b-5157579fa8e6.mp4

- Search activities using various filters

https://user-images.githubusercontent.com/52857036/188979113-cf1a6155-d0f0-41fd-9efb-ef5c2ffe79ab.mov

- Filter activities using home address

https://user-images.githubusercontent.com/52857036/188979314-1f3a2250-50d2-4175-b258-1c3370d28a99.mov

- Make an activity reservation

https://user-images.githubusercontent.com/52857036/188979546-4871fbb8-40fe-4484-b580-6dbd3a5e9ede.mov

- Edit profile & payment details

https://user-images.githubusercontent.com/52857036/188979881-5ae7df3c-90a4-493b-896a-9fe0cbb6b5db.mov

- Responsive design

https://user-images.githubusercontent.com/52857036/188980025-a8fb8f02-9d81-466f-a767-32860a518d13.mov

## Admin App features
