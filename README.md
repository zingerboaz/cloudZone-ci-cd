## Introduction

This project was built as part of a practicing CI\CD processes and deploying applications in containers.
The build process is done using:
code commit, code pipeline and code build.
The infrastructure creation process is done using Terraform.
The process of deploying and managing the containers is done using ECS.


## Build Process by Codepipeline

The build process start from the dockerfile that creates image that have all the dependencies that our application needs for running independently in the container at every environment.

You can run the dockrfile locally with the following commands: docker build -t cloud-zone-app .   end run container: docker run cloud-zone-app

Every new commit in the project that we are uploading to the git-commit is a trigger that run codepipeline that makes the code-build to create new image (by the buildspece.yml ) from the latest version and push the image to ECR.

## Infrastructure Creation by Terraform

Terraform is an infrastructure as code (IaC) tool that allows you to build, change, and version infrastructure safely and efficiently. 

Using Terraform we built all application Infrastructure, for example: VPC, Subnet, routetable, ECS cluster and service and loadBalancer.

## Application Deploy by ECS target

The application deploy is done using ECS that is a management and deployment tool of containers.

In our project we use ECS target that is a serverless service (there is no use to define instancess, only RAM and CPU).

The deployment done using image that is inside the ECR (the image is pushed by codebuild).

ECS is responsible for the health and wellness of the containers. It also responsible of Zero Down Time of the application, that when we are make changes in the application or scaling one of application component the clients are moved to another available instance.

In our project the application is deployed to 3 available containers.
