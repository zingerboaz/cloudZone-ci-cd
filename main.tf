terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

}

provider "aws" {
  region  = "eu-west-1"
}



# 1. Create vpc

resource "aws_vpc" "vpc" {
  cidr_block              = var.vpc_cidr
  instance_tenancy        = "default"
  enable_dns_hostnames    = true

  tags      = {
    Name    =  "dev vpc"
  }
}


# 2. Create Internet Gateway and attach it to vpc
resource "aws_internet_gateway" "gw" {
  vpc_id    = aws_vpc.vpc.id

  tags      = {
    Name    = "dev internet gateway"
  }
}



# 3. Create public subnet az1
resource "aws_subnet" "public_subnet_az1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.public_subnet_az1_cidr
  availability_zone       = "eu-west-1a"
  map_public_ip_on_launch = true

  tags      = {
    Name    = "public subnet az1"
  }
}


# 4. Create public subnet az2
resource "aws_subnet" "public_subnet_az2" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.public_subnet_az2_cidr
  availability_zone       = "eu-west-1b"
  map_public_ip_on_launch = true

  tags      = {
    Name    = "public subnet az2"
  }
}



# 5. Create Custom Route Table and add public route
resource "aws_route_table" "public_route_table" {
  vpc_id       = aws_vpc.vpc.id

  route {
    cidr_block = var.public_route_table_cidr
    gateway_id = aws_internet_gateway.gw.id
  }

  tags       = {
    Name     = "public route tabl"
  }
}


resource "aws_route" "r" {
  route_table_id            = aws_route_table.public_route_table.id
  destination_cidr_block    = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.gw.id
  #depends_on             = [aws_route_table.testing]
}



# 6. Associate subnet az1 with Route Table  
resource "aws_route_table_association" "public_subnet_az1_route_table_association" {
  subnet_id           = aws_subnet.public_subnet_az1.id
  route_table_id      = aws_route_table.public_route_table.id
}

# 7. Associate subnet az2 with Route Table  
resource "aws_route_table_association" "public_subnet_az2_route_table_association" {
  subnet_id           = aws_subnet.public_subnet_az2.id
  route_table_id      = aws_route_table.public_route_table.id
}



# 8. Create private app subnet az1
resource "aws_subnet" "private_app_subnet_az1" {
  vpc_id                   = aws_vpc.vpc.id
  cidr_block               = var.private_app_subnet_az1_cidr
  availability_zone        = "eu-west-1a"
  map_public_ip_on_launch  = false

  tags      = {
    Name    = "private app subnet az1"
  }
}


# 9. Create private app subnet az2
resource "aws_subnet" "private_app_subnet_az2" {
  vpc_id                   = aws_vpc.vpc.id
  cidr_block               = var.private_app_subnet_az2_cidr
  availability_zone        = "eu-west-1b"
  map_public_ip_on_launch  = false

  tags      = {
    Name    = "private app subnet az2"
  }
}


# 11.Create ECS Cluster
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "ecs_cluster" 
}



# 12.Create Task Definitons
resource "aws_ecs_task_definition" "my_first_task" {
  family                   = "my-first-task" # Naming our first task 
  container_definitions    = jsonencode([
   {
      "name": "my-first-task",
      "image": "https://044524633564.dkr.ecr.eu-west-1.amazonaws.com/ecr:latest",           
      "portMappings": [
        {
          "containerPort": 4200,
          "hostPort": 4200
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ])
  
  requires_compatibilities = ["FARGATE"] # Stating that we are using ECS Fargate
  network_mode             = "awsvpc"    # Using awsvpc as our network mode as this is required for Fargate
  memory                   = 512         # Specifying the memory our container requires
  cpu                      = 256         # Specifying the CPU our container requires
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}


# 13.Create IAM role for tasks
resource "aws_iam_role" "ecsTaskExecutionRole" {
  name                = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
} 


# 14. Create Servic in order to runs tasks
resource "aws_ecs_service" "my_first_service" {
  name            = "my_first_service"
  cluster         = aws_ecs_cluster.ecs_cluster.id           
  task_definition = aws_ecs_task_definition.my_first_task.arn     # Referencing the task our service will spin up
  launch_type     = "FARGATE"
  desired_count   = 3                           # number of containers we want deployed to 3

  
  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn # Referencing our target group
    container_name   = aws_ecs_task_definition.my_first_task.family
    container_port   = 4200
  }
  
  
  network_configuration {
    security_groups = [aws_security_group.service_security_group.id]
    subnets          = [aws_subnet.private_app_subnet_az1.id,aws_subnet.private_app_subnet_az2.id]
    assign_public_ip = true # Providing our containers with public IPs
  }

}

# 15.Create  Security Group for ECS  
#    because the ECS service does not allow traffic 
#    in by default and we will allow traffic only 
#    from the application load balancer security group

resource "aws_security_group" "service_security_group" {
   vpc_id      = aws_vpc.vpc.id
   ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Only allowing traffic in from the load balancer security group
    security_groups = [aws_security_group.load_balancer_security_group.id]
  }
  
  egress {
    from_port   = 0 # Allowing any incoming port
    to_port     = 0 # Allowing any outgoing port
    protocol    = "-1"  
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}



# 16. Create a Load Balancer 
resource "aws_alb" "application_load_balancer" {
  name               = "test-lb-tf" 
  load_balancer_type = "application"
  subnets = [aws_subnet.private_app_subnet_az1.id,aws_subnet.private_app_subnet_az2.id]
  security_groups = [aws_security_group.load_balancer_security_group.id]
}


# 17.Create  Security Group for the load balancer
resource "aws_security_group" "load_balancer_security_group" {
 description = "HTTP and HTTPS and SSH and ANGULAR from anywhere"
 vpc_id = aws_vpc.vpc.id        #aws_alb_id = aws_alb.application_load_balancer.id                               #vpc_id = aws_vpc.vpc.id
  
  ingress {
    from_port   = 80 
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic in from all sources
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ANGULAR"
    from_port   = 4200
    to_port     = 4200
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0 # Allowing any incoming port
    to_port     = 0 # Allowing any outgoing port
    protocol    = "-1" # Allowing any outgoing protocol 
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}

# 18.Create Target Group
resource "aws_lb_target_group" "target_group" {
  name        = "target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.vpc.id
  health_check {
    matcher = "200,301,302"
    path = "/"
  }
}

# 19.Create LB listener
resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn # Referencing our load balancer
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn # Referencing our tagrte group
  }
}



# #20 Creat Auto-scaling for ECS

# resource "aws_appautoscaling_target" "ecs_target" {
#   max_capacity       = 4
#   min_capacity       = 1
#   resource_id        = [var.ecs_cluster_name,var.ecs_service_name ]              #,var.ecs_service_name
  
#   scalable_dimension = "ecs:service:DesiredCount"
#   service_namespace  = "ecs"
# }

# resource "aws_appautoscaling_policy" "ecs_policy" {
#   name               = "scale-down"
#   policy_type        = "StepScaling"
#   resource_id        = aws_appautoscaling_target.ecs_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
#   service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

#   step_scaling_policy_configuration {
#     adjustment_type         = "ChangeInCapacity"
#     cooldown                = 60
#     metric_aggregation_type = "Maximum"

#     step_adjustment {
#       metric_interval_upper_bound = 0
#       scaling_adjustment          = -1
#     }
#   }
# }


# resource "aws_ecs_service" "ecs_service" {
#   name            = "my_first_service"
#   cluster         = "ecs_cluster"
#   task_definition = "taskDefinitionFamily:1"
#   desired_count   = 2

#   lifecycle {
#     ignore_changes = [desired_count]
#   }
# }






































