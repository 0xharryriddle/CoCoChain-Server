pragma circom 2.0.0;

include "../circomlib/circuits/comparators.circom";

template CheckStandard() {
    // Input private
    signal input actualQuantity;
    
    // Public inputs (được công khai)
    signal input maxAllowedQuantity;
    
    // Kiểm tra số lượng
    component lessThan = LessThan(64);
    lessThan.in[0] <== actualQuantity;
    lessThan.in[1] <== maxAllowedQuantity;
    
    // Output
    signal output isCompliant;
    isCompliant <== lessThan.out;
}

component main {public [maxAllowedQuantity]} = CheckStandard();