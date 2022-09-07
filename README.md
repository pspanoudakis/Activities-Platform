# Activities Platform
Spring 2022 Semester project for the **Software Engineering** course in [DIT@UoA](https://www.di.uoa.gr/en)

## About the project
This was a team project focused around creating a platform where parents may explore & reserve activities for their children. There where various goals:
- Co-operating as a group
- Designing, implementing & delivering the product in a **Scrum-like sprint** fashion
- Familiarize with SPA and REST API design & development
- Building & Deploying the product portably & efficiently
- Sharing code across the product parts in an automated way.

You can see all the project demands & requirements in detail in `Software-Engineering-Project-Assignment.pdf`.

## Technologies & Tools used
- **React** & [Tailwind CSS](https://tailwindcss.com/) in front-end applications. The **Google Maps API** is also used for Maps interoperability.
- **SpringBoot** for back-end & REST API. [Postman](https://www.postman.com/) & [Thunder Client](https://www.thunderclient.com/) where used for quick API calls.
- **PostgreSQL** is the selected DBMS. The schema was created using [DBeaver](https://dbeaver.io/).
- **Docker**
- **NPM package** for shared code, with automated publishing using **GitHub actions**

## Project phases
- Designing the UI appearance using [Uizard](https://uizard.io/) wireframes
- Designing the project architecture and structure
- Developing the product

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

- **<u>Before deploying</u>**: In order for the front-end application Maps to be functional, go to `google-project-key.env` and replace `REPLACE_KEY_HERE` with a valid Google Maps API key for this project.
You may skip this if you are not concerned about Google Maps interoperability.

- Use `docker-compose up` to trigger the build & deployment process.
This will create 5 containers:
    - `api-container` listening to port 8070
    - `database-container` listening to port 5432
    - `parent-app-container` listening to port 3000
    - `admin-app-container` listening to port 3001
    - `seller-app-container` listening to port 3002
- You may then explore the front-end applications in your browser, by visiting `localhost:XXXX` (in their respective ports).

## Team members
- [John-Vaios Dimopoulos](https://github.com/JohnVaiosDimopoulos)
- [Spyros Kantas](https://github.com/spyroskantas)
- [Loukas Mastoropoulos](https://github.com/Mastoropoulos-Loukas)
- [Pavlos Spanoudakis](https://github.com/pspanoudakis)

Instructor: [Kostas Saidis](https://github.com/saikos)

