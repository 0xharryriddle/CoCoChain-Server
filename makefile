# Define project directories
PROJECT_ROOT := $(CURDIR)
SRC_DIR := $(PROJECT_ROOT)/src
CONFIG_DIR := $(SRC_DIR)/config
MIGRATIONS_DIR := $(SRC_DIR)/migrations
MODELS_DIR := $(SRC_DIR)/models
SEEDERS_DIR := $(SRC_DIR)/seeders

# Default target
.PHONY: all
all: role account user address fertilizer

# Define Sequelize CLI command with common options
SEQUELIZE := node_modules/.bin/sequelize \
	# --config $(CONFIG_DIR)/config.ts \
	# --models-path $(MODELS_DIR) \
	# --migrations-path $(MIGRATIONS_DIR) \
	# --seeders-path $(SEEDERS_DIR)

# Role model generation
.PHONY: role
role:
	$(SEQUELIZE) model:generate --name Role \
		--attributes roleName:string,roleValue:enum:'{0,1,2}'

# Account model generation
.PHONY: account
account:
	$(SEQUELIZE) model:generate --name Account \
		--attributes phoneNumber:string,password:string,walletAddress:string,privateKey:string,roleId:integer

# User model generation
.PHONY: user
user:
	$(SEQUELIZE) model:generate --name User \
		--attributes accountId:integer,name:string,address:string

# Address model generation
.PHONY: address
address:
	$(SEQUELIZE) model:generate --name Address \
		--attributes accountId:integer,address:string

# Fertilizer model generation
.PHONY: fertilizer
fertilizer:
	$(SEQUELIZE) model:generate --name Fertilizer \
		--attributes fertilizerName:string,maxAllowedValue:integer,active:boolean
