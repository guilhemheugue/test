####Requis
docker, docker-compose

####Commande pour lancer l'infra
```bash
docker-compose up --build -d
```

####Configuration de la base de données
Aller à l'url http://localhost:5050 pour se connecter à pgAdmin
Login: admin@admin.com
Mot de passe : root

######Dans l'onglet server
Clic droit -> create -> server
Donner un nom au serveur sur le premier onglet

######Sur le deuxième onglet
host: database
username: postgres
password: root

Valider

######Créer une base de données nommée "database"
Restaurer la base de données à partir du fichier backup-test