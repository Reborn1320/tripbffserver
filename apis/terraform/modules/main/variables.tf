variable "stage" {
  description = "domain for traefik"
  type        = string
}

variable "domain" {
  description = "domain for traefik"
  type        = string
}

variable "region" {
  description = "The AWS region things are created in"
  default = "ap-southeast-1"
}

variable "aws_id" {
  type        = "string"
  description = "AWS_ACCESS_KEY_ID"
}

variable "aws_key" {
  type        = "string"
  description = "AWS_SECRET_ACCESS_KEY"
}

variable "aws_account_code" {
  description = "account code used to grant permission, For example: arn:aws:iam::xxx:user/yyy"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "myEcsTaskExecutionRole"
}

# variable "ecs_auto_scale_role_name" {
#   description = "ECS auto scale role Name"
#   default = "myEcsAutoScaleRole"
# }

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "1"
}

# variable "app_image" {
#   description = "Docker image to run in the ECS cluster"
#   default     = "something else"
# }

# variable "app_port" {
#   description = "Port exposed by the docker image to redirect traffic to"
#   default     = 3000
# }

# variable "app_count" {
#   description = "Number of docker containers to run"
#   default     = 1
# }

variable "sso_repository_url" {
  description = "sso repository"
  type        = string
}

variable "redis_repository_url" {
  description = "redis repository"
  type        = string
}

variable "trip_api_repository_url" {
  description = "trip-api repository"
  type        = string
}
variable "infographic_repository_url" {
  description = "infographic repository"
  type        = string
}
variable "lottie_web_repository_url" {
  description = "lottie_web repository"
  type        = string
}

variable "mongodb" {
  description = "sso mongodb connection string"
  type        = string
}