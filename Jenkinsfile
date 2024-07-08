pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "bff-service:${env.BUILD_NUMBER}"
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        stage('Deploy to Testing') {
            steps {
                sh "kubectl apply -f ../k8s/taller/templates/bff/deployment-testing.yml"
                sh "kubectl apply -f ../k8s/taller/templates/bff/service-testing.yml"
            }
        }
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh "kubectl apply -f ../k8s/templates/bff/deployment-production.yaml"
                sh "kubectl apply -f ../k8s/templates/bff/service-production.yaml"
            }
        }
        stage('Update Services') {
            steps {
                // Update services in Kubernetes
                sh "kubectl apply -f ../k8s/templates/frontend/service.yaml -n testing"
                sh "kubectl apply -f ../k8s/templates/usermanagement/service.yaml -n testing"
                sh "kubectl apply -f ../k8s/templates/db-ceals/service.yaml -n default"
            }
        }
    }
}
