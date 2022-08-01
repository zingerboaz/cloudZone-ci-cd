variable "vpc_cidr" {
  type        = string
  default     = "10.0.0.0/16"
  description = "vpc cidr block"
}

variable "public_subnet_az1_cidr" {
  type        = string
  default     = "10.0.0.0/24"
  description = "public subnet az1 cidr block"
}

variable "public_subnet_az2_cidr" {
  type        = string
  default     = "10.0.1.0/24"
  description = "public subnet az2 cidr block"
}

variable "public_route_table_cidr" {
  type        = string
  default     = "0.0.0.0/0"
  description = "public route tabl cidr block"
}

variable "private_app_subnet_az1_cidr" {
  type        = string
  default     = "10.0.2.0/24"
  description = "private app subnet az1 cidr block"
}

variable "private_app_subnet_az2_cidr" {
  type        = string
  default     = "10.0.3.0/24"
  description = "private app subnet az2 cidr block"
}


# variable "ecs_cluster_name" {
#   type = string
#   default = "ecs_cluster"
# }


# variable "ecs_service_name" {
#   type = string
#   default = "my_first_service"
# }