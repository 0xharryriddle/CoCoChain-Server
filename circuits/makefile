# Makefile for Circom Circuit Compilation and Verification

# Configurable variables
PROJECT_ROOT := $(CURDIR)
ARTIFACTS_DIR := $(PROJECT_ROOT)/circuit_artifacts
SRC_DIR := $(PROJECT_ROOT)/src
CIRCUIT_FILE := $(SRC_DIR)/main.circom

# Ensure directories exist and are absolute paths
$(shell mkdir -p $(ARTIFACTS_DIR))

# Default target
.PHONY: all
all: setup compile ptau gen_verifier

# Ensure directories are created
.PHONY: setup
setup:
	@echo "Setting up project directories..."
	mkdir -p $(ARTIFACTS_DIR)

# Compile Circom circuit
.PHONY: compile
compile: setup
	@echo "Compiling $(CIRCUIT_FILE)..."
	circom $(CIRCUIT_FILE) --r1cs --wasm --sym -o $(ARTIFACTS_DIR)

# Powers of tau ceremony
.PHONY: ptau
ptau: compile
	@echo "Performing Powers of Tau ceremony..."
	cd $(ARTIFACTS_DIR) && \
	if [ ! -f pot16_final.ptau ]; then \
		snarkjs powersoftau new bn128 16 pot16_0000.ptau -v && \
		snarkjs powersoftau contribute pot16_0000.ptau pot16_0001.ptau --name="First contribution" -v && \
		snarkjs powersoftau prepare phase2 pot16_0001.ptau pot16_final.ptau -v; \
	fi

# Generate zkey and verifier contract
.PHONY: gen_verifier
gen_verifier: ptau
	@echo "Generating verification artifacts..."
	cd $(ARTIFACTS_DIR) && \
	snarkjs groth16 setup main.r1cs pot16_final.ptau main_final.zkey && \
	snarkjs zkey export solidityverifier main_final.zkey $(SRC_DIR)/Verifier.sol && \
	snarkjs zkey export verificationkey main_final.zkey verification_key.json

# Clean generated artifacts
.PHONY: clean
clean:
	@echo "Cleaning up generated artifacts..."
	rm -rf $(ARTIFACTS_DIR)/*

# Help target with detailed information
.PHONY: help
help:
	@echo "Circom Circuit Compilation Makefile"
	@echo "====================================="
	@echo "Available targets:"
	@echo "  all            - Run all tasks (setup, compile, ptau, gen_verifier)"
	@echo "  setup          - Create necessary directories"
	@echo "  compile        - Compile the Circom circuit"
	@echo "  ptau           - Perform the Powers of Tau ceremony"
	@echo "  gen_verifier   - Generate ZK proof verifier contract and keys"
	@echo "  clean          - Remove all generated artifacts"
	@echo "  help           - Show this help message"
	@echo ""
	@echo "Project Configuration:"
	@echo "  Project Root:    $(PROJECT_ROOT)"
	@echo "  Artifacts Dir:   $(ARTIFACTS_DIR)"
	@echo "  Source Dir:      $(SRC_DIR)"
	@echo "  Circuit File:    $(CIRCUIT_FILE)"