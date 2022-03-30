type TaskSettings = {
    leftOperandMin?: number;
    leftOperandMax?: number;
    rightOperandMin?: number;
    rightOperandMax?: number;
}

const TASK_TYPE_ADDICTION = 'addiction';
const TASK_TYPE_SUBTRACTION = 'subtraction';
const TASK_TYPE_COMPARISON = 'comparison';

export type {TaskSettings};
export {TASK_TYPE_ADDICTION, TASK_TYPE_SUBTRACTION, TASK_TYPE_COMPARISON};
