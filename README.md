# Package Tracking

A simple tracking system that allows client to view thier package status using its tracking number.

### Clone the repository

    $ git clone https://github.com/MickoMatamorosa/package_tracking.git



## Backend:

### Run virtual environment

    $ cd backend
    $ pipenv shell


### Install all backend dependencies

    $ pipenv install


### Apply database migrations

    $ python manage.py migrate


### Setup administrator (superuser)

    $ cd src
    $ python manage.py createsuperuser

### Run Backend Server

    $ python manage.py runserver

Server running at default url [http://localhost:3000/](http://localhost:3000/)

Administrator url: [http://localhost:3000/administrator](http://localhost:3000/administrator)

### Backend Testing
    $ python manage.py test


## Frontend:

### Install all frontend dependencies
    $ cd ../../frontend/gui
    $ sudo npm install

### Run Frontend Server
    $ npm start

Server running at default url [http://localhost:8000/](http://localhost:8000/)
