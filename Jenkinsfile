pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t bff-service:${env.BUILD_NUMBER} .'
            }
        }
        stage('Deploy to Testing') {
            steps {
                sh "kubectl apply -f k8s/templates/bff/deployment-testing.yaml"
                sh "kubectl apply -f k8s/templates/bff/service-testing.yaml"
            }
        }
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh "kubectl apply -f k8s/templates/bff/deployment-production.yaml"
                sh "kubectl apply -f k8s/templates/bff/service-production.yaml"
            }
        }
    }
}
