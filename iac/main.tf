provider "aws" {
  region = "eu-north-1"
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Create an Internet Gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

# Create a Subnet
resource "aws_subnet" "subnet" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

# Create a Security Group
resource "aws_security_group" "allow_ssh" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "my_security_group" {
  name        = "my-security-group"
  description = "Security group for my EC2 instance"
  vpc_id      = "vpc-0052bc038cb0cf773"

  // Define ingress and egress rules here
}


# Create an EC2 Instance for Node.js backend
resource "aws_instance" "nodejs_backend" {
  ami           = "ami-0705384c0b33c194c" # Ubuntu Server 20.04 LTS AMI (replace with a valid AMI ID in your region)
  instance_type = "t3.micro"  # Free Tier eligible
    # No subnet specified
  security_groups = [aws_security_group.my_security_group.name]

  tags = {
    Name = "NodeJSBackend"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install -y nodejs npm",
      "git clone https://your-repository-url.git /home/ubuntu/nodejs-app",
      "cd /home/ubuntu/nodejs-app",
      "npm install",
      "npm start"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/id_rsa")
      host        = self.public_ip
    }
  }
}

# Create S3 Bucket for React Application
resource "aws_s3_bucket" "react_app" {
  bucket = "unique-bucket-name-5455851458" # Replace with a unique bucket name
 
  tags = {
    Name = "react-app-bucket"
  }
}

resource "aws_s3_bucket_website_configuration" "react_app" {
  bucket = aws_s3_bucket.react_app.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_object" "react_app_files" {
  for_each = fileset("path/to/your/build", "**")
  bucket   = aws_s3_bucket.react_app.bucket
  key      = each.value
  source   = "path/to/your/build/${each.value}"
  etag     = filemd5("path/to/your/build/${each.value}")
}
