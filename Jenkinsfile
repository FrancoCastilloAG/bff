pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout del repositorio Git
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // Construcción de la aplicación
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Ejecución de pruebas
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Despliegue de la aplicación
                sh 'npm run start:prod &'
            }
        }
    }
}
