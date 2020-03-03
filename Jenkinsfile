node{
    stage('git clone'){
        updateGitlabCommitStatus name: 'jenkins', state: 'pending'
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], browser: [$class: 'GitLab', repoUrl: 'http://212.129.149.40'], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '3', url: 'http://212.129.149.40/171250507_IIICEStseB/frontend-iiicestseb']]])
        echo '=== git clone end ==='
    }

    stage('yarn run build'){
        try{
        updateGitlabCommitStatus name: 'jenkins', state: 'running'
        sh encoding: 'UTF-8', label: '', returnStdout: true, script: '''cd /var/lib/jenkins/workspace/frontend
source /etc/shell/env.sh
/usr/local/bin/yarn install
/usr/local/bin/yarn run build
cd dist
tar -zcvf frontend.tar.gz *
cd ../'''
        echo '=== yarn build end ==='
        }
        catch(exc){
            updateGitlabCommitStatus name: 'jenkins', state: 'failure'
            echo '=== build failure ==='
            throw exc
        }
    }

        stage('depoly'){
        sshPublisher(publishers: [sshPublisherDesc(configName: 'tencent', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd /var/www
rm -rf frontend
mkdir frontend
cp frontend.tar.gz frontend/
cd frontend
pwd
tar -zxvf frontend.tar.gz
rm -rf frontend.tar.gz
rm -rf ../frontend.tar.gz''', execTimeout: 5000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'dist/*.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
        updateGitlabCommitStatus name: 'jenkins', state: 'success'
        echo '=== depoly end ==='
        }

}
