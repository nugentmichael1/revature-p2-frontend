pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        AWS_CREDENTIALS = 'aws-credentials-id'
        GIT_CREDENTIALS = 'github-api-token'
        GIT_URL = 'https://github.com/Will-Java-FS/revlearn-frontend-team1'
        S3_BUCKET = 'revlearn-frontend-build'
        GIT_BRANCH = 'main'
        SPRING_PORT = '8080'
    }

    tools {
        nodejs 'NodeJS'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                git branch: "${GIT_BRANCH}", url: "${GIT_URL}", credentialsId: "${GIT_CREDENTIALS}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Fetch Secrets') {
            steps {
                echo 'Fetching secrets from AWS Secrets Manager...'
                withAWS(credentials: "${AWS_CREDENTIALS}", region: "${AWS_REGION}") {
                    script {
                        // Fetch backend URL
                        def backendUrl = sh(script: 'aws secretsmanager get-secret-value --secret-id revlearn/urls --query SecretString --output text | jq -r .backend_url', returnStdout: true).trim()
                        env.VITE_API_URL = backendUrl + ':' + SPRING_PORT
                    }
                }
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building the React application...'
                withEnv(["VITE_API_URL=${env.VITE_API_URL}"]) {
                    sh 'npm run build'
                }
            }
        }

        stage('Upload to S3') {
            steps {
                echo 'Uploading to S3...'
                withAWS(credentials: "${AWS_CREDENTIALS}", region: "${AWS_REGION}") {
                    sh '''
                    aws s3 sync ./dist s3://${S3_BUCKET} --delete
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment to S3 completed successfully!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
