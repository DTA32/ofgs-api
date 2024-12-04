pipeline {
    agent any

    environment {
        REGISTRY = 'dta32'
        REPO = 'ofgs-api'
        DOCKERFILE = 'Dockerfile'
        DEPLOYMENT_FILE = 'k8s/deployment.yaml'
        DOCKER_UNAME = 'dta32'
        DOCKER_TOKEN = credentials('docker-creds')
        KUBE_CREDS = credentials('kube-creds')
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh """
                    docker build -t ${REGISTRY}/${REPO}:${commitId} -f ${DOCKERFILE} .
                    echo "$DOCKER_TOKEN" | docker login --username ${DOCKER_UNAME} --password-stdin
                    docker push ${REGISTRY}/${REPO}:${commitId}
                    """
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh """
                    sed -i 's|replacedbycicd|${REGISTRY}/${REPO}:${commitId}|' ${DEPLOYMENT_FILE}
                    kubectl apply -f ${DEPLOYMENT_FILE} --kubeconfig=$KUBE_CREDS
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}